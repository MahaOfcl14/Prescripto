import validator from "validator";
import bycrypt from "bcrypt";
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
//API for adding doc

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    //checking for all data to add doctor

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing details" });
    }

    //validate eamil
    if (!validator.isEmail(email)) {
      return response.json({ success: false, message: "Invalid email" });
    }
    //valid password
    if (password.length < 8) {
      return response.json({
        success: false,
        message: "Enter a strong password",
      });
    }
     //encrypt password
    //hashing doctor password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'})
   const imageUrl = imageUpload.secure_url

   //save to db
   const doctorData = {
    name,
    email,
    image: imageUrl,
    password: hashedPassword,
    speciality,
    degree,
    experience,
    about,
    fees,
    address:JSON.parse(address),
    date:Date.now()
   }

   const newDoctor = new doctorModel(doctorData)
   await newDoctor.save()
   res.json({success: true, message: "Doctor added successfully"})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
};

export { addDoctor };
