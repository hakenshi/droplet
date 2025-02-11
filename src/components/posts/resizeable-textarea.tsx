'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from '../ui/textarea'

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

        <Textarea {...rest} onChange={handleTextArea} ref={textAreaRef} placeholder='Qual seu pensamento?' className='max-h-96 overflow-auto' style={{ resize: "none", height: areaSize ? `${areaSize + 5}px` : 'auto' }}>
        </Textarea>

    )
}
