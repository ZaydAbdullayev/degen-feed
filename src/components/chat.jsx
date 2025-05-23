import React, { useEffect, useRef, useState, memo } from "react";
import messageIcon from "../assets/logo.jpg";

const random_messages = [
  "Hello! How are you?",
  "What are you up to?",
  "Did you see the latest news?",
  "How's your day going?",
  "Have you heard about the new project?",
  "What do you think about the market?",
  "Any new investments?",
  "How's your portfolio doing?",
  "What are your thoughts on the latest trends?",
  "Have you made any trades recently?",
  "What are your favorite projects?",
  "How do you feel about the current market?",
  "What are your predictions for the next month?",
  "Have you been following any specific tokens?",
  "What do you think about the latest airdrop?",
  "How do you feel about the current gas fees?",
  "What are your thoughts on the latest exchange?",
  "Have you been using any new tools?",
  "What do you think about the latest NFT craze?",
  "How do you feel about the current DeFi landscape?",
  "What are your thoughts on the latest regulations?",
  "Have you been following any specific projects?",
  "What do you think about the latest partnerships?",
  "How do you feel about the current market sentiment?",
  "What are your thoughts on the latest news?",
  "Have you been following any specific trends?",
  "What do you think about the latest developments?",
  "How do you feel about the current market conditions?",
  "What are your thoughts on the latest updates?",
  "Have you been following any specific events?",
  "What do you think about the latest announcements?",
  "How do you feel about the current market trends?",
  "What are your thoughts on the latest changes?",
  "Have you been following any specific news?",
  "What do you think about the latest reports?",
  "How do you feel about the current market analysis?",
  "What are your thoughts on the latest statistics?",
  "Have you been following any specific data?",
  "What do you think about the latest insights?",
  "How do you feel about the current market research?",
  "What are your thoughts on the latest findings?",
  "Have you been following any specific studies?",
  "What do you think about the latest surveys?",
  "How do you feel about the current market trends?",
  "What are your thoughts on the latest reviews?",
];

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prevUsers) => Math.floor(Math.random() * 100) + prevUsers);
      setMessages((prevMessages) => {
        const newMessage = {
          sender: "user_" + Math.floor(Math.random() * 1000),
          text: random_messages[Math.floor(Math.random() * random_messages.length)],
          avatar_id: Math.floor(Math.random() * 5),
        };
        return [...prevMessages, newMessage];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const newMessage = {
      sender: "you",
      text: message,
      avatar_id: Math.floor(Math.random() * 5),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`chat-container ${open ? "active" : ""}`}>
      <figure className="df fdc aic gap-10" onClick={() => setOpen(!open)}>
        <img src={messageIcon} alt="Chat" />
        <span>Live Chat</span>
      </figure>
      <div className="chat-box df fdc aic gap-10">
        <h2>
          Chat <small>users: {users}</small>
        </h2>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="df aic gap-10">
              <p className="df fdc">
                <span>{msg.sender}:</span>
                {msg.text}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <label className="send-message w100 df aic gap-5">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="message"
          />
          <button onClick={handleSendMessage}>Send</button>
        </label>
      </div>
    </div>
  );
};

export default memo(Message);
