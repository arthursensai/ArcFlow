"use client";

import { UserRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import Logout from "./Logout";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import userStore from "@/stores/userStore";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import SpotifyConnectButton from "./SpotifyConnect";

interface Inputs {
  newName: string;
}

const ProfileSettings = () => {
  const name = userStore((state) => state.name);
  const userImgae = userStore((state) => state.image);
  const updateName = userStore((set) => set.updateName);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      await axios.post("/api/profile", { newName: data.newName });
      updateName(data.newName);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open || loading}>
      <DialogTrigger
        onClick={() => {
          setOpen(true);
        }}
      >
        {userImgae ? (
          <Image
            src={userImgae}
            alt={`${name} profile picture`}
            className="text-blue-500 transition-all transition-300 hover:scale-110 bg-glass-dark w-12 h-12 p-2 rounded-full hover:cursor-pointer hover:shadow-[0px_0px_8px_rgba(0,0,0,1)]"
            width={40}
            height={40}
          />
        ) : (
          <UserRound
            className="text-blue-500 transition-all transition-300 hover:scale-110 bg-glass-dark w-12 h-12 p-2 rounded-full hover:cursor-pointer hover:shadow-[0px_0px_8px_rgba(0,0,0,1)]"
            size={40}
          />
        )}
      </DialogTrigger>
      <DialogContent className="bg-glass-strong">
        <DialogHeader>
          <DialogTitle className="text-white my-2 ">Edit Profile</DialogTitle>
          <DialogDescription className="flex flex-col gap-2 text-white font-Medium">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 text-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label>username:</Label>
          <Input
            placeholder={name as string}
            {...register("newName", { required: true })}
            className="placeholder:!text-white/80"
          />
          {errors.newName && (
            <span className="text-red-600">Username is required</span>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="hover:cursor-pointer text-black"
                disabled={loading}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="hover:cursor-pointer"
              disabled={loading}
            >
              {loading ? "loading..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
        <div className="flex flex-col gap-2">
          <SpotifyConnectButton />
          <Logout />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettings;
