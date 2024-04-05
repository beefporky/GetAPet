import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'
import { useModal } from './modal-context';

const Modal = () => {
    const { open, content } = useModal();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (open) {
            dialogRef.current!.showModal();
        } else {
            dialogRef.current!.close();
        }
    }, [open]);


    return createPortal(
        <dialog ref={dialogRef} open>
            {content}
        </dialog>
        , document.getElementById('modal')!
    )
}

export default Modal