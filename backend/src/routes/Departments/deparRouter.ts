import express from "express";
import { DeparList } from "@controllers/Departments/DeparController"

const DeparRouter = express.Router()

DeparRouter.get("/DeparList", DeparList)

export { DeparRouter };