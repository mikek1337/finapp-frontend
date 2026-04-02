import { useState, type FC } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthSchema } from "@/validations/auth"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { authClient } from "@/lib/auth-client"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import {Loading} from "@/components/loading"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"


interface SignupFormProps{
  onSwitch: ()=>void
}
const SignupForm:FC<SignupFormProps> = ({ onSwitch })=>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(AuthSchema),
    defaultValues: {name: "", email: "", password: ""} 
  })

  const onSubmit = (value:any)=>{
    setLoading(true);
    authClient.signUp.email(value).then((value)=>{
      if(value.error){
        toast.error(value.error.message)
      }else{
        toast.success(`Welcome, ${value.data.user.name}`)
        navigate('/dashboard');
        
      }
       
    }).catch((err)=>{
        toast.error(err.message )
      }).finally(()=>setLoading(false))
  }

  return(
    
      <form className=" space-y-5" onSubmit={form.handleSubmit(onSubmit)} id="form-login">
      <FieldGroup>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Create Account</h2>
        <p className="text-zinc-500">Join and manage your finance</p>
      </div>
        <Controller
        control={form.control}
          name="name"
          render={({field, fieldState})=>(
          <Field className="space-y-2">
              <FieldLabel>Name</FieldLabel>
                <Input placeholder="John Doe" className="h-12" {...field}/>
            {
              fieldState.invalid && (
              <FieldError errors={[fieldState.error]}/>
              )
            }
          </Field>
          )}/>
        <Controller
        control={form.control}
          name="email"
          render={({field, fieldState})=>(
          <Field className="space-y-2" aria-invalid={fieldState.invalid}>
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
        <Field>
          <Button className="w-full h-12 font-bold backdrop:blur-md text-md" form="form-login">Create Author Account {loading && <Loading/>}</Button>
        </Field>
      </div>
        <div className="w-full flex justify-center mt-5">
            <span className="text-zinc-500 font-semibold text-sm">Already have an account?<span className="text-indigo-500 cursor-pointer" onClick={onSwitch}> Log In</span></span>
        </div>
        </FieldGroup>
      </form>
     )
}

export default SignupForm;
