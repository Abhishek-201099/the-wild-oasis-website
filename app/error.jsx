"use client";

// ### Setting up error boundary
// This error component will receive error and reset as params.
// We can also provide individual error components to each feature just like loading.jsx

// @@@ Also this should be a client component since we are reseting upong click so interactivity.
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        onClick={reset}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Try again
      </button>
    </main>
  );
}
