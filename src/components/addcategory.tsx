import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Plus } from "@hugeicons/core-free-icons"
import { CategoryForm } from "./categoryform"


export const AddCategory = ()=>{
  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">
          <HugeiconsIcon icon={Plus}/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Category
          </DialogTitle>
          <DialogDescription>
            Add category from your transaction
          </DialogDescription>
        </DialogHeader>
        
          <CategoryForm/>
      </DialogContent>
    </Dialog>
  )
}
