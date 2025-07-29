"use client";
import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { togglePostLikeStatus } from "@/actions/posts";
import { useOptimistic } from "react";
import Image from "next/image";

function imageLoader(config) {
  // console.log(config);
  /**
   * {
  src: 'https://res.cloudinary.com/dp1w57oyw/image/upload/v1753171141/nextjs-course-mutations/fsde1wnrhnxoojwtuki7.png',
  width: 400,
  quality: 75
}
Image with src "https://res.cloudinary.com/dp1w57oyw/image/upload/v1753171141/nextjs-course-mutations/fsde1wnrhnxoojwtuki7.png" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader-width
{
  src: 'https://res.cloudinary.com/dp1w57oyw/image/upload/v1753171141/nextjs-course-mutations/fsde1wnrhnxoojwtuki7.png',
  quality: undefined,
  width: 640
}
{
  src: 'https://res.cloudinary.com/dp1w57oyw/image/upload/v1753171141/nextjs-course-mutations/fsde1wnrhnxoojwtuki7.png',
  quality: undefined,
  width: 750
}
   */

  const urlStart = config.src.split("upload/")[0];
  const urlEnd = config.src.split("upload/")[1];
  const transformations = `w_200,q_${config.quality}`; // this is cloudinary specific transformation where cloudinary gives feature to edit image with access url
  return `${urlStart}upload/${transformations}/${urlEnd}`;
}

function Post({ post }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image
          loader={imageLoader}
          src={post.image}
          width={200}
          height={120}
          alt={post.title}
          quality={50}
        />
        {/*//! when using fill, give the parent container proper height and width */}
        {/* //* quality={50} the value can be between 0 to 100 */}
        {/* It will not allow to load 3rd party images res.cloudinary.com so we have to add the path to next.config.js */}
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={togglePostLikeStatus.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
