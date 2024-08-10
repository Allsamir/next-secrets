const fetchAllSecrets = async (skip: number, limit: number) => {
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

export default fetchAllSecrets;
