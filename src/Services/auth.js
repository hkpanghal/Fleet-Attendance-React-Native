import axios from "axios";

const url="https://fleet-attendance-backend.onrender.com"
// const url = `http://${ipAddress}:9000`

export const signin = async (email,password) =>{
    // console.log(email,password)
    try {
        const res = await axios.post(`${url}/api/user/signin`,{
            email:email,
            password:password
        })
  
        return res
    } catch (error) {
        throw error
    }


}

export const signup = async (first_name,last_name,email,password,confirm_password) => {
    try {
        const res = await axios.post(`${url}/api/user/signup`,{
            first_name:first_name,
            last_name:last_name,
            email:email,
            password:password,
            confirm_password,confirm_password
        })

        return res
    } catch (error) {
        throw error
    }

}

export const forgotPassword = async (email) => {
    // console.log(email)
    try {
        const res = await axios.post(`${url}/api/user/forgotpassword`,{
            email
        })
        return res
    } catch (error) {
        throw error
        
    }
}
export const resetPassword = async (token,new_password,confirm_new_password) => {
   
    try {
        const res = await axios.post(`${url}/api/user/resetpassword`,{
            token,
            new_password,
            confirm_new_password
        })
        return res
    } catch (error) {
       
        throw error
        
    }
}