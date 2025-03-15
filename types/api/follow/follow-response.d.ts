type FollowResponse = {
    followers: {
        count: number
        user_followers: User[]
        is_follower: boolean
    }
    following: {
        count: number
        following_users: User[]
        is_following: boolean
    }
}