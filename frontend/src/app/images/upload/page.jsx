"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Image, Button } from "@nextui-org/react";
import Cookies from 'js-cookie';
import { API_URL } from "@/utils/const";

function UploadPage() {
  const router = useRouter();
  const token = Cookies.get("tokenSesionApp");

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) return alert("Select a file");

      setIsButtonDisabled(true);

      const formData = new FormData();
      formData.set("file", file);

      const res = await fetch(API_URL + "/images/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (res.ok) {
        router.refresh();
        router.push("/profile");
      }

      console.log(await res.json());
    } catch (error) {
      console.log(error);
    } finally {
      setIsButtonDisabled(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div className={`${!imagePreview ? "border border-dashed" : ""} rounded-lg mb-10`}>
        {imagePreview ? (
          <Image
            isBlurred
            width={400}
            src={imagePreview}
            alt="image-preview"
          />
        ) : (
          <h2 className="p-5">No image selected</h2>
        )}
      </div>
      <form
        className="flex items-center gap-3 bg-neutral-800 p-3 rounded-lg"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          name="file"
          onChange={async (e) => {
            const selectedFile = e.target.files?.[0];
            setFile(selectedFile);

            if (selectedFile) {
              const imageUrl = URL.createObjectURL(selectedFile);
              setImagePreview(imageUrl);
            } else {
              setImagePreview(null);
            }
          }}
        />
        <Button
          type="submit"
          color="primary"
          isDisabled={isButtonDisabled}
          isLoading={isButtonDisabled}
        >
          Upload
        </Button>
      </form>
    </div>
  )
}

export default UploadPage;