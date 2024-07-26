"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function MyModal() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoding, setLoading] = useState(false);
  const [secret, setSecret] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSecret(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/secret`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secret,
      }),
    });
    const result = await res.json();
    console.log(result);
    if (
      result.message === "Secret Saved" ||
      result.message === "Secret Updated"
    ) {
      toast.success("Your Secret is now Live!");
      setSecret("");
      handleClose();
      setLoading(false);
      router.refresh();
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Please SignIn First</h1>
      </div>
    );
  }

  return (
    <div className="text-center mt-8">
      <div>
        <Toaster />
      </div>
      <button className="btn btn-outline" onClick={handleOpen}>
        Share Your Secret
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-2xl font-semibold">Your Secret</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              id="secret"
              name="secret"
              placeholder="Your Top Secret"
              required
              className="outline-none mt-4 w-full"
              rows={6}
              value={secret}
              onChange={handleChange}
            />
            <button className="btn btn-outline btn-block mt-4">
              Share{" "}
              {isLoding && (
                <span className="loading loading-spinner loading-md"></span>
              )}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
