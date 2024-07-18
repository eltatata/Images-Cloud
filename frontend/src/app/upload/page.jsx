"use client";

import { useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { Button, Textarea, Input } from "@nextui-org/react";

export default function UploadPage() {
  const router = useRouter();
  const token = Cookies.get("tokenSesionApp");

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.set("image", image);
      formData.set("name", name);
      formData.set("description", description);

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/images", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (res.ok) {
        router.refresh();
        router.push("/images");
      }

      console.log(await res.json());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setPreview('');
    }
  }

  return (
    <form
      className='space-y-6 mt-6 p-5 max-w-xl mx-auto border border-neutral-700 rounded-md'
      onSubmit={handleSubmit}
    >
      <div
        className={`flex items-center justify-center h-[350px] mx-auto mb-20 rounded-lg border-2 border-dashed ${isDragging ? 'border-blue-500' : 'border-neutral-500'
          } cursor-pointer`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {!preview ? (
          <div className="text-center text-gray-500">
            <p>Drag your files here</p>
            <p>or</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="underline text-blue-500 cursor-pointer"
            >
              click to select
            </label>
          </div>
        ) : (
          <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
        )}
      </div>
      <Input
        type="text"
        variant="bordered"
        label="Name"
        labelPlacement="outside"
        placeholder="Enter a name"
        onChange={(e) => setName(e.target.value)}
      />
      <Textarea
        variant="bordered"
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        type="submit"
        className="w-full"
        isDisabled={loading}
        isLoading={loading}
      >
        Upload
      </Button>
    </form>
  )
}