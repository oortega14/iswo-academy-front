import api from "@/lib/axiosConfig"
import { useUIStore } from "@/stores/ui-store"
const ApiURL = useUIStore.getState().ApiURL;

export const completeProfileService = {
  updatePersonalInfo: async (userId: string,data: any) => {
    const response = await api.patch(`${ApiURL}/users/${userId}`, data)
    return response.data
  }
}
