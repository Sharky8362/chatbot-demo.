// Elements
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chatbot-container');
const closeBtn = document.getElementById('close-btn');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatlog = document.getElementById('chatlog');

// Toggle chat popup
chatToggle.addEventListener('click', () => {
  chatContainer.classList.toggle('hidden');
  if (!chatContainer.classList.contains('hidden')) {
    if (chatlog.children.length === 0) {
      botMessage('Welcome! How can I assist you today?', ['Track my order', 'Refund status', 'Product support']);
    }
    userInput.focus();
  }
});

// Close button
closeBtn.addEventListener('click', () => {
  chatContainer.classList.add('hidden');
});

// Send message
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  appendMessage('You', text);
  userInput.value = '';
  processMessage(text.toLowerCase());
}

// Append a message to chat
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatlog.appendChild(msg);
  chatlog.scrollTop = chatlog.scrollHeight;
}

// Bot message with optional buttons
function botMessage(text, options=[]) {
  appendMessage('Bot', text);
  if (options.length) {
    const container = document.createElement('div');
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        appendMessage('You', opt);
        processMessage(opt.toLowerCase());
      });
      container.appendChild(btn);
    });
    chatlog.appendChild(container);
    chatlog.scrollTop = chatlog.scrollHeight;
  }
}

// Process user input
let waitingOrder = false;
function processMessage(msg) {
  if (waitingOrder) {
    botMessage('Thanks! Your order #' + msg + ' is being checked.');
    waitingOrder = false;
    return;
  }
  if (msg.includes('track') || msg.includes('order')) {
    waitingOrder = true;
    botMessage('Sure, please provide your order number.');
  } else if (msg.includes('refund')) {
    botMessage('Refunds take 3-5 business days. Want to check your refund status?', ['Yes', 'No']);
  } else if (msg === 'yes') {
    waitingOrder = true;
    botMessage('Please enter your order number.');
  } else if (msg === 'no') {
    botMessage('Okay! Let me know if you need anything else.');
  } else if (msg.includes('support')) {
    botMessage('Which product do you need help with?', ['Mobile', 'Laptop', 'Accessory']);
  } else {
    botMessage('Sorry, I didn’t get that. Try asking about orders, refunds, or support.');
  }
}