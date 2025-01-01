import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

interface ContentPanelProps {
  selectedEpisode: { title: string; content: string } | null;
  onUpdateContent: (id: number, updatedContent: string) => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  selectedEpisode,
  onUpdateContent,
}) => {
  const [content, setContent] = useState("");

  // selectedEpisode가 변경될 때 content 상태를 업데이트
  useEffect(() => {
    if (selectedEpisode) {
      setContent(selectedEpisode.content);
    }
  }, [selectedEpisode]);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSaveContent = () => {
    if (selectedEpisode) {
      // 서버 API 호출 로직 추가
      fetch(`http://localhost:5000/api/files/${selectedEpisode.title}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Saved successfully:", data);
        })
        .catch((error) => console.error("Error saving content:", error));
    }
  };

  return (
    <div className="content-panel">
      <h2>에피소드 내용</h2>
      {selectedEpisode ? (
        <>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            value={content}
            onChange={handleContentChange}
            placeholder="에피소드 내용을 입력하세요."
            rows={15}
            sx={{
              backgroundColor: "var(--panel-bg-color)",
              color: "var(--text-color)",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveContent}
            sx={{ marginTop: "10px" }}
          >
            저장
          </Button>
        </>
      ) : (
        <p>에피소드를 선택해주세요.</p>
      )}
    </div>
  );
};

export default ContentPanel;
