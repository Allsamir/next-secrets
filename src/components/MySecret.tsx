"use client";
import SecretInterface from "@/interface/Secret";
import { useRouter } from "next/navigation";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const MySecret = ({
  secret,
  clerkId,
}: {
  secret: SecretInterface;
  clerkId: string;
}) => {
  const router = useRouter();
  const handleDelete = (clerkId: string, secretId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/secret/${clerkId}`, {
          method: "DELETE",
          body: JSON.stringify({ secretId }),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              router.refresh();
            }
          });
      }
    });
  };
  return (
    <div className="bg-slate-200 p-4 m-4 flex items-center">
      <p className="flex-1">{secret.secret}</p>
      <div className="flex items-center gap-2">
        <CiEdit className="text-xl cursor-pointer hover:text-green-500" />
        <MdDelete
          className="text-xl cursor-pointer hover:text-red-500"
          onClick={() => handleDelete(clerkId, secret._id)}
        />
      </div>
    </div>
  );
};

export default MySecret;
