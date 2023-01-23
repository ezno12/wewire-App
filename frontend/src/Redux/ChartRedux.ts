import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState ={
    chartId: number,
    chartDataId: number,
    chartTitle: {title: string, depar: string},
    chartType: string,
    chartData: [{
        id: number,
        xField: string,
        yField: string,
        zField: string,
    }]
}

const initialState: InitialState = {
    chartId: 0,
    chartDataId: 0,
    chartTitle: {title: "", depar: ""},
    chartType: "pie",
    chartData: [{
        id: 0,
        xField: "",
        yField: "",
        zField: "",
    }]
}
const chartSlice = createSlice({
    initialState,
    name: "newChart",
    reducers: {
        setChartId(state, action: PayloadAction<{id: number}>){
            state.chartId = action.payload.id
        },
        incrementChartId(state){
            state.chartId += 1
        },
        setChartTitle(state, action: PayloadAction<{title: string, depar: string}>){
            state.chartTitle = action.payload
        },
        setChartType(state, action: PayloadAction<{type: string}>){
            state.chartType = action.payload.type
        },
        setChartData(state, action: PayloadAction<any>){
            state.chartData = action.payload
        }    
        ,setChartDatatId(state, action: PayloadAction<{dataId: number}>){
            state.chartDataId = action.payload.dataId
        },
        incrementChartDataId(state){
            state.chartDataId += 1
        },
        decrementChartDataId(state){
            state.chartDataId -= 1 
        }
    },
});


export const { 
                setChartId,
                setChartData,
                setChartDatatId,
                setChartTitle,
                setChartType,
                incrementChartId,
                incrementChartDataId,
                decrementChartDataId
            } = chartSlice.actions;
export default chartSlice.reducer; 
