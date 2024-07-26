import Link from "next/link";

export default function notFound() {
  return (
    <>
      <div className="flex justify-center items-center h-[80vh] flex-col gap-6">
        <h1 className="text-2xl">404 Page Not Found</h1>
        <Link href={`/`}>
          <button className="btn">Back to Homepage</button>
        </Link>
      </div>
    </>
  );
}
