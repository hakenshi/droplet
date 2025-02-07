'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogFooter } from '../ui/dialog'
import Cropper, { Area } from "react-easy-crop"
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'

interface UserCropperModalProps {
    state: boolean
    setState: VoidFunction
    image: string
}

export default function UserCropperModal({ setState, state, image}: UserCropperModalProps) {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [ratio, setRatio] = useState(0)
    const [croppedArea, setCroppedArea] = useState<Area | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (image) {
            setIsLoaded(false); // Reseta o estado
            setTimeout(() => {
                setRatio(1200/300)
                setIsLoaded(true)
            }, 200); // Força um pequeno delay para garantir o re-render
        }
    }, [image]);

    const onCropComplete = (croppedAreaPercentage: Area, croppedAreadPixels: Area) => {
        console.log(croppedAreadPixels)
    }

    return (
        <Dialog onOpenChange={setState} open={state}>
            <DialogContent className="w-full max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Cortar Imagem</DialogTitle>
                </DialogHeader>

                <div className="relative w-full h-[400px]">
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
                        style={{
                            containerStyle: {
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: 'black',
                            },
                            cropAreaStyle: {
                                border: '2px solid #0ea5e9',
                                borderRadius: '0',
                                color: 'rgba(255, 255, 255, 0.5)',
                                width: "100%",
                                height: "100%"
                            },
                            mediaStyle: {
                                width: '100%',
                                height: '100%',
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
                                defaultValue={[zoom]}
                                max={3}
                                step={0.1}
                                min={1}
                                className='w-full'
                                onValueChange={(value) => setZoom(value[0])}
                            />
                        </div>
                        <div className='flex justify-end gap-5'>
                            <Button >Salvar</Button>
                            <Button onClick={setState}>Cancelar</Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
