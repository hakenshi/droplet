'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function PostBackButton() {
    const router = useRouter()
    return (
            <button onClick={() => router.back()}>
                <ArrowLeft />
            </button>
    )
}
