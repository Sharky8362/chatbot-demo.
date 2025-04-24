
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

const responses = {
    "hi": "Hi there! How can I help you today?",
    "track my order": "Please provide your order number.",
    "refund status": "Refunds take 3-5 business days. Want to check your refund status?",
    "yes": "Please wait while we retrieve your refund status.",
    "no": "Okay! Let me know if you need anything else.",
    "product support": "Which product do you need help with?",
};

function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === "") return;

    appendMessage("You", userText);
    userInput.value = "";

    const botResponse = getResponse(userText.toLowerCase());
    setTimeout(() => appendMessage("Bot", botResponse), 500);
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getResponse(text) {
    return responses[text] || "Sorry, I didn’t get that. Try asking about orders, refunds, or support.";
}

function toggleChat() {
    const box = document.querySelector('.chat-box');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}
