import CardProfile from "@/components/CardProfile";

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
    <div className="flex flex-col items-center">
      <CardProfile user={user} />
    </div>
  )
}

export default ProfilePage