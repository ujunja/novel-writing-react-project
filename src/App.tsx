import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ContentPanel from "./components/ContentPanel";
import "./App.css";

// 에피소드 데이터 타입 정의
interface Episode {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([
    { id: 1, title: "외전 1편", content: "아침 햇살이 창문을 통해 스며들었다." },
    { id: 2, title: "외전 2편", content: "주인공의 과거 이야기가 펼쳐진다." },
  ]);

  const handleUpdateContent = (id: number, updatedContent: string) => {
    setEpisodes((prevEpisodes) =>
      prevEpisodes.map((ep) =>
        ep.id === id ? { ...ep, content: updatedContent } : ep
      )
    );
  };

  return (
    <div className="app">
      <Sidebar
        episodes={episodes}
        onSelectEpisode={(episode) => setSelectedEpisode(episode)}
      />
      <div className="main-content">
        <ChatWindow selectedEpisode={selectedEpisode} />
        <ContentPanel
          selectedEpisode={selectedEpisode}
          onUpdateContent={handleUpdateContent}
        />
      </div>
    </div>
  );
};

export default App;
