import { api } from "@/lib/axios"
import { cn } from "@/lib/utils";
import type { PaginatedResponse, ResponseType } from "@/validations/response";
import type { transactionType } from "@/validations/transaction";
import { Money, ShoppingCart, ShoppingCart01FreeIcons, ShoppingCart02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const TransactionHistory = ()=>{
  const {data, isLoading} = useInfiniteQuery({
    queryKey: ['transaction_history'],
    queryFn: async ({pageParam})=>{
      const res = await api.get<PaginatedResponse<transactionType[]>>(`/api/v1/transaction/history?limit=4&cursor=${pageParam}`);
      return res.data
    },
    initialPageParam: '',
    getNextPageParam:(lastPage)=>lastPage.data.nextCursor??undefined
  });

  return(
    <div className="border rounded-md p-5">
      <span className="text-xl font-semibold">Transaction History</span>
      <div className="flex flex-col gap-2">
      {
        data?.pages.map((page)=>(
        
              

              page.data.data?.map((history)=>(
              <div className="flex justify-between items-center  ">
                <div className="flex gap-2 items-center">
                <div className="rounded-full p-2 bg-zinc-100">
                  {history.transactionType === 'INCOME'?(
                    <HugeiconsIcon icon={Money} className="text-green-500"/>
                  ):(
                    <HugeiconsIcon icon={ShoppingCart02FreeIcons} className="text-red-500"/>
                  )}
                </div>
              <div className="space-y-1 flex flex-col">
                <span className="font-semibold">{history.name}</span>
                <span className="text-zinc-500 text-xs">{new Date(history.createdAt as string).toDateString()}</span>
              </div>
            </div>
            <div>
                <span className={cn('font-medium', {"text-green-500":history.transactionType==='INCOME'}, {"text-red-500":history.transactionType==='EXPENSE'})}>
                  {history.transactionType==='INCOME'?'+':'-'} ${history.amount.toLocaleString()}
                </span>
            </div>
          </div>
              ))
            ))
      }
        
      </div>

    </div>
  )
}
