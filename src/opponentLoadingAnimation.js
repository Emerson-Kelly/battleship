export default function displayLoadingAnimation() {
    const blurGameBoard = document.getElementById('opponent-game-board');
    const loadSpinner = document.getElementById('load-spinner');
  
    // Check if the elements exist in the DOM
    if (!blurGameBoard || !loadSpinner) {
      console.error('Error: Load spinner and blur elements are missing in the DOM');
      return; // Exit if elements are missing
    }
  
    loadSpinner.style.position = 'absolute';
    loadSpinner.style.zIndex = '3';
    loadSpinner.style.transform = 'translateY(-14rem)';
    // Show the loading spinner
    loadSpinner.style.display = 'block';
    loadSpinner.innerHTML = `
      <span class="loading loading-spinner loading-lg"></span>
    `;
  
    // Apply blur effect on the game board
    blurGameBoard.classList.add('[&>*]:blur-[2px]');
  
    // Remove the loading spinner and blur effect after 6 seconds
    setTimeout(() => {
      loadSpinner.innerHTML = ``; // Clear the spinner
      loadSpinner.style.display = 'none'; // Hide the spinner
      blurGameBoard.classList.remove('[&>*]:blur-[2px]'); // Remove blur effect
    }, 2000);
  }
  