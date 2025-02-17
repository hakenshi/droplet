'use client'

import React, { useState, useRef, RefObject, useEffect, useCallback } from 'react'
import UserProfileDialog from './user-profile-dialog'
import UserProfileCover from '@/components/user-profile/user-profile-cover'
import { Pencil, X } from 'lucide-react'
import ImageCopperModal from './user-cropper-modal'
import ProfileImage from './profile-image'
import { getUserImage } from '@/utils/user'

export default function UserEditProfileDialog({ user }: { user: User }) {

    const [cropCoverModalOpen, setIsCropCoverModalOpen] = useState(false)
    const [cropProfileModalOpen, setIsCropProfileModalOpen] = useState(false)
    const [editDialog, setEditDialog] = useState(false)
    const [userImageData, setUserImageData] = useState({
        cover_image: "",
        profile_image: "",
    })
    const [imageRatio, setImageRatio] = useState({
        w: 0,
        h: 0
    })
    const coverRef = useRef<HTMLInputElement>(null)
    const iconRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: "cover" | "profile") => {
        const file = e.target.files?.[0]
        if (file) {
            const img = new Image()
            img.onload = () => {
                setImageRatio({
                    h: img.height,
                    w: img.width
                })
                setUserImageData(i => ({
                    ...i,
                    [`${type}_image`]: URL.createObjectURL(file)
                }))
                if (type === "cover") {
                    setIsCropCoverModalOpen(true)
                } else {
                    setIsCropProfileModalOpen(true)
                }

            }
            img.src = URL.createObjectURL(file)
        }
    }
    const triggerFileInput = (ref: RefObject<HTMLInputElement | null>) => {
        if (ref.current) {
            ref.current.click()
        }
    }

    const clearImageState = (type: 'cover' | 'profile', ref: RefObject<HTMLInputElement | null>) => {
        setUserImageData(i => ({
            ...i,
            [`${type}_image`]: user[`${type}_image`] ?? ""
        }))
        if (ref.current) {
            ref.current.value = ""
        }
    }

    const resetImageState = useCallback(() => {
        setUserImageData({
            cover_image: user.cover_image,
            profile_image: user.profile_image,
        })
        if (coverRef.current) {
            coverRef.current.value = ''
        }
        if (iconRef.current) {
            iconRef.current.value = ''
        }
    }, [user.cover_image, user.profile_image])

    const handleCloseCoverCropModal = () => {
        setIsCropCoverModalOpen(false)
    }

    const handleCloseProfileCropModal = () => {
        setIsCropProfileModalOpen(false)
    }

    useEffect(() => {
        if (!editDialog) {
            resetImageState()
        }
    }, [editDialog, resetImageState])

    const setFileInputFromBase64 = async (ref: RefObject<HTMLInputElement | null>, base64: Base64URLString) => {
       return await fetch(base64)
            .then(response => response.blob())
            .then(blob => {
                const dt = new DataTransfer()
                dt.items.add(new File([blob], `image.${blob.type}`, { type: blob.type }))
                if (ref.current) {
                    ref.current.files = dt.files
                }
            })
            .catch(e => console.error(e))
    }

    const updateInputValues = (type: "cover" | 'icon', image: Base64URLString) => {
        if (type === "cover" && coverRef.current) {
            setFileInputFromBase64(coverRef, image)
            // coverRef.current.value = image
        }
        if (type === "icon" && iconRef.current) {
            setFileInputFromBase64(iconRef, image)
            // iconRef.current.value = image
        }
    }

    return (
        <>
            <UserProfileDialog user={user} dialogState={editDialog} setDialogSate={setEditDialog} >
                <UserProfileCover ratio='cover' src={!userImageData.cover_image ? user.cover_image : userImageData.cover_image} user={user}>
                    <input name='cover' accept='image/jpg, image/png, image/jpeg, image/gif' onChange={(e) => handleImageChange(e, 'cover')} className='hidden' type="file" ref={coverRef} />
                    <button onClick={() => triggerFileInput(coverRef)} type='button' className="text-white text-xl font-semibold bg-white/50 p-2 rounded-full">
                        <Pencil />
                    </button>
                    <button onClick={() => clearImageState('cover', coverRef)} type='button' className="text-white text-xl font-semibold bg-white/50 p-2 rounded-full">
                        <X />
                    </button>
                </UserProfileCover>
                <ProfileImage src={!userImageData.profile_image ? user.profile_image : userImageData.profile_image} username={user.username}>
                    <input name='icon' accept='image/jpg, image/png, image/jpeg, image/gif' onChange={(e) => handleImageChange(e, 'profile')} className='hidden m-0' type="file" ref={iconRef} />
                    <button onClick={() => triggerFileInput(iconRef)} type='button' className="text-white text-xl font-semibold p-2 rounded-full'">
                        <Pencil />
                    </button>
                </ProfileImage>
            </UserProfileDialog>
            {/* FUNDO DA IMAGEM DO USUÁRIO */}

            <ImageCopperModal
                imageRatio='cover'
                onImageCropComplete={(croppedImage) => {
                    updateInputValues('cover', croppedImage)
                    setUserImageData(i => ({ ...i, cover_image: croppedImage }))
                }}
                setDialogState={{
                    clearImageState: () => {
                        clearImageState('cover', coverRef)
                        handleCloseCoverCropModal()
                    }, closeDialog: setIsCropCoverModalOpen
                }}
                dialogState={cropCoverModalOpen}
                image={userImageData.cover_image}
            />

            {/* ÍCONE DO USUÁRIO */}

            <ImageCopperModal
                imageRatio='icon'
                onImageCropComplete={(croppedImage) => {
                    updateInputValues("icon", croppedImage)
                    setUserImageData(i => ({ ...i, profile_image: croppedImage }))
                }}
                setDialogState={{
                    clearImageState: () => {
                        clearImageState('profile', iconRef)
                        handleCloseProfileCropModal()
                    }, closeDialog: setIsCropProfileModalOpen
                }}
                imageProportions={imageRatio}
                dialogState={cropProfileModalOpen}
                image={userImageData.profile_image}
            />
        </>
    )
}