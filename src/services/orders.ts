import { OrderPostType, OrderReturnType } from "../utils/types"
import appAxios from "./appAxios"

const postOrder = async (order: OrderPostType): Promise<OrderReturnType> => {
    try {
        const response = await appAxios.post("orders/purchase", order, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error ordering...");
        throw error;
    }
}

export default { postOrder };