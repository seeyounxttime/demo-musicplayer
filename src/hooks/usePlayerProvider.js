import { useContext } from "react";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";

const useMusicPlayer = () => {
  const {state, setState} = useContext(MusicPlayerContext);

  // Chơi bài được chọn
  function playTrack(index) {
    if (index === state.currentTrackIndex) {
      togglePlay();
    } else {
      state.audioPlayer.pause();

      const audio = new Audio(state.tracks[index].file);
      audio.loop = true;
      state.audioPlayer = audio;
      state.audioPlayer.play();

      setState((state) => ({
        ...state,
        currentTrackIndex: index,
        isPlaying: true,
      }));
    }
  }

  // Chơi hoặc dừng bài nhạc
  function togglePlay() {
    if (state.isPlaying) {
      state.audioPlayer.pause();
    } else {
      state.audioPlayer.play();
    }
    setState((state) => ({ ...state, isPlaying: !state.isPlaying }));
  }

  // Chơi bài trước
  function playPreviousTrack() {
    const newIndex =
      (((state.currentTrackIndex + -1) % state.tracks.length) +
        state.tracks.length) %
      state.tracks.length;
    playTrack(newIndex);
  }

  // Chơi bài kế tiếp
  function playNextTrack() {
    const newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
    playTrack(newIndex);
  }

  return {
    playTrack,
    togglePlay,
    currentTrackName:
      state.currentTrackIndex !== null &&
      state.tracks[state.currentTrackIndex].name,
    trackList: state.tracks,
    isPlaying: state.isPlaying,
    currentTrackIndex: state.currentTrackIndex,
    playPreviousTrack,
    playNextTrack,
  };
};

export default useMusicPlayer;
