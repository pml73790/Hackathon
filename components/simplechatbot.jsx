import React, { useState } from "react";

const Chatbot = () => {
  const [accountBalance, setAccountBalance] = useState(0); // Store the current account balance
  const [messages, setMessages] = useState([ // Store chat messages
    {
      sender: "Herta",
      text: "Welcome! I am the Herta Bot, and I am designed to give you more information based on the topics you enter. Type 'help' to see what you can ask me.",
    },
  ]);
  const [userInput, setUserInput] = useState(""); // Track the user's input
  const [showChat, setShowChat] = useState(true); // Control the visibility of the chat

  // Styling for the chat container
  const chatContainerStyle = {
    maxWidth: "550px",
    margin: "0 auto",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    height: "auto",
  };

  // Styling for the chatbox where messages are displayed
  const chatboxStyle = {
    flexGrow: 1,
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "15px",
    backgroundColor: "#fff",
    fontSize: "14px",
    height: "350px",
  };

  // Styling for each message
  const messageStyle = {
    marginBottom: "10px",
  };

  // Styling for user messages
  const messageYouStyle = {
    textAlign: "left",
  };

  // Styling for bot messages
  const messageHertaStyle = {
    textAlign: "left",
  };

  // Styling for the input container
  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
    paddingTop: "10px",
    backgroundColor: "#f0f0f0",
  };

  // Styling for the input field
  const inputStyle = {
    width: "80%",
    padding: "10px",
    border: "2px solid #ddd",
    borderRadius: "10px",
    marginBottom: "10px",
    fontSize: "14px",
    height: "40px",
    backgroundColor: "#fff",
    color: "#333",
    outline: "none",
  };

  // Styling for the send button
  const buttonStyle = {
    padding: "10px 30px",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  };

  // Button hover styling
  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  // Function to send a message
  const sendMessage = () => {
    if (userInput.trim() === "") return; // Prevent sending empty messages

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", text: userInput },
    ]);

    // Generate bot's response based on user input
    const botResponse = getBotResponse(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "Herta", text: botResponse },
    ]);

    // Clear the input field
    setUserInput("");
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Generate bot response based on user input
  const getBotResponse = (input) => {
    input = input.toLowerCase();

    if (input.includes("balance")) {
      return `Your current account balance is $${accountBalance}.`;
    }
    if (input.includes("deposit")) {
      return performDeposit(input);
    }
    if (input.includes("withdraw")) {
      return performWithdrawal(input);
    }
    if (input.includes("hello")) {
      return "Hello! How can I assist you today?";
    }
    if (input.includes("how are you")) {
      return "I'm just a chatbot, but I'm here to help!";
    }
    if (input.includes("help")) {
      return getHelpMessage();
    }
    if (input.includes("herta")) {
      return "Time to twirl!";
    }

    return "I'm sorry, I didn't quite understand that.";
  };

  // Handle deposits by extracting amount from input
  const performDeposit = (input) => {
    const amount = extractAmount(input);
    if (amount > 0) {
      setAccountBalance((prevBalance) => prevBalance + amount);
      return `You have successfully deposited $${amount}. Your new balance will be updated soon.`;
    } else {
      return "Please enter a valid deposit amount. Example: deposit 500";
    }
  };

  // Handle withdrawals by extracting amount from input
  const performWithdrawal = (input) => {
    const amount = extractAmount(input);
    if (amount > 0) {
      if (accountBalance >= amount) {
        setAccountBalance((prevBalance) => prevBalance - amount);
        return `You have successfully withdrawn $${amount}. Your new balance will be updated soon.`;
      } else {
        return "Insufficient balance for this withdrawal.";
      }
    } else {
      return "Please enter a valid withdrawal amount. Example: withdraw 100";
    }
  };

  // Extract numeric values from the input string
  const extractAmount = (input) => {
    const regex = /\d+(\.\d{1,2})?/;
    const match = input.match(regex);
    return match ? parseFloat(match[0]) : 0;
  };

  // Return the help message with available commands
  const getHelpMessage = () => {
    return `Here are some things you can ask me:
    - hello
    - how are you
    - financial fitness
    - account balance
    - urgent support
    - investment advice
    - credit score
    - loan options
    - savings account
    - budgeting tips
    - retirement planning
    - tax advice
    - fraud protection
    - customer service
    - open an account
    - close an account
    - transfer money
    - lost card
    - update information
    - online banking
    - mortgage options
    - debt management
    - credit card
    - interest rates

    Operations: balance - deposit - withdraw
    `;
  };

  // Function to close the chat
  const closeChat = () => {
    setShowChat(false); // Hide the chat
  };

  return (
    showChat && (
      <div style={chatContainerStyle}>
        <h1>Herta Chatbot</h1>
        <div style={chatboxStyle}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                ...messageStyle,
                ...(message.sender === "You" ? messageYouStyle : messageHertaStyle),
              }}
            >
              <strong>{message.sender}:</strong> {message.text}
            </div>
          ))}
        </div>
        <div style={inputContainerStyle}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Type your message here..."
            style={inputStyle}
          />
          <button
            onClick={sendMessage}
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Send
          </button>
        </div>
      </div>
    )
  );
};

export default Chatbot;
