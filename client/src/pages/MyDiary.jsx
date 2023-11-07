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
  const { isLoggedIn, userData } = useAuth();

  useEffect(() => {
    if (isLoggedIn && userData?._id) {
      fetchPosts();
    }
  }, [isLoggedIn, userData?._id]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://greendiary-server.onrender.com/posts",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const sortedPosts = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        const userPosts = sortedPosts.filter(
          (post) => post.user._id === userData._id
        );
        setPosts(userPosts);
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
        "https://greendiary-server.onrender.com/posts",
        postData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setPostData({
          title: "",
          content: "",
        });

        await fetchPosts();
        setSending(false);
      }
    } catch (error) {
      setSending(false);
      alert(error.response.data.error);
    }
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post._id === postId);
    setEditPostId(postId);
    setPostData({
      title: postToEdit.title,
      content: postToEdit.content,
    });
  };

  const handleUpdatePost = async (postId) => {
    try {
      const response = await axios.put(
        `https://greendiary-server.onrender.com/posts/${postId}`,
        postData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setEditPostId(null);
        setPostData({ title: "", content: "" });
        await fetchPosts();
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `https://greendiary-server.onrender.com/posts/${postId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        await fetchPosts();
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  if (sending) {
    return (
      <div>
        <SpinnerDotted />
        <h6>Posting...</h6>
      </div>
    );
  }

  return (
    <div id="diary-complete">
      {isLoggedIn && (
        <>
          <h2>My Note</h2>
          <form id="diary-submit" onSubmit={handleSubmit}>
            <div id="diary-title">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
                placeholder="What's the name of your plant?"
                disabled={editPostId !== null}
              />
            </div>
            <div id="diary-content">
              <label>Content: </label>
              <textarea
                type="text"
                name="content"
                value={postData.content}
                onChange={(e) =>
                  setPostData({ ...postData, content: e.target.value })
                }
                placeholder="Write down the memory with your plants?"
                disabled={editPostId !== null}
              />
            </div>
            <button type="submit" disabled={editPostId !== null}>
              Post it!
            </button>
          </form>
          <div id="diary-show">
            {posts.map((post) => (
              <div id="diary-text-box" key={post._id}>
                {editPostId === post._id ? (
                  <div id="diary-text2">
                    <input
                      type="text"
                      value={postData.title}
                      onChange={(e) =>
                        setPostData({ ...postData, title: e.target.value })
                      }
                    />
                    <textarea
                      type="text"
                      value={postData.content}
                      onChange={(e) =>
                        setPostData({ ...postData, content: e.target.value })
                      }
                    />
                    <div id="update-diary">
                      <button onClick={() => handleUpdatePost(post._id)}>
                        Update
                      </button>
                      <button onClick={() => setEditPostId(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h6>{post.title}</h6>
                    <p>{post.content}</p>
                    <p>{format(new Date(post.date), "MMM dd, yyyy @ HH:mm")}</p>
                    <div className="diary-button">
                      <button onClick={() => handleEditPost(post._id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeletePost(post._id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyDiary;
