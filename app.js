const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const suggestions = document.querySelectorAll(".suggestion");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage(userMessage) {
  if (!userMessage) return;
  addMessage(userMessage, "user");

  try {
    const response = await fetch("https://uasd-chatbot-backend.onrender.com/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userMessage })
    });
    const data = await response.json();
    addMessage(data.answer, "bot");
  } catch (error) {
    addMessage("❌ Error: No se pudo conectar al backend.", "bot");
  }
}

sendBtn.addEventListener("click", () => {
  const userMessage = input.value.trim();
  input.value = "";
  sendMessage(userMessage);
});

input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    const userMessage = input.value.trim();
    input.value = "";
    sendMessage(userMessage);
  }
});

// Preguntas sugeridas
suggestions.forEach(btn => {
  btn.addEventListener("click", () => {
    sendMessage(btn.textContent);
  });
});

// Mensaje de bienvenida automático
window.onload = () => {
  addMessage("👋 Hola, soy tu asistente del Estatuto Orgánico de la UASD. Puedes escribir tu consulta o elegir una pregunta sugerida.", "bot");
};

