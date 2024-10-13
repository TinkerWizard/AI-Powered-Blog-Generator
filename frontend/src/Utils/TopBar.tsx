import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout, removeJwtToken } from './../store/authSlice';
export const TopBar: React.FC<{}> = () => {
    const token = useSelector((state: RootState) => state.auth.token); 
    const username = useSelector((state: RootState) => state.auth.username);
    const navigate = useNavigate();
    const handleCreateBlogClick = () => {
        navigate('/blogs/generate');
    }
    const dispatch = useDispatch();
    const handleLogoutClick = async () => {
        dispatch(logout());
        dispatch(removeJwtToken());
        navigate('/signin');
    }

    const handleHomeClick = () => {
        navigate(`/home/${username}`)
    }
    return (
        <div className="border-bottom p-4">
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block" style={{ width: '100%' }}>
                <div className="d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
                    <div className="d-flex gap-3" style={{ width: '100%' }}>
                        <Link onClick={handleHomeClick} className="fs-2 fw-bold">GenBlog</Link>
                        <form action="" className='d-flex justify-content-center align-items-center' style={{ width: '45%' }}>
                            <input type="text" placeholder='Search' className='border border-dark rounded p-2' style={{ width: '100%' }} />
                        </form>
                    </div>
                    <div className="d-flex gap-3">
                        <button onClick={handleCreateBlogClick}>
                            <CreateOutlinedIcon sx={{ fontSize: 40 }} />
                        </button>
                        <button onClick={handleLogoutClick}>
                            <AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile */}
            <div className="d-block d-sm-none">
                <div className="d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
                    <div className="d-flex gap-3" style={{ width: '100%' }}>
                        <span className="fs-1 fw-bold">GenBlog</span>
                    </div>
                    <div className="d-flex gap-4">
                        <SearchOutlinedIcon fontSize="large" />
                        <CreateOutlinedIcon fontSize="large" />
                        <AccountCircleOutlinedIcon fontSize="large" />
                    </div>
                </div>
            </div>
        </div>
    );
}