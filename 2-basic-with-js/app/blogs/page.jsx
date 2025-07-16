import Link from "next/link";
import React from "react";

const Blogs = () => {
  return (
    <>
      <h1>Blogs</h1>
      <p>
        <Link href="/blogs/post-1">post 1</Link>
      </p>
      <p>
        <Link href="/blogs/post-2">post 2</Link>
      </p>
      <p>
        <Link href="/blogs/post-3">post 3</Link>
      </p>
    </>
  );
};

export default Blogs;
