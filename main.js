const startScreenEl = document.getElementById('start-screen');
const startBtnEl = document.getElementById('start-screen-btn');
const gameContainerEl = document.getElementById('game-container');
const successMsgContainer = document.getElementById('success-message');
const inputEl = document.querySelector('input[name="number"]');
const inputErrorEl = document.getElementById('input-error');
const gameMessageContainerEl = document.getElementById('message');
const validValueBtnEl = document.getElementById("valid-btn");

let isPlaying = false;
let currentChoosedNumber = 0;

const generateRandomNumber = () => {
    return Math.floor(Math.random()* 101)
}

const validateInput = (value) => {
    inputErrorEl.textContent = "";
    inputErrorEl.classList.add('hidden');
    if(!value || isNaN(parseInt(value))){
        inputErrorEl.classList.remove('hidden');
        inputErrorEl.textContent = "Please choose a valid number";
        return
    }
    return true;
}

const checkValue = (value) => {
    gameMessageContainerEl.textContent = "";
    
    setTimeout(() => {
        if(value > currentChoosedNumber){
            gameMessageContainerEl.textContent = "Your chosen number is high, try again";
        }else if(value < currentChoosedNumber){
            gameMessageContainerEl.textContent = "Your choice is too low; go up a bit!";
        }
    }, 50);

    return currentChoosedNumber === value;
}

const manageGameEnd = () => {
    gameContainerEl.classList.add('hidden');
    successMsgContainer.classList.remove('hidden');
    startBtnEl.removeAttribute('disabled');
    startBtnEl.classList.remove('hidden');
    gameMessageContainerEl.textContent = "";
    inputEl.value = "";
    isPlaying = false;
}

const runGame = () => {
    if(!validateInput(inputEl.value)){
        return
    }
    const value = parseInt(inputEl.value);
    checkValue(value) && manageGameEnd();
}

startBtnEl?.addEventListener('click', (ev)=>{
    if(isPlaying){
        return
    }

    isPlaying = true;
    startScreenEl.classList.remove('h-screen', 'overflow-hidden');
    gameContainerEl.classList.remove('hidden');
    successMsgContainer.classList.add('hidden');
    ev.target.classList.add('hidden');
    ev.target.disabled = true;
    currentChoosedNumber = generateRandomNumber();
})

inputEl.addEventListener('input', (ev) => validateInput(ev.target.value));
validValueBtnEl.addEventListener('click', runGame);