import express from "express";
import { chartData, NewChart } from "@controllers/Chart/ChartController"

const chartRouter = express.Router();

chartRouter.get("/chart", chartData)

chartRouter.post("/addchart", NewChart)

chartRouter.post("/updatechart")


export { chartRouter }