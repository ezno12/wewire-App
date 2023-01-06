import { Chart, ChartData } from '../../../models'


export async function GetChartData() {
    try {
        
        let result = await Chart.findAll({
            include: [
                {model: ChartData}
            ]
        })
        return   result;
    } catch (error) {
        console.log(error);
    }
}

export async function AddChart(data){
    try {
        console.log("data in service", data)
        return await Chart.create({
            id: data.id,
            title: data.title,
            Type: data.Type,
            departements: data.departements,
            ChartData: data.ChartData
        }, {include: [ChartData]})
    
    } catch(err) {
        console.log(err)
    }
}