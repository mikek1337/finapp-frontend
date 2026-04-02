import { HugeiconsIcon } from "@hugeicons/react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Wallet01FreeIcons } from "@hugeicons/core-free-icons"
import type { FC } from "react"

interface StatCardProps{
  statTitle: string,
  total: number,
  rateOfChange: number
  
}
export const StatCard:FC<StatCardProps> = ({statTitle, total, rateOfChange})=>{
  return(
    <Card className="md:w-md w-full">
      <CardContent className="space-y-2 w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="md:text-2xl text-xl font-medium">{statTitle}</span>
            <HugeiconsIcon icon={Wallet01FreeIcons}/>
          </CardTitle>
        </CardHeader>
        <div className="px-5">
          <h3 className="md:text-3xl text-2xl font-extrabold">${total.toLocaleString()}</h3>
          <span className="text-sm">{rateOfChange*100}% vs last month</span>
        </div>
        
      </CardContent>
    </Card>
  )
}
