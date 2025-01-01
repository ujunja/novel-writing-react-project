import React from "react";
import { Switch, Typography } from "@mui/material";
import "./Header.css";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="header">
      <Typography variant="h6" className="header-title">
        소설 작성 프로젝트
      </Typography>
      <div className="dark-mode-toggle">
        <Typography variant="body1">{isDarkMode ? "Dark Mode" : "Light Mode"}</Typography>
        <Switch checked={isDarkMode} onChange={onToggleDarkMode} />
      </div>
    </header>
  );
};

export default Header;
