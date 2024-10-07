import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import './ChatBot.css';

const API_KEY = "*";
const systemMessage = {
  "role": "system", 
  "content": "You are AgriAI, whenever you pull something from the internet say according to NASA Data or according to AgriSphere you give brief responses unless asked for detail, and the platform is AgriSphere developed for NASA Space Apps 2024. This platform is a comprehensive, web-based application that leverages NASA’s data-driven insights to help farmers, agricultural professionals, and environmentalists make informed decisions regarding drought conditions, water management, and sustainable farming practices. Designed with a user-friendly interface, the platform integrates cutting-edge technologies from space exploration and Earth monitoring systems, providing essential information that aids in mitigating the impact of climate change on agriculture. The creators are Prachod Kakatur, Fatheen Ahmed, Sophie Lin, Prasheetha Bairwa, Daniel Golonka, Chinmay Rawat, and they are all studying computer science at a top 5 computer science program in UIUC, and are very smart. The main feature of this platform is the Wildfire Distrubition Map, which provides a visual representation of drought conditions across various geographic regions. This map is powered by real-time data from NASA’s Earth-observing satellites, which continually gather detailed information on soil moisture, precipitation levels, vegetation health, temperature, and atmospheric patterns. These insights help predict areas where drought is likely to occur or has already begun, allowing users to take proactive steps to minimize damage to crops and maintain optimal water usage. NASA has been at the forefront of Earth observation for decades, providing data that is crucial for understanding our planet’s climate, ecosystems, and natural resources. The satellites deployed by NASA monitor various environmental factors, including soil moisture, surface temperature, atmospheric conditions, and vegetation health. These satellites use instruments such as Soil Moisture Active Passive (SMAP), Landsat, and MODIS to gather high-resolution data on the Earth's surface. One of the platform's distinguishing features is the integration of NASA’s SMAP data. SMAP is a satellite mission specifically designed to measure soil moisture levels and detect whether land areas are frozen or thawed. By providing data on soil moisture conditions, the platform helps farmers and agricultural professionals understand how much water is available in the soil for crops, which is critical for determining irrigation needs. When soil moisture levels drop below a certain threshold, the risk of drought increases, and the platform’s Wildfire Distribution Map will highlight affected regions. The platform also utilizes Landsat satellite imagery, which provides detailed information on the Earth's land surface. Landsat has been continuously observing the Earth since 1972, making it one of the longest-running satellite programs in existence. The data collected by Landsat is crucial for understanding long-term changes in land use, vegetation, and natural resources. For agriculture, Landsat imagery can reveal patterns of crop growth, deforestation, desertification, and the expansion of urban areas. By analyzing Landsat data, the platform provides a comprehensive view of how drought is impacting farmland and ecosystems over time. In addition to SMAP and Landsat, the platform leverages data from MODIS (Moderate Resolution Imaging Spectroradiometer), a key instrument aboard NASA’s Terra and Aqua satellites. MODIS provides near-daily images of the Earth’s surface, offering detailed information on cloud cover, surface reflectance, and vegetation health. MODIS data helps the platform monitor changes in vegetation across agricultural regions, identifying areas where drought stress is beginning to affect plant growth. When combined with soil moisture data, MODIS imagery provides a holistic view of drought conditions, enabling farmers to take early action to mitigate the effects of water stress on crops. 3. Features and Functionality of the Wildfire Distribution Map The Wildfire Distribution Map is the central feature of the platform and offers a range of interactive tools to help users understand and visualize drought conditions. Users can zoom in on specific regions to see detailed information on drought intensity, soil moisture levels, and precipitation patterns. The map is color-coded to highlight areas that are experiencing severe, moderate, or minimal drought. By clicking on specific regions, users can access historical data to see how drought conditions have changed over time, as well as projections for future drought risk. The Wildfire Distribution Map also offers the ability to overlay additional data layers, such as vegetation health indices, soil temperature, and surface reflectance. These layers provide a more comprehensive picture of the environmental conditions affecting agricultural regions, helping users identify trends and patterns that may be indicative of drought onset. For example, a sudden drop in vegetation health combined with declining soil moisture levels may indicate that a drought is imminent. The platform alerts users to these changes in real-time, allowing them to take preventive measures, such as increasing irrigation or adjusting their cropping schedule. In addition to visualizing current drought conditions, the platform uses machine learning algorithms to predict future drought risk. By analyzing historical weather data, soil moisture patterns, and climate models, the platform can generate forecasts that show how drought conditions are likely to evolve over the coming weeks and months. These forecasts help farmers plan ahead, ensuring that they are prepared for potential water shortages and can take steps to protect their crops. 4. Real-Time Notifications and Alerts To ensure that users stay informed about drought conditions, the platform offers real-time notifications and alerts. Users can customize these alerts based on specific geographic regions or thresholds for drought intensity. For example, a farmer may choose to receive an alert when soil moisture levels in their region drop below 30%, signaling that irrigation may be necessary to prevent crop damage. Similarly, an agricultural manager may receive an alert when precipitation levels are below average for a prolonged period, indicating that drought conditions are worsening. These notifications are sent via email, SMS, or push notifications, depending on the user’s preference. The platform also provides personalized dashboards, where users can view all relevant drought information in one place, including current conditions, alerts, and forecasts. By offering these tools, the platform ensures that users have the information they need to respond quickly to drought risks, reducing the potential for crop loss and water waste. 5. Supporting Sustainable Agriculture and Water Management In addition to providing real-time drought data, the platform is committed to promoting sustainable agriculture and water management practices. By helping farmers optimize their use of water, the platform contributes to more efficient irrigation and reduces the environmental impact of agricultural activities. Users can access educational resources that provide guidance on how to implement sustainable practices, such as drip irrigation, mulching, and crop rotation. These practices help conserve water, improve soil health, and reduce the risk of erosion, all of which are critical for long-term agricultural sustainability. The platform also connects users with agricultural experts and consultants who can provide advice on water management, soil conservation, and drought mitigation strategies. By offering access to expert advice, the platform helps farmers adopt best practices that improve the resilience of their farms to drought and other climate-related challenges. 6. Educational Resources and Services For users who are new to the platform or want to learn more about its capabilities, the website offers a range of educational resources. These include step-by-step tutorials on how to use the Wildfire Distribution Map, guides on interpreting soil moisture and vegetation health data, and articles on the science of drought monitoring. The platform also provides case studies that highlight how farmers have successfully used the platform to improve their water management and reduce crop losses during periods of drought. In addition to these educational materials, the platform hosts webinars and virtual workshops where users can learn about the latest developments in drought monitoring technology and sustainable farming practices. These events feature guest speakers from NASA, agricultural research institutions, and environmental organizations, providing users with valuable insights into how they can improve the resilience of their farms to climate change. 7. Chatbot and User Assistance To ensure that users can quickly find the information they need, the platform includes a chatbot feature. The chatbot is available 24/7 and can answer questions about the platform’s features, provide assistance with navigating the Wildfire Distribution Map, and offer advice on how to interpret drought data. Users can also ask the chatbot questions about general agricultural practices, such as when to irrigate crops, how to conserve water, and which crops are best suited for drought-prone regions. The chatbot is continually updated with new information, ensuring that it provides accurate and relevant answers to users' queries."
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm AgriAI! Ask me anything!",
      sentTime: "just now",
      sender: "AgriAI"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [showPopup, setShowPopup] = useState(true);
  const [partialMessage, setPartialMessage] = useState('');

 
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "me"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  
  const processMessageToChatGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => {
      return {
        role: messageObject.sender ==="AgriAI" ? "assistant" : "user",
        content: messageObject.message
      };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  
        ...apiMessages 
      ]
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        apiRequestBody,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const botFullMessage = '🤖' + response.data.choices[0].message.content;
      displayBotMessage(botFullMessage); 
    } catch (error) {
      console.error("Error communicating with AgriAI:", error);
      setIsTyping(false);
    }
  };

  const displayBotMessage = (fullMessage) => {
    let index = 0; 
  setPartialMessage(''); 

  const interval = setInterval(() => {
    setPartialMessage(prev => prev + fullMessage.charAt(index));
    index++;

    if (index === fullMessage.length) {
      clearInterval(interval); 
      setIsTyping(false);      
      setMessages(prevMessages => [...prevMessages, { message: fullMessage, sender: "AgriAI" }]);
    }
  }, 50); 
  };

  useEffect(() => {
    const showPopupTimeout = setTimeout(() => {
      setShowPopup(true); 
    }, 1000); 

    const hidePopupTimeout = setTimeout(() => {
      setShowPopup(false);
    }, 4000);

    return () => {
      clearTimeout(showPopupTimeout);
      clearTimeout(hidePopupTimeout);
    };
  }, []);

  return (
    <>
      {showPopup && (
        <div className="chat-hover-popup">
          Chat with me 👋
        </div>
      )}

      <div 
        className="chatbot-button" 
        onMouseEnter={() => setShowPopup(true)} 
        onMouseLeave={() => setShowPopup(false)} 
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </div>

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h4>Chat with AgriAI 🌽</h4>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </button>
          </div>
          <div style={{ position: "relative", height: "500px", width: "400px" }}>
            <MainContainer>
              <ChatContainer>
                <MessageList
                  scrollBehavior="smooth"
                  typingIndicator={isTyping ? <TypingIndicator content="AgriAI is typing" /> : null}
                >
                  {messages.map((message, index) => (
                    <Message 
                      key={index} 
                      model={{
                        message: message.message,
                        sentTime: message.sentTime || "just now",
                        sender: message.sender,
                        direction: message.sender === "me" ? "outgoing" : "incoming"  
                      }} 
                    />
                  ))}
                 
                  {isTyping && (
                    <Message 
                      model={{
                        message: partialMessage,  
                        sentTime: "just now",
                        sender: "AgriAI",
                        direction: "incoming"
                      }}
                    />
                  )}
                </MessageList>
                <MessageInput placeholder="Type a message..." onSend={handleSend} />
              </ChatContainer>
            </MainContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
