# Handling Asynchronous Actions
### **Redux Toolkit (Thunk)**

In many applications, we need to perform asynchronous operations such as fetching data from an API, posting data to a server, or dealing with side effects like authentication and file uploads. Redux Toolkit provides a simple and powerful way to handle these scenarios through **thunks**, which are async functions that dispatch actions.

Using `createAsyncThunk` from Redux Toolkit, you can handle async operations efficiently while managing loading, success, and error states.

### **Project Overview: Fetching Data from an API**

Let's build a small project that focuses on handling asynchronous actions using Redux Toolkit. This project will demonstrate:
- Fetching a list of **posts** from a public API (`jsonplaceholder.typicode.com`).
- Managing **loading**, **success**, and **error** states for the async action.
- Displaying the fetched data in a **React** component.
- Best practices for structuring and managing async actions.

### **Key Concepts:**
1. **Thunk**: A function that delays its execution or dispatches other functions (async functions).
2. **`createAsyncThunk`**: A Redux Toolkit method to handle async logic and automatically dispatch actions based on the promise state (pending, fulfilled, rejected).

### **1. Project Setup**

1. **Initialize the Project**:
    - Use **Vite** with **React** and **TypeScript**.

   ```bash
   npm create vite@latest async-redux-app -- --template react-ts
   cd async-redux-app
   npm install
   ```

2. **Install Redux Toolkit and React Redux**:

   ```bash
   npm install @reduxjs/toolkit react-redux axios
   ```

3. **Folder Structure**:

   We’ll organize our code to follow best practices with a clear separation of concerns.

   ```
   src/
   ├── components/
   │   └── PostList.tsx
   ├── features/
   │   └── posts/
   │       ├── redux/
   │       │   └── postSlice.ts
   │       └── services/
   │           └── postService.ts
   ├── store/
   │   └── store.ts
   ├── pages/
   │   └── Home.tsx
   └── App.tsx
   ```

---

### **2. Setting Up Redux Store**

1. **Create the Redux Store**:
    - Path: `src/store/store.ts`

   ```javascript
   import { configureStore } from '@reduxjs/toolkit';
   import postReducer from '../features/posts/redux/postSlice';

   const store = configureStore({
     reducer: {
       posts: postReducer,
     },
   });

   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;

   export default store;
   ```

2. **Provide the Store to the React Application**:
    - Path: `src/main.tsx`

   ```javascript
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './App';
   import { Provider } from 'react-redux';
   import store from './store/store';
   import './index.css';

   ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
     <React.StrictMode>
       <Provider store={store}>
         <App />
       </Provider>
     </React.StrictMode>
   );
   ```

---

### **3. Setting Up Async Actions with `createAsyncThunk`**

Now, let's focus on **handling async actions** using `createAsyncThunk`. We will create a slice to manage posts and a service to fetch data from an API.

1. **Post Service**:
    - Path: `src/features/posts/services/postService.ts`

   Here, we create a simple function to fetch posts from the public API using `axios`.

   ```javascript
   import axios from 'axios';

   const API_URL = 'https://jsonplaceholder.typicode.com/posts';

   export const fetchPosts = async () => {
     const response = await axios.get(API_URL);
     return response.data;
   };
   ```

2. **Post Slice (Redux)**:
    - Path: `src/features/posts/redux/postSlice.ts`

   In this slice, we will define our async thunk and handle different states (loading, success, and error).

   ```javascript
   import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
   import { fetchPosts } from '../services/postService';

   interface Post {
     id: number;
     title: string;
     body: string;
   }

   interface PostState {
     posts: Post[];
     loading: boolean;
     error: string | null;
   }

   const initialState: PostState = {
     posts: [],
     loading: false,
     error: null,
   };

   // Async thunk to fetch posts
   export const fetchPostsThunk = createAsyncThunk(
     'posts/fetchPosts',
     async (_, { rejectWithValue }) => {
       try {
         const data = await fetchPosts();
         return data;
       } catch (error) {
         return rejectWithValue('Failed to fetch posts');
       }
     }
   );

   const postSlice = createSlice({
     name: 'posts',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
       builder
         .addCase(fetchPostsThunk.pending, (state) => {
           state.loading = true;
           state.error = null;
         })
         .addCase(fetchPostsThunk.fulfilled, (state, action) => {
           state.loading = false;
           state.posts = action.payload;
         })
         .addCase(fetchPostsThunk.rejected, (state, action) => {
           state.loading = false;
           state.error = action.payload as string;
         });
     },
   });

   export default postSlice.reducer;
   ```

   **Explanation**:
    - **`createAsyncThunk`**: This method automatically handles the `pending`, `fulfilled`, and `rejected` states of the async request.
        - `pending`: When the request starts.
        - `fulfilled`: When the request succeeds.
        - `rejected`: When the request fails.
    - We manage the **loading** state to show a loader and handle **error** messages to inform the user if the API call fails.

---

### **4. Displaying Posts in a React Component**

Now, let's create a component to display the posts and handle the state managed by Redux.

1. **PostList Component**:
    - Path: `src/components/PostList.tsx`

   This component will dispatch the `fetchPostsThunk` and display the posts.

   ```javascript
   import React, { useEffect } from 'react';
   import { useDispatch, useSelector } from 'react-redux';
   import { fetchPostsThunk } from '../features/posts/redux/postSlice';
   import { RootState, AppDispatch } from '../store/store';

   const PostList = () => {
     const dispatch = useDispatch<AppDispatch>();
     const { posts, loading, error } = useSelector((state: RootState) => state.posts);

     // Fetch posts on component mount
     useEffect(() => {
       dispatch(fetchPostsThunk());
     }, [dispatch]);

     if (loading) {
       return <p>Loading...</p>;
     }

     if (error) {
       return <p>Error: {error}</p>;
     }

     return (
       <ul>
         {posts.map((post) => (
           <li key={post.id} className="mb-4 border p-4 rounded shadow">
             <h2 className="text-xl font-bold">{post.title}</h2>
             <p>{post.body}</p>
           </li>
         ))}
       </ul>
     );
   };

   export default PostList;
   ```

---

### **5. Creating Pages and Final Setup**

1. **Home Page**:
    - Path: `src/pages/Home.tsx`

   The `Home` page will render the `PostList` component.

   ```javascript
   import React from 'react';
   import PostList from '../components/PostList';

   const Home = () => {
     return (
       <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold mb-4">Posts</h1>
         <PostList />
       </div>
     );
   };

   export default Home;
   ```

2. **App Component**:
    - Path: `src/App.tsx`

   The root `App` component will simply render the `Home` page.

   ```javascript
   import React from 'react';
   import Home from './pages/Home';

   const App = () => {
     return (
       <div className="App">
         <Home />
       </div>
     );
   };

   export default App;
   ```

---

### **6. Running the Application**

You can now run the application using:

```bash
npm run dev
```

Open the browser at `http://localhost:5173` to see the fetched posts.

---

### **Explanation of Best Practices**

1. **Using `createAsyncThunk`**:
    - We used `createAsyncThunk` to handle the lifecycle of async operations. This is a best practice in Redux Toolkit as it helps to reduce boilerplate and automatically handles the states of a promise.

2. **Service Layer**:
    - We created a `postService.ts` file that encapsulates the API logic. This decouples business logic from the Redux slice, making the code cleaner and easier to maintain.

3. **Separation of Concerns**:
    - We separated concerns by using `redux/` for state management, `services/` for API