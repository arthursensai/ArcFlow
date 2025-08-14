import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex flex-col main-bg text-white items-center justify-center min-h-screen">
      <section className="flex flex-col bg-glass-subtle text-white items-center justify-center px-12 py-16 gap-6 rounded-lg">
        <h2 className="text-5xl">
          <span className="text-red-500">404 </span>Not Found
        </h2>
        <p>Could not find requested resource</p>
        <Link
          href="/"
          className="border-white bg-glass hover:bg-glass-hover p-4"
        >
          Return Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
