"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    trigger?: ReactNode
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
    onClose: () => void;
    title?: string;
    description?: string;
    content: ReactNode;
    showFooter?: boolean;
    footer?: ReactNode
}

export const Modal = ({
    isOpen,
    onOpenChange,
    onClose,
    title,
    description,
    content,
    showFooter,
    footer,
    trigger
}: ModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {trigger && (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            )}
            <DialogContent>
                {(title || description) && (
                    <DialogHeader>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                )}

                {content}

                {showFooter && (
                    <DialogFooter>
                        {footer}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};
