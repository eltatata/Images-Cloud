import CardImage from "./CardImage";
import { API_URL } from "@/utils/const";

import { cookies } from "next/headers";

const getImages = async () => {
  const token = cookies().get("tokenSesionApp")

  const res = await fetch(API_URL + "/images/user", {
    headers: { Authorization: `Bearer ${token.value}` }
  });
  const data = await res.json();

  return data.images;
}

async function Images() {
  const images = await getImages();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-10">
      {images.length == 0 ? (
        <h2 className="font-bold text-2xl">You don't have uploaded images</h2>
      ) : (
        images.map((image) => (
          <CardImage key={image._id} image={image} />
        ))
      )}
    </div>
  )
}

export default Images;