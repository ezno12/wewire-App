import { Response, Request } from "express";
import { GetChartData, AddChart, UpdateChart, deleteChart, deleteChartRow, addChartRow} from "@services/Charts/ChartService";

export async function chartData(_: Request, response: Response): Promise<any> {
    try {
        
        const res = await GetChartData()

        if (res) {
            response.json({error: false, data: res})
        } else {
            response.json({error: true, message: 'Error while fetching chart data'});
            }
        } catch(err) {
            console.log(err)
    }
}

export async function NewChart (req: Request, response: Response): Promise<any> {
    try {
        
        const res: any = await AddChart(req.body)
        
        if(res) {
            response.status(200).json({error: false, res })
        } else {
            response.status(400).json({error: true, message: 'Error while adding chart'});
        } 

    }catch(err){
        console.log(err)
    }
}

export async function updateChart (req: Request, response: Response): Promise<any> {
    try {
        
        const res: any = await UpdateChart(req.body)

        return response.status(200).json({error: false, res}) 

    }catch(err){
        console.log(err)
    }
}
export async function AddChartRow(req: Request, response: Response): Promise<any>{
        try {
            const result = await addChartRow(req.body)
            if(result) {
                response.status(200).json({error: false, result })
            } else {
                response.status(400).json({error: true, message: "error while adding row to chart"})
            }
        } catch(err) {
            console.log(err)
        }
}


export async function DeleteChart (req: Request, response: Response): Promise<any> {
    try {
        const res: any = await deleteChart(req.query.id)

        if(res) {
            response.status(200).json({error: false, message: 'Success to delete Chart'})
        } else {
            response.status(400).json({error: true, message: 'Error while deleting chart'});
        } 

    }catch(err){
        console.log(err)
    }
}

export async function DeleteChartRow (req: Request, response: Response): Promise<any> {
    try {
        
        const rowId = Number(req.query.id)
        const res: any = await deleteChartRow(rowId)

        if(res === 1) {
            response.status(200).json({error: false, message: 'Success to delete Chart row'})
        } else {
            response.status(400).json({error: true, message: 'Error while deleting chart row'});
        } 

    }catch(err){
        console.log(err)
    }
}
