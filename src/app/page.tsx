import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getAuthUser } from "@/utils/getAuthUser";
import { BellIcon, Bookmark, HouseIcon, MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const {user} = await getAuthUser()

  return (
    <div className="w-screen h-screen grid grid-cols-[auto,1fr]">
      <header className="text-white h-full bg-gradient p-5 shadow-xl">
        <nav className="w-44 grid grid-rows-[0.1fr_auto_0.1fr] h-full gap-5 justify-items-center place-items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={"/logo.png"} alt="droplet logo" width={50} height={50} />
            <p className="font-black text-2xl">DROPLET</p>
          </Link>

          <ul className="flex flex-col gap-5 w-11/">
            <li className="flex items-center gap-2 hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full">
              <HouseIcon />
              <Link href={"/"}>Home</Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full">
              <BellIcon />
              <Link href={"/"}>Notificação</Link>
            </li>

            <li className="flex items-center gap-2 hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full">
              <Bookmark />
              <Link href={"/"}>Coleções</Link>
            </li>

            <li className="flex items-center gap-2 hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full">
              <MessageCircleIcon />
              <Link href={"/"}>Chat</Link>
            </li>

          </ul>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-5 hover:bg-zinc-100/35 transition-colors duration-200 p-2 rounded-full w-full">
          <Avatar>
            <AvatarImage src={"/avatar.png"} alt="avatar" />
            <AvatarFallback className="bg-sky-500 text-white">
              {user.username.toUpperCase().substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span>
            {user.username}
          </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl bg-white p-2 w-44 border-zinc-500 shadow-lg shadow-black/20 border">
            <div className="px-4 py-2 hover:bg-zinc-200 rounded-xl">
              <button className="text-zinc-800">Sair de <strong>{user.username}</strong></button>
            </div>
          </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <main className="grid grid-cols-[1fr,auto]">
        <div className="p-2">
          <h1>main feed</h1>
        </div>
        <div className="w-44 border-l-2 border-zinc-400 p-2">
          <div>
            searchbar
          </div>
        </div>
      </main>
    </div>
  );
}
