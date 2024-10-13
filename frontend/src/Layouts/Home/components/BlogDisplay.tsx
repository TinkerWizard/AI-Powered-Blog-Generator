import Blog from './../../../Models/Blog';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
export const BlogDisplay: React.FC<{blogs: Blog[], message: string}> = ({blogs, message}) => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token); 
     const username = useSelector((state: RootState) => state.auth.username);

    const handleAuthorClick = async (username: string) => {
        navigate(`/home/user/${username}`);
    }
    return (
        <div style={{ width: '100%' }}>
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block" style={{ width: '100%' }}>
                {
                    blogs?.length > 0 ? (
                        blogs?.map((blog: Blog) => (
                            <div key={blog.id} className='d-flex justify-content-between align-items-center px-5 border-bottom' style={{ width: '100%' }}>
                                {/* Content section */}
                                <div style={{ width: '80%' }} className='p-3'>
                                    <Link
                                        href="#"
                                        underline="always"
                                        onClick={() => {
                                            handleAuthorClick(blog.author_username)
                                          }}
                                    >
                                        {`${blog.author_name}`}
                                    </Link>
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
                        <p>{message}</p>
                    )
                }

            </div>
            {/* Mobile */}
            <div className="d-block d-sm-none">

            </div>
        </div>
    );
}