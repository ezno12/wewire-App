import express from "express";
import { addUser, getUsers, login, UserByEmail, deleteUser, UserByUsername, updateUser } from "@controllers/users/usersController";
import { verifyTokenAndAdmin } from "@services/users/token";


const usersRouter = express.Router();

usersRouter.get("/users",getUsers);

usersRouter.post("/adduser", verifyTokenAndAdmin, addUser);

usersRouter.post("/login", login);

usersRouter.get("/userByEmail", verifyTokenAndAdmin, UserByEmail);

usersRouter.get("/userByUsername", UserByUsername);

usersRouter.delete("/user", verifyTokenAndAdmin, deleteUser);

usersRouter.put("/update", updateUser)

export { usersRouter };
