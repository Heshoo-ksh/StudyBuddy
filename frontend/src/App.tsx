import React, { useState } from 'react';
import './App.css';
import GradeLevelSelect from './components/GradeLevelSelect';
import PromptPage from './components/PromptPage';
import MainPage from './components/MainPage';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FlashcardsPage from './components/FlashcardsPage';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


function App() {
  const [showGradeLevel, setShowGradeLevel] = useState(true);
  const [showPromptPage, setShowPromptPage] = useState(false);
  const [showMainPage, setShowMainPage] = useState(false);
  const [levelVal, setLevelVal] = useState('');
  const [promptVal, setPromptVal] = useState('');
  const [numCards, setNumCards] = useState('');

  // Tabs
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className="App">
      {showGradeLevel && 
        <GradeLevelSelect 
        setShowGradeLevel = {setShowGradeLevel} 
        setShowPromptPage = {setShowPromptPage}
        setValue = {setLevelVal}
        />}

      {showPromptPage && 
        <PromptPage 
        setShowPromptPage = {setShowPromptPage} 
        setShowMainPage = {setShowMainPage}
        setNumCards = {setNumCards}
        setPromptVal = {setPromptVal}
        />}

        {/* Display tabs after user enters info, user wont go back to prev two pages */}
        { showMainPage && 
        <Box sx={{ bgcolor: 'background.paper'}}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Overview" {...a11yProps(0)} />
              <Tab label="Flashcards" {...a11yProps(1)} />
              <Tab label="Quiz" {...a11yProps(2)} />
              <Tab label="Stats" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <MainPage level={levelVal} prompt={promptVal} numCards={numCards} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <FlashcardsPage level={levelVal} prompt={promptVal} numCards={numCards}/>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              Item Four
            </TabPanel>
          </SwipeableViews>
        </Box> }
    </div>
  );
}

export default App;
