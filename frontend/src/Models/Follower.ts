export class Follower{
    id: number;
    followee_id: number;
    follower_id: number;
    followed_at: Date;
    constructor(
        id: number,
        followee_id: number,
        follower_id: number,
        followed_at: Date
    )
    {
        this.id = id;
        this.followee_id = followee_id;
        this.follower_id = follower_id;
        this.followed_at = followed_at;
    }
}