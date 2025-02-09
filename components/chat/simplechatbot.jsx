import React, { useState } from "react";
import "./chatbox.css"

const Chatbot = () => {
  const [accountBalance, setAccountBalance] = useState(1000); // Initial balance
  const [messages, setMessages] = useState([
    {
      sender: "Herta",
      text: "Welcome! I am the Herta Bot, and I am designed to give you more information based on the topics you enter. Type 'help' to see what you can ask me.",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  // Function to handle sending a message
  const sendMessage = () => {
    if (userInput.trim() === "") return; // Prevent sending empty messages

    // Add user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", text: userInput },
    ]);

    // Get bot's response
    const botResponse = getBotResponse(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "Herta", text: botResponse },
    ]);

    // Clear the input field
    setUserInput("");
  };

  // Function to handle key press (e.g., Enter key)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Function to generate bot responses
  const getBotResponse = (input) => {
    input = input.toLowerCase();

    // Bank operation handling
    if (input.includes("balance")) {
      return `Your current account balance is $${accountBalance}.`;
    }
    if (input.includes("deposit")) {
      return performDeposit(input);
    }
    if (input.includes("withdraw")) {
      return performWithdrawal(input);
    }

    // General responses
    if (input.includes("hello")) {
      return "Hello! How can I assist you today? If you're looking for financial information or advice, feel free to ask me anything!";
    }
    if (input.includes("how are you")) {
      return "I'm just a chatbot, so I don't have feelings, but I'm always here and ready to help with any financial questions or concerns you may have!";
    }
    if (input.includes("help")) {
      return getHelpMessage();
    }
    if (input.includes("herta")) {
      return "Time to twirl!";
    }

    // Default response
    return "I'm sorry, I didn't quite understand that. Could you please clarify your question or ask about something else?";
  };

  // Function to handle deposits
  const performDeposit = (input) => {
    const amount = extractAmount(input);
    if (amount > 0) {
      setAccountBalance((prevBalance) => prevBalance + amount);
      return `You have successfully deposited $${amount}. Your new balance is $${accountBalance + amount}.`;
    } else {
      return "Please enter a valid deposit amount (greater than 0). Ex: deposit 500";
    }
  };

  // Function to handle withdrawals
  const performWithdrawal = (input) => {
    const amount = extractAmount(input);
    if (amount > 0) {
      if (accountBalance >= amount) {
        setAccountBalance((prevBalance) => prevBalance - amount);
        return `You have successfully withdrawn $${amount}. Your new balance is $${accountBalance - amount}.`;
      } else {
        return "Insufficient balance for this withdrawal.";
      }
    } else {
      return "Please enter a valid withdrawal amount (greater than 0). Ex: withdraw 100";
    }
  };

  // Function to extract numeric amounts from the user's input
  const extractAmount = (input) => {
    const regex = /\d+(\.\d{1,2})?/; // Regular expression to find numbers
    const match = input.match(regex);
    if (match) {
      return parseFloat(match[0]);
    }
    return 0;
  };

  // Function to generate the help message
  const getHelpMessage = () => {
    return (
      <div>
        <p>Here are some things you can ask me:</p>
        <ul>
          <li>hello</li>
          <li>how are you</li>
          <li>financial fitness</li>
          <li>account balance</li>
          <li>urgent support</li>
          <li>investment advice</li>
          <li>credit score</li>
          <li>loan options</li>
          <li>savings account</li>
          <li>budgeting tips</li>
          <li>herta</li>
          <li>retirement planning</li>
          <li>tax advice</li>
          <li>fraud protection</li>
          <li>customer service</li>
          <li>open an account</li>
          <li>close an account</li>
          <li>transfer money</li>
          <li>robbing the bank</li>
          <li>lost card</li>
          <li>update information</li>
          <li>mobile app</li>
          <li>online banking</li>
          <li>mortgage options</li>
          <li>financial goals</li>
          <li>debt management</li>
          <li>insurance options</li>
          <li>credit card</li>
          <li>interest rates</li>
        </ul>
        <p>Operation: balance - deposit - withdraw</p>
      </div>
    );
  };

  return (
    <div className="chat-container">
      <h1>Herta Chatbot</h1>
      <div className="chatbox">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender.toLowerCase()}`}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot; 