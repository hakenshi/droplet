'use client'

import { BellIcon } from "lucide-react"
import Link from "next/link"

export default function NotificationButton() {
    
    return (
        <Link
            className='flex items-center gap-2 hover:bg-zinc-100/35 transition-colors px-4 py-2 rounded-full w-full'
            href={"/"}>
            <BellIcon />
            Notificação
        </Link>)
}
