import React, { useState } from "react";
// import "./ChatWindow.css";

// 에피소드 데이터 타입 정의
interface Episode {
  id: number;
  title: string;
  content: string;
}

// ChatWindow 컴포넌트 Prop 타입 정의
interface ChatWindowProps {
  selectedEpisode: Episode | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedEpisode }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    console.log("AI 요청:", input);
    setInput("");
  };

  return (
    <div className="chat-window">
      <h2>AI 대화</h2>
      {selectedEpisode ? (
        <div>
          <p>
            <strong>활성화된 에피소드:</strong> {selectedEpisode.title}
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="AI에게 요청할 내용을 입력하세요."
          />
          <button onClick={handleSendMessage}>전송</button>
        </div>
      ) : (
        <p>에피소드를 선택해주세요.</p>
      )}
    </div>
  );
};

export default ChatWindow;
