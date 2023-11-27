import {useRef, ElementRef} from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import {MoreVertical, X} from 'lucide-react'
import { PopoverClose } from '@radix-ui/react-popover'
import { Column } from '@/lib/types'
import { FormSubmit } from '../form/form-submit'
import { Separator } from '../ui/separator'

interface ColumnOptionsProps {
  data:Column,
  onAddCard: () => void
}


const ColumnOptions = ({data, onAddCard}:ColumnOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={()=>{}}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card
        </Button>
        <form action={()=>{}}>
          <input hidden name="id" id="id" value={data.id} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list
          </FormSubmit>
        </form>
        <Separator />
        <form
          action={()=>{}}
        >
          <input hidden name="id" id="id" value={data.id} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this column
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default ColumnOptions