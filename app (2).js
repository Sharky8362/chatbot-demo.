
// Function to handle sending messages
function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return; // Prevent empty messages
  
  // Display the user message
  addMessage("You: " + userInput);

  // Clear the input field
  document.getElementById("user-input").value = "";

  // Simulate a response from the chatbot
  setTimeout(() => {
    const botResponse = getBotResponse(userInput);
    addMessage("Bot: " + botResponse);
  }, 1000);
}

// Function to display messages in the chat log
function addMessage(message) {
  const chatlog = document.getElementById("chatlog");
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  chatlog.appendChild(messageElement);
  chatlog.scrollTop = chatlog.scrollHeight; // Scroll to the latest message
}

// Simple function to generate bot responses
function getBotResponse(input) {
  // A simple mock response logic
  if (input.toLowerCase().includes("hello")) {
    return "Hi there! How can I assist you today?";
  } else if (input.toLowerCase().includes("how are you")) {
    return "I'm just a bot, but I'm doing great!";
  } else {
    return "Sorry, I didn't quite get that. Can you rephrase?";
  }
}
