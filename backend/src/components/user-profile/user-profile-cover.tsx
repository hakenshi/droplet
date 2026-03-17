'use client';

import Image from 'next/image';
import React, { ReactNode, useState } from 'react';
import { motion, Variants, useReducedMotion, easeIn, easeInOut } from "framer-motion";

const overlayVariants: Variants = {
    initial: { opacity: 0 },
    hover: { opacity: 0.55 },
};

const contentVariants: Variants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
};

type Ratios = 'cover' | 'icon'

export default function UserProfileCover({
    user,
    src,
    children,
    ratio,
}: {
    user: User;
    src: string
    children: ReactNode;
    ratio: Ratios
}) {
    const [isHovering, setIsHovering] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const ratios = {
        'cover': 'w-full h-48',
        'icon': 'size-32',
    }

    return (
        <div
            className={`relative ${ratios[ratio]} rounded-md overflow-hidden z-0`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Background Image */}
            {!src ? (<div className='absolute inset-0 object-cover bg-sky-500'></div>) :
                (
                    <Image
                        className="absolute inset-0 object-cover"
                        fill
                        src={src}
                        alt={`${user.name}'s background image`}
                    />
                )}

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
                className="absolute inset-0 flex items-center justify-center space-x-5 z-20"
            >
                {children}
            </motion.div>
        </div>
    );
}
