import { ReactNode, createContext, useContext, useState } from "react";

type ModalContextValues = {
    setModalContent: (content: ReactNode) => void;
    openModal: (value: boolean) => void;
    open: boolean;
    content: ReactNode;
}

const ModalContext = createContext<ModalContextValues>({
    setModalContent() { },
    openModal() { },
    open: false,
    content: null
});

export const useModal = () => {
    const props = useContext(ModalContext);

    return props;
}

type ModalProps = {
    children: ReactNode;
}

export default function ModalContextProvider({ children }: ModalProps) {
    const [content, setContent] = useState<ReactNode>(null);
    const [open, setOpen] = useState(false);

    function openModal(value: boolean) {
        setOpen(value);
    }

    function setModalContent(content: ReactNode) {
        setContent(content);
    }

    const ctx = {
        setModalContent,
        openModal,
        open,
        content
    }

    return <ModalContext.Provider value={ctx}>
        {children}
    </ModalContext.Provider>
}