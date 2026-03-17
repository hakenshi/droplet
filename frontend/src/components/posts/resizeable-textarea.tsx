'use client'

import React, { useEffect, useRef, useState, forwardRef } from 'react'
import { Textarea } from '../ui/textarea'
import { cn } from '@/lib/utils'

const ResizeableTextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ onChange, ...rest}, ref) => {
        const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
        const [areaSize, setAreaSize] = useState(0)

        function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
            if (textAreaRef.current) {
                textAreaRef.current.style.height = 'auto'
                // textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
                setAreaSize(textAreaRef.current.scrollHeight)
            }
            onChange?.(e)
        }

        useEffect(() => {
            handleTextArea({ target: textAreaRef.current } as React.ChangeEvent<HTMLTextAreaElement>)
        }, [])

        return (
            <Textarea 
                {...rest} 
                onChange={handleTextArea} 
                ref={(node) => {
                    textAreaRef.current = node;
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        ref.current = node;
                    }
                }} 
                className={cn(`max-h-96 overflow-auto ${rest.className}`)} 
                style={{ resize: "none", height: areaSize ? `${areaSize + 5}px` : 'auto' }}
            />
        )
    }
)

ResizeableTextArea.displayName = 'ResizeableTextArea'

export default ResizeableTextArea
