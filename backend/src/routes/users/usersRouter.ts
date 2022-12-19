import express from "express";
import { addUser, getUsers, login, UserByEmail, deleteUser, UserByUsername } from "@controllers/users/usersController";
import { verifyTokenAndAdmin } from "@services/users/token";


const usersRouter = express.Router();

usersRouter.get("/users", verifyTokenAndAdmin, getUsers);

usersRouter.post("/user", addUser);

usersRouter.post("/login", login);

usersRouter.get("/userByEmail", verifyTokenAndAdmin, UserByEmail);

usersRouter.get("/userByUsername", UserByUsername);

usersRouter.delete("/user", verifyTokenAndAdmin, deleteUser);

export { usersRouter };
