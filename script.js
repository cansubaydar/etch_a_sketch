const container = document.querySelector('.sketch__container');
const penColour = document.getElementById('colour');
const erase = document.querySelector('.erase'); 
const chevrons = document.querySelectorAll('.chevron'); 

// create canvas 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const MOVE_AMOUNT = 10;
const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0; 
let light = 0; 

// start from a random point 
function showCanvas() {
    ctx.lineJoin = 'square';
    ctx.lineCap = 'square';
    ctx.lineWidth = MOVE_AMOUNT;
    ctx.strokeStyle = `hsl(${hue}, 100%, ${light}%)`;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x,y);
    ctx.stroke();
}

// change colour
const changeColour = () => {
    if(penColour.value === 'colourful') {
        light = 70;
    } else {
        light = 0;
    }
}

// start drawing with keyboard
function draw({ key }) {
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, ${light}%)`;
    ctx.beginPath();
    ctx.moveTo(x,y);

    switch (key) {
        case 'ArrowUp':
           if(y - MOVE_AMOUNT > 0) {
                y -= MOVE_AMOUNT; 
            };
            break;
        case 'ArrowDown':
            if(y + MOVE_AMOUNT < height) {
                y += MOVE_AMOUNT;
            }
            break;
        case 'ArrowLeft': 
            if(x - MOVE_AMOUNT > 0) {
                x -= MOVE_AMOUNT;
            }
            break;
        case 'ArrowRight':
            if(x + MOVE_AMOUNT < width) { 
                x += MOVE_AMOUNT;
            }
            break;
        default:
            break;
    } 
    ctx.lineTo(x,y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x,y);
    ctx.strokeStyle = `#c3c3c3`;
    ctx.stroke();
}

function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
    }
}

// start drawing with dials
function dials(e) {
    const coordinate = e.target.parentElement.getAttribute('data-selection');
    e.preventDefault();

    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, ${light}%)`;
    ctx.beginPath();
    ctx.moveTo(x,y);

    switch (coordinate) {
        case 'up': 
            if(y - MOVE_AMOUNT > 0) {
                y -= MOVE_AMOUNT; 
            };
            break;
        case 'down':
            if(y + MOVE_AMOUNT < height) {
                y += MOVE_AMOUNT;
            }
            break;
        case 'left':
            if(x - MOVE_AMOUNT > 0) {
                x -= MOVE_AMOUNT;
            }
            break;
        case 'right':
            if(x + MOVE_AMOUNT < width) { 
                x += MOVE_AMOUNT;
            }
            break;
        default: 
            break;
    }

    ctx.lineTo(x,y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x,y);
    ctx.strokeStyle = `#c3c3c3`;
    ctx.stroke();
}

// running draw 
const play = () => {
    showCanvas();
    window.addEventListener('keydown', handleKey);
    chevrons.forEach(chevron => chevron.addEventListener('click', dials));
}

// erase colour
function eraseColour(e) {
    container.classList.add('shake-it');
    e.preventDefault();
    container.addEventListener('animationend', () => {
        ctx.clearRect(0, 0, width, height);
        showCanvas();
        container.classList.remove('shake-it');
    },
    { once: true }
    );
}

play();
erase.addEventListener('click', eraseColour);
penColour.addEventListener('change', changeColour);