import Messages from "@/components/messages";
import { getMessages } from "@/lib/messages";

// this is Next.js default variable to control revalidation
// It will revalidate the page every 10 seconds
// export const revalidate = 10; // Revalidate every 10 seconds

// export const dynamic = 'force-dynamic'; // Force dynamic rendering, no caching
// export const dynamic = 'force-static'; // Force static rendering, no caching


export default async function MessagesPage() {
  // const response = await fetch("http://localhost:8080/messages", {
    // headers: {
    //   'X-ID': 'page',
    // },
    // cache: 'no-store', // Ensure fresh data is fetched, it will not use cache or stale data
    // next: {
    //   revalidate: 10, // Revalidate every 10 seconds
    // }, // This is a server action, so it will not be cached by default
    // next: {
    //   tags: ['msg'], // Tag for cache invalidation
    // }
  // });
  // const messages = await response.json();

  const messages = getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
