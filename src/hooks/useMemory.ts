import { useQuery } from "react-query";
import { getInformationAnimalCards } from "../api/memory";
import { MemoryRespPros } from "../interfaces/memory.resp.interfaces"

export const useMemory = (page: 10) => {

    const getMemoryData = async () => {
        const response = await getInformationAnimalCards(page);
        return response?.data;
    };

    const { data, status, error, isLoading } = useQuery<MemoryRespPros>("data", getMemoryData,);

    return {
        isLoading,
        error,
        data,
        status,
    };
};
