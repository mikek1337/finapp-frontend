import { useState, type FC } from "react";
import LoginForm from "@/components/loginform";
import { Logo } from "@/components/logo";
import SignupForm from "@/components/signupform";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Auth:FC = ()=>{
  const [mode, setMode] = useState<"login" | "signup">("login");
  return(
    //BUG: validation not working
    <Dialog >
      <DialogTrigger asChild >
        <Button className="rounded-full py-3 font-semibold  px-5 text-center">Getting Started</Button>
      </DialogTrigger>
      <DialogContent className="min-h-125">
        <DialogHeader>
          <DialogTitle>
           <Logo/> 
          </DialogTitle>
        </DialogHeader>
        {
          mode === "login"? (
          <LoginForm onSwitch={()=>setMode("signup")}/>
          ):(
            <SignupForm onSwitch={()=>setMode("login")}/>
          )
        }
      </DialogContent>

    </Dialog>
  )
}

export default Auth;
