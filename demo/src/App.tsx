import React, { useState } from 'react';
import logo from './assets/images/logo.png';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Carousel from './components/Carousel';
import { CarouselItem } from './components/Carousel';
import { CarouselRef } from './components/Carousel';
import BookInfoPanel from './components/BookInfoPanel';
import { ContinuousSlider } from './components/ContinuousSlider';
import './App.css';

import educatedImage from './assets/images/educated.png';
import elonMuskImage from './assets/images/elon_musk.png';
import hackersPaintersImage from './assets/images/hackers_painters.png';
import zeroToOneImage from './assets/images/zero_to_one.png';
import toKillAMockingBirdImage from './assets/images/to_kill_a_mocking_bird.png';
import classMakerImage from './assets/images/the_class_maker.png';
import chipWarImage from './assets/images/chip_war.png';

import educatedAudio from './assets/audios/educated.mp3';
import elonMuskAudio from './assets/audios/zero_to_one.wav';
import toKillAMockingBirdAudio from './assets/audios/to_kill_a_mocking_bird.mp3';
import classMakerAudio from './assets/audios/the_class_maker.mp3';
import chipWarAudio from './assets/audios/chip_war.mp3';
import zeroToOneAudio from './assets/audios/zero_to_one.wav';
import hackersPaintersAudio from './assets/audios/chip_war.mp3';

import { elonMaskContent } from './types/hardcoded';
import { chipWarContent } from './types/hardcoded';
import { hackersPaintersContent } from './types/hardcoded';
import { zeroToOneContet } from './types/hardcoded';
import { EducatedContent } from './types/hardcoded';
import { selectClasses } from '@mui/material';
import { log } from 'console';

const audiosMap = [
  elonMuskAudio,
  chipWarAudio,
  hackersPaintersAudio,
  zeroToOneAudio,
  educatedAudio,
];

const picturesMap = [
  elonMuskImage,
  chipWarImage,
  hackersPaintersImage,
  zeroToOneImage,
  educatedImage,
];

const contentsMap = [
  elonMaskContent,
  chipWarContent,
  hackersPaintersContent,
  zeroToOneContet,
  EducatedContent
  
]
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

const items: CarouselItem[] = Array(20)
  .fill('')
  .map((_: string, index: number) => ({
    alt: 'A random photo',
    // image: `https://picsum.photos/${210 + index}`,
    image: repeatedImagesArray[index],
    content: (
 
<BookInfoPanel
  title={repeatedContentsArray[index].title}
  author={repeatedContentsArray[index].author}
  categories={repeatedContentsArray[index].categories}
  description={repeatedContentsArray[index].description}
  link={repeatedContentsArray[index].link}
/>

    ),
  }));

function App() {
  const carouselRef = React.createRef<CarouselRef>();
  const [curAudio, setCurAudio] = useState(null);
  const handleIndexChange = (index: number) => {
    setCurAudio(repeatedAudiosArray[index]);
  };

  return (
    <div className="App">
      <div className="App-header">
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          <img src={logo} width={35} height={35} />

          <Button
            variant="contained"
            sx={{
              color: '#292929',
              backgroundColor: 'white',
              borderRadius: '12px',
              borderColor: 'lightgray',
            }}
          >
            Library
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: 'white',
              borderRadius: '12px',
              borderColor: 'lightgray',
            }}
          >
            Upload
          </Button>
          <Box sx={{ width: 400 }} />
          <Button
            sx={{
              color: 'white',
              borderRadius: '12px',
              borderColor: 'lightgray',
            }}
          >
            About Us
          </Button>
          <Button
            sx={{
              color: 'white',
            }}
          >
            Contact Us
          </Button>
          <Button
            sx={{
              color: 'white',
            }}
          >
            Login
          </Button>
        </Stack>

        <Stack spacing={2} sx={{ height: 400 }}>
          <Stack sx={{ height: 300 }}>
            <Carousel
              ref={carouselRef}
              items={items}
              slideOnClick
              showControls={false}
              onIndexChange={handleIndexChange}
            ></Carousel>
          </Stack>
          <Box sx={{height: 2}}></Box>
          <ContinuousSlider audio={curAudio}></ContinuousSlider>
        </Stack>

        <Stack direction="column" sx={{ width: '60%', marginBottom: 5 }}>
          <Typography variant="h4" gutterBottom>
            Engaging, Captivating, Premium
          </Typography>
          <Typography variant="body1" gutterBottom>
            AI-Powered Podcasts on Today's Best Reads
          </Typography>
          <Typography variant="body2" gutterBottom>
            No more dry summaries—AI-Powered BookTalks delivers a vibrant audio
            experience that brings literature to life, connecting readers with
            books in a profound and modern way. Experience the future of reading
            with AI-Powered BookTalks, where every book becomes a captivating
            conversation.
          </Typography>
          <Button size="small">Join Our Waitlist</Button>
        </Stack>
      </div>
    </div>
  );
}

export default App;
