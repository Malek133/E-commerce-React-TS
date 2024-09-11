import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"


interface AlertDialogProps {
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
    title:string
    des:string
    save:string
    closeb:React.ReactNode
    children: any
    onOkClick:any
    isLoading:boolean
  }

export function AlertDialogCustom({onOpen,onClose,isOpen,title
  ,des,save,closeb,children,onOkClick,isLoading}: AlertDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => (isOpen ? onOpen() : onClose())}>
  
      <DialogContent className="sm:max-w-[425px]">
         <DialogHeader>
           <DialogTitle>{title}</DialogTitle>
          <DialogDescription> 
           {des}
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
        
        <Button type="submit"  onClick={onClose}>{closeb}</Button>
        
          {/* <Button type="submit" onClick={onOkClick}  
          isLoading={isLoading}
          >{save}</Button> */}

           {isLoading ? (
               <Button disabled>Loading...</Button>
                 ) : (
               <Button type="submit" onClick={onOkClick}>{save}</Button>
                )} 

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
