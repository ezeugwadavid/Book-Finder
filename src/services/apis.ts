import axios from "axios";

//sends a get request to the book api
export const searchBooks = async (query: string) => {
  const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&maxResults=40`);
    return response.data.items || [];
  } catch (error) {
    console.log("Error fetching books:", error);
    return [];
  }
};
