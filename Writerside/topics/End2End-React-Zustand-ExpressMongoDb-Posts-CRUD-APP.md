# 15.2 End2End: React Zustand ExpressMongoDb Posts CRUD APP

I can see you've shared an image showing the structure of your app. Let's go step-by-step to refactor your current app (built with RTK Query) into **Zustand** with **TypeScript** using the latest practices.

### **Steps to Refactor RTK Query to Zustand**

1. **Remove RTK Query Dependencies**:
   Since we're moving from Redux Toolkit (RTK Query) to Zustand, you no longer need `@reduxjs/toolkit` or any other Redux dependencies. First, remove them from your `package.json`:
   ```bash
   npm uninstall @reduxjs/toolkit react-redux
   ```
   also remember to remove the provider from `Main.tsx`
```javascript
import { Provider } from 'react-redux';

<Provider store={store}>
</Provider>
```

2. **Install Zustand**:
   Next, install Zustand:
   ```bash
   npm install zustand
   ```

3. **Convert the API Logic**:
   We'll now handle fetching and managing posts using Zustand instead of RTK Query.

---

### **Step 1: Create a Zustand Store for Posts**

Instead of `postApi.ts` (RTK Query), we will now use Zustand to manage CRUD operations and state.

- **File: `src/store/usePostStore.ts`**

```javascript
import create from 'zustand';
import axios from 'axios';

export interface Post {
  _id: string;
  title: string;
  body: string;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => void;
  createPost: (post: Omit<Post, '_id'>) => Promise<void>;
  updatePost: (id: string, post: Omit<Post, '_id'>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

// Zustand store for managing posts and CRUD operations
export const usePostStore = create<PostState>((set) => ({
  posts: [],
  loading: false,
  error: null,

  // Fetch all posts
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      set({ posts: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Error fetching posts' });
    }
  },

  // Create a new post
  createPost: async (post) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:5000/api/posts', post);
      set((state) => ({
        posts: [...state.posts, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: 'Error creating post' });
    }
  },

  // Update a post
  updatePost: async (id, updatedPost) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`http://localhost:5000/api/posts/${id}`, updatedPost);
      set((state) => ({
        posts: state.posts.map((post) => (post._id === id ? response.data : post)),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: 'Error updating post' });
    }
  },

  // Delete a post
  deletePost: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: 'Error deleting post' });
    }
  },
}));
```

---

### **Step 2: Refactor the `PostForm.tsx` Component**

Now that we’ve replaced RTK Query with Zustand, let's update the components to use Zustand's store.

- **File: `src/components/PostForm.tsx`**

```javascript
import React, { useState } from 'react';
import { usePostStore } from '../store/usePostStore';

const PostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const createPost = usePostStore((state) => state.createPost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body) {
      await createPost({ title, body });
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

---

### **Step 3: Refactor the `PostList.tsx` Component**

We'll refactor the `PostList` to use Zustand for fetching, updating, and deleting posts.

- **File: `src/components/PostList.tsx`**

```javascript
import React, { useEffect, useState } from 'react';
import { usePostStore } from '../store/usePostStore';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import ClockLoader from 'react-spinners/ClockLoader';

const PostList: React.FC = () => {
  const { posts, loading, error, fetchPosts, deletePost, updatePost } = usePostStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const startEditing = (id: string, title: string, body: string) => {
    setEditingId(id);
    setEditTitle(title);
    setEditBody(body);
  };

  const saveEdit = async () => {
    if (editingId) {
      await updatePost(editingId, { title: editTitle.trim(), body: editBody.trim() });
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditBody('');
  };

  if (loading) {
    return <ClockLoader color="#36d7b7" />;
  }

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 min-w-full">
      <h1 className="text-3xl font-bold text-center my-6">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
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
                <div>
                  <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
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

---

### **Conclusion**:
- We replaced **RTK Query** with **Zustand** for managing the state of posts.
- Zustand's store is simpler and doesn't require boilerplate code.
- The flow for **fetching**, **creating**, **updating**, and **deleting** posts remains similar, but Zustand provides a more minimalistic and straightforward approach.