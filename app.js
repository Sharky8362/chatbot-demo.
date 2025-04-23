
function sendMessage(text = null) {
  const input = document.getElementById("user-input");
  const message = text || input.value.trim();
  if (message === "") return;

  addMessage("You: " + message);
  input.value = "";

  setTimeout(() => {
    const response = getBotResponse(message);
    addMessage("Bot: " + response.text);
    if (response.options) {
      addOptions(response.options);
    }
  }, 500);
}

function addMessage(message) {
  const chatlog = document.getElementById("chatlog");
  const msg = document.createElement("div");
  msg.textContent = message;
  chatlog.appendChild(msg);
  chatlog.scrollTop = chatlog.scrollHeight;
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
  chatlog.scrollTop = chatlog.scrollHeight;
}

function getBotResponse(msg) {
  const text = msg.toLowerCase();

  if (text.includes("hi") || text.includes("hello")) {
    return {
      text: "Hi there! How can I help you today?",
      options: ["Track my order", "Refund status", "Product support"]
    };
  }
  if (text.includes("order")) {
    return {
      text: "Please enter your order number so I can check it for you."
    };
  }
  if (text.includes("refund")) {
    return {
      text: "Refunds take 3-5 business days. Want to check your refund status?",
      options: ["Yes", "No"]
    };
  }
  if (text.includes("product")) {
    return {
      text: "Which product do you need help with?",
      options: ["Mobile", "Laptop", "Other"]
    };
  }

  return { text: "Sorry, I didn’t get that. Try asking about orders, refunds, or support." };
}

document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function toggleChat() {
  const chat = document.getElementById("chatbot-container");
  chat.classList.toggle("hidden");
}
