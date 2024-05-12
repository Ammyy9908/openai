import axios from "axios";

export const chat = async (message) => {
  try {
    const response = await axios.post("https://api.vikram.life/ai/chat", {
      message,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default chat;
