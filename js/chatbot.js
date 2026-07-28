// ==========================================
// 🔴 CONFIGURACIÓN DE IA (¡IMPORTANTE!) 🔴
// ==========================================
// 1. Ve a https://aistudio.google.com/
// 2. Inicia sesión con tu cuenta de Google y dale a "Get API Key".
// 3. Copia la llave que te dan y pégala exactamente entre las comillas de abajo:
const GEMINI_API_KEY = "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"; 

// ------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const sendBtn = document.getElementById('chatbot-send');
  const inputField = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  
  let chatOpen = false;
  let firstTimeOpen = true;

  // Historial de conversación para que la IA tenga memoria del contexto
  let chatHistory = [
    {
      "role": "user",
      "parts": [{
        "text": `Eres BargainBot, el asistente de servicio al cliente de "Bargainlandia", una exitosa distribuidora mayorista de artículos para fiestas ubicada en Cali, Colombia. 
Tu tono es amable, profesional, carismático y muy servicial.
Venden: Piñatería, juguetería, dulces, cintas, envases, decoración por temporadas (Navidad, Halloween, Día de la Madre, etc.).
Reglas estrictas:
1. Siempre invitas a revisar los catálogos en esta misma página.
2. Si preguntan por precios, disponibilidad exacta o ubicación, debes dirigirlos SIEMPRE al número oficial de WhatsApp: +57 315 878 0800.
3. Respuestas muy cortas y concisas, como si estuvieras chateando por WhatsApp. (Máximo 2 o 3 oraciones).
4. Usa emojis sutiles.
5. NUNCA inventes precios.`
      }]
    },
    {
      "role": "model",
      "parts": [{
        "text": "¡Entendido! Soy BargainBot y estoy listo para ayudar a los clientes de Bargainlandia con el mejor servicio."
      }]
    }
  ];

  // Toggle Chat
  toggleBtn.addEventListener('click', () => {
    chatOpen = !chatOpen;
    if (chatOpen) {
      chatWindow.classList.remove('hidden');
      toggleBtn.classList.add('active');
      if (firstTimeOpen) {
        addMessage('bot', '¡Hola! 👋 Soy BargainBot, el asistente virtual de Bargainlandia. ¿En qué te puedo asesorar hoy?');
        firstTimeOpen = false;
      }
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } else {
      chatWindow.classList.add('hidden');
      toggleBtn.classList.remove('active');
    }
  });

  // Close Chat
  closeBtn.addEventListener('click', () => {
    chatOpen = false;
    chatWindow.classList.add('hidden');
    toggleBtn.classList.remove('active');
  });

  // Send Message
  sendBtn.addEventListener('click', handleUserMessage);
  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserMessage();
    }
  });

  async function handleUserMessage() {
    const text = inputField.value.trim();
    if (text === '') return;
    
    // 1. Mostrar mensaje del usuario
    addMessage('user', text);
    inputField.value = '';

    // Guardar en el historial
    chatHistory.push({ "role": "user", "parts": [{ "text": text }] });

    // 2. Comprobar si hay llave API
    if (GEMINI_API_KEY === "PEGA_TU_LLAVE_AQUI_DENTRO" || GEMINI_API_KEY === "") {
      setTimeout(() => {
        addMessage('bot', '⚠️ <b>Error de Sistema:</b> Tu creador aún no ha insertado la API Key de Google Gemini en el archivo <code>chatbot.js</code>. Inserta la llave para que mi cerebro empiece a funcionar.');
      }, 500);
      return;
    }

    // 3. Mostrar indicador de escribiendo
    showTyping();

    // 4. Enviar a la IA
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: chatHistory
        })
      });

      const data = await response.json();
      removeTyping();

      if (data.error) {
        console.error(data.error);
        addMessage('bot', 'Hubo un error de conexión con mi cerebro artificial. Por favor, intenta de nuevo más tarde.');
      } else {
        const aiText = data.candidates[0].content.parts[0].text;
        addMessage('bot', aiText);
        // Guardar la respuesta de la IA en el historial
        chatHistory.push({ "role": "model", "parts": [{ "text": aiText }] });
      }

    } catch (error) {
      removeTyping();
      console.error(error);
      addMessage('bot', 'Uy, parece que me quedé sin internet. ¿Puedes intentar escribirme de nuevo?');
    }
  }

  function addMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-bubble ${sender}-bubble fade-in`;
    msgDiv.innerHTML = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'chat-bubble bot-bubble fade-in';
    typingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTyping() {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) {
      typingDiv.remove();
    }
  }
});
