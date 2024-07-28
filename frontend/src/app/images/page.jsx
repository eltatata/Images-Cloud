import { cookies } from "next/headers";
import BlurFade from "@/components/BlurFade";
import CardImage from "@/components/CardImage";
import PaginationComponent from "@/components/PaginationComponent";

const getImages = async ({ page = 1 }) => {
  const token = cookies().get("tokenSesionApp")
  const res = await fetch(process.env.API_URL + `/images?page=${page}`, {
    headers: { Authorization: `Bearer ${token.value}` }
  });
  const data = await res.json();
  return data;
}

const distributeImages = (images) => {
  const cols = Array.from({ length: 4 }, () => []);
  images.forEach((image, index) => {
    cols[index % 4].push(image);
  });
  return cols;
};

export default async function ImagesPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const { images, total, totalPages } = await getImages({ page: +page });

  const columns = distributeImages(images);

  if (images.length === 0) {
    return <div className="text-center text-2xl pt-8">No images found</div>;
  }

  return (
    <>
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
      <PaginationComponent
        page={page}
        total={total}
        totalPages={totalPages}
      />
    </>
  )
}