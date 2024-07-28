import Secrets from "@/components/Secrets";
import SecretInterface from "@/interface/Secret";

export const dynamic = "force-dynamic";

const fetchAllSecrets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/secret`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch all secrets: ${res.status}`);
  }
  return await res.json();
};
export default async function Home() {
  const allSecrets: SecretInterface[] = await fetchAllSecrets();
  console.log(allSecrets);
  return (
    <>
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-bold uppercase">
        People&apos;s Secrets
      </h2>
      <div className="max-w-6xl mx-auto mt-8">
        {allSecrets?.map((secret, index) => (
          <Secrets secret={secret} key={index} />
        ))}
      </div>
    </>
  );
}
