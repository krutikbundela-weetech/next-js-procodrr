import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcome Home</h1>
      <p>
        <Link href="/about">About</Link>
      </p>
      <p>
        <Link href="/blogs">Blogs</Link>
      </p>
      <p>
        <Link href="/services">Services</Link>
      </p>
    </>
  );
}
