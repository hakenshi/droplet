'use client'

import React, { useState, useRef } from 'react'
import UserProfileDialog from './user-profile-dialog'
import UserProfileCover from '@/components/user-profile/user-profile-cover'
import { Pencil, X } from 'lucide-react'
import UserCropperModal from './user-cropper-modal'

export default function UserEditProfileDialog({ user }: { user: User }) {

    const [cropModalOpen, setIsCropModalOpen] = useState(false)
    const [editDialog, setEditDialog] = useState(false)
    const [imageData, setImageData] = useState({
        width: 0,
        height: 0,
        imagem: user.cover_image ?? ""
    })
    const fileRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const img = new Image()
            img.onload = () => {
                setImageData({
                    width: img.width,
                    height: img.height,
                    imagem: URL.createObjectURL(file)
                })
                setIsCropModalOpen(true)
            }
            img.src = URL.createObjectURL(file)
        }
    }

    const setPreviewImage = () => {
        if (fileRef.current) {
            fileRef.current.click()
        }
    }

    const handleCloseCropModal = () => {
        setImageData({
            width: 0,
            height: 0,
            imagem: user.cover_image ?? ""
        })
        setIsCropModalOpen(false)
        if (fileRef.current) {
            fileRef.current.value = ""
        }
    }

    return (
        <>
            <UserProfileDialog user={user} dialogState={editDialog} setDialogSate={setEditDialog} >
                <UserProfileCover user={user}>
                    <input onChange={handleFileChange} className='hidden' type="file" ref={fileRef} />
                    <button onClick={setPreviewImage} type='button' className="text-white text-xl font-semibold bg-white/50 p-2 rounded-full">
                        <Pencil />
                    </button>
                    <button type='button' className="text-white text-xl font-semibold bg-white/50 p-2 rounded-full">
                        <X />
                    </button>
                </UserProfileCover>
            </UserProfileDialog>
            <UserCropperModal setState={handleCloseCropModal} state={cropModalOpen} image={imageData.imagem} width={imageData.width} height={imageData.height/2} />
        </>
    )
}