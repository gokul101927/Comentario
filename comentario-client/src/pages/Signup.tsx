import { motion } from "framer-motion";
import { Link } from 'react-router-dom'

import SignupForm from "../components/SignUpForm";

const Signup = () => {

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="flex justify-center items-center min-h-screen">
      <div className="bg-primaryWhite shadow p-8 space-y-5 rounded-xl w-80 md:w-96">
        <div className="flex justify-center p-4 items-center">
          <Link to="/">
            <img
              src="../src/assets/logo.png"
              alt="logo"
              className="logo-image h-8"
            />
          </Link>
          
        </div>
        <h2 className="text-black font-bold">Get started now.</h2>
        <SignupForm/>
      </div>
    </motion.div>
  );
};

export default Signup;
