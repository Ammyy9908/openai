import React, { useState, useEffect, useRef } from "react";
import { MdChatBubble } from "react-icons/md";

import "./App.css";
import { FaArrowUp } from "react-icons/fa";
import chat from "./services";
import Markdown from "react-markdown";
import Loader from "./components/Loader";
import { motion } from "framer-motion";

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChat = async () => {
    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: message, role: "You" },
    ]);
    const response = await chat(message);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: response["role"], content: response["content"] },
    ]);
    setMessage("");
    setLoading(false);
  };

  console.log("Messages", messages);

  return (
    <div className="w-full h-screen grid grid-cols-12 ">
      {/* <aside className="col-span-2 bg-gray-200">
        <div className="sidebar-header py-3 px-2">
          <div className="flex items-center gap-2">
            <img src="/openai.svg" className="w-4 h-4" />
            <p>OpenAI</p>
          </div>

          <div className="chat-histories mt-12">
            <div className="chat-history">
              <p className="text-sm text-gray-700/50 font-semibold">Today</p>
              <div className="hostories flex flex-col items-start gap-2 w-full">
                <div className="history py-2 px-2 hover:bg-gray-400/30 cursor-pointer rounded-lg">
                  <div className="flex items-center gap-2">
                    <p>How can I help you today?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside> */}
      <div className="main col-span-12 overflow-scroll h-[90%]">
        <div className="chat-area px-2 py-2 relative w-[95%] sm:w-[70%] h-full my-6 mx-auto flex flex-col">
          {messages.length > 0 &&
            messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message mb-6    flex flex-col w-full  ${
                  msg.role === "You" ? "items-start" : "items-end"
                } `}
              >
                <div
                  className={`text-xl font-bold flex w-full ${
                    msg.role === "You" ? "justify-start" : "justify-end"
                  }`}
                >
                  {msg.role === "You" ? (
                    "You"
                  ) : (
                    <div className="flex items-center gap-2">
                      OpenAI
                      <img src="/openai.svg" className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`chat-message-content px-2 py-4 rounded-2xl font-semibold w-auto  mt-3 overflow-x-scroll`}
                >
                  <Markdown>{msg.content}</Markdown>
                </motion.div>
              </div>
            ))}
          {messages.length === 0 && (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] flex items-center flex-col justify-center">
              <img src="/openai.svg" className="w-8 h-8" />
              <h2 className="text-2xl font-bold">How can I help you today?</h2>
            </div>
          )}
        </div>
        <div className="chat-input fixed bottom-2 translate-x-[-50%] z-40 left-[50%] flex items-center gap-3 py-3 border border-gray-300 bg-white/50 rounded-md px-3 ">
          <input
            type="text"
            name="message"
            id="message"
            className=" h-[32px] bg-transparent outline-none"
            placeholder="Message OpenAI.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="w-8 h-8 bg-black rounded-md text-white flex items-center justify-center"
            onClick={message.length > 0 ? handleChat : null}
          >
            {!loading ? <FaArrowUp /> : <Loader />}
          </button>
        </div>
      </div>

      <button className="fixed w-12 h-12 bg-black bottom-10 right-10 text-white rounded-full flex items-center justify-center shadow-md">
        <MdChatBubble />
      </button>
    </div>
  );
}

export default App;
