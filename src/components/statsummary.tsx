import { api } from "@/lib/axios"
import type { ResponseType } from "@/validations/response";
import type { TransactionTypeSummaryType } from "@/validations/transaction";
import { useQuery } from "@tanstack/react-query"
import { StatCard } from "./statcard";
import { Skeleton } from "./ui/skeleton";
import { SpendingByCategory } from "./spendingbycategory";

export const StatSummary = ()=>{
  const {data, isLoading} = useQuery({
    queryKey: ['last30days-summary'],
    queryFn: async()=>{
      const res = await api.get<ResponseType<TransactionTypeSummaryType[]>>('/api/v1/transaction/last30days_summary');
      return res.data;
    },
  });

  return(
  <>
  <div className="w-full flex md:flex-row flex-col items-center gap-2">
    {
        isLoading && (
          Array(2).map(value=>(
          <div className="p-10 w-md shadow-md rounded-md" key={value}>
              <Skeleton className="h-10 w-full"/>
              <Skeleton className="w-20 h-20"/>
              <Skeleton className="w-20 h-20"/>
          </div>
          ))
        )
      }
    {
        data?.data?.map((summary)=>(
          <StatCard statTitle={summary.transactionType} rateOfChange={summary.rateOfChange} total={summary.total} key={summary.transactionType}/>
        ))
    }
  </div>
  {data?.data  && (
  <SpendingByCategory totalIncome={data?.data?.filter(transaction=>transaction.transactionType==='INCOME')[0].total}/>
  )}
  
  </>
  )
}
