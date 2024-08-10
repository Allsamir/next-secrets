import SecretList from "@/components/SecretList";
import SecretInterface from "@/interface/Secret";
import fetchAllSecrets from "@/util/fetchData";
export const dynamic = "force-dynamic";

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
