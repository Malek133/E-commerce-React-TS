
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,

// } from "@/components/ui/dialog"

// interface AlertDialogProps {
//     onOpen: () => void;
//     onClose: () => void;
//     isDeleteOpen: boolean;
//   }


// export function AlertDeleteDialogue({onOpen,onClose,isDeleteOpen}: AlertDialogProps) {
//   return (
//     <Dialog open={isDeleteOpen} onOpenChange={(isDeleteOpen) => (isDeleteOpen ? onOpen() : onClose())} >
     
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Share link</DialogTitle>
//           <DialogDescription>
//             Anyone who has this link will be able to view this.
//           </DialogDescription>
//         </DialogHeader>
     
//         <DialogFooter className="sm:justify-start">
//           <DialogClose asChild>
//             <Button type="button" variant="secondary" onClick={onClose}>
//               Close
//             </Button>

//             <Button type="button" variant="secondary">
//               Remove
//             </Button> 

//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

import { Button } from "@/components/ui/button";
import {
  Dialog,
//   DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AlertDialogProps {
  onOpen: () => void;
  onClose: () => void;
  onOkHandleDelete: () =>void
  isDeleteOpen: boolean;
  isLoading:boolean
}

export function AlertDeleteDialogue({
  onOpen,
  onClose,
  isDeleteOpen,
  onOkHandleDelete,
  isLoading
}: AlertDialogProps) {
  return (
    <Dialog
      open={isDeleteOpen}
      onOpenChange={(isDeleteOpen) =>
        isDeleteOpen ? onOpen() : onClose()
      }
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <div className="flex justify-between items-center gap-10">
            <Button
              type="button"
              variant="secondary"
              className="bg-slate-400"
              onClick={onClose}
            >
              Close
            </Button>

            <Button className="bg-red-500" type="button" 
            variant="secondary" onClick={onOkHandleDelete} 
            disabled={isLoading}>
              {isLoading ? 'Removing...' : 'Remove'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

