import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const githubApi = axios.create({
  baseURL: API_URL,
});

export const getGithubCommits = async () => {
  try {
    const response = await githubApi.get("/api/github/commits");
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub commits:", error);
    return { totalCommits: 0 };
  }
};
