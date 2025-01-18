'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

import { easeIn, easeInOut, motion } from "framer-motion"
import { Pencil, X } from 'lucide-react';

export default function UserProfileCover({ user }: { user: User }) {

    const [isHovering, setIsHovering] = useState(false)

    const [imagePreview, setImagePreview] = useState(user.cover_image ?? "")

    const fileRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        const file = e.target.files?.[0]
        if (file) {
            reader.onload = () => {
                setImagePreview(reader.result as string)
            }

            reader.readAsDataURL(file)
        }
    }

    const setPreviewImage = () => {
        if (fileRef.current) {
            fileRef.current.click()
        }
    }

    return (
        <div className="relative w-full h-[18rem] rounded-md overflow-hidden z-0" onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
            {/* Background Image */}
            <Image
                className="absolute inset-0 w-full h-full object-cover"
                width={1920}
                height={1080}
                src="https://w.wallhaven.cc/full/57/wallhaven-57lkm9.jpg"
                alt={`${user.name}'s background image`}
            />

            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 0.55 : 0 }}
                transition={{ duration: 0.5, ease: easeIn }}
                className="absolute inset-0 bg-gradient-overlay z-0 hover:cursor-pointer"></motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 1 : 0 }}
                transition={{ duration: 0.55, ease: easeInOut }}
                className="absolute inset-0 flex items-center justify-center space-x-5 z-20"
            >
                <input onChange={ } className='hidden' type="file" ref={fileRef} />
                <button onClick={setPreviewImage} type='button' className="text-white text-xl font-semibold bg-white/50 p-2 rounded-full">
                    <Pencil />
                </button>
                <button type='button' className="text-white text-xl font-semibold bg-white/50 p-2 rounded-full">
                    <X />
                </button>

            </motion.div>
        </div>
    );
}
