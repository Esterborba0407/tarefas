// script.js - funcionalidade completa do Disiplini

let timer;
let timerRunning = false;
let duration = 25 * 60; // 25 minutos em segundos
let timeLeft = duration;
const timerDisplay = document.getElementById("timer");
const durationInput = document.getElementById("focus-duration");

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  duration = parseInt(durationInput.value) * 60;
  timeLeft = duration;
  updateTimerDisplay();
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      timerRunning = false;
      alert("Tempo de foco concluído!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timerRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  timerRunning = false;
  timeLeft = parseInt(durationInput.value) * 60;
  updateTimerDisplay();
}

durationInput.addEventListener("input", () => {
  timeLeft = parseInt(durationInput.value) * 60;
  updateTimerDisplay();
});

// Tarefas
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

function createTaskElement(name, desc, day, start, end, duration) {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${name}</strong> - ${day} | ${start} - ${end}<br>
    <small>${desc}</small><br>
    <span>Duração: ${durationInput.value} min</span>
    <button class="delete-task" style="display: none;">🗑️</button>
  `;

  li.addEventListener("mouseenter", () => {
    li.querySelector(".delete-task").style.display = "inline-block";
  });

  li.addEventListener("mouseleave", () => {
    li.querySelector(".delete-task").style.display = "none";
  });

  li.querySelector(".delete-task").addEventListener("click", () => {
    li.remove();
  });

  return li;
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("task-name").value;
  const desc = document.getElementById("task-desc").value;
  const day = document.getElementById("task-day").value;
  const start = document.getElementById("task-start").value;
  const end = document.getElementById("task-end").value;
  const taskEl = createTaskElement(name, desc, day, start, end);
  taskList.appendChild(taskEl);
  taskForm.reset();
});

// Gráfico
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["06h", "08h", "10h", "12h", "14h", "16h", "18h", "20h"],
    datasets: [{
      label: "Produtividade",
      data: [0, 1, 3, 2, 1, 4, 2, 1],
      backgroundColor: '#ff7a59',
      borderRadius: 10,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#999'
        }
      },
      x: {
        ticks: {
          color: '#999'
        }
      }
    }
  }
});

// Modo escuro
const toggleDark = document.getElementById("toggle-dark");
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});