import React, { useState } from 'react';
import './App.css';
import GradeLevelSelect from './components/GradeLevelSelect';
import PromptPage from './components/PromptPage';

function App() {
  const [showGradeLevel, setShowGradeLevel] = useState(true);
  const [showPromptPage, setShowPromptPage] = useState(false);

  return (
    <div className="App">
      {showGradeLevel && <GradeLevelSelect setShowGradeLevel = {setShowGradeLevel} setShowPromptPage = {setShowPromptPage} />}
      {showPromptPage && <PromptPage />}
    </div>
  );
}

export default App;
