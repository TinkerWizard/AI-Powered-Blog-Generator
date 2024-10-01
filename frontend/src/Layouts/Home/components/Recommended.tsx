import profilePic from './../../../Images/profilePic.jpg';
export const Recommended: React.FC<{}> = () => {
    const staffPicks = [
        {
            "id": 1,
            "author": "Ava Peterson",
            "title": "Mastering Public Speaking"
        },
        {
            "id": 2,
            "author": "Liam Collins",
            "title": "Understanding Blockchain Technology"
        },
        {
            "id": 3,
            "author": "Mason Hughes",
            "title": "How to Stay Motivated While Working Remotely"
        },
        {
            "id": 4,
            "author": "Ella Rogers",
            "title": "The Benefits of Yoga for Mental Health"
        },
        {
            "id": 5,
            "author": "Noah Foster",
            "title": "The Power of Digital Marketing in 2024"
        }
    ];

    const recommendedTopics = [
        "Artificial Intelligence",
        "Blockchain Technology",
        "Mental Health and Well-being",
        "Remote Work Best Practices",
        "Sustainable Living",
        "Digital Marketing Trends"
    ];

    const whoToFollow = [
        {
            "id": 1,
            "profilePic": `${profilePic}`,
            "name": "John Doe",
            "bio": "Tech enthusiast, software developer, and coffee lover."
        },
        {
            "id": 2,
            "profilePic": `${profilePic}`,
            "name": "Jane Smith",
            "bio": "Digital marketer with a passion for photography and travel."
        },
        {
            "id": 3,
            "profilePic": `${profilePic}`,
            "name": "Emily Johnson",
            "bio": "Yoga instructor, wellness advocate, and mental health champion."
        }
    ];


    return (
        <div style={{ width: '100%' }} className='p-3'>
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block">
                {/* Main Div */}
                <div>
                    {/* Staff Picks */}
                    <div className='border-bottom'>
                        <h4>Staff Picks</h4>
                        {
                            staffPicks.map((staffPick) => (
                                <div key={staffPick.id} className='d-flex flex-column p-2'>
                                    <p>{staffPick.author}</p>
                                    <h5>{staffPick.title}</h5>
                                </div>
                            ))
                        }
                    </div>
                    {/* Recommended Topics */}
                    <div className='d-flex flex-wrap border-bottom py-3'>
                        <h4>Recommended Topics</h4>
                        {
                            recommendedTopics.map((topic) => (
                                <div key={topic} className='m-1'>
                                    <button className='border rounded'>{topic}</button>
                                </div>
                            ))
                        }
                    </div>
                    {/* Who to follow */}
                    <div className='py-3'>
                        {
                            whoToFollow.map((user) => (
                                <div key={user.id} className='d-flex'>
                                    <div className='d-flex justify-content-center align-items-start'>
                                        <div>
                                            <img src={user.profilePic} alt="" width={'20%'} />
                                        </div>
                                        <div>
                                            <h5>{user.name}</h5>
                                            <p>{user.bio}</p>
                                        </div>
                                    </div>
                                    <button className='btn btn-primary'>Follow</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="d-block d-sm-none">
            </div>
        </div>
    );
}