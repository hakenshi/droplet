'use client'

import { SetStateAction, useEffect, useState } from 'react'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogFooter } from '../ui/dialog'
import Cropper, { Area } from "react-easy-crop"
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'

interface ImageCropperModalProps {
    dialogState: boolean
    setDialogState: {
        clearImageState: VoidFunction,
        closeDialog: (value: SetStateAction<boolean>) => void
    }
    imageRatio: 'cover' | 'icon',
    imageProportions?: {
        w: number,
        h:number
    }
    image: string
    onImageCropComplete: (croppedImage: string) => void
}

const ratios = {
    cover: {
        w: 12,
        h: 3,
    },
    icon: {
        w: 1,
        h: 1,
    }
}


export default function ImageCopperModal({ setDialogState, dialogState, image, onImageCropComplete, imageRatio, imageProportions }: ImageCropperModalProps) {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(0)
    const [ratio, setRatio] = useState(0)
    const [croppedArea, setCroppedArea] = useState<Area | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (image) {
            setIsLoaded(false);
            setTimeout(() => {
                const { w, h } = ratios[imageRatio];
                setZoom(imageProportions?.w === imageProportions?.h  && imageRatio === "icon" ? 0.59 : 1)
                setRatio(w / h);
                setIsLoaded(true)
            }, 200);
        }
    }, [image, imageProportions, imageProportions?.h, imageProportions?.w, imageRatio]);

    const onCropComplete = (_: Area, croppedAreadPixels: Area) => {
        setCroppedArea(croppedAreadPixels)
    }

    const createImage = (url: string): Promise<HTMLImageElement> => {

        return new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => {
                console.log("carregando image")
                resolve(image)
            })
            image.addEventListener('error', () => {
                console.log("erro ao carregar a imagem")
                reject(image)
            })
            image.src = url
        })
    }

    const getCroppedImage = async (imageSrc: string, pixelCrop: Area) => {

        try {
            const image = await createImage(imageSrc)
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            if (!ctx) {
                throw new Error('Canvas context was not found.')
            }

            canvas.width = pixelCrop.width
            canvas.height = pixelCrop.height

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height,
            )

            return new Promise((resolve, reject) => {
                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Canvas is empty'))
                        return;
                    }

                    const reader = new FileReader()

                    reader.onloadend = () => resolve(reader.result as string)
                    reader.readAsDataURL(blob)

                }, 'image/jpg')
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleSave = async () => {

        if (!croppedArea || !image) {
            console.log("banana")
            console.log(croppedArea)
            console.log(image)
            return
        }
        try {
            const croppedImage = await getCroppedImage(image, croppedArea) as string
            console.log(croppedImage)
            onImageCropComplete(croppedImage)
            setDialogState.closeDialog(false)
        }
        catch (e) {
            console.error("Algo deu errado", e)
        }
    }


    return (
        <Dialog onOpenChange={setDialogState.clearImageState} open={dialogState}>
            <DialogContent className="w-full max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Cortar Imagem</DialogTitle>
                </DialogHeader>

                <div className="relative w-full h-[500px]">
                    {!isLoaded ? (<div className='loader'></div>) : <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={ratio}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        objectFit="cover"
                        cropShape="rect"
                        showGrid={false}
                        restrictPosition={true}
                        style={imageRatio === "cover" ? {
                            containerStyle: {
                                position: 'relative',
                                // width: '100%',
                                maxHeight: '100%',
                                background: 'black',
                            },
                            cropAreaStyle: {
                                border: '2px solid #0ea5e9',
                                borderRadius: '0',
                                color: 'rgba(255, 255, 255, 0.5)',
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain"
                            },
                            mediaStyle: {
                                maxWidth: '100%',
                                // height: "100%",
                                background: 'black',
                                objectFit: 'contain',
                            },
                        } : {
                            containerStyle: {
                                position: 'relative',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                background: 'black',
                            },
                            cropAreaStyle: {
                                border: '2px solid #0ea5e9',
                                borderRadius: '0',
                                color: 'rgba(255, 255, 255, 0.5)',
                                maxWidth: "100%",
                                maxHeight: "100%",
                                // objectFit: "contain"
                            },
                            mediaStyle: {
                                // width: '100%',
                                maxHeight: "100%",
                                background: 'black',
                                objectFit: 'contain',
                            },
                        }}
                    />}
                </div>
                <DialogFooter>
                    <div className="flex flex-col w-full gap-5">
                        <div className='w-11/12'>
                            <Slider
                                value={[zoom]}
                                max={3}
                                step={0.1}
                                min={1}
                                className='w-full'
                                onValueChange={(value) => setZoom(value[0])}
                            />
                        </div>
                        <div className='flex justify-end gap-5'>
                            <Button type='button' onClick={handleSave}>Salvar</Button>
                            <Button type='button' onClick={setDialogState.clearImageState} variant={"destructive"}>Cancelar</Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
