import axios from "axios";

export const getHabits = async () => {
  try {
    const response = await axios.get("/api/habits");
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("error getting habits");
  }
};