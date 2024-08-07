import express from "express"
import userControllers from "../controllers/userControllers.js"
import validateToken from "../middleware/validateToken.js";

const router = express.Router();


router.post("/register",userControllers.registerUser)

router.post("/login",userControllers.loginUser)

router.get("/getriders",validateToken,userControllers.getRiderData)

export default router