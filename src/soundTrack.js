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
      .then(() => {
        console.log("Main soundtrack started playing successfully.");
      })
      .catch((err) => {
        console.warn("Main soundtrack  was blocked even after interaction.", err);
      });

      backgroundOceanAudio
      .play()
      .then(() => {
        console.log("Ocean Audio started playing successfully.");
      })
      .catch((err) => {
        console.warn("Ocean Audio playback was blocked even after interaction.", err);
      });
  });

  // Handle "Deny" button click
  audioDenyBtn.addEventListener("click", () => {
    audioModal.close();
    isMuted = true;
    mainSoundTrack.muted = isMuted;
    backgroundOceanAudio.muted = isMuted;
    soundIcon.src = muteIcon;
  });

  // Toggle sound and icon
  soundButton.addEventListener("click", () => {
    isMuted = !isMuted;
    mainSoundTrack.muted = isMuted;
    backgroundOceanAudio.muted = isMuted;
    soundIcon.src = isMuted ? muteIcon : playIcon;

    if (!isMuted) {
        mainSoundTrack
        .play()
        .then(() => {
          console.log("Main soundtrack started playing successfully.");
        })
        .catch((err) => {
          console.warn("Main soundtrack  was blocked even after interaction.", err);
        });
  
        backgroundOceanAudio
        .play()
        .then(() => {
          console.log("Ocean Audio started playing successfully.");
        })
        .catch((err) => {
          console.warn("Ocean Audio playback was blocked even after interaction.", err);
        });
    }
  });
});
