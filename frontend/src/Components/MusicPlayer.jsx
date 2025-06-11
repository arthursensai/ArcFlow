import { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { Play, Pause, Rewind, FastForward, SkipBack, SkipForward, Repeat1, Repeat, Volume2, VolumeX } from "lucide-react";
import '../music-player.css';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([
    {
      title: 'eona-emotional-ambient-pop',
      src: './music/eona-emotional-ambient-pop-351436.mp3'
    }
  ]);

  const [currentSong, setCurrentSong] = useState(0);

  const changeSong = () => {
    setCurrentSong(previous => { previous + 1});
  };

  return (
    <AudioPlayer 
      src={songs[currentSong].src}
      onEnd={() => { changeSong(); }}
       customIcons={{
        play: <Play />,
        pause: <Pause />,
        rewind: <Rewind />,
        forward: <FastForward />,
        previous: <SkipBack />,
        next: <SkipForward />,
        loop: <Repeat1 />,
        loopOff: <Repeat />,
        volume: <Volume2 />,
        volumeMute: <VolumeX />
      }}
    />
  )
};

export default MusicPlayer;