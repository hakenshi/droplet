import React, { useEffect, useState } from 'react'

export default function PostTime({ created_at }: { created_at: Date }) {
    const [postTime, setPostTime] = useState("")

    function getPostTime(postTime: Date) {
        const now = new Date()
        const diff = now.getTime() - postTime.getTime()
        const diffInSeconds = diff / 1000
        const diffInMinutes = diffInSeconds / 60
        const diffInHours = diffInMinutes / 60
        const diffInDays = diffInHours / 24

        if (diffInDays >= 1) {
            setPostTime(`Postado em ${Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(postTime)} às ${Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(postTime)}`)
        } else if (diffInHours >= 1) {
            setPostTime(`Postado há ${Math.floor(diffInHours)} horas`)
        } else if (diffInMinutes >= 1) {
            setPostTime(`Postado há ${Math.floor(diffInMinutes)} minutos`)
        } else if (diffInSeconds >= 30) {
            setPostTime(`Postado há ${Math.floor(diffInSeconds)} segundos`)
        } else if (diffInSeconds <= 5) {
            setPostTime(`Postado há poucos segundos`)
        } else if (now.getTime() === postTime.getTime()) {
            setPostTime(`Postado agora`)
        }
    }

    useEffect(() => {
        getPostTime(new Date(created_at))
    }, [created_at])

    return (
        <p className='text-zinc-500 text-sm'>{postTime}</p>
    )
}
