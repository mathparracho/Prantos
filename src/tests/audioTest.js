import React, { useState } from 'react';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';

const MyComponent = () => {
  const [audioUrl, setAudioUrl] = useState('');

  const handlePlayAudio = async () => {
    try {
      const response = await axios.get('https://example.com/api/audio', {
        responseType: 'arraybuffer', // Set the response type to arraybuffer
      });

      const blob = new Blob([response.data], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(blob);
      setAudioUrl(audioUrl); // Set the audioUrl state variable

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePlayAudio}>Play Audio</button>
      {audioUrl && <ReactAudioPlayer src={audioUrl} controls autoPlay={false} />}
    </div>
  );
};

export default MyComponent;
