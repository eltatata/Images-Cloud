"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";

function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsButtonDisabled(true);

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      const dataResponse = await res.json();

      if (res.ok) {
        setIsOpen(true);
      } else {
        setError(dataResponse.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsButtonDisabled(false);
    }
  });

  return (
    <>
      <div className="flex justify-between items-start w-full h-[93vh]">
        <form
          className='flex-1 space-y-6 mt-40 p-5 max-w-sm mx-auto'
          onSubmit={onSubmit}
        >
          <div className="flex flex-col items-center gap-2">
            <h2 className='font-bold text-2xl'>Register</h2>
            <p className="text-sm text-neutral-400">Enter your information to create an account</p>
            {error && (
              <span className="p-2 rounded-lg text-red-500">{error}</span>
            )}
          </div>
          <div className="space-y-2">
            <Input
              type="username"
              label="Username"
              variant="bordered"
              name="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
                setValueAs: (value) => value.trim(),
              })}
            />
            {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              label="Email"
              variant="bordered"
              name="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required"
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              label="Password"
              variant="bordered"
              name="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required"
                },
              })}
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>
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
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="top"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                User created successfully
              </ModalHeader>
              <ModalBody>
                <p>
                  A verification email has been sent to your email address.
                  Please verify your account to continue.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    onClose();
                    router.refresh();
                    router.push("/auth/login");
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default RegisterPage