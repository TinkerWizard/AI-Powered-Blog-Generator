import Button from '@mui/material/Button';
import { TopBar } from '../../Utils/TopBar';
import { Interests } from './components/Interests';
import { BlogDisplay } from './components/BlogDisplay';
import { Recommended } from './components/Recommended';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Box, ButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import Blog from '../../Models/Blog';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const username = useSelector((state: RootState) => state.auth.username);
    const navigate = useNavigate();
    
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [message, setMessage] = useState<string>('');
    const [view, setView] = useState<string>('following');
  
    useEffect(() => {
      fetchBlogs(`http://127.0.0.1:8000/api/blogs/following/${username}`, "Follow users to view their blogs in your feed");
    }, []);
  
    const fetchBlogs = async (url: string, defaultMessage: string) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          const data: Blog[] = await response.json();
          setBlogs(data);
          setMessage(data.length ? "" : defaultMessage);
        } else if (response.status === 401) {
          navigate('/signin');
        } else {
          setMessage("Failed to load blogs.");
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setMessage("An error occurred while fetching blogs.");
      }
    };
  
    const handleFollowingClick = async () => {
      setView('following');
      fetchBlogs(`http://127.0.0.1:8000/api/blogs/following/${username}`, "Follow users to view their blogs in your feed");
    };
  
    const handleMyBlogsClick = async () => {
      setView('myBlogs');
      fetchBlogs(`http://127.0.0.1:8000/api/blogs/author/${username}`, "You haven't uploaded any blogs");
    };
  
    return (
      <div>
        {/* Desktop */}
        <div className="d-none d-xl-block d-xxl-block">
          <TopBar />
          <div className='d-flex' style={{ width: '100%' }}>
            <div className='py-5 px-2 d-flex flex-column justify-content-start align-items-center border border-right' style={{ width: '60%' }}>
              <Box display="flex" justifyContent="center">
                <ButtonGroup>
                  <Button
                    onClick={handleFollowingClick}
                    variant={view === "following" ? "contained" : "outlined"}
                  >
                    Following
                  </Button>
                  <Button
                    onClick={handleMyBlogsClick}
                    variant={view === "myBlogs" ? "contained" : "outlined"}
                  >
                    My Blogs
                  </Button>
                </ButtonGroup>
              </Box>
              <BlogDisplay blogs={blogs} message={message} />
            </div>
            <div className='d-flex justify-content-center align-items-start' style={{ width: '40%' }}>
              {/* <Recommended /> */}
            </div>
          </div>
        </div>
  
        {/* Mobile */}
        <div className="d-block d-sm-none">
          <TopBar />
        </div>
      </div>
    );
  };