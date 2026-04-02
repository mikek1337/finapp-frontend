import { api } from "@/lib/axios"
import type { ResponseType } from "@/validations/response";
import type { SpendingSummary } from "@/validations/transaction";
import { useQuery } from "@tanstack/react-query"
import type { FC } from "react";
import { Field, FieldLabel } from "./ui/field";
import { Progress } from "./ui/progress";
import { Loading } from "./loading";

interface SpendingByCategoryProps{
  totalIncome:number,
}
export const SpendingByCategory:FC<SpendingByCategoryProps> = ({totalIncome})=>{
  const {data, isLoading} = useQuery({
    queryKey: ['spending_summary'],
    queryFn: async ()=>{
      const res = await api.get<ResponseType<SpendingSummary[]>>('/api/v1/transaction/spending_summary');
      return res.data
    }
  })
    return(
        <div className="w-full flex flex-col gap-10 my-10">
          <span className="font-semibold text-2xl">Spending By Category</span>
          {isLoading && <Loading/>}
          <div className="flex flex-col gap-5 overflow-y-auto">
          {
            data?.data?.map((spendingSummary)=>(
              <Field key={spendingSummary.name}>
                <FieldLabel className="flex items-center justify-between">
                  <span className="font-semibold">{spendingSummary.name}</span>
                  <span>{((spendingSummary.total/totalIncome)*100).toPrecision(2)}%</span>
                </FieldLabel>
                <Progress value={(spendingSummary.total/totalIncome)*100} className="w-[66%]" color="blue"/>
              </Field>
            ))
          }
          </div>
        </div>
    )
}
