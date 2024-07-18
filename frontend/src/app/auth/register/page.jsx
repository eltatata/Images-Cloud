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

    <div className="flex justify-between items-start w-full h-[93vh]">
      <form
        className='flex-1 space-y-6 mt-40 p-5 max-w-sm mx-auto'
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className='font-bold text-2xl'>Register</h2>
          <p className="text-sm text-neutral-400">Enter your information to create an account</p>
        </div>
        <Input
          type="username"
          label="Username"
          variant="bordered"
          name="username"
          onChange={handleChange}
        />
        <Input
          type="email"
          label="Email"
          variant="bordered"
          name="email"
          onChange={handleChange}
        />
        <Input
          type="password"
          label="Password"
          variant="bordered"
          name="password"
          onChange={handleChange}
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
      <div className="hidden lg:block w-2/5 h-full bg-[url('/bg-img-signup.png')] bg-cover bg-center bg-no-repeat" />
    </div>
  )
}

export default RegisterPage