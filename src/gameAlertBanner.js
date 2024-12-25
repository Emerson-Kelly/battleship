const gameAlertBanner = document.getElementById("placement-alert");

gameAlertBanner.innerHTML = `
                    <div role="alert" class="alert alert-info">
            <span class="text-sm">Click your ships to change the axis before dragging onto the board!</span>
            </div>
        `;

gameAlertBanner.style.display = 'block';