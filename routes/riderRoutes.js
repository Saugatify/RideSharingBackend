import express from "express"
const router = express.Router();
import riderControllers from "../controllers/riderControllers.js"


router.post("/register",riderControllers.registerRider)

router.post("/login",(req,res)=>{
    console.log("Rider is loggedin");
})

router.get("/getuser",riderControllers.getUserData)

export default router