# 15.3 End2End: React Zustand ReactQuery ExpressMongoDb Posts CRUD APP


Combining Zustand with React Query can give you powerful state management and data fetching capabilities. Here's how you can integrate them:

### Step 1: Install Dependencies

First, make sure you have the necessary packages installed:

```bash
npm install zustand @tanstack/react-query axios
```

### Step 2: Create a Zustand Store

We'll create a Zustand store to manage the state of our posts.

**File: `src/store/usePostStore.ts`**

```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

// Define the Post interface
export interface Post {
  _id: string;
  title: string;
  body: string;
}

// Define the state interface for the Zustand store
interface PostState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

// Create the Zustand store with devtools middleware for debugging
export const usePostStore = create<PostState>()(
  devtools((set) => ({
    posts: [], // Initial state for posts
    setPosts: (posts) => set({ posts }), // Function to update posts in the state
  }))
);

```

### Step 3: Set Up React Query

Next, we'll set up React Query to handle data fetching.

**File: `src/hooks/usePosts.ts`**

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { usePostStore } from '../store/usePostStore';

// Function to fetch posts from the API
const fetchPosts = async () => {
  const response = await axios.get('http://localhost:5000/api/posts');
  return response.data;
};

// Custom hook to manage posts using React Query and Zustand
export const usePosts = () => {
  const setPosts = usePostStore((state) => state.setPosts);
  const queryClient = useQueryClient();

  // Fetch posts and update Zustand store on success
  const { data, error, isLoading } = useQuery(['posts'], fetchPosts, {
    onSuccess: (data) => {
      setPosts(data);
    },
  });

  // Mutation to create a new post
  const createPost = useMutation(
    (newPost) => axios.post('http://localhost:5000/api/posts', newPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']); // Invalidate queries to refetch posts
      },
    }
  );

  // Mutation to update an existing post
  const updatePost = useMutation(
    ({ id, updatedPost }) =>
      axios.put(`http://localhost:5000/api/posts/${id}`, updatedPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']); // Invalidate queries to refetch posts
      },
    }
  );

  // Mutation to delete a post
  const deletePost = useMutation(
    (id) => axios.delete(`http://localhost:5000/api/posts/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']); // Invalidate queries to refetch posts
      },
    }
  );

  return { data, error, isLoading, createPost, updatePost, deletePost };
};

```

### Step 4: Create the Component

Now, let's create a component to display and manage posts.

**File: `src/components/PostList.tsx`**

```typescript
import React from 'react';
import { usePosts } from '../hooks/usePosts';
import { usePostStore } from '../store/usePostStore';

const PostList: React.FC = () => {
  const { data: posts, error, isLoading, createPost, updatePost, deletePost } = usePosts();
  const postStore = usePostStore();

  if (isLoading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error.message}</div>; // Display error state

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {postStore.posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => deletePost.mutate(post._id)}>Delete</button>
            <button onClick={() => updatePost.mutate({ id: post._id, updatedPost: { title: 'Updated Title', body: 'Updated Body' } })}>
              Update
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => createPost.mutate({ title: 'New Post', body: 'New Body' })}>Add Post</button>
    </div>
  );
};

export default PostList;

```

### Step 5: Integrate in App Component

Finally, integrate everything in your main app component.

**File: `src/App.tsx`**

```typescript
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from './components/PostList';

// Create a QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Zustand and React Query App</h1>
        <PostList />
      </div>
    </QueryClientProvider>
  );
};

export default App;

```

### Explanation:

- **Zustand Store**: Manages the local state of posts.
- **React Query**: Handles data fetching, caching, and synchronization.
- **PostList Component**: Displays posts and provides CRUD operations.