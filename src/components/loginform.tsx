import { useState, type FC } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema} from "@/validations/auth"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { authClient } from "@/lib/auth-client"
import {  useNavigate } from "react-router"
import { toast } from "sonner"

import { Loading } from "@/components/loading"
import { Field, FieldError, FieldLabel } from "./ui/field"
interface LoginFormProps{
  onSwitch: ()=>void
}
const LoginForm:FC<LoginFormProps> = ({onSwitch})=>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {email: '', password: ''}
  })
  
  const onSubmit = (value:any)=>{
    setLoading(true);
    authClient.signIn.email(value).then((value)=>{
      if(value.error){
        toast.error(value.error.message)
      }else{
        if(value.data.user){
        toast.success("Welcome, Back");
        }else{
          toast.error("Something went wrong. Please try again.")
        }
         navigate('/dashboard');
        //window.location.href = '/dashboard';
        // throw redirect('/dashboard');
      }
       
    }).catch((err)=>{
        toast.error(err.message)
      }).finally(()=>setLoading(false))
  }
  return(
    
      <form className=" space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
<div className="space-y-2">
        <h2 className="text-2xl font-semibold">Welcome, Back</h2><p className="text-zinc-500">Enter your credential to manage your account</p>
  </div>

        <Controller
        control={form.control}
          name="email"
          render={({field, fieldState})=>(
          <Field className="space-y-2">
              <FieldLabel>Name</FieldLabel>
                <Input placeholder="JoeDoe@example.com" className="h-12" {...field}/>
            {
              fieldState.invalid && (
              <FieldError errors={[fieldState.error]}/>
              )
            }
          </Field>
          )}/>
        <Controller
        control={form.control}
          name="password"
          render={({field, fieldState})=>(
          <Field className="space-y-2">
              <FieldLabel>Name</FieldLabel>
                <Input type="password" placeholder="password" className="h-12" {...field}/>
            {
              fieldState.invalid && (
              <FieldError errors={[fieldState.error]}/>
              )
            }
          </Field>
          )}/>
        <div className="w-full">
          <Button className="w-full h-12 font-bold backdrop:blur-md text-md">Sign In {loading && <Loading/>}</Button>
        
        </div>
        <div className="w-full flex justify-center mt-5">
            <span className="text-zinc-500 font-semibold text-sm"> New to FinanceApp? <span className="text-indigo-500 cursor-pointer" onClick={onSwitch}>Sign Up</span></span>
        </div>

      </form>
    
  )
}

export default LoginForm;
