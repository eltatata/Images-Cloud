"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import Cookies from 'js-cookie';

import { API_URL } from "@/utils/const";

function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsButtonDisabled(true);

      const res = await fetch(API_URL + "/auth/login", {
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
    <div className="flex justify-center items-center h-[80vh]">
      <form
        className='flex flex-col items-center gap-3 p-10 bg-neutral-800 rounded-lg'
        onSubmit={handleSubmit}
      >
        <h2 className='font-bold text-3xl'>Login</h2>
        <Input
          type="email"
          label="Email"
          variant="underlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          variant="underlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          color="primary"
          type="submit"
          isDisabled={isButtonDisabled}
          isLoading={isButtonDisabled}
        >
          Send
        </Button>
      </form>
    </div>
  )
}

export default LoginPage