let accountBalance = 1000; // Initial balance set to $1000

function sendMessage() {
    let userText = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");

    if (userText.trim() === "") return; // Prevent sending empty messages

    // Clear the chat if user types 'clear'
    if (userText.toLowerCase() === "clear") {
        chatbox.innerHTML = `<p><strong>Herta:</strong> Welcome! I am the Herta Bot, and I am designed to give you more information based on the topics you enter.
        <br>Type 'help' to see what you can ask me.</p>`;
        document.getElementById("userInput").value = ""; // Clear the input field
        return; // Exit the function to prevent sending the "clear" command as a message
    }

    let botResponse = getBotResponse(userText);
    chatbox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
    chatbox.innerHTML += `<p><strong>Herta:</strong> ${botResponse}</p>`;

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
    if (input.includes("loan options")) {
        return "Loan options vary based on your needs and credit profile. Common types include personal loans, home loans, auto loans, and student loans. It’s important to understand the interest rates, terms, and your eligibility before applying. Always compare different lenders for the best deal.";
    }
    if (input.includes("savings account")) {
        return "A savings account is a deposit account that earns interest on your balance. It's a safe place to keep your money, though the interest rates are typically lower than other investment vehicles. It's useful for building an emergency fund or saving for short-term goals.";
    }
    if (input.includes("budgeting tips")) {
        return "Budgeting is a crucial aspect of financial management. Track all income and expenses to understand where your money goes. Use the 50/30/20 rule—50% for needs, 30% for wants, and 20% for savings and debt repayment. Tools like Mint, YNAB, or even a simple spreadsheet can help you stay on track.";
    }
    if (input.includes("retirement planning")) {
        return "Retirement planning involves saving and investing for your future to ensure you have enough funds when you're no longer working. Start early, contribute regularly to retirement accounts like a 401(k) or IRA, and take advantage of compound interest to grow your savings over time.";
    }
    if (input.includes("tax advice")) {
        return "Tax advice helps you minimize your tax liability by understanding deductions, credits, and tax-advantaged accounts. Consult a tax professional to optimize your tax situation and ensure you're compliant with tax laws. Consider contributing to retirement accounts or using flexible spending accounts to lower your taxable income.";
    }
    if (input.includes("fraud protection")) {
        return "Fraud protection is critical in safeguarding your financial information. Use strong passwords, enable two-factor authentication, and monitor your accounts for unusual activity. Report any suspected fraud immediately to protect yourself and your financial assets.";
    }
    if (input.includes("customer service")) {
        return "Our customer service team is here to help with any questions or issues you have regarding your account. Whether it’s a technical issue or a general inquiry, you can reach out via phone, email, or live chat. We aim to resolve all issues promptly and efficiently.";
    }
    if (input.includes("open an account")) {
        return "To open an account, simply visit our website or one of our branches. You will need to provide personal identification and possibly some financial information to complete the process. We offer a range of accounts, including checking, savings, and investment options.";
    }
    if (input.includes("close an account")) {
        return "Closing an account is easy, but make sure to transfer any remaining balance and settle any open transactions. Contact customer service for assistance, and they’ll help guide you through the steps. Ensure all automatic transactions (like bill payments) are updated before closing.";
    }
    if (input.includes("robbing the bank")) {
        return "Calling the police right now. Better get moving, bozo"
    }
    if (input.includes("transfer money")) {
        return "Money transfers can be done via online banking, mobile apps, or in person. You can transfer funds domestically or internationally, depending on your needs. Make sure to check the transfer limits, fees, and processing times for the specific transfer method you choose.";
    }
    if (input.includes("lost card")) {
        return "If you’ve lost your card, report it immediately to customer service to block it and prevent unauthorized transactions. You can request a replacement card and reset your PIN. Regularly monitor your account for any suspicious activity, and alert us of any unauthorized transactions.";
    }
    if (input.includes("update information")) {
        return "To update your information, log into your account and go to the 'Profile' or 'Settings' section. You can update personal details such as address, phone number, and email. If you need assistance, don’t hesitate to contact customer service for help.";
    }
    if (input.includes("mobile app")) {
        return "Our mobile app allows you to manage your finances on the go. You can check balances, make transfers, pay bills, and access all the features of online banking directly from your smartphone. It’s available on both the App Store and Google Play, and it's designed for security and convenience.";
    }
    if (input.includes("online banking")) {
        return "Online banking allows you to access and manage your accounts 24/7 from any device with an internet connection. You can view balances, transfer money, pay bills, and more. It’s secure and user-friendly, making managing your finances from home or on the go easy.";
    }
    if (input.includes("mortgage options")) {
        return "We offer a variety of mortgage options, including fixed-rate, adjustable-rate, and government-backed loans for first-time homebuyers. Be sure to assess your financial situation and goals when choosing a mortgage, and consider consulting a mortgage advisor to help you navigate the process.";
    }
    if (input.includes("financial goals")) {
        return "Setting financial goals is crucial for achieving financial security. Whether it's saving for retirement, buying a home, or paying off debt, having clear goals helps you prioritize your spending and savings. Break down long-term goals into smaller, actionable steps to track your progress and stay motivated.";
    }
    if (input.includes("debt management")) {
        return "Debt management involves strategies to reduce and eliminate debt. Consider consolidating high-interest debt, negotiating lower interest rates with creditors, or setting up a structured repayment plan. It's important to budget and avoid accumulating additional debt while paying off existing balances.";
    }
    if (input.includes("insurance options")) {
        return "Insurance provides financial protection in case of unexpected events. We offer a range of options, including life, health, auto, and home insurance. Insurance helps manage risks and provides peace of mind, knowing you're covered in case of accidents, illness, or loss of assets.";
    }
    if (input.includes("credit card")) {
        return "Credit cards offer a convenient way to make purchases while earning rewards, cashback, or building credit. Be mindful of interest rates, fees, and due dates to avoid debt. Pay your balance in full each month to avoid paying interest and building a good credit history.";
    }
    if (input.includes("interest rates")) {
        return "Interest rates impact the cost of borrowing money and the returns on savings. For loans, lower rates mean lower costs, while higher rates increase borrowing costs. For savings, higher interest rates allow your money to grow faster. Rates fluctuate based on market conditions, so it’s important to compare rates before making financial decisions.";
    }
    if (input.includes("help info")) {
        return getHelpMessage();
    }
    if (input.includes("help operation")) {
        return "balance - deposit - withdraw";
    }
    if(input.includes("herta")) {
        return "Time to twirl!";
    }
    if(input.includes("help")){
        getHelpMessage();
        return `
        Here are some things you can ask me:
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
        - herta
        - retirement planning
        - tax advice
        - fraud protection
        - customer service
        - open an account
        - close an account
        - transfer money
        - robbing the bank
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
    <br>Operation: balance - deposit - withdraw`;
    }

    return "I'm sorry, I didn't quite understand that. Could you please clarify your question or ask about something else?";
}

function getHelpMessage() {
    return `
        Here are some things you can ask me:
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
        - herta
        - retirement planning
        - tax advice
        - fraud protection
        - customer service
        - open an account
        - close an account
        - transfer money
        - robbing the bank
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
        return "Please enter a valid deposit amount (greater than 0). Ex: deposit 500";
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
    chatbox.innerHTML += `<p><strong>Herta:</strong> Welcome! I am the Herta Bot, and I am designed to give you more information based on the topics you enter.
     <br>Type 'help' to see what you can ask me.</p>`;
};
