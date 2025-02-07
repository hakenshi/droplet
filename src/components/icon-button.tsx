import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import React, { ComponentProps, JSX } from 'react'

interface IconButonProps extends ComponentProps<'input'> {
    Icon: LucideIcon
}

export default function IconButton({ className, type, Icon, ...props }: IconButonProps): JSX.Element {
    return (
        <div className='bg-zinc-100 rounded-full px-4 py-5 w-full flex gap-4 text-zinc-600'>
            <Icon />
            <input
                type={type}
                className={cn("w-full bg-zinc-100 focus:outline-hidden font-medium text-zinc-600", className)}
                {...props}
            />
        </div>
    )
}
