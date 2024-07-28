import SecretInterface from "@/interface/Secret";
import React from "react";

const Secrets = ({ secret }: { secret: SecretInterface }) => {
  return (
    <div className="bg-slate-200 p-4 m-4 flex flex-col">
      <p>{secret.secret}</p>
      <div className="flex gap-4 mt-2 font-light md:text-sm text-xs">
        <span>{secret.updatedDate}</span>
        <span>{secret.updatedTime}</span>
      </div>
    </div>
  );
};

export default Secrets;
