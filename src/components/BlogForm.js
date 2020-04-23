import React, { useState, useEffect } from "react";
import axios from "axios";

console.log(`Bearer ${document.cookie.split("=")[1]}`);
function BlogForm({ setCreateBlog, setRenderSuccessAlert }) {
  const [title, setTitle] = useState("");
  const [newPost, setNewPost] = useState("");

  console.log(`${document.cookie.split("=")[1]}`);

  async function postBlog() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      document.cookie.split("=")[1]
    }`;
    const request = await axios({
      method: "post",
      url: "http://localhost:4000/blogPosts",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        title: title,
        post: newPost,
      },
    });
    setCreateBlog(false);
    setRenderSuccessAlert(true);
  }

  // useEffect(() => {
  //   if (submitPost) {

  //     postBlog();
  // setSubmitPost(false);
  //   }
  // }, [submitPost]);

  return (
    <div style={blogForm}>
      <label htmlFor="title">Title of your blog: </label>
      <input
        type="text"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <br />
      <br />
      <label htmlFor="post">Body of blog: </label>
      <textarea
        style={textArea}
        cols={window.screen.width}
        rows="10"
        id="post"
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Start Writing..."
      ></textarea>
      <br />
      <button onClick={() => postBlog()}>Submit Blog</button>
    </div>
  );
}

const blogForm = {
  width: 200,
  margin: 20,
};

const textArea = {
  width: 700,
  margin: 20,
  border: "1px solid black",
  boxShadow: "inset 0px 0px 3px 3px gray",
  padding: 10,
};

export default BlogForm;
