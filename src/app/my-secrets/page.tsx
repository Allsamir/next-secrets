import Modal from "@/components/MyModal";
import MySecret from "@/components/MySecret";
import SecretInterface from "@/interface/Secret";
import { currentUser } from "@clerk/nextjs/server";

async function fetchMySecrets(clerkId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/secret/${clerkId}`,
    {
      cache: "no-store",
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
    const mySecrets: SecretInterface[] = await fetchMySecrets(user.id);
    console.log(mySecrets);
    return (
      <div>
        <Modal />
        <div className="max-w-6xl mx-auto mt-8">
          {mySecrets.length === 0 && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-xl">You have not shared any secrets yet</h1>
            </div>
          )}
          {mySecrets.map((secret, index) => (
            <MySecret secret={secret} key={index} clerkId={user.id} />
          ))}
        </div>
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
