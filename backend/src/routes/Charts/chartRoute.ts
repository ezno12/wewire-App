import express from "express";
import { chartData, NewChart, updateChart, DeleteChart, DeleteChartRow, AddChartRow } from "@controllers/Chart/ChartController"

const chartRouter = express.Router();

chartRouter.get("/chart", chartData)

chartRouter.post("/addchart", NewChart)

chartRouter.put("/updatechart", updateChart)

chartRouter.post("/addrowchart", AddChartRow)

chartRouter.delete("/deletechart", DeleteChart)

chartRouter.delete("/deletechartrow", DeleteChartRow)

export { chartRouter }