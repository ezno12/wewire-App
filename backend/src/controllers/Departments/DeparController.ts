import { Response, Request } from "express";
import { GetDeparList } from "@services/Departments/departments";


export const DeparList = async (_: Request, response: Response): Promise<any> => {
    try {
        const result = await GetDeparList();
        return response.json(result)
    } catch(err) {
        console.log(err)
    }
}