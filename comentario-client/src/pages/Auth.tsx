import { useLocation } from 'react-router-dom'

import Signin from '../components/Signin'
import Signup from '../components/Signup'

const Auth = () => {

  const location = useLocation();

  return (
    <div className='min-h-screen flex items-center justify-center'>
        {location.pathname === '/sign-in' && <Signin/> }
        {location.pathname === '/sign-up' && <Signup/> }

    </div>
  )
}

export default Auth