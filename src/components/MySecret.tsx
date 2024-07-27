"use client";
import SecretInterface from "@/interface/Secret";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CiEdit, CiSaveUp2 } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
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
  const [isEditing, setIsEditing] = useState(false);
  const textArea = useRef<null | HTMLTextAreaElement>(null);
  useEffect(() => {
    if (isEditing && textArea.current) {
      textArea.current.focus();
    }
  }, [isEditing]);

  const handleUpdateSecret = (secretId: string) => {
    const updatedSecret = textArea.current?.value;
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/secret`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secretId, updatedSecret }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          Swal.fire({
            title: "Updated!",
            text: "Your Secret has been updated.",
            icon: "success",
          });
          router.refresh();
        }
      })
      .catch((error) => console.log(error));
  };

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
                text: "Your Secret has been deleted.",
                icon: "success",
              });
              router.refresh();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <div className="bg-slate-200 p-4 m-4 flex items-center">
      <div className="flex-1">
        {isEditing ? (
          <>
            <textarea
              name="updatedSecret"
              defaultValue={secret.secret}
              className="border-none outline-none resize-none bg-slate-200"
              ref={textArea}
              cols={20}
            ></textarea>
          </>
        ) : (
          <>
            <p>{secret.secret}</p>
          </>
        )}
        <div className="flex gap-4 mt-2 font-light">
          <span>{secret.updatedDate}</span>
          <span>{secret.updatedTime}</span>
        </div>
      </div>
      {isEditing ? (
        <>
          <div className="flex items-center gap-2">
            <CiSaveUp2
              className="text-xl cursor-pointer hover:text-green-500"
              title="Save"
              onClick={() => handleUpdateSecret(secret._id)}
            />
            <IoClose
              className="text-xl cursor-pointer hover:text-red-500"
              onClick={() => setIsEditing(false)}
              title="Close"
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <CiEdit
                className="text-xl cursor-pointer hover:text-green-500"
                title="Edit"
              />
            </button>
            <MdDelete
              className="text-xl cursor-pointer hover:text-red-500"
              onClick={() => handleDelete(clerkId, secret._id)}
              title="Delete"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MySecret;
