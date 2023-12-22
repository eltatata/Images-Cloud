import Link from "next/link";
import { SiExpress, SiTailwindcss, SiNextdotjs, SiNextui, SiMongodb, SiJsonwebtokens } from "react-icons/si";
import { TbCloudUpload } from "react-icons/tb";

export default function Home() {
  return (
    <div className="z-20 flex flex-col items-center justify-center gap-10 h-[70vh]">
      <div className="-z-10 fixed top-0 h-screen w-screen bg-[url('/bg-img.jpg')] bg-cover bg-center opacity-40"></div>
      <h2 className="font-bold text-6xl text-yellow-500 text-center">Images Cloud</h2>
      <p className="p-10 max-w-[650px]">
        This is a project created with ExpressJS, MongoDB, JWT, Next.js, NextUI, and Tailwind for styling.
        It consists of a platform that allows you to upload, view, and delete your images.
        These images will be hosted on a cloud service called Cloudinary,
        which will enable us to store our images on its server and access them through a personalized URL.
        <br /><br />
        Additionally, Express is being used in conjunction with JWT to manage user sessions stored in the database.
      </p>
      <div className="flex text-3xl gap-10">
        <Link href="https://expressjs.com/es/" target="_blank"><SiExpress className="text-blue-600 hover:text-blue-700 cursor-pointer" /></Link>
        <Link href="https://www.mongodb.com/" target="_blank"><SiMongodb className="text-green-600 hover:text-green-700 cursor-pointer" /></Link>
        <Link href="https://jwt.io/" target="_blank"><SiJsonwebtokens className="text-purple-600 hover:text-purple-700 cursor-pointer" /></Link>
        <Link href="https://nextjs.org/" target="_blank"><SiNextdotjs className="text-white hover:text-slate-400 cursor-pointer" /></Link>
        <Link href="https://nextui.org/" target="_blank"><SiNextui className="text-white hover:text-slate-400 cursor-pointer" /></Link>
        <Link href="https://tailwindcss.com/" target="_blank"><SiTailwindcss className="text-blue-600 hover:text-blue-700 cursor-pointer" /></Link>
        <Link href="https://cloudinary.com/" target="_blank"><TbCloudUpload className="text-blue-600 hover:text-blue-700 cursor-pointer" /></Link>
      </div>
    </div>
  )
}
