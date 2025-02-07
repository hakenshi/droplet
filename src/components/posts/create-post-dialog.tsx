'use client'

import React, { useEffect, useRef, useState } from 'react'
import { DialogTitle, Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader } from '../ui/dialog'
import { MessageCircleIcon } from 'lucide-react'
import { Textarea } from '../ui/textarea'

export default function CreatePostDialog() {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
    const [areaSize, setAreaSize] = useState(0)

    function handleTextArea() {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
            setAreaSize(textAreaRef.current.scrollHeight)
        }
    }
    useEffect(() => {
        handleTextArea()
    }, [])

    return (
        <Dialog>
            <DialogTrigger className='flex items-center gap-2 bg-transparent hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full'>
                <MessageCircleIcon />
                Postar
            </DialogTrigger>
            <DialogContent className='max-w-2xl w-full'>
                <DialogHeader>
                    <DialogTitle>Criar Postagem</DialogTitle>
                </DialogHeader>
                <DialogDescription className='max-h-96 h-full'>
                    <Textarea onChange={handleTextArea} ref={textAreaRef} placeholder='Escreva sua ideia aqui...' className='max-h-96 overflow-auto' style={{ resize: "none", height: areaSize ? `${areaSize + 5}px` : 'auto' }}>

                    </Textarea>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
