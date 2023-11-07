import React, { useState, useEffect } from "react";
import "./MyDiary.css";
import { SpinnerDotted } from "spinners-react";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
import { format } from "date-fns";

const MyDiary = () => {
  const [sending, setSending] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);

  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchPosts();
    }
  }, [isLoggedIn]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/posts/user/${user._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/posts",
        postData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setPostData({
          title: "",
          content: "",
        });
        setSending(false);
        fetchPosts();
      }
    } catch (error) {
      setSending(false);
      alert(error.response.data.error);
    }
  };

  const handleEditPost = (postId) => {
    setEditPostId(postId);
  };

  const handleUpdatePost = async (postId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/posts/${postId}`,
        updatedData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setEditPostId(null);
        fetchPosts();
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/posts/${postId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        fetchPosts();
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  if (sending)
    return (
      <div>
        <SpinnerDotted />
        <h6>Posting...</h6>
      </div>
    );

  return (
    <div className="diary-complete">
      {isLoggedIn && (
        <>
          <h2>Welcome to my diary!</h2>
          <form className="diary-submit" onSubmit={handleSubmit}>
            <div className="diary-title">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
                placeholder="What's the name of your plant?"
              />
            </div>
            <div className="diary-content">
              <label>Content</label>
              <input
                type="text"
                name="content"
                value={postData.content}
                onChange={(e) =>
                  setPostData({ ...postData, content: e.target.value })
                }
                placeholder="What are you thinking?"
              />
            </div>
            <button type="submit">Post it!</button>
          </form>
          <div className="diary-show">
            {posts.map((post) => (
              <div className="diary-text-box" key={post._id}>
                {editPostId === post._id ? (
                  <>
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) =>
                        handleUpdatePost(post._id, {
                          title: e.target.value,
                          content: post.content,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={post.content}
                      onChange={(e) =>
                        handleUpdatePost(post._id, {
                          title: post.title,
                          content: e.target.value,
                        })
                      }
                    />
                    <button onClick={() => handleUpdatePost(post._id, post)}>
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>{format(new Date(post.date), "MMM dd, yyyy @ HH:mm")}</p>
                    <button onClick={() => handleEditPost(post._id)}>
                      Edit
                    </button>
                  </>
                )}
                <button onClick={() => handleDeletePost(post._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyDiary;
