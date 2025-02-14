'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { cn } from '@/lib/utils'

export default function ResizeableTextArea({...rest}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {

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
        <Textarea {...rest} onChange={handleTextArea} ref={textAreaRef} className={cn(`max-h-96 h-fit overflow-auto ${rest.className}`)} style={{ resize: "none", height: areaSize ? `${areaSize + 5}px` : 'auto' }}>
        </Textarea>
    )
}
