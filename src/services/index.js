import axios from "axios";

export const chat = async (message) => {
  try {
    const response = await axios.post("http://4.224.165.135/chat", {
      message,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default chat;
