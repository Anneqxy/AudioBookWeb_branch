import React, { useRef, useState, useEffect, useCallback } from 'react';
import logo from './assets/images/logo.png';
import wailtlistLogo from './assets/images/waitlist.png';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Carousel from './components/Carousel';
import { CarouselItem } from './components/Carousel';
import { CarouselRef } from './components/Carousel';
import BookInfoPanel from './components/BookInfoPanel';

import ContinuousSlider from './components/ContinuousSlider';
import './App.css';

import educatedImage from './assets/images/educated.png';
import elonMuskImage from './assets/images/elon_musk.png';
import hackersPaintersImage from './assets/images/hackers_painters.png';
import zeroToOneImage from './assets/images/zero_to_one.png';
import chipWarImage from './assets/images/chip_war.png';
import nightImage from './assets/images/night.png';
import weShouldBeFeministsImage from './assets/images/we_should_be_feminists.png';
import sapiensImage from './assets/images/sapiens.png';
import gumsImage from './assets/images/gums.png';

import IconButton from '@mui/material';
import educatedAudio from './assets/audios/educated.mp3';
import elonMuskAudio from './assets/audios/elon_musk.mp3';
import chipWarAudio from './assets/audios/chip_war.mp3';
import zeroToOneAudio from './assets/audios/zero_to_one.mp3';
import hackersPaintersAudio from './assets/audios/hacker_painter.mp3';
import nightAudio from './assets/audios/elon_musk.mp3';
import weShouldBeFeministsAudio from './assets/audios/chip_war.mp3';
import sapienAudio from './assets/audios/zero_to_one.mp3';
import gumsAudio from './assets/audios/hacker_painter.mp3';

import { elonMaskContent } from './types/hardcoded';
import { chipWarContent } from './types/hardcoded';
import { hackersPaintersContent } from './types/hardcoded';
import { zeroToOneContet } from './types/hardcoded';
import { EducatedContent } from './types/hardcoded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './components/Footer';
import dotsIcon from './assets/images/dots.png';
import WaitlistPopup from './components/WaitlistPopup';
import HoverSlider, { HoverSliderRef } from './components/HoverSlider';
import LibraryView from './components/LibraryView';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
});

const audiosMap = [
  chipWarAudio,
  elonMuskAudio,
  zeroToOneAudio,
  hackersPaintersAudio,
  gumsAudio,
  nightAudio,
  sapienAudio,
  weShouldBeFeministsAudio,
  educatedAudio,
];

const picturesMap = [
  chipWarImage,
  elonMuskImage,
  zeroToOneImage,
  hackersPaintersImage,
  gumsImage,
  nightImage,
  sapiensImage,
  weShouldBeFeministsImage,
  educatedImage,
];

const contentsMap = [
  elonMaskContent,
  chipWarContent,
  hackersPaintersContent,
  zeroToOneContet,
  EducatedContent,
];

let repeatedImagesArray: any[] = [];
for (let i = 0; i < 4; i++) {
  repeatedImagesArray = [...repeatedImagesArray, ...picturesMap];
}

let repeatedAudiosArray: any[] = [];
for (let i = 0; i < 4; i++) {
  repeatedAudiosArray = [...repeatedAudiosArray, ...audiosMap];
}

let repeatedContentsArray: any[] = [];
for (let i = 0; i < 4; i++) {
  repeatedContentsArray = [...repeatedContentsArray, ...contentsMap];
}

function App() {
  const [isHide, setIsHide] = React.useState(true);
  const carouselRef = React.createRef<CarouselRef>();
  const hoverSliderRef = useRef<HoverSliderRef>(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [audioIndex, setAudioIndex] = useState(-1);

  const [hoverIsHide, setHoverIsHide] = useState(true);
  const [value, setValue] = React.useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [view, setView] = useState<'carousel' | 'library'>('carousel');

  const handleLibraryClick = () => {
    setView('library');
  };
  const handleHomeClick = () => {
    setView('carousel');
  };

  const handlePlayBook = (book: Book) => {
    console.log('Play book:', book.title);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
    if (hoverSliderRef.current) {
      hoverSliderRef.current.handlePlayPause();
    }
  };

  const handleAudioChange = () => {
    setIsHide(false);
    setHoverIsHide(false);
    setAudioIndex(sliderIndex);
  };

  const handleIndexChange = (index: number) => {
    setSliderIndex(index);
  };

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleDurationChange = useCallback((newDuration: number) => {
    setDuration(newDuration);
  }, []);

  const [popupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const items: CarouselItem[] = Array(20)
    .fill('')
    .map((_: string, index: number) => ({
      alt: 'A random photo',
      image: repeatedImagesArray[index],
      content: (
        <BookInfoPanel
          title={repeatedContentsArray[index].title}
          author={repeatedContentsArray[index].author}
          categories={repeatedContentsArray[index].categories}
          description={repeatedContentsArray[index].description}
          link={repeatedContentsArray[index].link}
          handleAudioChange={handleAudioChange}
          handleTriggerPlayPause={handlePlayPause}
          playing={playing}
          isCurrent={audioIndex === sliderIndex}
        />
      ),
    }));

  return (
    <ThemeProvider theme={theme}>
      <HoverSlider
        ref={hoverSliderRef}
        audio={repeatedAudiosArray[audioIndex]}
        title={repeatedContentsArray[audioIndex]?.title}
        isHide={isHide}
        setIsHide={setIsHide}
        playing={playing}
        setPlaying={setPlaying}
        handlePlayPause={handlePlayPause}
        coverImage={repeatedImagesArray[audioIndex]}
        currentTime={currentTime}
        duration={duration}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        value={value}
        onValueUpdated={setValue}
      ></HoverSlider>

      <div className="App">
        <div className="App-header">
          <Stack
            direction="row"
            sx={{ margin: 2, alignItems: 'center', width: '90%' }}
          >
            <Stack
              direction="row"
              marginLeft={5}
              spacing={2}
              alignItems="center"
            >
              <img src={logo} width={195} height={59} />
              <Button
                variant="contained"
                size="large"
                sx={
                  view === 'carousel'
                    ? {
                        color: '#292929',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        borderColor: 'lightgray',
                      }
                    : {
                        color: 'white',
                        borderRadius: '12px',
                        borderColor: 'lightgray',
                      }
                }
                onClick={handleHomeClick}
              >
                Home
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={
                  view === 'carousel'
                    ? {
                        color: 'white',
                        borderRadius: '12px',
                        borderColor: 'lightgray',
                      }
                    : {
                        color: '#292929',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        borderColor: 'lightgray',
                      }
                }
                onClick={handleLibraryClick}
              >
                library
              </Button>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />{' '}
            <Stack
              direction="row"
              spacing={2}
              marginRight={5}
              alignItems="center"
            >
              <Button
                size="large"
                onClick={() => {
                  setPopupOpen(true);
                }}
                sx={{
                  color: 'white',
                  borderRadius: '12px',
                  borderColor: 'lightgray',
                }}
              >
                Join Waitlist
              </Button>
            </Stack>
          </Stack>
          {view !== 'carousel' && (
            <div className="container_background">
              <LibraryView />
            </div>
          )}

          {view === 'carousel' && (
            <>
              <div className="container_background">
                <Stack
                  direction="column"
                  sx={{ width: '100%', marginBottom: '5%' }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontSize: 48,
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat, Arial, sans-serif',
                      background:
                        'linear-gradient(to bottom, #ebebec, #979797)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline',
                      marginTop: '10%',
                    }}
                  >
                    Transform your books into AI-driven podcasts
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontSize: 24,
                      background: '#c1c1c1',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline',
                    }}
                  >
                    Engaging, Captivating, Premium
                  </Typography>
                </Stack>
              </div>

              <Stack
                spacing={2}
                sx={{ height: 750, width: '100%', overflow: 'hidden' }}
              >
                <Stack
                  direction="column"
                  sx={{ height: 750, overflow: 'hidden', alignItems: 'center' }}
                >
                  <Carousel
                    ref={carouselRef}
                    items={items}
                    slideOnClick
                    showControls={false}
                    onIndexChange={handleIndexChange}
                    autoPlay={true}
                  ></Carousel>

                  <Box sx={{ height: 150 }}></Box>

                  <ContinuousSlider
                    title={repeatedContentsArray[audioIndex]?.title}
                    isHide={hoverIsHide}
                    setIsHide={setHoverIsHide}
                    playing={playing}
                    setPlaying={setPlaying}
                    handlePlayPause={handlePlayPause}
                    coverImage={repeatedImagesArray[audioIndex]}
                    currentTime={currentTime}
                    duration={duration}
                    onTimeUpdate={handleTimeUpdate}
                    onDurationChange={handleDurationChange}
                    value={value}
                    onValueUpdated={setValue}
                  ></ContinuousSlider>
                </Stack>
              </Stack>

              <div className="container_background">
                <Stack
                  direction="column"
                  sx={{ width: '60%', marginTop: '5%' }}
                >
                  <Stack direction="row">
                    <Stack direction="column" sx={{ width: '45%' }}>
                      <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ textAlign: 'left', fontWeight: 'bolder' }}
                      >
                        Immersive book talks.
                      </Typography>
                      <img src={dotsIcon} width={46} height={15} />
                    </Stack>
                    <Stack sx={{ width: '5%' }}></Stack>
                    <Stack direction="column" sx={{ width: '50%' }}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        sx={{ textAlign: 'left' }}
                      >
                        No more dry summaries—AI-Powered BookTalks delivers a
                        vibrant audio experience that brings literature to life,
                        connecting readers with books in a profound and modern
                        way. Experience the future of reading with AI-Powered
                        BookTalks, where every book becomes a captivating
                        conversation.
                      </Typography>

                      <div className="container">
                        {/* <div className="border-box"> */}
                        <img src={wailtlistLogo} width={273} height={29} />
                        {/* <div className="content">Join Our Waitlist</div> */}

                        {/* </div> */}
                      </div>
                      <WaitlistPopup
                        open={popupOpen}
                        handleClose={handleClosePopup}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </div>
            </>
          )}

          <Footer></Footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
