"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@nextui-org/react";

function RegisterPage() {
  const router = useRouter();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsButtonDisabled(true);

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (res.ok) {
        router.refresh();
        router.push("/auth/login");
      }

      const data = await res.json();
      console.log(data);
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
        <h2 className='font-bold text-3xl'>Register</h2>
        <Input
          type="username"
          label="Username"
          variant="underlined"
          name="username"
          onChange={handleChange}
        />
        <Input
          type="email"
          label="Email"
          variant="underlined"
          name="email"
          onChange={handleChange}
        />
        <Input
          type="password"
          label="Password"
          variant="underlined"
          name="password"
          onChange={handleChange}
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

export default RegisterPage