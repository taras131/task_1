const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const timerStepMs = 1000;
const maxInputValueSeconds = 359999;
let interval;

const addNull = (value) => {
    return value > 9 ? value : "0" + value;
}

const updateTime = (currentSeconds) => {
    let hours = Math.floor(currentSeconds / 3600);
    currentSeconds %= 3600;
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = currentSeconds % 60;
    timerEl.innerText = `${addNull(hours)}:${addNull(minutes)}:${addNull(seconds)}`;
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl

const createTimerAnimator = () => {
    return (seconds) => {
        let currentSeconds = seconds;
        updateTime(currentSeconds);
        clearInterval(interval);
        interval = setInterval(() => {
            currentSeconds--;
            updateTime(currentSeconds);
            if (currentSeconds === 0) clearInterval(interval);
        }, timerStepMs);
    };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
    // Очистите input так, чтобы в значении
    // оставались только числа
    const inputValueNumber = +inputEl.value.replace(/[^0-9]/g, "");
    if (inputValueNumber === 0) {
        buttonEl.disabled = true;
        inputEl.value = '';
    } else {
        buttonEl.disabled = false
        if (inputValueNumber > maxInputValueSeconds) {
            inputEl.value = `${maxInputValueSeconds}`;
        } else {
            inputEl.value = `${inputValueNumber}`;
        }
        if (!interval) updateTime(inputEl.value);
    }
});

buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);
    animateTimer(seconds);
    inputEl.value = '';
    buttonEl.disabled = true;
});

buttonEl.disabled = true;
