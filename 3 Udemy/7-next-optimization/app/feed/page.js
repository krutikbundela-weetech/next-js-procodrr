import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

// export const metadata = {
//   title: 'All Posts',
//   description: 'Browse and share amazing posts from all users.',
// };

export async function generateMetadata() {
  const posts = await getPosts();
  return {
    title: `Browse all our ${posts.length} posts`,
    description: 'Browse and share amazing posts from all users.',
  };
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
