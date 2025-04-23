
function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (message === "") return;

  addMessage("You: " + message);
  input.value = "";

  setTimeout(() => {
    const response = getBotResponse(message);
    addMessage("Bot: " + response);
  }, 500);
}

function addMessage(message) {
  const chatlog = document.getElementById("chatlog");
  const msg = document.createElement("div");
  msg.textContent = message;
  chatlog.appendChild(msg);
  chatlog.scrollTop = chatlog.scrollHeight;
}

function getBotResponse(msg) {
  const text = msg.toLowerCase();

  if (text.includes("hi") || text.includes("hello")) {
    return "Hi there! How can I assist you today?";
  }
  if (text.includes("package")) {
    return "Please provide your order ID. I’ll track your package.";
  }
  if (text.includes("name")) {
    return "I'm SupportBot, your assistant!";
  }
  if (text.includes("thank")) {
    return "You're welcome! 😊";
  }
  if (text.includes("help")) {
    return "Sure! Ask me anything about your order or our services.";
  }

  return "I'm not sure I understand. Try rephrasing your question.";
}

document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
