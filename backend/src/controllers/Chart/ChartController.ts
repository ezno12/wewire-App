import { Response, Request } from "express";
import { GetChartData, AddChart } from "@services/Charts/ChartService";

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
        console.log( 'res in controller: ', res)
        if(res) {
            response.status(200).json({error: false, res })
        } else {
            response.status(400).json({error: true, message: 'Error while adding chart'});
        } 

    }catch(err){
        console.log(err)
    }
}