import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

interface ModalProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: UserState | null;
}

interface User {
    id: {
        timestamp: number;
        date: string;
    };
    fullName: string;
    mailId: string;
    password: string;
    verificationToken: {
        userToken: string;
        expiryDate: string;
    };
    roles: Array<{
        authority: string;
    }>;
    profileImageUrl: string;
    enabled: boolean;
    verified: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    username: string;
    authorities: Array<{
        authority: string;
    }>;
}

type UserState = Omit<User, 'password' | 'verificationToken'>;

const Header: React.FC<ModalProps> = ({ handleLogout, isLoggedIn, loggedInUser }) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdownOpen = (): void => {
        setDropdownOpen(!isDropdownOpen);
    }

    const logoutUser = (): void => {
        handleLogout();
        navigate("/sign-in");
    }

    return (
        <header className="sticky top-0 ">
            <div className='bg-primaryWhite shadow-lg z-999'>
                <nav className='p-2'>
                    <div className="flex items-center justify-between">
                        <div>
                            <Link to="/">
                                <img
                                    src="../src/assets/logo.png"
                                    alt="logo"
                                    className="logo-image h-8"
                                />
                            </Link>
                        </div>
                        <div className="flex justify-between">
                            {/* Search bar */}

                            <div>
                                {!isLoggedIn ? <Link to="/sign-in" className="block text-sm font-small text-white rounded-md p-2 px-4 bg-primaryBlue hover:brightness-125 font-bold">Sign in</Link>
                                    :
                                    <div className='space-y-2'>
                                        <div onClick={toggleDropdownOpen} className='flex gap-2 items-center cursor-pointer rounded-lg p-2 hover:bg-gray-200 hover:shadow-xl'>
                                            <img
                                                src={loggedInUser?.profileImageUrl}
                                                alt="logo"
                                                className="rounded-full h-8 w-8 object-center object-cover"
                                            />
                                            <div className='text-black font-small font-bold'>{loggedInUser?.fullName}</div>
                                        </div>
                                        {isDropdownOpen && <div className='absolute border right-2 z-20 bg-white rounded-lg shadow-xl w-44'>
                                            <ul className="py-2 z-20 text-sm text-gray-700 divide-y divide-solid divide-gray-200">
                                                <li>
                                                    
                                                    <Link to="/my-profile" className="flex z-20 items-center gap-2 px-4 py-2 hover:bg-gray-300 font-bold">
                                                    <img src="../src/assets/profile-icon.png"
                                                        alt="logo"
                                                        className="profile-icon h-4">
                                                    </img>My profile</Link>
                                                </li>
                                                <li >
                                                   
                                                    <div onClick={logoutUser} className="flex z-20 items-center gap-2 cursor-pointer px-4 py-2 font-bold hover:bg-red-500 text-red-500 hover:text-primaryWhite">
                                                    <img src="../src/assets/logout.png"
                                                        alt="logo"
                                                        className="profile-icon h-4">
                                                    </img>Logout</div>
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