let chatInitiated = false;

function toggleChat() {
  const chat = document.getElementById("chatbot-container");
  chat.classList.toggle("hidden");

  if (!chat.classList.contains("hidden")) {
    if (!chatInitiated) {
      chatInitiated = true;
      addMessage("Bot: Welcome! How can I assist you today?");
      addOptions([
        "Track my order",
        "Refund status",
        "Product support",
        "Shipping info",
        "Return policy",
        "Contact support"
      ]);
    }
    scrollToBottom();
  }
}

function sendMessage(text = null) {
  const input = document.getElementById("user-input");
  const message = text || input.value.trim();
  if (!message) return;

  addMessage("You: " + message);
  input.value = "";

  setTimeout(() => {
    const response = getBotResponse(message);
    addMessage("Bot: " + response.text);
    if (response.options) addOptions(response.options);
  }, 500);
}

function addMessage(message) {
  const chatlog = document.getElementById("chatlog");
  const msg = document.createElement("div");
  msg.textContent = message;
  chatlog.appendChild(msg);
  scrollToBottom();
}

function addOptions(options) {
  const chatlog = document.getElementById("chatlog");
  const container = document.createElement("div");
  container.className = "option-buttons";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => sendMessage(opt);
    container.appendChild(btn);
  });
  chatlog.appendChild(container);
  scrollToBottom();
}

function scrollToBottom() {
  const body = document.getElementById("chatbox-body");
  body.scrollTop = body.scrollHeight;
}

function getBotResponse(msg) {
  const text = msg.toLowerCase();
  if (text.includes("hi") || text.includes("hello")) {
    return { text: "Hello! What can I help you with today?", options: ["Track my order", "Refund status", "Product support"] };
  }
  if (text.includes("track")) {
    return { text: "Sure, please provide your order number." };
  }
  if (text.includes("refund")) {
    return { text: "Refunds take 3–5 days. Check your refund status?", options: ["Yes", "No"] };
  }
  if (text.includes("product")) {
    return { text: "Which product do you need support with?", options: ["Mobile", "Laptop", "Accessory"] };
  }
  if (text.includes("shipping")) {
    return { text: "Shipping typically takes 5–7 business days." };
  }
  if (text.includes("return")) {
    return { text: "Our return policy is 30 days from delivery." };
  }
  if (text.includes("contact")) {
    return { text: "Reach us at support@example.com or 1-800-123-4567." };
  }
  return { text: "Sorry, I didn’t get that. Try asking about orders, refunds, shipping, returns, or support." };
}

document.getElementById("user-input").addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
