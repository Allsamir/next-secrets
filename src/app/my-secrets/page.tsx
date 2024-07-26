import Modal from "@/components/MyModal";
import { currentUser } from "@clerk/nextjs/server";

async function fetchMySecrets(clerkId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/secret/${clerkId}`,
    {
      next: { revalidate: 1000 },
    },
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch my secrets: ${res.status}`);
  }
  return await res.json();
}
export default async function MySecrectsPage() {
  const user = await currentUser();
  if (user) {
    const mySecrets = await fetchMySecrets(user.id);
    console.log(mySecrets);
    return (
      <div>
        <Modal />
        <div className="max-w-5xl"></div>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-[70vh]">
          <h1 className="text-2xl">Please Login First</h1>
        </div>
      </>
    );
  }
}
