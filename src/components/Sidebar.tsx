import React from "react";
// import "./Sidebar.css";

// 에피소드 데이터 타입 정의
interface Episode {
  id: number;
  title: string;
  content: string;
}

// Sidebar 컴포넌트 Prop 타입 정의
interface SidebarProps {
  episodes: Episode[];
  onSelectEpisode: (episode: Episode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ episodes, onSelectEpisode }) => {
  return (
    <div className="sidebar">
      <h2>에피소드 목록</h2>
      <ul>
        {episodes.map((episode) => (
          <li
            key={episode.id}
            onClick={() => onSelectEpisode(episode)}
            className="episode-item"
          >
            {episode.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
