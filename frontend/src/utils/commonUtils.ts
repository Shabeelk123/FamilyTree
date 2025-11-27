import axios from "../api/axios";

export const checkSpouseLineage = async (spouseId: string) => {
    try {
        const response = await axios.get(`member/family/lineage/${spouseId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}