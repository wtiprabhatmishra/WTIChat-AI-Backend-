import React, { useState } from 'react';
import './App.css';
import * as THREE from 'three';

const App = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const input = document.getElementById('userInput').value;
    setMessages([...messages, { text: input, sender: 'user' }]);
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    
    const data = await response.json();
    setMessages([...messages, { text: input, sender: 'user' }, { text: data.reply, sender: 'bot' }]);
    document.getElementById('userInput').value = '';
  };

  return (
    <div className="App">
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input id="userInput" type="text" placeholder="Type a message..." className="input-field" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
