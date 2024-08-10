"use client";
import SecretInterface from "@/interface/Secret";
import React, { useCallback, useEffect, useState } from "react";
import Secrets from "./Secrets";
import { useInView } from "react-intersection-observer";
import { fetchAllSecrets } from "@/app/page";

const secretsToFetch = 5;

const SecretList = ({ secretList }: { secretList: SecretInterface[] }) => {
  const [secrets, setSecrets] = useState(secretList || []);
  const [skip, setSkip] = useState(secretsToFetch);
  const [secretsLength, setSecretsLength] = useState(0);
  const { ref, inView } = useInView();
  const loadMoreSecrets = useCallback(async () => {
    const newSecrets = await fetchAllSecrets(skip, 5);
    setSecrets([...secrets, ...newSecrets]);
    setSkip(secretsToFetch + secrets.length);
    setSecretsLength(secrets.length + newSecrets.length);
  }, [secrets, skip]);

  useEffect(() => {
    if (inView) {
      loadMoreSecrets();
    }
  }, [inView, loadMoreSecrets]);
  console.log(secretsLength, secrets.length);
  return (
    <>
      <div className="max-w-6xl mx-auto mt-8">
        {secrets?.map((secret, index) => (
          <Secrets secret={secret} key={index} />
        ))}
      </div>
      {secrets.length === secretsLength ? (
        <div>
          <p className="text-center my-4">Secrets coming soon...</p>
        </div>
      ) : (
        <div className="flex justify-center my-4" ref={ref}>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default SecretList;
