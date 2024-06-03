import { Router } from "express";
import { 
    getUsers, getDetailUsers, createNewUser, updateDataUser, 
    deleteDataUser, getAllProfile, regisNewUser, 
    loginUser, imageProfile} from "../handlers/users";
import { singleUploader } from "../middleware/upload";
import { authorization } from "../middleware/authorization";



const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/profile", getAllProfile);
userRouter.get("/:uid_user", authorization, getDetailUsers);
userRouter.post("/", createNewUser);
userRouter.post("/register",regisNewUser);
userRouter.post("/login", loginUser);
userRouter.patch("/:user_id", updateDataUser);
userRouter.patch("/:user_id/profile", singleUploader("profile"), imageProfile);
userRouter.delete("/:uid_user", deleteDataUser);

export default userRouter;