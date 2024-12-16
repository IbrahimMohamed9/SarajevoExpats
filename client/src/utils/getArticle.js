import axiosInstance from "@/config/axios";

async function getArticle(path) {
  try {
    const response = await axiosInstance.get(path);
    return response.data;
  } catch (error) {
    console.error(`Error fetching article:`, error);
    return null;
  }
}

export default getArticle;
