'use client'

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useReducedMotion, motion, Variants, easeIn, easeInOut } from 'framer-motion';

const overlayVariants: Variants = {
    initial: { opacity: 0 },
    hover: { opacity: 0.55 },
};

const contentVariants: Variants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
}

interface ProfileImageProps {
    src: string;
    username: string;
}

interface ProfileImageProps {
    src: string;
    username: string;
    children?: React.ReactNode;
}

export default function ProfileImage({ src, username, children }: ProfileImageProps) {

    const [isHovering, setIsHovering] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    return (
        <div
            className='relative border-white border-2 rounded-full w-fit flex flex-col justify-center items-start ml-2 -mt-24 z-0 overflow-hidden'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Avatar className='size-28'>
                <AvatarImage src={src} alt="avatar" />
                <AvatarFallback className="bg-lime-500 text-white text-3xl">
                    {username.toUpperCase().substring(0, 2)}
                </AvatarFallback>
            </Avatar>

            {/* Overlay */}
            <motion.div
                variants={overlayVariants}
                initial="initial"
                animate={isHovering ? "hover" : "initial"}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: easeIn }}
                className="absolute inset-0 bg-gradient-overlay z-0 cursor-pointer"
            />

            {/* Content */}
            <motion.div
                variants={contentVariants}
                initial="initial"
                animate={isHovering ? "hover" : "initial"}
                transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: easeInOut }}
                className="absolute inset-0 flex items-center justify-center z-20"
            >
                {children}
            </motion.div>
        </div>
    );
}
