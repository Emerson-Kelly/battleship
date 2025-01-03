const rulesModalButton = document.getElementById('rules-button');
const rulesModal = document.getElementById('rules-modal');

rulesModalButton.addEventListener('click', rulesModalFunctionality);

function rulesModalFunctionality() {
    rulesModal.innerHTML = `
    <dialog id="my_modal_6" class="modal">
    <form method="dialog" class="modal-box about-modal">
        <h1 id="battleship-rules" class="font-bold text-xl">Battleship Game Rules</h1>
        <br>

        <h3 class="font-bold text-lg">Objective:</h3>
        <p class="py-4">The goal of Battleship is to sink all of your opponent's ships before they sink yours.</p>
        
        <h3 class="font-bold text-lg">Setup:</h3>
        <ul class="py-4">
            <li><strong>Game Boards:</strong> Each player has a 10x10 grid to place their ships and track opponent guesses.</li>
            <li><strong>Ships:</strong> Players have 5 ships of varying lengths:
            <br>
            &nbsp;
                <ul>
                    <li>- Carrier (5 spaces)</li>
                    <li>- Battleship (4 spaces)</li>
                    <li>- Destroyer (3 spaces)</li>
                    <li>- Submarine (3 spaces)</li>
                    <li>- Patrol Boat (2 spaces)</li>
                </ul>
            </li>
            <br>
            <li><strong>Placement:</strong> Clicking ship icons before starting the game will rotate them horizontally or vertically. When ready, the player can drag-and-drop ships onto the grid (as long as they don't overlap with other ships or extend beyond the grid).</li>
        </ul>

        <h3 class="font-bold text-lg">Gameplay:</h3>
        <ul class="py-4">
            <li>The player can begin their first turn — click on a cell to attack.</li>
            <br>
            <li>The computer board will indicate if the coordinate is a "hit" (red dot), "miss" (white dot), or "sunk" (sunken ship icon reveals)</li>
            <br>
            <li>Your grid will also be marked with the same indicators as the computer attacks your board throughout the game.</li>
        </ul>

        <h3 class="font-bold text-lg">Winning the Game:</h3>
        <p class="py-4">The first player to sink all of their opponent's ships wins the game!</p>

        <h3 class="font-bold text-lg">Tips:</h3>
        <ul class="py-4">
            <li>Use a strategy to avoid random guessing.</li>
            <li>Track hits to identify ship placements more efficiently.</li>
            <li>Don't cluster your ships together to reduce vulnerability.</li>
        </ul>

        <div class="modal-action">
            <button id="close-about" class="btn">Close</button>
        </div>
    </form>
</dialog>

    `;

   
    // Access the modal after it has been added to the DOM
    const modalDialog = document.getElementById('my_modal_6');
    if (modalDialog) {
        modalDialog.showModal();
        document.getElementById('close-about').addEventListener('click', () => {
            modalDialog.close();
        });
    } else {
        console.error('Modal dialog not found!');
    }
}
