import type { User } from "@/validations/user";
import type { FC } from "react";
import { Logo } from "./logo";
import Auth from "@/auth/auth";
import UserMenu from "./usermenu";

interface HeaderProps{
  user: User | null,
}
export const Header:FC<HeaderProps> = ({ user }) => {
  return(
    <div className=" mx-auto p-2">
      <div className="flex justify-between items-center">
       <Logo/>
        {
          user ? (
            <UserMenu user={user}/>
          ):( 
          <Auth/>
          )
        }
      </div>

    </div>
  )
}
