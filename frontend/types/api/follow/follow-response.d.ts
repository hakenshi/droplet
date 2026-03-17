type FollowResponse = {
    followers: {
        count: number;
        user_followers: User[];
        is_follower: boolean;
    };
    following: {
        count: number;
        user_following: User[];
        is_following: boolean;
    };
};

type FollowActionResponse = {
    message: string;
    is_following: boolean;
};