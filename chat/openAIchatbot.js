document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    let userText = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");

    if (userText.trim() === "") return;

    if (userText.toLowerCase() === "clear") {
        chatbox.innerHTML = `<p><strong>Herta:</strong> Welcome! I am the Herta Bot, and I am designed to give you more information based on the topics you enter.
     <br>Type 'help' to see what you can ask me.</p>`;
        document.getElementById("userInput").value = "";
        return;
    }

    let botResponse = await getBotResponse(userText);
    chatbox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
    chatbox.innerHTML += `<p><strong>Herta:</strong> ${botResponse}</p>`;

    document.getElementById("userInput").value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function getBotResponse(input) {
    try {
        const response = await fetch('/api/chat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ input })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error:", error.message);
        return `I'm sorry, I couldn't process your request. Error: ${error.message}`;
    }
}

// Display the welcome message with options when the page loads
window.onload = function() {
    let chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<p><strong>Herta:</strong> Welcome! I am the Herta Bot, and I am designed to give you more information based on the topics you enter.
     <br>Type 'help' to see what you can ask me.</p>`;
};