import validator from "validator";
import bcrypt from "bcrypt";  
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    console.log("Received file:", req.file); // Debugging log

    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing details" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "Image file is required" });
    }

    console.log("Uploading image to Cloudinary..."); // Debugging log
    const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
    console.log("Image uploaded:", imageUpload.secure_url); // Debugging log

    const hashedPassword = await bcrypt.hash(password, 10);

    const parsedAddress = typeof address === "string" && address.startsWith("{") ? JSON.parse(address) : address;

    const newDoctor = new doctorModel({
      name,
      email,
      image: imageUpload.secure_url,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      date: Date.now(),
    });

    await newDoctor.save();
    res.json({ success: true, message: "Doctor added successfully" });

  } catch (error) {
    console.error("Error in addDoctor:", error);
    res.json({ success: false, message: error.message });
  }
};


// API for Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // ✅ Sign token securely
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin };
