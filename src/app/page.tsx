import SecretList from "@/components/SecretList";
import Secrets from "@/components/Secrets";
import SecretInterface from "@/interface/Secret";

export const dynamic = "force-dynamic";

export const fetchAllSecrets = async (skip: number, limit: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/secret?skip=${skip}&limit=${limit}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch all secrets: ${res.status}`);
  }
  return await res.json();
};
export default async function Home() {
  const initialSecrets: SecretInterface[] = await fetchAllSecrets(0, 5);
  return (
    <>
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-bold uppercase">
        People&apos;s Secrets
      </h2>
      <SecretList secretList={initialSecrets} />
    </>
  );
}
