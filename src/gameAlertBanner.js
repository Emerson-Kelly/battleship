import { restartGame } from "./restartGame";

const gameAlertBanner = document.getElementById("placement-alert");

gameAlertBanner.innerHTML = `
                    <div role="alert" class="alert alert-info">
            <span class="text-sm">Click your ships to change the axis before dragging onto the board!</span>
            </div>
        `;

gameAlertBanner.style.display = "block";

export default function displayEndGameAlertBanner(gameResult) {
  const endGameAlertBanner = document.getElementById("end-game-alert-banner");

  if (!endGameAlertBanner) {
    console.error("Error: End game alert banner element not found in the DOM.");
    return;
  }

  // Set up the modal's HTML
  endGameAlertBanner.innerHTML = `
      <dialog id="my_modal_6" class="modal">
        <form method="dialog" class="modal-box">
          <h3 class="font-bold text-lg">${gameResult}</h3>
          <p class="py-4">Would you like to play again?</p>
          <div class="modal-action">
            <button id="deny-restart" class="btn">No</button>
          <button id="restart-button" class="btn">Yes!</button>
          </div>
        </form>
      </dialog>
    `;

  // Access the modal element
  const endGameModal = document.getElementById("my_modal_6");

  if (!endGameModal) {
    console.error("Error: Modal element not found after setting innerHTML.");
    return;
  }

  // Show the modal
  endGameModal.showModal();

  // Attach event listeners to the buttons
  const denyRestartBtn = document.getElementById("deny-restart");
  const restartButton = document.getElementById("restart-button");

  if (denyRestartBtn) {
    denyRestartBtn.addEventListener("click", () => {
      console.log("Restart denied.");
      endGameModal.close(); // Close the modal
    });
  }

  if (restartButton) {
    restartButton.addEventListener("click", () => {
      console.log("Restart allowed.");
      // Add restart logic here
      restartGame();
      endGameModal.close(); // Close the modal
    });
  }
}
