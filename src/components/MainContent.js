import React, { useState } from "react";
import Blogs from "./Blogs";
import BlogForm from "./BlogForm";
import SuccessAlert from "./SuccessAlert";

function MainContent({ createBlog, setCreateBlog }) {
  const [renderSuccessAlert, setRenderSuccessAlert] = useState(false);
  if (!createBlog) {
    return (
      <div>
        <SuccessAlert
          renderSuccessAlert={renderSuccessAlert}
          setRenderSuccessAlert={setRenderSuccessAlert}
        />
        <Blogs />
      </div>
    );
  } else {
    return (
      <div>
        <BlogForm
          setCreateBlog={setCreateBlog}
          setRenderSuccessAlert={setRenderSuccessAlert}
        />
      </div>
    );
  }
}

export default MainContent;
