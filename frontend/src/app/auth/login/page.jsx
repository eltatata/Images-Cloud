"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from "next/navigation";
import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";

function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const reason = searchParams.get('reason')

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    switch (reason) {
      case "unauthorized":
        setIsOpen(true);
        break;
      case "verified":
        setMessage("Your account has been verified, please login to continue");
        break;
      default:
        break;
    }
  }, [reason]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsButtonDisabled(true);

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      const dataResponse = await res.json();

      if (res.ok) {
        Cookies.set("tokenSesionApp", dataResponse.token)

        router.refresh();
        router.push("/profile");
        router.refresh();
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
            <h2 className='font-bold text-2xl'>Login</h2>
            <p className="text-sm text-neutral-400">Enter your email below to login to your account</p>
            {error && (
              <span className="p-2 rounded-lg text-red-500">{error}</span>
            )}
            {message && (
              <span className="p-2 rounded-lg text-green-500">{message}</span>
            )}
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              label="Email"
              variant="bordered"
              required
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
              required
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required"
                }
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
        <div className="hidden lg:block w-2/5 h-full bg-[url('/bg-img-signin.png')] bg-cover bg-center bg-no-repeat" />
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
              <ModalHeader className="flex flex-col gap-1">Unauthorized</ModalHeader>
              <ModalBody>
                <p>
                  You are not authorized to access this page, please login to continue
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
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

export default LoginPage