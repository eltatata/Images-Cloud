import DeleteAccount from "@/components/DeleteAccount";
import { Avatar, Button, Input } from "@nextui-org/react";

import { cookies } from 'next/headers'

const getUser = async () => {
  const token = cookies().get("tokenSesionApp")
  const res = await fetch(process.env.API_URL + "/profile", {
    headers: { Authorization: `Bearer ${token.value}` }
  });
  const user = await res.json();
  return user;
}

async function ProfilePage() {
  const user = await getUser();

  return (
    <div className="mx-auto max-w-2xl pt-10 px-5">
      <div className="space-y-2 py-5 mb-16 border-b border-neutral-600">
        <h2 className="text-4xl font-bold">
          Profile
        </h2>
        <p className="text-neutral-400">
          Manage your account settings.
        </p>
      </div>
      <div className="space-y-14 pb-16 border-b border-red-600">
        <div className="space-y-4">
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-40 h-40 text-large" />
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="underline text-blue-500 cursor-pointer"
            >
              select a new photo
            </label>
            <p className="text-xs text-neutral-400">
              This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <Input
            type="text"
            value={user.username}
            variant="bordered"
            label="Username"
            labelPlacement="outside"
            placeholder="Enter your username"
          />
          <p className="text-xs text-neutral-400">
            This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
          </p>
        </div>
        <div className="space-y-2">
          <Input
            type="text"
            value={user.email}
            variant="bordered"
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
          />
          <p className="text-xs text-neutral-400">
            You can change your email address, then you will receive a confirmation email
          </p>
        </div>
        <Button>
          Update profile
        </Button>
      </div>
      <DeleteAccount />
    </div>
  )
}

export default ProfilePage