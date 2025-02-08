function sendMessage() {
    let userText = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");

    if (userText.trim() === "") return; // Prevent sending empty messages

    let botResponse = getBotResponse(userText);
    chatbox.innerHTML += `<p>You: ${userText}</p>`;
    chatbox.innerHTML += `<p>Bot: ${botResponse}</p>`;

    document.getElementById("userInput").value = "";
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom of the chatbox
}

function getBotResponse(input) {
    input = input.toLowerCase(); // Convert input to lowercase

    if (input.includes("hello")) {
        return "Hello! How can I assist you today? If you're looking for financial information or advice, feel free to ask me anything!";
    }
    if (input.includes("how are you")) {
        return "I'm just a chatbot, so I don't have feelings, but I'm always here and ready to help with any financial questions or concerns you may have!";
    }
    if (input.includes("financial fitness")) {
        return "Financial fitness is about managing your personal finances effectively. It involves budgeting, saving, investing, and making smart financial decisions to achieve financial security. A good starting point is to create a detailed budget and focus on building an emergency fund, paying off debt, and saving for long-term goals like retirement.";
    }
    if (input.includes("account balance")) {
        return "Your account balance is the amount of money currently available in your account. You can view your balance through online banking or mobile apps. It's essential to regularly check your balance to ensure you're not overspending and to stay on top of your finances.";
    }
    if (input.includes("urgent support")) {
        return "If you require urgent support, our customer service team is available 24/7 to assist you. You can reach them via phone or chat. Whether it's an account issue, fraudulent activity, or anything else, we're here to help resolve your concerns quickly.";
    }
    if (input.includes("investment advice")) {
        return "Investment advice is key to growing your wealth over time. There are many types of investments, including stocks, bonds, real estate, and retirement accounts. It's important to diversify your investments based on your risk tolerance and financial goals. Consulting a financial advisor is highly recommended to ensure you're making informed decisions tailored to your needs.";
    }
    if (input.includes("credit score")) {
        return "Your credit score is a numerical value that represents your creditworthiness. A higher credit score means you're less of a risk to lenders and may help you qualify for better loan terms. You can check your credit score through credit agencies or financial institutions, and it’s important to maintain a good score by paying bills on time and managing debt carefully.";
    }
    if (input.includes("loan options")) {
        return "Loan options vary depending on your needs and credit profile. Common types of loans include personal loans, mortgages, auto loans, and student loans. Each type has different requirements and terms, so it’s important to compare interest rates, repayment periods, and eligibility criteria. Our website provides detailed information on available loan options and how to apply for them.";
    }
    if (input.includes("savings account")) {
        return "A savings account is a type of deposit account offered by banks that earns interest on the money you deposit. It's a safe way to store money while earning a small return. However, savings accounts typically offer lower interest rates compared to other investment options. It's a good idea to use a savings account for short-term goals or an emergency fund.";
    }
    if (input.includes("budgeting tips")) {
        return "Budgeting is the foundation of financial management. To create an effective budget, track all of your income and expenses to see where your money is going. Then, categorize your spending, set limits, and prioritize saving. Use budgeting tools like Mint, YNAB, or spreadsheets to stay organized. The key is consistency and regularly reviewing your spending to make adjustments where needed.";
    }
    if (input.includes("retirement planning")) {
        return "Retirement planning is about ensuring you have enough money to live comfortably when you retire. It involves saving and investing consistently in retirement accounts like 401(k)s, IRAs, or pensions. The earlier you start, the better, as compound interest can significantly grow your savings over time. You should also estimate your future needs based on lifestyle and healthcare costs to plan accordingly.";
    }
    if (input.includes("tax advice")) {
        return "Tax advice helps you understand how to minimize your tax liabilities. This could involve taking advantage of tax deductions, credits, and tax-advantaged accounts like IRAs and 401(k)s. A tax professional can assist with maximizing your tax savings, ensuring you're compliant with tax laws, and guiding you through tax planning to optimize your financial situation.";
    }
    if (input.includes("fraud protection")) {
        return "Fraud protection involves strategies and measures to protect your financial accounts from unauthorized access and theft. Regularly monitoring your accounts, using strong passwords, and setting up account alerts are key to detecting fraud early. Additionally, report any suspicious activity immediately to prevent further losses. Some banks also offer fraud protection services, including identity theft monitoring.";
    }
    if (input.includes("customer service")) {
        return "Our customer service team is available to help with any account-related inquiries or issues. You can reach us by phone, email, or through our online support portal. Our team is trained to assist with everything from account setup and maintenance to resolving problems like fraudulent activity or technical issues with online banking.";
    }
    if (input.includes("open an account")) {
        return "To open an account, simply visit our website or one of our branches. You'll need to provide personal identification and financial information to verify your identity. We offer various types of accounts, including checking, savings, and investment accounts, so you can choose one that suits your financial needs.";
    }
    if (input.includes("close an account")) {
        return "To close an account, please contact our customer service department. They will assist you with the process, including transferring any remaining funds and ensuring that any open transactions are completed before closure. It's important to clear any outstanding balances before closing the account to avoid fees.";
    }
    if (input.includes("transfer money")) {
        return "You can transfer money through several channels: online banking, mobile apps, or in person at our branch. Transfers can be made domestically or internationally, depending on your needs. Our platform allows for easy, secure transfers, and you can track the status of your transaction in real-time.";
    }
    if (input.includes("lost card")) {
        return "If you’ve lost your card, report it immediately to customer service to block it and prevent unauthorized transactions. You can request a replacement card and reset your PIN. It’s essential to monitor your account for any suspicious activity and notify us of any transactions you didn’t authorize.";
    }
    if (input.includes("update information")) {
        return "To update your account information, log into your account and visit the settings or profile section. You can update personal details like your address, phone number, or email. If you encounter any issues, feel free to reach out to our customer service team for assistance.";
    }
    if (input.includes("mobile app")) {
        return "Our mobile app is a convenient way to manage your accounts from your smartphone. You can view balances, transfer funds, pay bills, and more. The app is available for download on both the App Store and Google Play, and it provides a secure, user-friendly way to handle your banking needs on the go.";
    }
    if (input.includes("online banking")) {
        return "Online banking allows you to access your account from any device with an internet connection. It provides a range of features such as checking balances, paying bills, transferring money, and viewing transaction history. Online banking is secure and helps you stay on top of your finances without needing to visit a branch.";
    }
    if (input.includes("mortgage options")) {
        return "We offer a variety of mortgage options to help you buy or refinance a home. These include fixed-rate mortgages, adjustable-rate mortgages (ARMs), and special programs for first-time homebuyers. To get started, visit our mortgage center online or speak to one of our representatives for personalized advice based on your needs and financial situation.";
    }
    if (input.includes("financial goals")) {
        return "Setting financial goals is crucial for building wealth and securing your future. Your goals may include saving for retirement, buying a home, paying off debt, or building an emergency fund. Start by defining your short-term and long-term goals, creating a plan to achieve them, and regularly reviewing your progress.";
    }
    if (input.includes("debt management")) {
        return "Debt management involves strategies to pay off debt efficiently while minimizing interest and fees. This can include consolidating loans, negotiating with creditors, or setting up a structured repayment plan. It's important to prioritize high-interest debts and create a budget that allows for consistent debt payments.";
    }
    if (input.includes("insurance options")) {
        return "We offer a range of insurance products, including life insurance, health insurance, auto insurance, and home insurance. Insurance is an essential part of financial planning, helping protect your assets and provide financial security in case of unforeseen events. You can visit our website to explore different options and find the right coverage for your needs.";
    }
    if (input.includes("credit card")) {
        return "We offer various types of credit cards designed to meet different financial needs. Whether you're looking for rewards, cashback, or low-interest rates, we have options for you. Be sure to understand the terms and fees associated with each card to choose the one that fits your spending habits and financial goals.";
    }
    if (input.includes("interest rates")) {
        return "Interest rates can vary based on the type of account or loan you're dealing with. For loans, rates depend on factors like your credit score, the loan amount, and the repayment term. For savings accounts or CDs, rates depend on the current market conditions. Visit our website to find up-to-date information on current interest rates for various financial products.";
    }
    if (input.includes("help")) {
        return getHelpMessage();
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

// Display the welcome message with options when the page loads
window.onload = function() {
    let chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<p>Bot: Welcome! This chat is designed to give you more information
    based on the topics you enter. <br>Type 'help' to see what you can ask me.</p>`;
};