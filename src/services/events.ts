import appAxios from "./appAxios";
import { EventDetails, EventFormType } from "../utils/types";

const getOngoingEvents = async (): Promise<EventDetails[]> => {
    try {
        const response = await appAxios.get("events/ongoing");
        return response.data;
    } catch (error) {
        console.error("Error fetching events: ", error);
        throw error;
    }
};

const getEventById = async (eventId: string): Promise<EventDetails> => {
    try {
        const response = await appAxios.get(`events/${eventId}`);
        return response.data;
    } catch(error) {
        console.error("Error fetching events: ", error);
        throw error;
    }
}

const getOngoingEventsByCategory = async (eventType: string): Promise<EventDetails[]> => {
    try{
        const response = await appAxios.get(`events/ongoing/type/${eventType}`);
        return response.data;
    } catch (error){
        console.error("Error fetching events: ", error);
        throw error;
    }
    
}

const getOngoingEventsByKeyword = async (keyword: string): Promise<EventDetails[]> => {
    try{
        const response = await appAxios.get(`events/ongoing/keyword/${keyword}`);
        return response.data;
    } catch (error){
        console.error("Error fetching events: ", error);
        throw error;
    }
}

const uploadEventPoster = async (imageFile: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
  
      const response = await appAxios.post("events/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error occurred while uploading image: ", error);
      throw error;
    }
  };

  const postEvent = async (eventForm: EventFormType): Promise<EventDetails> => {
    try {
        const response = await appAxios.post("events/", eventForm, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error occurred while uploading image: ", error);
      throw error;
    }
  }

  const getAllEvents = async (): Promise<EventDetails[]> => {
    try {
        const response = await appAxios.get("events/")
        return response.data;
    } catch (error) {
        console.error("Error occurred: ", error);
        throw error;
    }
  }

  const setEventToLive = async (eventId: string): Promise<EventDetails> => {
    try {
        const response = await appAxios.put(`events/set-live/${eventId}`)
        return response.data;
    } catch (error) {
        console.error("Error occurred: ", error);
        throw error;
    }
  }



export default { 
    getOngoingEvents, 
    getEventById, 
    getOngoingEventsByCategory, 
    getOngoingEventsByKeyword, 
    uploadEventPoster, 
    postEvent, 
    getAllEvents, 
    setEventToLive 
};