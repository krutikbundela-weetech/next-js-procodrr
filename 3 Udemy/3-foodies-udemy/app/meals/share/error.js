'use client';

//error.js must be client component
export default function Error() {
  return (
    <>
    <main className="error">
        <h1>An Error occurred!</h1>
        {/* <p>{error.message}</p> */}
        <p>Failed to create meal .Please try again.</p>
    </main>
    </>
  )
}
