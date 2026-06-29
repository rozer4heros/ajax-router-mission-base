import { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import PostNew from "./pages/PostNew";
import PostEdit from "./pages/PostEdit";

function App() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // let alive = true;
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch("/data/blog.json", { signal: controller.signal });
        if (!response.ok) throw new Error(`${response.status}`);

        const data = await response.json();
        setPosts(data);
      } catch (e) {
        console.error(e);
        setPosts([]);
      } finally {
        setLoaded(true);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const onDelete = (_id) => {
    setPosts((prev) => prev.filter((post) => post.id !== _id));
  };

  const newId = useMemo(() => {
    const maxId = posts.reduce((acc, cur) => Math.max(acc, cur.id), 0);
    return maxId + 1;
  }, [posts]);

  const onCreate = ({ title, content }) => {
    const newPost = {
      title: title,
      content: content,
      id: newId + 1,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setPosts((prev) => [...prev, newPost]);
    return newPost.id;
  };

  const onUpdate = (_id, { title, content }) => {
    setPosts((prev) => prev.map((p) => (p.id === _id ? { ...p, title: title, content: content } : p)));
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loaded={loaded} />}>
        <Route index element={<Home posts={posts} />} />
        <Route path="posts" element={<Posts posts={posts} />} />
        <Route path="post/:id" element={<PostDetail posts={posts} onDelete={onDelete} />} />
        <Route path="post/:id/edit" element={<PostEdit posts={posts} onUpdate={onUpdate} />} />
        <Route path="post/new" element={<PostNew onCreate={onCreate} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
