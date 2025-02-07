import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function Post({ user }: { user: User }) {
    return (
        <Card>
            <CardContent>
                <CardHeader>
                    <div className='flex items-center gap-3'>
                        <Avatar>
                            <AvatarImage src={"/avatar.png"} alt="avatar" />
                            <AvatarFallback className="bg-sky-500 text-white">
                                {user.username.toUpperCase().substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <p className='text-zinc-800'>{user.username}</p>
                    </div>
                </CardHeader>
                <CardFooter>
                    XD
                </CardFooter>
            </CardContent>
        </Card>
    )
}
