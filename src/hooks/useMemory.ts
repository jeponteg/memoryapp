import { useQuery } from "react-query";
import { getInformationAnimalCards } from "../api/memory";
import { MemoryRespPros } from "../interfaces/memory.resp.interfaces";
import { ReadJobMapping } from "./dto/useMemory.dto";

export const useMemory = (page: number) => {
    const getMemoryData = async () => {
        const response = await getInformationAnimalCards(page);
        return response?.data;
    };

    const { data, status, error, isLoading } = useQuery<MemoryRespPros[]>("data", getMemoryData);

    const filterData = data && new ReadJobMapping(data).execute()

    return {
        isLoading,
        error,
        data: filterData?.[0],
        status,
    };
};
