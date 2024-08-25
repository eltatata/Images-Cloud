"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { Avatar, Button, Input } from "@nextui-org/react";

export default function ProfileUpdateForm({ user }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsButtonDisabled(true);

      const token = Cookies.get("tokenSesionApp")
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/profile/${user._id}`, {
        method: "PUT",
        body: JSON.stringify({
          username: data.username,
          email: data.email
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const dataResponse = await res.json();

      if (res.ok) {
        setMessage("Profile updated successfully");
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
    <form
      className="space-y-14 pb-16 border-b border-red-600"
      onSubmit={onSubmit}
    >
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
          defaultValue={user.username}
          variant="bordered"
          label="Username"
          labelPlacement="outside"
          placeholder="Enter your username"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
            setValueAs: (value) => value.trim(),
          })}
        />
        {errors.username && <span className="text-red-500">{errors.username.message}</span>}
        <p className="text-xs text-neutral-400">
          This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
        </p>
      </div>
      <div className="space-y-2">
        <Input
          type="text"
          defaultValue={user.email}
          variant="bordered"
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
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
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        <p className="text-xs text-neutral-400">
          You can change your email address, then you will receive a confirmation email
        </p>
      </div>
      <Button
        type="submit"
        className="mr-2"
        isDisabled={isButtonDisabled}
        isLoading={isButtonDisabled}
      >
        Update profile
      </Button>
      {error && (
        <span className="text-red-500">{error}</span>
      )}
      {message && (
        <span className="text-green-500">{message}</span>
      )}
    </form>
  )
}
