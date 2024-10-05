export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    hashed_password: string;
    created_at: Date;
    updated_at: Date;
    profile_pic: string;

    constructor(
        id: number,
        name: string,
        username: string,
        email: string,
        hashed_password: string,
        created_at: Date,
        updated_at: Date,
        profile_pic: string
    )
    {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.hashed_password = hashed_password;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.profile_pic = profile_pic;
    }
}