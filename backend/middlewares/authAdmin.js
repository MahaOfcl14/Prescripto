import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({ success: false, message: "Unauthorized Login. Please login again" });
        }

        const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure the email matches the admin email
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized" });
        }

        next(); // Proceed to the next middleware

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export default authAdmin;
