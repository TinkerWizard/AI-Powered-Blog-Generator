import Button from '@mui/material/Button';
import { TopBar } from '../../Utils/TopBar';
import { Interests } from './components/Interests';
import { BlogDisplay } from './components/BlogDisplay';
import { Recommended } from './components/Recommended';

export const HomePage:React.FC<{}> = () => {
    return(
        <div className="">
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block">
                <TopBar />
                <div className='d-flex' style={{width: '100%'}}>
                    <div className='py-5 px-2 d-flex flex-column justify-content-center align-items-center border border-right' style={{width: '60%'}}>
                        <Interests />
                        <BlogDisplay />

                    </div>
                    <div className='d-flex justify-content-center align-items-start' style={{width: '40%'}}>
                        <Recommended />
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="d-block d-sm-none">
                <TopBar />
            </div>
        </div>
    );
}