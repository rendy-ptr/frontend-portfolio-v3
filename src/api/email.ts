import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const emailApi = axios.create({
  baseURL: API_URL,
});

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (data: EmailData) => {
  try {
    const response = await emailApi.post("/api/email/send", data);
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
