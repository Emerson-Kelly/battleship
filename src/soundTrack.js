import { opponentGameBoard, playerGameBoard } from "./renderBoard.js";
import playIcon from "./assets/icons/volume-2.svg";
import muteIcon from "./assets/icons/volume-x.svg";

document.addEventListener("DOMContentLoaded", () => {
  const audioModal = document.getElementById("my_modal_4");
  const audioAllowBtn = document.getElementById("audio-allow");
  const audioDenyBtn = document.getElementById("audio-deny");
  const mainSoundTrack = document.getElementById("soundTrackMain");
  const backgroundOceanAudio = document.getElementById("ocean-audio");
  const soundButton = document.getElementById("sound-button");
  const soundIcon = document.getElementById("sound-icon");

  backgroundOceanAudio.volume = 0.05;
  let isMuted = false;

  // Helper function to toggle mute
function toggleMute(muteState) {
    mainSoundTrack.muted = muteState;
    backgroundOceanAudio.muted = muteState;
  
    // Mute sounds in game boards if they exist
    if (playerGameBoard) {
      playerGameBoard.shotSound.muted = muteState;
      playerGameBoard.hitSound.muted = muteState;
      playerGameBoard.missSound.muted = muteState;
    }
    if (opponentGameBoard) {
      opponentGameBoard.shotSound.muted = muteState;
      opponentGameBoard.hitSound.muted = muteState;
      opponentGameBoard.missSound.muted = muteState;
    }
  
    // Update icon
    soundIcon.src = muteState ? muteIcon : playIcon;
  }
  

  // Check if the browser supports <dialog>
  if (typeof HTMLDialogElement !== "undefined" && audioModal.showModal) {
    audioModal.showModal();
  } else {
    console.warn("Your browser doesn't support the <dialog> element.");
  }

  // Handle "Allow" button click
  audioAllowBtn.addEventListener("click", () => {
    audioModal.close();
    mainSoundTrack
      .play()
      .then(() => console.log("Main soundtrack started playing successfully."))
      .catch((err) =>
        console.warn("Main soundtrack was blocked even after interaction.", err)
      );

    backgroundOceanAudio
      .play()
      .then(() => console.log("Ocean Audio started playing successfully."))
      .catch((err) =>
        console.warn("Ocean Audio playback was blocked even after interaction.", err)
      );
  });

  // Handle "Deny" button click
  audioDenyBtn.addEventListener("click", () => {
    audioModal.close();
    isMuted = true;
    toggleMute(isMuted);
  });

  // Toggle sound and icon
  soundButton.addEventListener("click", () => {
    isMuted = !isMuted;
    toggleMute(isMuted);

    // Play audio if unmuted
    if (!isMuted) {
      mainSoundTrack
        .play()
        .then(() => console.log("Main soundtrack started playing successfully."))
        .catch((err) =>
          console.warn("Main soundtrack was blocked even after interaction.", err)
        );

      backgroundOceanAudio
        .play()
        .then(() => console.log("Ocean Audio started playing successfully."))
        .catch((err) =>
          console.warn("Ocean Audio playback was blocked even after interaction.", err)
        );
    }
  });
});
