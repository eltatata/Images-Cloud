"use client";

import { useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input, Button } from "@nextui-org/react";

function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsButtonDisabled(true);

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (res.ok) {
        router.refresh();
        router.push("/profile");
      }

      const data = await res.json();
      Cookies.set("tokenSesionApp", data.token)
    } catch (error) {
      console.log(error);
    } finally {
      setIsButtonDisabled(false);
    }
  }

  return (
    <div className="flex justify-between items-start w-full h-[93vh]">
      <form
        className='flex-1 space-y-6 mt-40 p-5 max-w-sm mx-auto'
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className='font-bold text-2xl'>Login</h2>
          <p className="text-sm text-neutral-400">Enter your email below to login to your account</p>
        </div>
        <Input
          type="email"
          label="Email"
          variant="bordered"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          variant="bordered"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full"
          isDisabled={isButtonDisabled}
          isLoading={isButtonDisabled}
        >
          Send
        </Button>
      </form>
      <div className="hidden lg:block w-2/5 h-full bg-[url('/bg-img-signin.png')] bg-cover bg-center bg-no-repeat" />
    </div>
  )
}

export default LoginPage