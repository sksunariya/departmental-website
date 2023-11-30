import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import setUser from '../../slices/profileSlice';
import { setLoading, setToken } from "../../slices/authSlice";

import toast from "react-hot-toast";


const {SIGNUP_API, LOGIN_API, SENDOTP_API, RESETPASSTOKEN_API, RESETPASS_API} = endpoints;

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {email, checkUserPresent: true});
            console.log("Response obtained from send otp api : " , response);
            
            if (!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTP sent to the email Id.");
            navigate('/verify-email');
            
        } catch (error) {
            console.log(error);
            toast.error("Error while sending OTP.");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}




export function signUp( accountType, firstName, lastName, email, password, confirmPassword, otp, navigate ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SIGNUP_API, {accountType, firstName, lastName, email, password, confirmPassword, otp });
  
        console.log("Response obtained from signup api: ", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful, LogIn to continue.")
        navigate("/login")

      } catch (error) {
        console.log("Error while signing up.", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }



  
export function login(email, password, navigate) {
    return async (dispatch) => {
        
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {email, password})
  
        console.log("Response obtained from Login API.", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")

        dispatch(setToken(response.data.token))
        console.log("Token obtained is" , response.data.token);
        const userImage = (response.data?.user?.image) ? (response.data.user.image) : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
        console.log("user details : ", response.data.user.image);

        // dispatch(setUser({ ...response.data.user, image: userImage }))
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("Error in log in api.", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }




  
export function logout(navigate) {
    return (dispatch) => {
    //   dispatch(setToken(null));
    //   dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged Out");
      navigate("/");
    }
  }
  



  

export function getPasswordResetToken(email , setEmailSent) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{ 
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})
  
        console.log("Response obtained from reset password api", response);
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Reset Email Sent");
        setEmailSent(true);
      }
      catch(error) {
        console.log("Error occurred while getting password reset token", error);
        toast.error("Failed to send email for resetting password");
      }
      dispatch(setLoading(false));
    }
  }
  
  export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST", RESETPASS_API, {password, confirmPassword, token});
  
        console.log("Response from reset password api ", response);
  
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Password has been resetted successfully");
      }
      catch(error) {
        console.log("Error while resetting password", error);
        toast.error("Couldn't reset password");
      }
      dispatch(setLoading(false));
    }
  }