import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import generatetoken from "../utils/jwt"
import { ExpressValidator } from "express-validator"
import { PrismaClient } from "@prisma/client/extension"

const prisma = new PrismaClient();
 

export const registercustomer = async (req,res) =>{
    const {name, email, password, phone} = req.body;


    try {

        const existinguser = await prisma.customer.findFirst({
           where : {OR :[{email},{phone}] },
    })
      if(existinguser){
        return res.status(200).json({message:"user already registered"})
      }
       
    const hashedpassword = await bcrypt.hash(password,6);

    const newuser = prisma.customer.create({
        data : {name, email, phone, password:hashedpassword },
    })

    const token = generatetoken(newuser)

    return  res.status(201).json({message : "User registered successfully",token})

    } catch (error) {
         return res.status(500).json({ message : "User registration failed", error : error.message });
    }
} 

export const registerProvider = async (req, res) => {
    const { name, email, phone, password } = req.body;
  
    try {
      const existingProvider = await prisma.provider.findFirst({
        where: { OR: [{ email }, { phone }] },
      });
  
      if (existingProvider) {
        return res.status(400).json({ message: "Email or Phone already registered." });
      }
  
     
      const hashedPassword = await bcrypt.hash(password, 10);
  
   
      const newProvider = await prisma.provider.create({
        data: { name, email, phone, password: hashedPassword },
      });
  
      
      const token = generateToken(newProvider);
  
      return res.status(201).json({ message: "Provider registered successfully", token });
    } catch (error) {
      return res.status(500).json({ message: "Error registering provider", error: error.message });
    }
  };


  export const login = async (req,res) => {
         const { email, password , phone  } = req.body

         try {
            let user 
            let role 


            user = prisma.customer.findfirst({
                where : {OR :[{email}, {phone}] }
            })

            if (user) {
                role = "customer"
            } else {
                user = await prisma.provider.findFrist({
                    where : {OR: [{email},{phone}] }
                })
            }

            if (user){
                role = "provider"
            }

            if (!user) {
                return res.status(401).json({ message: "Invalid email or phone number." });
              }

              const isMatch = await bcrypt.compare(password,hashedPassword)

              if (!isMatch) {
                return res.status(401).json({ message: "Incorrect password." });
              }

              const token = generateToken(user, role);

              return res.status(200).json({ message: "Login successful!", token, role });

         } catch (error){
            return res.status(500).json({ message: "Error during login", error: error.message });

         }
   }

   export const getUserProfile = async (req, res) => {
    try {
      const user = req.user; 
  
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: req.role, 
      });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
  };