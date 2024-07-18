import { cookies } from "next/headers";
import BlurFade from "@/components/BlurFade";
import CardImage from "@/components/CardImage";

const getImages = async () => {
  const token = cookies().get("tokenSesionApp")
  const res = await fetch(process.env.API_URL + "/images", {
    headers: { Authorization: `Bearer ${token.value}` }
  });
  const data = await res.json();
  return data.images;
}

const distributeImages = (images, numCols) => {
  const cols = Array.from({ length: numCols }, () => []);
  images.forEach((image, index) => {
    cols[index % numCols].push(image);
  });
  return cols;
};

export default async function ImagesPage() {
  const images = await getImages();
  const numCols = 4;
  const columns = distributeImages(images, numCols);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="space-y-4">
          {col.map((image, imgIndex) => (
            <BlurFade key={image.name} delay={0.25 + imgIndex * 0.05} inView>
              <CardImage image={image} />
            </BlurFade>
          ))}
        </div>
      ))}
    </div>
  )
}
