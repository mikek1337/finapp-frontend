import { CreateTransactionSchema, type createTransactionType, type transactionType } from "@/validations/transaction"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { categoryType } from "@/validations/category";
import type { ResponseType } from "@/validations/response";
import { AddCategory } from "./addcategory";
import { Loading } from "./loading";
import { toast } from "sonner";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";
import { Dollar01FreeIcons } from "@hugeicons/core-free-icons";

export const TranscationForm = ()=>{
  const queryClient = useQueryClient();
  const form = useForm<createTransactionType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues:{
      name: '',
      amount: 0,
      categoryId: '',
      transactionType: 'INCOME'
    }
  });
  const {data, isLoading} = useQuery({
    queryKey: ['category'],
    queryFn: async()=>{
      const res = await api.get<ResponseType<categoryType[]>>('/api/v1/category');
      return res.data
    }
  });

  const {mutate} = useMutation({
    mutationFn: async(data:createTransactionType)=>{
      const res = await api.post<ResponseType<transactionType>>('/api/v1/transaction', data);
      return res.data
    },
    onSuccess: ()=>{
      form.reset();
      queryClient.invalidateQueries({queryKey: ['transaction_history']});
      queryClient.invalidateQueries({queryKey: ['spending_summary']});
      queryClient.invalidateQueries({queryKey: ['last30days-summary']})
      toast.success('Transaction added successfully');
    },
    onError:()=>{
      toast.error('Something went wrong, please try again later');
    }
  })
  const submitTransaction = (data:createTransactionType)=>{
    mutate(data);
  }
  return(
   <form id="create_transaction" onSubmit={form.handleSubmit(submitTransaction)}>
      <FieldGroup>
        <Controller
        name="name"
        control={form.control}
        render={({field, fieldState})=>(
        <Field date-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="transaction-name">Name</FieldLabel>
          <Input id="transaction-name" placeholder="Name" {...field} aria-invalid={fieldState.invalid} autoComplete="off"/>
          {
            fieldState.invalid && <FieldError errors={[fieldState.error]}/>
          }
        </Field>
        )}/>
        <Controller
        name="transactionType"
        control={form.control}
        render={({field, fieldState})=>(
        <Field date-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="transaction-type">Transaction</FieldLabel>
         <Select  onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
                  <SelectValue placeholder='Transaction type'/>
            </SelectTrigger>
                <SelectContent>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
         </Select> 
          {
            fieldState.invalid && <FieldError errors={[fieldState.error]}/>
          }
        </Field>
        )}/>
        <Controller
        name="categoryId"
        control={form.control}
        render={({field, fieldState})=>(
        <Field date-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="transaction-category">Category</FieldLabel>
        <div className="w-full flex justify-between">
         <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
                  <SelectValue placeholder='Category'/>
            </SelectTrigger>
            <SelectContent className="w-full" >
              {
                    data?.data?.map((catagory)=>(
                    <SelectItem value={catagory.id}>{catagory.name}</SelectItem>
                    ))
              }
            </SelectContent>
         </Select>
                {isLoading && (<Loading/>)}
          <AddCategory/>
          </div>
          {
            fieldState.invalid && <FieldError errors={[fieldState.error]}/>
          }
        </Field>
        )}/>
        <Controller
        name="amount"
        control={form.control}
        render={({field, fieldState})=>(
        <Field date-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="transaction-amount">Amount</FieldLabel>
          <InputGroup>
            <InputGroupInput id="transaction-amount" type="number" {...field} placeholder="00.0" onChange={(e) => field.onChange(Number(e.target.value))}/>
            <InputGroupAddon>
                  <HugeiconsIcon icon={Dollar01FreeIcons}/>
            </InputGroupAddon>
          </InputGroup> 
          {
            fieldState.invalid && <FieldError errors={[fieldState.error]}/>
          }
        </Field>
        )}/>
                  
      </FieldGroup>
        <Field className="my-1">
           <Button form="create_transaction" type="submit">Add Transaction</Button>
        </Field>

         </form>
  )
}
