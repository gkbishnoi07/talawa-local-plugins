// chatbot/main.js
(function() {
  // Define your component using React from the parent window
  const React = window.React || parent.React;
  const { useState } = React;

  const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    
    const getBotResponse = (message) => {
      const lowerMsg = message.toLowerCase();
      
      if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        return "Hello! How can I help you today?";
      } else if (lowerMsg.includes('help')) {
        return "I'm here to help! What do you need assistance with?";
      } else if (lowerMsg.includes('thank')) {
        return "You're welcome!";
      } else if (lowerMsg.includes('bye')) {
        return "Goodbye! Have a great day!";
      } else if (lowerMsg.includes('name')) {
        return "I'm Talawa ChatBot!";
      } else {
        return "I'm not sure how to respond to that. Could you try rephrasing?";
      }
    };
    
    const sendMessage = () => {
      if (!input.trim()) return;
      
      setLoading(true);
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);
      setInput('');
      
      // Simulate API delay
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        const botMessage = { sender: 'bot', text: botResponse };
        setMessages(prev => [...prev, botMessage]);
        setLoading(false);
      }, 500);
    };
    
    return React.createElement(
      'div', 
      { style: { padding: '0.5rem' } },
      [
        React.createElement('h3', { key: 'title' }, '🤖 AI ChatBot'),
        React.createElement(
          'div', 
          { 
            key: 'messages',
            style: { 
              border: '1px solid #ccc', 
              padding: '0.5rem', 
              height: 200, 
              overflowY: 'auto',
              marginBottom: '0.5rem',
              backgroundColor: '#f9f9f9'
            }
          },
          messages.length === 0 
            ? React.createElement('p', { style: { color: '#666', fontStyle: 'italic' } }, 'Start a conversation...')
            : messages.map((msg, index) => 
                React.createElement(
                  'div',
                  {
                    key: index,
                    style: {
                      padding: '0.5rem',
                      marginBottom: '0.5rem',
                      backgroundColor: msg.sender === 'user' ? '#e1f5fe' : '#fff',
                      borderRadius: '8px',
                      maxWidth: '80%',
                      marginLeft: msg.sender === 'user' ? 'auto' : '0'
                    }
                  },
                  [
                    React.createElement('strong', { key: 'sender' }, msg.sender === 'user' ? 'You' : '🤖 Bot'),
                    ': ' + msg.text
                  ]
                )
              )
        ),
        React.createElement(
          'div',
          { key: 'input-container', style: { display: 'flex' } },
          [
            React.createElement(
              'input',
              {
                key: 'input',
                type: 'text',
                placeholder: 'Ask me anything...',
                value: input,
                onChange: (e) => setInput(e.target.value),
                onKeyDown: (e) => e.key === 'Enter' && sendMessage(),
                style: {
                  flexGrow: 1,
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }
              }
            ),
            React.createElement(
              'button',
              {
                key: 'button',
                onClick: sendMessage,
                disabled: loading || !input.trim(),
                style: {
                  marginLeft: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !input.trim() ? 0.7 : 1
                }
              },
              loading ? 'Sending...' : 'Send'
            )
          ]
        )
      ]
    );
  };

  // Expose the plugin to the window
  window.TalawaPlugin = ChatBot;
})();