import { Departments } from '../../../models'



export const GetDeparList = async () => {
    try {
        const res = await Departments.findAll()
        return res;
    } catch(err) {
        console.log(err)
    }
}