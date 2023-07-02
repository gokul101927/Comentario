import { useEffect, useState } from 'react';
import api from '../api/apiConfig';


const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      // Verify the JWT on the server-side to ensure it is valid
      // If the JWT is valid, set the isLoggedIn state to true
      const config = {
        headers:{
          Authorization: token
        }
      };
      api.get('/users/validate', config)
        .then(() => {
            setIsLoggedIn(true)
            console.log("logged in")
        })
            
        .catch(err => {
          console.error(err)
          setIsLoggedIn(false)
          logout();
          console.log("logged out")
        })
      
    }
  });

  const logout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    console.log("logged out")
  };

  const login = (token: string): void => {
    localStorage.setItem('jwt', token);
    setIsLoggedIn(true);
    console.log("logged in")
  };

  return { isLoggedIn, login, logout };
};

export default useAuthentication;
