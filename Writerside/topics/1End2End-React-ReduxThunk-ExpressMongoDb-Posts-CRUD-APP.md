# End2End: React ReduxThunk ExpressMongoDb Posts CRUD APP


This is a **fully functional CRUD app** using **TypeScript** for both the **Express backend** and the **React frontend**. The backend will use **MongoDB** for storing posts, and the frontend will use **Redux Toolkit(Thunk) ** to interact with the API for managing CRUD operations.

### **Step 1: Setting Up the Backend with Express, MongoDB, and TypeScript**

#### **1.1 Backend Folder Structure**

Here's the folder structure for the **TypeScript-based Express backend**:

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   └── postController.ts
│   ├── models/
│   │   └── postModel.ts
│   ├── routes/
│   │   └── postRoutes.ts
│   └── server.ts
├── .env
├── tsconfig.json
├── package.json
└── package-lock.json
```

#### **1.2 Backend Dependencies**

First, set up your backend by initializing a Node.js project with TypeScript support:

```bash
mkdir backend
cd backend
npm init -y
npm install express mongoose dotenv cors
npm install --save-dev Typescript tsx  @types/node @types/cors 
```

#### **1.3 TypeScript Configuration**

Create a `tsconfig.json` file in the backend root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

#### **1.4 MongoDB Connection**

Create a new folder called `config/` and a file `db.ts` for connecting to MongoDB:

- **File: `src/config/db.ts`**

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

- **File: `.env`**

Add your MongoDB connection string:

```
MONGO_URI=mongodb://localhost:27017/posts
```

#### **1.5 Create Post Model**

Define the `Post` model that corresponds to the structure of posts in the MongoDB database.

- **File: `src/models/postModel.ts`**

```javascript
import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  body: string;
}

const postSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
```

#### **1.6 Create Post Controller**

The controller will handle the logic for each API endpoint.

- **File: `src/controllers/postController.ts`**

```javascript
import { Request, Response } from 'express';
import Post, { IPost } from '../models/postModel';

// Fetch all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a post
export const createPost = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  try {
    const post = new Post({ title, body });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post' });
  }
};

// Update a post
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await Post.findById(id);
    if (post) {
      post.title = title;
      post.body = body;
      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating post' });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post) {
      await post.deleteOne();
      res.json({ message: 'Post removed' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
```

#### **1.7 Create Routes for Posts**

We define the API routes for performing CRUD operations on posts.

- **File: `src/routes/postRoutes.ts`**

```javascript
import express from 'express';
import { getPosts, createPost, updatePost, deletePost } from '../controllers/postController';

const router = express.Router();

router.route('/').get(getPosts).post(createPost);
router.route('/:id').put(updatePost).delete(deletePost);

export default router;
```

#### **1.8 Initialize Express Server**

Now let's create the main server file and set up middleware.

- **File: `src/server.ts`**

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import postRoutes from './routes/postRoutes';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Run the backend server:

```bash
npm run dev
```

---

### **Step 2: Setting Up the Frontend (React + Redux Toolkit)**

Now let's connect the backend API to a **React + Redux Toolkit** frontend.

#### **2.1 Frontend Folder Structure**

```
frontend/
├── src/
│   ├── components/
│   │   └── PostList.tsx
│   │   └── PostForm.tsx
│   ├── features/
│   │   └── posts/
│   │       ├── redux/
│   │       │   └── postSlice.ts
│   │       ├── services/
│   │       │   └── postService.ts
│   ├── store/
│   │   └── store.ts
│   ├── App.tsx
│   └── main.tsx
├── tsconfig.json
├── package.json
└── package-lock.json
```

#### **2.2 Frontend Dependencies**

1. Initialize the frontend using **Vite** with TypeScript:

   ```bash
   mkdir frontend
   cd frontend
   npm create vite@latest async-frontend -- --template react-ts
   cd async-frontend
   npm install
   ```

2. Install required packages:

   ```bash
   npm install @reduxjs/toolkit react-redux axios lucide-react
   ```

#### **2.3 Redux Setup for Posts (CRUD Actions)**

1. **Post Service**:
    - Path: `src/features/posts/services/postService.ts`

   ```javascript
   import axios from 'axios';

   const API_URL = 'http://localhost:5000/api/posts';

   export const fetchPosts = async () => {
     const response = await axios.get(API_URL);
     return response.data;
   };

   export const createPost = async (post: { title: string; body: string }) => {
     const response = await axios.post(API_URL, post);
     return response.data;
   };

   export const updatePost = async (id: string, post: { title: string; body: string }) => {
     const response = await axios.put(`${API_URL}/${id}`, post);
     return response.data;
   };

   export const deletePost = async (id: string) => {
     const response = await axios.delete(`${API_URL}/${id}`);
     return response.data;
   };
   ```

2. **Redux Slice**:
    - Path: `src/features/posts/redux/postSlice.ts`

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, createPost, updatePost, deletePost } from '../services/postService';

interface Post {
  _id: string;
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

// Thunks for CRUD actions
export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts',
  async () => {
    const data = await fetchPosts();
    return data;
  });

export const createPostThunk = createAsyncThunk('posts/createPost',
  async (post: { title: string; body: string }) => {
    const data = await createPost(post);
    return data;
  });

export const updatePostThunk = createAsyncThunk('posts/updatePost',
  async ({ id, post }: { id: string; post: { title: string; body: string } }) => {
    const data = await updatePost(id, post);  // Ensure updatePost is an API call function
    return data;
  }
);


export const deletePostThunk = createAsyncThunk('posts/deletePost', async (id: string) => {
  await deletePost(id);
  return id;
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching posts';
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        if (index >= 0) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export default postSlice.reducer;
```

3. **Store Configuration**:
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

---

### **2.4 React Components to Manage Posts**

1. **Post List Component**:
    - Path: `src/components/PostList.tsx`

   ```javascript
   import React, { useEffect } from 'react';
   import { useDispatch, useSelector } from 'react-redux';
   import { fetchPostsThunk, deletePostThunk } from '../features/posts/redux/postSlice';
   import { RootState, AppDispatch } from '../store/store';

   const PostList = () => {
     const dispatch = useDispatch<AppDispatch>();
     const { posts, loading, error } = useSelector((state: RootState) => state.posts);

     useEffect(() => {
       dispatch(fetchPostsThunk());
     }, [dispatch]);

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error: {error}</p>;

     return (
       <ul>
         {posts.map((post) => (
           <li key={post._id}>
             <h2>{post.title}</h2>
             <p>{post.body}</p>
             <button onClick={() => dispatch(deletePostThunk(post._id))}>Delete</button>
           </li>
         ))}
       </ul>
     );
   };

   export default PostList;
   ```

3. **Post Form Component**:
    - path `src/components/PostForm.tsx`

```javascript
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../features/posts/redux/postSlice';
import { AppDispatch } from '../store/store';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body) {
       dispatch(createPostThunk({ title, body }));
      setTitle('');
      setBody('');
    }
  };

  return (
    <div className="container mx-auto px-4 my-6">
      <form
        className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Create a New Post</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700">
            Body
          </label>
          <textarea
            id="body"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
   
```
4. **App Component**:
    - Path: `src/App.tsx`

   ```javascript
   import React from 'react';
   import PostList from './components/PostList';

   const App = () => {
     return (
       <div className="App">
         <h1>Posts</h1>
         <PostList />
       </div>
     );
   };

   export default App;
   ```

---

### **Step 3: Running the Full Stack Application**

1. **Run the Backend**:

```bash
cd backend
npm run dev
```

2. **Run the Frontend**:

```bash
cd frontend
npm run dev
```

Open your browser at `http://localhost:5173/` to view the app. The app will fetch, display, create, update, and delete posts with full CRUD functionality using **React + Redux Toolkit** for the frontend and **Express + MongoDB** for the backend.

This setup provides a clean, scalable way to manage async actions in Redux, ensuring best practices are followed throughout the stack.