import express from "express"
const router = express.Router();
import riderControllers from "../controllers/riderControllers.js"
import validateToken from "../middleware/validateToken.js";

router.post("/register",riderControllers.registerRider)

router.post("/login",riderControllers.riderlogin)
router.get("/getalluser",validateToken,riderControllers.getAllUser)


router.get("/getuser",validateToken,riderControllers.getUserData)

export default router