import React, { useState } from 'react';
import './App.css';
import GradeLevelSelect from './components/GradeLevelSelect';
import PromptPage from './components/PromptPage';
import MainPage from './components/MainPage';
import { Box, useTheme } from '@mui/system';
import { AppBar, Tab, Tabs, Typography } from '@mui/material';

function App() {
  const [showGradeLevel, setShowGradeLevel] = useState(true);
  const [showPromptPage, setShowPromptPage] = useState(false);
  const [showMainPage, setShowMainPage] = useState(false);

  return (
    <div className="App">
      {showGradeLevel && <GradeLevelSelect setShowGradeLevel = {setShowGradeLevel} setShowPromptPage = {setShowPromptPage} />}
      {showPromptPage && <PromptPage setShowPromptPage = {setShowPromptPage} setShowMainPage = {setShowMainPage} />}
      
      {showMainPage && <MainPage />}
    </div>
  );
}

export default App;
