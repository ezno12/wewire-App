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
    }],
    rowCount: number
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
    }],
    rowCount: 99999
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
            state.chartTitle.title = action.payload.title
            action.payload.depar === "Choose Departements" && (action.payload.depar = "")
            state.chartTitle.depar = action.payload.depar
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
        },
        errorRowCount(state, action: PayloadAction<number>){
            state.rowCount = action.payload
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
                decrementChartDataId,
                errorRowCount
            } = chartSlice.actions;
export default chartSlice.reducer; 
