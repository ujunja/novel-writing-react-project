import React, { useEffect, useState } from "react";
// import "./ContentPanel.css";

// 에피소드 데이터 타입 정의
interface Episode {
  id: number;
  title: string;
  content: string;
}

// ContentPanel 컴포넌트 Prop 타입 정의
interface ContentPanelProps {
  selectedEpisode: Episode | null;
  onUpdateContent: (id: number, updatedContent: string) => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  selectedEpisode,
  onUpdateContent,
}) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (selectedEpisode) {
      setContent(selectedEpisode.content);
    }
  }, [selectedEpisode]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = e.target.value;
    setContent(updatedContent);
    if (selectedEpisode) {
      onUpdateContent(selectedEpisode.id, updatedContent);
    }
  };

  return (
    <div className="content-panel">
      <h2>에피소드 내용</h2>
      {selectedEpisode ? (
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="에피소드 내용을 입력하세요."
        />
      ) : (
        <p>에피소드를 선택해주세요.</p>
      )}
    </div>
  );
};

export default ContentPanel;
