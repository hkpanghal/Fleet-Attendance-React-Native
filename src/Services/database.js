import axios from "axios";


const url="https://fleet-attendance-backend.onrender.com"
// const url = `http://${ipAddress}:9000`

export const addClassToDb = async (class_name,created_by) => {
    try {
        const res = await axios.post(`${url}/api/classes/createclass`,{
            class_name:class_name,
            user_id:created_by
        })
        return res 
    } catch (error) {
 
        throw error

    }

   
}

export const gtAllClasses = async (user_id) => {
    try {
    
        const res = await axios.post(`${url}/api/classes/`,{
            user_id:user_id
        })
        return res 
    } catch (error) {
 
        throw error
    }
}
export const updateClassNameToDb = async (class_id,user_id,class_name) => {
    try {
        const res = await axios.patch(`${url}/api/classes/renameclass`,{
            class_id:class_id,
            user_id:user_id,
            class_name:class_name
        })

        return res
    } catch (error) {
        throw error
    }
}
export const addStudentToDb = async (class_id,user_id,first_name,last_name,roll_number) => {
    try {
    
        const res = await axios.post(`${url}/api/students/createstudent`,{
           class_id:class_id,
           user_id:user_id,
           first_name:first_name,
           last_name:last_name,
           roll_number:roll_number
        })
        return res 
    } catch (error) {
 
        throw error
    }
}

export const getAllStudents = async (class_id,user_id) => {
    try {
    
        const res = await axios.post(`${url}/api/students/`,{
           class_id:class_id,
           user_id:user_id,
         
        })
        return res 
    } catch (error) {
 
        throw error
    }
}

export const updateStudentDetailsToDb = async (student_id,user_id,first_name,last_name,roll_number) => {
    try {
        const res = await axios.patch(`${url}/api/students/updatestudent`,{
            student_id,
            user_id,
            first_name,
            last_name,
            roll_number
        })

        return res

    } catch (error) {
        throw error
    }
}

export const deleteStudentFromDb = async (class_id,student_id) => {

    try {
        const res = await axios.delete(`${url}/api/students/deletestudent/${class_id}/${student_id}`)
        return res
    } catch (error) {
        throw error
    }
}
export const addAttendanceToDb = async (class_id,user_id,students,subject) => {
    try {
    
        const res = await axios.post(`${url}/api/attendance/createattendance`,{
           class_id:class_id,
           created_by:user_id,
           students:students,
           subject_name:subject
        })
        return res 
    } catch (error) {
 
        throw error
    }
}
export const getAllAttendanceData = async (class_id,user_id) => {
    try {
    
        const res = await axios.post(`${url}/api/attendance/`,{
           class_id:class_id,
           user_id:user_id,
         
        })
        return res 
    } catch (error) {
 
        throw error
    }
}