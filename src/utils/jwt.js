import jwt from "jsonwebtoken"

const generatetoken = (user) => {

    return jwt.sign(
        
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET, 
        { expiresIn: "7d" })
   
}

export default generatetoken