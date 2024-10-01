import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const interests = [
    "food",
    "games",
    "movies",
    "sports",
    "books",
    "tech",
    "fashion",
    // "travel",
    // "music",
    // "art",
    // "fitness",
    // "photography",
    // "cooking",
    // "nature",
    // "science",
    // "history",
    // "poetry",
    // "theater",
    // "gaming",
    "DIY projects",
    "writing"
];
export const Interests: React.FC<{}> = () => {
    return (
        <div>
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block">

                <div>
                    <ButtonGroup variant="outlined" sx={{color: 'black'}} aria-label="Basic button group">
                        {
                            interests.map((interest) => (
                                <Button key={interest}>{interest}</Button>
                            ))
                        }
                    </ButtonGroup>
                </div>

            </div>

            {/* Mobile */}
            <div className="d-block d-sm-none">

            </div>
        </div>
    );
}