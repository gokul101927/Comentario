import { useState } from 'react';
import { Link } from 'react-router-dom'

interface ModalProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: object;
}

const Header: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser }) => {

    const [isDropdownOpen, setDropdownOpen] = useState(true);

    const toggleDropdownOpen = (): void => {
        setDropdownOpen(!isDropdownOpen);
    }

    return (
        <header className="fadeIn">
            <div className='bg-primaryWhite shadow-lg sticky top-0'>
                <nav className='p-4'>
                    <div className="flex items-center justify-between">
                        <div>
                            <img src="../src/assets/logo.png" alt="logo" className="logo-image h-8" />
                        </div>
                        <div className="flex justify-between">
                            {/* Search bar */}

                            <div>
                                {!isLoggedIn ? <Link to="/sign-in" className="block text-sm font-small text-white rounded-md p-2 px-4 bg-primaryBlue hover:brightness-125 font-bold">Sign in</Link>
                                    :
                                    <div className='space-y-2'>
                                        <div onClick={toggleDropdownOpen} className='flex gap-2 items-center cursor-pointer rounded-lg pr-2 hover:bg-gray-200 hover:shadow-xl'>
                                            <div className='p-2 px-4 rounded-lg bg-primaryBlue text-white'>G</div>
                                            <div className='text-black font-small font-bold'>log</div>
                                        </div>
                                        { isDropdownOpen && <div className='absolute border right-2 z-50 bg-white rounded-lg shadow-xl w-44'>
                                            <ul className="py-2 text-sm text-gray-700 divide-y divide-solid divide-gray-200">
                                                <li>
                                                    <Link to="#" className="block px-4 py-2 hover:bg-gray-400 hover:text-white ">My profile</Link>
                                                </li>
                                                <li>
                                                    <div onClick={handleLogout} className="block px-4 py-2 hover:bg-red-400 text-red-700">Logout</div>
                                                </li>
                                            </ul>
                                        </div>}
                                    </div>}
                            </div>
                            {/* Login profile */}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header