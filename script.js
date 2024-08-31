const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');
let isJumping = false;
let gravity = 0.9;
let score = 0;

// Añadir posición inicial del dinosaurio
let position = 0;

// Escuchar eventos de teclado
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        jump();
    }
});

function jump() {
    if (isJumping) return;
    isJumping = true;
    let count = 0;

    let upInterval = setInterval(() => {
        if (count === 15) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (count === 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                count--;
                dino.style.bottom = position + 'px';
            }, 20);
        }
        position += 5;
        count++;
        dino.style.bottom = position + 'px';
    }, 20);
}

function createCactus() {
    let cactusPosition = 800;
    let randomTime = Math.random() * 4000 + 1000;

    cactus.style.left = cactusPosition + 'px';
    cactus.style.display = 'block'; // Asegurar que el cactus sea visible

    let leftTimer = setInterval(() => {
        if (cactusPosition < -20) {
            clearInterval(leftTimer);
            cactus.style.display = 'none'; // Ocultar cactus cuando salga de la pantalla
            score++;
            scoreDisplay.textContent = `Puntuación: ${score}`;
            setTimeout(createCactus, randomTime); // Crear un nuevo cactus después de un tiempo aleatorio
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftTimer);
            alert('¡Game Over!');
            document.location.reload();
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
}

// Iniciar el juego
createCactus();
