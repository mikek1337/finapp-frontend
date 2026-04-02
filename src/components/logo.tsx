import {HugeiconsIcon} from '@hugeicons/react';
import {FlashIcon} from '@hugeicons/core-free-icons'


export const Logo = ()=>{
  return(
  <div className="flex items-center gap-2">
          <HugeiconsIcon icon={FlashIcon} className="fill-amber-500" />
          <h1 className="md:text-4xl text-xl font-semibold capitalize">finance<span className="text-amber-500">app</span></h1>
        </div>

  )
}
