'use client'

import React, { useState, useRef } from 'react'
import UserProfileDialog from './user-profile-dialog'
import UserProfileCover from '@/components/user-profile/user-profile-cover'
import { Pencil, X } from 'lucide-react'
import ImageCopperModal from './user-cropper-modal'
import ProfileImage from './profile-image'

export default function UserEditProfileDialog({ user }: { user: User }) {

    const [cropModalOpen, setIsCropModalOpen] = useState(false)
    const [editDialog, setEditDialog] = useState(false)
    const [imageData, setImageData] = useState({
        cover_image: user.cover_image ?? "",
        profile_image: user.profile_image ?? "",
    })
    const coverRef = useRef<HTMLInputElement | null>(null)
    const iconRef = useRef<HTMLInputElement | null>(null)

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const img = new Image()
            img.onload = () => {
                setImageData(i => ({
                    ...i,
                    cover_image: URL.createObjectURL(file)
                }))
                setIsCropModalOpen(true)
            }
            img.src = URL.createObjectURL(file)
        }
    }
    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const img = new Image()
            img.onload = () => {
                setImageData(i => ({
                    ...i,
                    profile_image: URL.createObjectURL(file)
                }))
                setIsCropModalOpen(true)
            }
            img.src = URL.createObjectURL(file)
        }
    }

    const setPreviewCoverImage = () => {
        if (coverRef.current) {
            coverRef.current.click()
        }
    }
    const setPreviewProfileImage = () => {
        if (iconRef.current) {
            iconRef.current.click()
        }
    }


    const clearImageState = () => {
        setImageData(i => ({
            ...i,
            cover_image: user.cover_image ?? ""
        }))
        if (coverRef.current) {
            coverRef.current.value = ""
        }
    }

    const handleCloseCropModal = () => {
        setIsCropModalOpen(false)
    }

    return (
        <>
            <UserProfileDialog user={user} dialogState={editDialog} setDialogSate={setEditDialog} >
                <UserProfileCover ratio='cover' src={imageData.cover_image ? imageData.cover_image : user.cover_image} user={user}>
                    <input onChange={handleCoverImageChange} className='hidden' type="file" ref={coverRef} />
                    <button onClick={setPreviewCoverImage} type='button' className="text-white text-xl font-semibold bg-white/50 p-2 rounded-full">
                        <Pencil />
                    </button>
                    <button onClick={clearImageState} type='button' className="text-white text-xl font-semibold bg-white/50 p-2 rounded-full">
                        <X />
                    </button>
                </UserProfileCover>
                <ProfileImage src={imageData.profile_image ? imageData.profile_image : user.profile_image} username={user.username}>
                    <input onChange={handleProfileImageChange} className='hidden m-0' type="file" ref={iconRef} />
                    <button onClick={setPreviewProfileImage} type='button' className="text-white text-xl font-semibold p-2 rounded-full">
                        <Pencil />
                    </button>
                </ProfileImage>
            </UserProfileDialog>
            <ImageCopperModal
                onImageCropComplete={(croppedImage) => {
                    setImageData(i => ({ ...i, cover_image: croppedImage }))
                }}
                setDialogState={handleCloseCropModal}
                dialogState={cropModalOpen}
                image={imageData.cover_image} />
        </>
    )
}