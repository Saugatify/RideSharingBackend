import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        console.log(`Token received: ${token}`); // Log the received token

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err);
                return res.status(401).json({ message: "User not authorized" });
            }
            console.log("Decoded token:", decoded); // Log the decoded token
            req.user = decoded.rider; 
            console.log(`User authorized: ${JSON.stringify(req.user)}`); // Log authorized user
            next();
        });
    } else {
        console.error("Authorization token missing or malformed");
        return res.status(401).json({ message: "Authorization token missing or malformed" });
    }
});


export default validateToken;
