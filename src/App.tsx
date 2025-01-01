import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ContentPanel from "./components/ContentPanel";
import Header from "./components/Header";
import "./App.css";

// 에피소드 데이터 타입 정의
interface Episode {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    // .docx 파일 목록 API 호출
    fetch("http://localhost:5000/api/files")
      .then((response) => response.json())
      .then((data) => setEpisodes(data))
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  const handleSelectEpisode = (episode: Episode) => {
    // API 호출로 파일 내용 가져오기
    fetch(`http://localhost:5000/api/files/${episode.title}`)
      .then((response) => response.json())
      .then((data) => {
        const updatedEpisode = { ...episode, content: data.content };
        console.log(updatedEpisode);
        setSelectedEpisode(updatedEpisode);
      })
      .catch((error) => console.error("Error fetching file content:", error));
  };
  
  const handleUpdateContent = (id: number, updatedContent: string) => {
    setEpisodes((prevEpisodes) =>
      prevEpisodes.map((ep) => 
        ep.id === id ? { ...ep, content: updatedContent } : ep
      )
    );
  };

  return (
    <div className="app">
      <div className="main-header">
        <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      </div>
      <div className="main-body">
        <Sidebar
          episodes={episodes}
          onSelectEpisode={handleSelectEpisode}
        />
        <div className="main-content">
          <ChatWindow selectedEpisode={selectedEpisode} />
          <ContentPanel
            selectedEpisode={selectedEpisode}
            onUpdateContent={handleUpdateContent}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
