import { Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import Images from "@/components/Images";
import CardProfile from "@/components/CardProfile";

import { cookies } from 'next/headers'

const getUser = async () => {
  const token = cookies().get("tokenSesionApp")

  const res = await fetch(process.env.API_URL + "/profile", {
    headers: { Authorization: `Bearer ${token.value}` }
  });
  const data = await res.json();

  return data.user;
}

async function ProfilePage() {
  const user = await getUser();

  return (
    <div className="flex flex-col items-center">
      <CardProfile user={user} />
      <Suspense
        fallback={
          <div className="flex flex-col items-center mt-20">
            <h3 className="font-bold text-xl text-center p-2">Loading images...</h3>
            <Spinner />
          </div>
        }
      >
        <Images />
      </Suspense>
    </div>
  )
}

export default ProfilePage