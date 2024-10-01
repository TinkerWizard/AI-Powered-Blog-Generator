export const SearchBar: React.FC<{}> = () => {
    return (
        <div style={{ width: '100%' }}>
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block" style={{ width: '45%' }}>
                <form action="" className='d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
                    <input type="text" placeholder='Search' className='border border-dark rounded p-2' style={{width:'100%'}} />
                </form>
            </div>

            {/* Mobile */}
            <div className="d-block d-sm-none">

            </div>
        </div>
    );
}