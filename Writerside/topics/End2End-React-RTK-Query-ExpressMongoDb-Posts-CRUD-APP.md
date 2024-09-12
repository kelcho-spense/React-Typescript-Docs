# End2End: React RTK Query ExpressMongoDb Posts CRUD APP

Let's create a **full-stack CRUD application** to store **user profiles** using **React + Redux Toolkit Query** on the frontend and **Express + MongoDB** on the backend.

### **Backend Setup (Express + MongoDB + TypeScript)**

#### 1. Backend Folder Structure:

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   └── userController.ts
│   ├── models/
│   │   └── userModel.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   └── server.ts
├── .env
├── tsconfig.json
├── package.json
├── package-lock.json
└── nodemon.json
```

#### 2. Install Backend Dependencies

```bash
npm install express mongoose dotenv cors
npm install --save-dev javascript ts-node @types/express @types/node @types/cors nodemon
```

#### 3. TypeScript Configuration

**`tsconfig.json`:**

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

#### 4. MongoDB Configuration

**File: `src/config/db.ts`**

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error', error);
    process.exit(1);
  }
};

export default connectDB;
```

**File: `.env`**

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority
PORT=5000
```

#### 5. User Model

**File: `src/models/userModel.ts`**

```javascript
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  bio: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, required: false },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
```

#### 6. User Controller

**File: `src/controllers/userController.ts`**

```javascript
import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';

// @desc Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, bio } = req.body;
  try {
    const newUser: IUser = new User({ name, email, bio });
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

// @desc Update user profile
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;

  try {
    const user = await User.findById(id);
    if (user) {
      user.name = name;
      user.email = email;
      user.bio = bio;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

// @desc Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      await user.remove();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
```

#### 7. User Routes

**File: `src/routes/userRoutes.ts`**

```javascript
import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').put(updateUser).delete(deleteUser);

export default router;
```

#### 8. Express Server Setup

**File: `src/server.ts`**

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

### **Frontend Setup (React + RTK Query + Redux Toolkit)**

#### 1. Frontend Folder Structure:

```
frontend/
├── src/
│   ├── components/
│   │   └── UserList.tsx
│   ├── features/
│   │   └── post/
│   │       ├── redux/
│   │       │   └── postApi.ts
│   │       │   └── postApi.ts
│   ├── store/
│   │   └── store.ts
│   ├── App.tsx
│   └── main.tsx
├── tsconfig.json
├── package.json
└── package-lock.json
```

#### 2. Install Frontend Dependencies:

```bash
npm install @reduxjs/toolkit react-redux axios
```

#### 3. Setup RTK Query for User API

1. **Post API Slice (RTK Query)**:
    - Path: `src/features/post/redux/postApi.ts`

```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  _id: string;
  title: string;
  body: string;
}

// Create the API Slice
export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Post', id: _id } as const)), 'Post']
          : ['Post'],
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<Post, { id: string; post: Partial<Post> }>({
      query: ({ id, post }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const 
   { 
      useGetPostsQuery,
      useCreatePostMutation,
      useUpdatePostMutation, 
      useDeletePostMutation 
   } = postApi;
   
```

2. **Configure Store**:
    - Path: `src/store/store.ts`

```javascript
import { configureStore } from '@reduxjs/toolkit';
import { postApi } from '../features/posts/redux/postApi';  // Import the API slice

const store = configureStore({
  reducer: {
    // Add the postApi reducer
    [postApi.reducerPath]: postApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

```

3. **Post List Component**:
    - Path: `src/components/PostList.tsx`

```javascript
import { useState } from 'react';
import { useGetPostsQuery, useDeletePostMutation, useUpdatePostMutation } from '../features/posts/redux/postApi';
import ClockLoader from 'react-spinners/ClockLoader';
import { Trash2, Edit2, Check, X } from 'lucide-react';

const PostList = () => {
    const { data: posts, error, isLoading } = useGetPostsQuery();
    const [deletePost] = useDeletePostMutation();
    const [updatePost] = useUpdatePostMutation();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');

    const startEditing = (id: string, title: string, body: string) => {
        setEditingId(id);
        setEditTitle(title);
        setEditBody(body);
    };

    const saveEdit = async () => {
        if (editingId) {
            await updatePost({ 
               id: editingId, 
               post: { 
                  title: editTitle.trim(),
                  body: editBody.trim() 
               } 
            });
            setEditingId(null);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle('');
        setEditBody('');
    };

    if (isLoading) {
        return <ClockLoader color="#36d7b7" />;
    }

    if (error) return <p className="text-red-500 text-center">Error loading posts</p>;
    
    return (
        <div className="container mx-auto px-4 min-w-full">
            <h1 className="text-3xl font-bold text-center my-6">Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts?.map((post) => (
                    <div key={post._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
                        {editingId === post._id ? (
                            <>
                                {/* Editing Mode */}
                                <div>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full mb-2 p-2 border rounded"
                                    />
                                    <textarea
                                        value={editBody}
                                        onChange={(e) => setEditBody(e.target.value)}
                                        className="w-full mb-2 p-2 border rounded"
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button onClick={saveEdit} className="p-2 text-green-600 hover:text-green-800">
                                        <Check size={20} />
                                    </button>
                                    <button onClick={cancelEdit} className="p-2 text-red-600 hover:text-red-800">
                                        <X size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Viewing Mode */}
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-semibold mb-4">Title: {post.title}</h2>
                                    <p className="text-gray-700">{post.body}</p>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="p-2 text-blue-600 hover:text-blue-800"
                                        onClick={() => startEditing(post._id, post.title, post.body)}
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                    <button
                                        className="p-2 text-red-600 hover:text-red-800"
                                        onClick={() => deletePost(post._id)}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
```

4. **App Component**:
    - Path: `src/App.tsx`

```javascript
import PostList from './components/PostList';
import PostForm from './components/PostForm';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <PostForm />
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
```

---

### **Final Steps to Run the Application**

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

Open the frontend at `http://localhost:5175/`. The app will fetch, create, update, and delete user profiles, fully utilizing **RTK Query** to handle the frontend's API interaction and caching.

### **Key Features of RTK Query in This Application**:
- **Efficient Caching**: RTK Query caches all user data and only re-fetches if the data becomes invalidated.
- **Simplified Data Fetching**: The `useGetUsersQuery`, `useAddUserMutation`, `useDeleteUserMutation`, and `useUpdateUserMutation` hooks handle the API requests without manually managing loading or error states.
- **Auto-Generated Hooks**: The API slice automatically provides reusable hooks, making it easier to manage CRUD operations for users.

This setup shows how you can build a scalable, performant, and modern full-stack CRUD application using **RTK Query** and **Redux Toolkit** for efficient data fetching and management.