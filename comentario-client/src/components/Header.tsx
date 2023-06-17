const Header = () => {
    return (
        <div className="relative mb-20">
            <div className='bg-primaryWhite shadow-lg fixed top-0 left-0 right-0'>
                <nav className='p-4'>
                    <div className="flex items-center justify-between">
                        <div>
                            <img src="../src/assets/logo.png" alt="logo" className="logo-image h-8" />
                        </div>
                        <div className="pt-2 flex justify-between">
                            {/* Search bar */}
                            
                            <div>
                                <button className="block text-sm font-small text-white rounded-md p-2 px-4 bg-primaryBlue hover:brightness-125" type="button">Sign in</button>
                            </div>
                            {/* Login profile */}
                        </div>
                    </div>
                </nav>
            </div>
        </div>


    )
}

export default Header