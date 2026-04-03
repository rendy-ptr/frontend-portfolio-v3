import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const wakatimeApi = axios.create({
  baseURL: API_URL,
});

export const getWakatimeStats = async () => {
  try {
    const response = await wakatimeApi.get("/api/wakatime/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching WakaTime stats:", error);
    return {
      totalHours: "0",
      topLanguage: "",
      topLanguages: [],
      bestDay: {
        date: "",
        text: "",
      },
    };
  }
};
