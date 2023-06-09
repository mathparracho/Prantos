import ReactAudioPlayer from 'react-audio-player';

export const AudioPlayer = ({sound}) => {
  return (
    <ReactAudioPlayer
    src={sound}
    autoPlay = {true}
    controls
    />
  );
}