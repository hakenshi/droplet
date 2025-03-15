import FollowButton from '@/components/buttons/follow-button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import UserEditProfileDialog from '@/components/user-profile/user-edit-profile-dialog'
import UserProfileTabs from '@/components/user-profile/user-profile-tabs'
import { getAuthUser } from '@/utils/getAuthUser'
import Image from 'next/image'
import { getFollowUsers, getUserLikedPosts, getUserPosts, getUserProfile } from '../actions/actions'
import UnfollowButton from '@/components/buttons/unfollow-button'
import Link from 'next/link'

export default async function ProfilePage({ params }: { params: { username: string } }) {

    const { username } = await params
    const user = await getUserProfile(username)
    const { user: authUser } = await getAuthUser()
    const { posts } = await getUserPosts(username)
    const { likedPosts } = await getUserLikedPosts(user.username)
    const { following, followers } = await getFollowUsers(user.username)

    return (
        <div className='grid grid-rows-[0.65fr,auto,1fr] max-h-screen overflow-y-scroll px-5 no-scroll-bar'>
            <AspectRatio ratio={12 / 3}>
                <div className='flex justify-center '>
                    {user.cover_image ? (
                        <Image
                            className='object-cover rounded-md'
                            width={1920}
                            height={1080}
                            src={user.cover_image}
                            alt={`${user.name}'s background image`}
                        />
                    ) :
                        <div className='bg-gradient-to-br from-blue-800 via-sky-500 to-lime-300 w-full h-full rounded-md flex items-center justify-center'>
                        </div>
                    }
                </div>
            </AspectRatio>
            <div className='h-fit'>
                <div className='relative flex flex-col justify-center items-start'>
                    <div className="flex w-full justify-between h-fit px-5 pb-3 pt-5 items-center space-x-4"                >
                        <div className='flex items-center justify-center'>
                            <Avatar className='size-28 border-2 border-white'>
                                <AvatarImage src={user.profile_image} alt="avatar" />
                                <AvatarFallback className="bg-lime-500 text-white text-3xl">
                                    {user.username.toUpperCase().substring(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <ul className='mx-3 flex flex-col gap-1'>
                                <li className='text-zinc-800'>
                                    {user.name && user.surname ? `${user.name} ${user.surname}` : user.username}
                                    <span className='text-lime-500 ml-1'>
                                        @{user.username}
                                    </span>
                                </li>
                                <li className='text-zinc-500 text-sm'>
                                    18/08/2003
                                </li>
                                <li className='text-zinc-500 text-sm'>
                                    Entrou em {user.created_at && Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(user.created_at))}
                                </li>
                                <li className='text-sm text-zinc-600'>
                                    {user.bio}
                                </li>
                                <li className='flex gap-2 text-sm'>
                                    <Link href={`/profile/${user.username}/follows`} className='text-zinc-500 hover:text-zinc-800'>
                                        <span className='font-medium'>{following.count}</span> seguidores
                                    </Link>
                                    <Link href={`/profile/${user.username}/follows`} className='text-zinc-500 hover:text-zinc-800'>
                                        <span className='font-medium'>{followers.count}</span> seguindo
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {user.username === authUser.username ? <UserEditProfileDialog user={user} /> : (
                            !following.is_following ?
                                <FollowButton user={user} />
                                : <UnfollowButton user={user} />
                        )}
                    </div>
                </div>
                <UserProfileTabs user={authUser} posts={posts as unknown as PostSuccessResponse[]} likedPosts={likedPosts} />
            </div>
        </div>
    )
}