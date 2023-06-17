// Get DOM elements
const messageDisplay = document.getElementById("message-display");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Event listener for sending messages
sendButton.addEventListener("click", () => {
  const message = messageInput.value;
  if (message) {
    displayMessage(message, "outgoing");
    messageInput.value = "";
    scrollToBottom();
  }
});

// Function to display a message in the chat
function displayMessage(message, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  messageElement.innerText = message;
  messageDisplay.appendChild(messageElement);
}

// Function to scroll to the bottom of the message display
function scrollToBottom() {
  messageDisplay.scrollTop = messageDisplay.scrollHeight;
}
