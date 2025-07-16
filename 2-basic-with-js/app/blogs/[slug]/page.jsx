import React from "react";

const BlogPost = async ({ params }) => {
  const { slug } = await params;
  console.log("🚀 ~ page.jsx:4 ~ BlogPost ~ params:", await params); //{slug: 'post-1'}
  console.log("Blog Post Slug:", slug);

  return (
    <>
      <h1>Blog Post</h1>
      <p>{slug}</p>
    </>
  );
};

export default BlogPost;
