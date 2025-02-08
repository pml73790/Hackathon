let accountBalance = 1000; // Initial balance set to $1000

function sendMessage() {
    let userText = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");

    if (userText.trim() === "") return; // Prevent sending empty messages

    let botResponse = getBotResponse(userText);
    chatbox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
    chatbox.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;

    document.getElementById("userInput").value = "";
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom of the chatbox
}

function getBotResponse(input) {
    input = input.toLowerCase(); // Convert input to lowercase

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

    if (input.includes("financial fitness")) {
        return "Financial fitness is about managing your personal finances effectively. It involves budgeting, saving, investing, and making smart financial decisions to achieve financial security.";
    }

    if (input.includes("account")) {
        return "Your account balance is a snapshot of your current financial position, typically displayed in your banking app or online account portal.";
    }

    if (input.includes("urgent support")) {
        return "If you need urgent support, please contact our 24/7 helpline or visit the emergency section of our website.";
    }

    if (input.includes("investment advice")) {
        return "When considering investment advice, think about diversifying your portfolio and ensuring you match investments with your financial goals and risk tolerance. You may want to talk to a financial advisor for personalized guidance.";
    }

    if (input.includes("credit score")) {
        return "Your credit score is a numerical measure of your creditworthiness. A higher score typically means better chances of obtaining loans or credit cards at favorable rates.";
    }
    if (input.includes("interest rates")) {
        return "Interest rates can vary based on the type of account or loan you're dealing with. For loans, rates depend on factors like your credit score, the loan amount, and the repayment term. For savings accounts or CDs, rates depend on the current market conditions. Visit our website to find up-to-date information on current interest rates for various financial products.";
    }
    if (input.includes("helpinfo")) {
        return getHelpMessage();
    }
    if (input.includes("helpoperation")) {
        return `Here are some operations you can perform:
        - balance
        - deposit
        - withdraw`;
    }
    // Add more responses based on your existing chatbot logic

    return "I'm sorry, I didn't quite understand that. Could you please clarify your question or ask about something else?";
}

function getHelpMessage() {
    return `
        Here are some things you can ask me:
        - hello
        - how are you
        - financial fitness
        - account
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
        - mobile app
        - online banking
        - mortgage options
        - financial goals
        - debt management
        - insurance options
        - credit card
        - interest rates
    `;
}

function performDeposit(input) {
    let amount = extractAmount(input);
    if (amount > 0) {
        accountBalance += amount;
        return `You have successfully deposited $${amount}. Your new balance is $${accountBalance}.`;
    } else {
        return "Please enter a valid deposit amount (greater than 0). Ex: deposit 100";
    }
}

function performWithdrawal(input) {
    let amount = extractAmount(input);
    if (amount > 0) {
        if (accountBalance >= amount) {
            accountBalance -= amount;
            return `You have successfully withdrawn $${amount}. Your new balance is $${accountBalance}.`;
        } else {
            return "Insufficient balance for this withdrawal.";
        }
    } else {
        return "Please enter a valid withdrawal amount (greater than 0). Ex: withdraw 100";
    }
}

// Function to extract numeric amounts from the user's input
function extractAmount(input) {
    let regex = /\d+(\.\d{1,2})?/; // Regular expression to find numbers
    let match = input.match(regex);
    if (match) {
        return parseFloat(match[0]);
    }
    return 0;
}

// Display the welcome message with options when the page loads
window.onload = function() {
    let chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<p><strong>Bot:</strong> Welcome! This chat is designed to give you more information based on the topics you enter.
     <br>Type 'help info' to see what you can ask me for information.
     <br>Type 'help operation' to learn about the operations you can perform with your account.</p>`;
};
