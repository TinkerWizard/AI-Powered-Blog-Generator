import thumbnail from './../../../Images/thumbnail.jpg';

export const BlogDisplay: React.FC<{}> = () => {

    const blogs = [
        {
            "id": 1,
            "author": "John Smith",
            "title": "Exploring the World of AI",
            "brief": "A comprehensive guide to understanding artificial intelligence and its applications.",
            "date": "2024-08-01",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 2,
            "author": "Sarah Lee",
            "title": "10 Best Travel Destinations for 2024",
            "brief": "Discover the top travel spots to visit in 2024, from exotic beaches to bustling cities.",
            "date": "2024-07-15",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 3,
            "author": "Michael Brown",
            "title": "How to Start a Fitness Journey",
            "brief": "Tips and tricks to stay motivated and achieve your fitness goals.",
            "date": "2024-06-20",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 4,
            "author": "Jessica Thompson",
            "title": "The Rise of Remote Work",
            "brief": "An analysis of the growing trend of working from home and its impact on industries.",
            "date": "2024-07-30",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 5,
            "author": "David Miller",
            "title": "Top 5 Gadgets to Look Out for in 2024",
            "brief": "A sneak peek into the hottest tech gadgets launching this year.",
            "date": "2024-07-10",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 6,
            "author": "Emily Wilson",
            "title": "A Beginner's Guide to Meditation",
            "brief": "Learn the basics of meditation and its numerous health benefits.",
            "date": "2024-05-25",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 7,
            "author": "Chris Adams",
            "title": "How to Cook the Perfect Steak",
            "brief": "Step-by-step instructions on cooking a restaurant-quality steak at home.",
            "date": "2024-06-15",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 8,
            "author": "Sophia Turner",
            "title": "Interior Design Trends for 2024",
            "brief": "Explore the latest interior design trends that will dominate homes this year.",
            "date": "2024-07-22",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 9,
            "author": "James Robinson",
            "title": "A Guide to Personal Finance",
            "brief": "Manage your money better with these personal finance tips and strategies.",
            "date": "2024-08-05",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 10,
            "author": "Olivia Martinez",
            "title": "The Best Books to Read This Summer",
            "brief": "A list of must-read books to enjoy during your summer vacation.",
            "date": "2024-06-30",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 11,
            "author": "Ethan White",
            "title": "How to Master the Art of Photography",
            "brief": "Tips for improving your photography skills, from composition to lighting.",
            "date": "2024-08-12",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 12,
            "author": "Isabella Green",
            "title": "The Future of Electric Cars",
            "brief": "A look into the advancements and challenges in the electric vehicle industry.",
            "date": "2024-07-08",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 13,
            "author": "Daniel Wright",
            "title": "The Benefits of Learning a New Language",
            "brief": "Why learning a second language can enhance your personal and professional life.",
            "date": "2024-06-28",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 14,
            "author": "Mia Harris",
            "title": "How to Build a Successful Online Business",
            "brief": "Practical tips on starting and growing your own online business from scratch.",
            "date": "2024-07-14",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 15,
            "author": "Benjamin King",
            "title": "The Importance of Mental Health",
            "brief": "Understanding the significance of mental health and how to care for it.",
            "date": "2024-08-03",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 16,
            "author": "Emma Hall",
            "title": "How to Style Your Wardrobe for Summer 2024",
            "brief": "The ultimate guide to staying fashionable and comfortable during the hot season.",
            "date": "2024-06-10",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 17,
            "author": "Lucas Young",
            "title": "The History of Video Games",
            "brief": "A deep dive into the history and evolution of video games over the decades.",
            "date": "2024-05-20",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 18,
            "author": "Chloe Scott",
            "title": "The Science Behind Climate Change",
            "brief": "An informative piece on the science of climate change and what we can do about it.",
            "date": "2024-07-18",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 19,
            "author": "Jack Walker",
            "title": "Understanding Cryptocurrency",
            "brief": "A beginner-friendly guide to understanding how cryptocurrency works.",
            "date": "2024-08-06",
            "thumbnail": `${thumbnail}`
        },
        {
            "id": 20,
            "author": "Grace Davis",
            "title": "The Art of Minimalism",
            "brief": "Why minimalism is more than just a trend and how it can improve your life.",
            "date": "2024-06-05",
            "thumbnail": `${thumbnail}`
        }
    ];


    return (
        <div style={{width: '100%'}}>
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block" style={{width: '100%'}}>
                {
                    blogs.map((blog) => (
                        <div key={blog.id} className='d-flex justify-content-between align-items-center px-5 border-bottom' style={{width: '100%'}}>
                            {/* Content section */}
                            <div style={{width: '80%'}} className='p-3'>
                                <p>{blog.author}</p>
                                <h5>{blog.title}</h5>
                                <p style={{maxWidth: '80%'}} >{blog.brief}</p>
                                <p>{blog.date}</p>
                            </div>
                            {/* Thumbnail section */}
                            <div style={{width: '20%'}}>
                                <img src={thumbnail} alt="" width={'100%'} />
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