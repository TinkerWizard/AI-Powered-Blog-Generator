import { useEffect, useState } from 'react';
import Blog from './../../../Models/Blog';
export const BlogDisplay: React.FC<{}> = () => {

    const [blogs, setBlogs] = useState<Blog[]>();
    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/blogs/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Blog[] = await response.json();
                // alert(data[0].thumbnail);
                setBlogs(data);

            } catch (error: any) {
                console.error('Failed to fetch blogs:', error);
            }
        }
        fetchBlogs();
    }, []);

    return (
        <div style={{ width: '100%' }}>
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block" style={{ width: '100%' }}>
                {
                    blogs?.map((blog) => (
                        <div key={blog.id} className='d-flex justify-content-between align-items-center px-5 border-bottom' style={{ width: '100%' }}>
                            {/* Content section */}
                            <div style={{ width: '80%' }} className='p-3'>
                                <p>{blog.author_name}</p>
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
                }
            </div>
            {/* Mobile */}
            <div className="d-block d-sm-none">

            </div>
        </div>
    );
}