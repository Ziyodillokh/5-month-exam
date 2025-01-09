const socket = io("http://localhost:7777");

const messageDisplay = document.getElementById("messages");
const sendButton = document.getElementById("sendButton");
const messageInput = document.getElementById("messageInput");
const select = document.getElementById("select");

// online userlar listi selectda frontendda ko'rinadi

socket.on("onlineUsers", ({ data }) => {
  select.innerHTML = "";
  data.forEach((userIndex) => {
    const option = document.createElement("option");
    option.value = userIndex;
    option.textContent = `User ${userIndex}`;
    select.appendChild(option);
  });
});``

socket.on("message", ({ data }) => {
  const p = document.createElement("p");
  p.textContent = `User ${data.from}: ${data.message}`;
  messageDisplay.appendChild(p);
});

sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit("send", { message });
    messageInput.value = "";
  }
});

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const message = messageInput.value.trim();
    if (message) {
      socket.emit("send", { message });
    }
  }
});
