import type { FC } from "react";
import { type User } from "@/validations/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Link } from "react-router";

interface UserMenuProps{
  user:User
}
const UserMenu:FC<UserMenuProps> = ({user})=>{
  const handleLogout = () => {
    authClient.signOut().then(()=>{
      window.location.reload();
    }).catch((err)=>{
      toast.error("Failed to logout");
    })
  }
  return(
    <div className="flex md:flex-row flex-col items-center gap-5">
      <Link to={'/dashboard'}>
        <span className="text-gray-500 hover:cursor-pointer hover:text-gray-500">Dashboard</span>
      </Link>
      <div className="flex items-center gap-2">

      <Avatar className="hidden md:flex">
        <AvatarImage
        src={user.image}
        className="grayscale"/>
        <AvatarFallback className="bg-indigo-500 text-white">{user.name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="text-gray-500 font-medium">{user.name}</span>
      </div>
      <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default UserMenu;
