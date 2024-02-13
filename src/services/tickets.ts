import { type TicketReturnType } from "../utils/types";
import appAxios from "./appAxios";

const getUserTickets = async (): Promise<TicketReturnType[]> => {
    try {
        const response = await appAxios.get("tickets/mytickets", {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

export default { getUserTickets }