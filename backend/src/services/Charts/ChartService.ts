import { Chart, ChartData } from '../../../models'

// Get all chart data from DB
export async function GetChartData(depar) {
    try {
        if (depar) {
            let result = await Chart.findAll({
                where: {departements: depar},
                include: [
                    {model: ChartData}
                ]
            })
            return   result;
        }
    } catch (error) {
        console.log(error);
    }
}

// Add a new chart to DB
export async function AddChart(data){
    try {
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

// Update exsisting a Chart
export async function UpdateChart(chartObj){
    try {
        let chartToUpdate = await ChartData.findByPk(chartObj.id)
        if(chartToUpdate) {
            const updatedChart = await chartToUpdate.set({
                xField: chartObj.xField,
                yField: chartObj.yField,
                zField: chartObj.zField,
            })
            const res = await updatedChart.save()
            return res
        } else {
            return 'User is not existe'
        }
        
    
    } catch(err) {
        console.log(err)
    }
}
// dd new row to chart
export async function addChartRow(rowObj){
    
    try {
        return await ChartData.create({
            id: Number(rowObj.id),
            xField: rowObj.xField,
            yField: rowObj.yField,
            zField: rowObj.zField,
            dataId: rowObj.dataId
        })
    }catch(err) {

    }
}
// Delete Chart from DB
export async function deleteChart(id){
    
    try {
        const ChartId = id
        const res = await ChartData.destroy({where: {dataId: ChartId}})
        if(res) {
            const result = await Chart.destroy(
                {
                where: {id: ChartId}
                })
            return result
        }
    } catch(err) {
        console.log(err)
    }
}

// Delet Chart Row from DB
export async function deleteChartRow(rowId){
    try {
        
        const res = await ChartData.destroy({where: {id: rowId}})
        if(res) {
            return res
        }
    } catch(err) {
        console.log(err)
    }
}