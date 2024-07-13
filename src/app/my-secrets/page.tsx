import Modal from "@/components/MyModal";
import { currentUser } from "@clerk/nextjs/server";
export default async function MySecrectsPage() {
  const user = await currentUser();
  return (
    <div>
      <Modal />
      <div className="max-w-5xl"></div>
    </div>
  );
}
