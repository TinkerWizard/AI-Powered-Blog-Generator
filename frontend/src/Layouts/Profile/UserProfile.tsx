import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blog from "../../Models/Blog";
import { TopBar } from "../../Utils/TopBar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Button } from "@mui/material";

export const UserProfile: React.FC<{}> = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const username = useSelector((state: RootState) => state.auth.username);
    const { author_username } = useParams();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    //store retrieved data
    const [name, setName] = useState<string>();
    const [profilePic, setProfilePic] = useState<string>();
    const [createdAt, setCreatedAt] = useState();
    const [blogCount, setBlogCount] = useState<number>();
    const [followerCount, setFollowerCount] = useState<number>();

    const [isFollowing, setIsFollowing] = useState<boolean>();
    useEffect(() => {
        async function fetchAuthorBlogs() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/blogs/author/${author_username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setBlogs(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAuthorBlogs();
    }, [author_username, token]);

    //get the user
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${author_username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setName(data.name);
                    setProfilePic(data.profile);
                    setCreatedAt(data.created);
                    setBlogCount(data.blog_count);
                    setFollowerCount(data.follower_count);
                    setIsFollowing(data.is_following);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [author_username, token, isFollowing]);
    const handleFollowClick = async () => {
        //send to the api
        //for deleting/ unfollowing
        try {
            if (isFollowing) {
                const response = await fetch(`http://127.0.0.1:8000/api/followers`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "followee_username": author_username,
                        "follower_username": username
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    setIsFollowing(!isFollowing);
                }
            }
        } catch (error: any) {
            console.log(error);
        }

        try {
            if (!isFollowing) {
                const response = await fetch(`http://127.0.0.1:8000/api/followers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "followee_username": author_username,
                        "follower_username": username
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    setIsFollowing(isFollowing);
                }
            }
        } catch (error: any) {
            console.log(error);
        }

    }
    return (
        <div style={{ width: '100%' }}>
            <TopBar />
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block" style={{ width: '100%' }}>
                <div className="d-flex">
                    <div className="" style={{ width: '70%' }}>
                        <h3 className="mx-4">{name}'s Blogs</h3>
                        {
                            blogs?.length > 0 ? (
                                blogs?.map((blog) => (
                                    <div key={blog.id} className='d-flex justify-content-between align-items-center px-5 border-bottom' style={{ width: '100%' }}>
                                        {/* Content section */}
                                        <div style={{ width: '80%' }} className='p-3'>
                                            <p>
                                                {`${blog.author_name}`}
                                            </p>
                                            <h5>{blog.title}</h5>
                                            <p style={{ maxWidth: '80%' }}>
                                                {blog.body.split(' ').slice(0, 20).join(' ')}{blog.body.split(' ').length > 20 ? '...' : ''}
                                            </p>
                                            <p>Published on: {new Date(blog.created_date).toLocaleDateString()}</p>
                                        </div>
                                        {/* Thumbnail section */}
                                        <div style={{ width: '20%' }}>
                                            {blog.blog_cover && (
                                                <img src={`data:image/jpeg;base64,${blog.blog_cover}`} alt={blog.title} width={'100%'} />
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Follow users to see blogs in feed</p>
                            )
                        }
                    </div>
                    {/* Profile section */}
                    <div className="p-5 border-right d-flex flex-column gap-2" style={{ width: '30%' }}>
                        {/* name, username profile picture */}
                        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
                            <div className="d-flex flex-column" style={{ width: '100%' }}>
                                <h4>{name}</h4>
                                <h6>@{author_username}</h6>
                            </div>
                            <div className="d-flex justify-content-end">
                                <img src={`data:image/jpeg;base64,${profilePic}`} alt={name} style={{ width: '50%', borderRadius: '100%' }} />
                            </div>
                        </div>
                        {/* Follow button */}
                        <div className="d-flex justify-content-start">
                            <Button
                                variant="contained"
                                onClick={handleFollowClick}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        </div>
                        {/* Other data */}
                        <div className="d-flex gap-2">
                            <div className="d-flex flex-column">
                                <p>GenBlogger since:</p>
                                <p>No. of blogs posted:</p>
                                <p>No. of followers:</p>
                            </div>
                            <div className="d-flex flex-column">
                                <p>{createdAt}</p>
                                <p>{blogCount}</p>
                                <p>{followerCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className="d-block d-sm-none">

            </div>
        </div>
    );
}