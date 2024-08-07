import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User not authorized");
            }
            req.user = decoded.user; // Set the user from the decoded token
            console.log(`User authorized: ${JSON.stringify(req.user)}`);
            
            next(); // Pass control to the next middleware or route handler
        });
    } else {
        res.status(401);
        throw new Error("Authorization token missing or malformed");
    }
});

export default validateToken;
