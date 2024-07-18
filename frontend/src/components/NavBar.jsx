import { cookies } from "next/headers";
import MainNav from "./MainNav";

export default function NavBar() {
  const token = cookies().get("tokenSesionApp")

  const links = [
    { name: "Home", path: "/" },
    { name: "Upload", path: "/upload", requiresAuth: true },
    { name: "Images", path: "/images", requiresAuth: true },
    { name: "Register", path: "/auth/register", requiresAuth: false },
    { name: "Login", path: "/auth/login", requiresAuth: false },
    { name: "Profile", path: "/profile", requiresAuth: true },
  ];

  const filteredlinks = links.filter(item => {
    if (token && (item.path === "/auth/register" || item.path === "/auth/login")) {
      return false;
    }
    if (!token && item.requiresAuth) {
      return false;
    }
    return true;
  });

  return (
    <MainNav
      links={filteredlinks}
      token={token ? true : false}
    />
  );
}
