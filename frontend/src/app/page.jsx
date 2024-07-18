import Link from "next/link";
import {
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
  SiNextui,
  SiMongodb,
  SiJsonwebtokens
} from "react-icons/si";
import { TbCloudUpload } from "react-icons/tb";
import BlurFade from "@/components/BlurFade";
import { Velustro } from "uvcanvas";

export default function Home() {
  return (
    <div className="z-50 flex flex-col items-center justify-center gap-5 h-[80vh]">
      <div className="absolute top-0 left-0 -z-10 w-screen h-screen opacity-60">
        <Velustro />
      </div>
      <BlurFade delay={0.25} inView>
        <h2 className="font-bold text-6xl text-center">
          Images Cloud
        </h2>
      </BlurFade>
      <BlurFade delay={0.25 * 2} inView>
        <p className="p-10 max-w-[650px]">
          This project uses ExpressJS, MongoDB, JWT, Next.js, NextUI, and Tailwind for styling. It is a platform that allows you to upload, view, and delete images, which are hosted on Cloudinary. Express and JWT are used to manage user sessions stored in the database.
        </p>
      </BlurFade>
      <BlurFade delay={0.25 * 3} inView>
        <div className="flex text-3xl gap-10">
          <Link href="https://expressjs.com/es/" target="_blank"><SiExpress className="hover:text-blue-500 transition-colors duration-300 ease-in-out cursor-pointer" /></Link>
          <Link href="https://www.mongodb.com/" target="_blank"><SiMongodb className="hover:text-green-500 transition-colors duration-300 ease-in-out cursor-pointer" /></Link>
          <Link href="https://jwt.io/" target="_blank"><SiJsonwebtokens className="hover:text-purple-500 transition-colors duration-300 ease-in-out cursor-pointer" /></Link>
          <Link href="https://nextjs.org/" target="_blank"><SiNextdotjs className="hover:text-slate-500 transition-colors duration-300 ease-in-out cursor-pointer" /></Link>
          <Link href="https://nextui.org/" target="_blank"><SiNextui className="hover:text-slate-500 transition-colors duration-300 ease-in-out cursor-pointer" /></Link>
          <Link href="https://tailwindcss.com/" target="_blank"><SiTailwindcss className="hover:text-blue-500 transition-colors duration-300 ease-in-out cursor-pointer" /></Link>
          <Link href="https://cloudinary.com/" target="_blank"><TbCloudUpload className="hover:text-blue-500 transition-colors duration-300 ease-in-out cursor-pointer" /></Link>
        </div>
      </BlurFade>
    </div>
  )
}
