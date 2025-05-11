let timer;
let isRunning = false;
let timeElapsed = 0;  // Time in milliseconds
let startTime = 0;
let lapTimes = [];

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsRemaining = milliseconds % 1000;

    // Format with leading zeros
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}.${millisecondsRemaining < 100 ? '0' : ''}${millisecondsRemaining < 10 ? '0' : ''}${millisecondsRemaining}`;
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('start-stop').innerHTML = "Start";
    } else {
        startTime = Date.now() - timeElapsed;
        timer = setInterval(updateTime, 10);  // Update every 10 milliseconds for better precision
        document.getElementById('start-stop').innerHTML = "Pause";
    }
    isRunning = !isRunning;
}

function updateTime() {
    timeElapsed = Date.now() - startTime;
    document.getElementById('time-display').innerHTML = formatTime(timeElapsed);
}

function reset() {
    clearInterval(timer);
    timeElapsed = 0;
    document.getElementById('time-display').innerHTML = formatTime(timeElapsed);
    document.getElementById('start-stop').innerHTML = "Start";
    lapTimes = [];
    updateLapList();
    isRunning = false;
}

function recordLap() {
    if (isRunning) {
        lapTimes.push(formatTime(timeElapsed));
        updateLapList();
    }
}

function updateLapList() {
    const lapList = document.getElementById('lap-list');
    lapList.innerHTML = '';

    lapTimes.forEach((lapTime, index) => {
        const li = document.createElement('li');
        li.innerText = `Lap ${index + 1}`;
        
        const timeSpan = document.createElement('span');
        timeSpan.innerText = lapTime;
        li.appendChild(timeSpan);
        
        lapList.appendChild(li);
    });
}
