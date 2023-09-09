import axios from "axios";
import { API_HOST } from "../utils/constants";

export const getInformationAnimalCards = async (page: number) =>
    await axios.get(`${API_HOST}${page}`);
