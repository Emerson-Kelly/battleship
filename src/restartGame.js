document.getElementById('restart-button').addEventListener('click', restartGame);

export function restartGame() {
    location.reload();
    const audioModal = document.getElementById("my_modal_4");
    audioModal.close();
}