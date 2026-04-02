import { StatCard } from "@/components/statcard"
import { StatSummary } from "@/components/statsummary"
import { TranscationForm } from "@/components/transactionform"
import { TransactionHistory } from "@/components/transactionhistory"


export const Dashboard = ()=>{
  return(
    <div className="w-full flex md:flex-row flex-col md:p-20 p-10 gap-7">
      <div className="md:w-[80%] space-y-4 border px-10">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <StatSummary/> 
      </div>
      <div className="md:w-[40%] space-y-4 px-4">
       <TranscationForm/> 
        <TransactionHistory/>
    </div>
    </div>
  )
}
