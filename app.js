
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

let awaitingOrderNumber = false;

function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === "") return;

    appendMessage("You", userText);
    handleResponse(userText.toLowerCase());
    userInput.value = "";
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function checkEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function handleResponse(text) {
    if (awaitingOrderNumber) {
        appendMessage("Bot", "Thank you! Your order number is being checked.");
        awaitingOrderNumber = false;
        return;
    }

    if (text.includes("hi") || text.includes("hello")) {
        appendMessage("Bot", "Hi there! How can I help you today?<br><button class='option' onclick='handleButton("Track my order")'>Track my order</button> <button class='option' onclick='handleButton("Refund status")'>Refund status</button> <button class='option' onclick='handleButton("Product support")'>Product support</button>");
    } else if (text.includes("track") || text.includes("package")) {
        appendMessage("Bot", "Can you please provide your order number?");
        awaitingOrderNumber = true;
    } else if (text.includes("refund")) {
        appendMessage("Bot", "Refunds take 3-5 business days. Want to check your refund status?<br><button class='option' onclick='handleButton("Yes")'>Yes</button> <button class='option' onclick='handleButton("No")'>No</button>");
    } else if (text === "yes") {
        appendMessage("Bot", "Please provide your order number.");
        awaitingOrderNumber = true;
    } else if (text === "no") {
        appendMessage("Bot", "Alright. Let me know if you need anything else.");
    } else if (text.includes("support")) {
        appendMessage("Bot", "Which product do you need help with?");
    } else {
        appendMessage("Bot", "Sorry, I didn’t get that. Try asking about orders, refunds, or support.");
    }
}

function handleButton(text) {
    appendMessage("You", text);
    handleResponse(text.toLowerCase());
}

function toggleChat() {
    const box = document.querySelector('.chat-box');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}
