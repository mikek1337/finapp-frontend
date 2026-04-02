import { CreateCategory, type categoryType, type createCategoryType } from "@/validations/category"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { type ResponseType } from "@/validations/response";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const CategoryForm = ()=>{
  const queryClient = useQueryClient();
  const form = useForm<createCategoryType>({
    resolver: zodResolver(CreateCategory),
    defaultValues:{
      name: ''
    },
    mode: 'onChange'
  });

  const {mutate} = useMutation({
    mutationFn: async(data:createCategoryType)=>{
      const res = await api.post<ResponseType<categoryType>>('/api/v1/category', data);
      return res.data
    },
    onSuccess:()=>{
      form.reset();
      queryClient.invalidateQueries({queryKey: ['category']});
      toast.success('Category added successfully');
    },
    onError:(error)=>{
      if(error instanceof AxiosError){
          toast.error('Something went wrong, please try again later');
      }
    }
  })

  const submitCategory = (data:createCategoryType)=>{
      mutate(data);
  } 

  return(
    <form onSubmit={form.handleSubmit(submitCategory)} id="add_category">
      <FieldGroup>
        
        <Controller 
        name="name"
        control={form.control}
        render={({field, fieldState})=>(
          <Field>
              <FieldLabel>
                Name
              </FieldLabel>
              <Input
              {...field}
              placeholder="Name"
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
          </Field>
        )}/>
        
      </FieldGroup>
      <Field>
          <Button form="add_category" type="submit">Save</Button>
        </Field>
    </form>
  )
}
