import DeleteAccount from "@/components/DeleteAccount";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";

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
      <ProfileUpdateForm user={user} />
      <DeleteAccount />
    </div>
  )
}

export default ProfilePage