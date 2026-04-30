const STORAGE_KEY = "gymCoachAppData";

const profileForm = document.getElementById("profileForm");
const nameInput = document.getElementById("nameInput");
const goalInput = document.getElementById("goalInput");
const equipmentInput = document.getElementById("equipmentInput");
const daysInput = document.getElementById("daysInput");
const profileSummary = document.getElementById("profileSummary");
const programContainer = document.getElementById("programContainer");
const weightForm = document.getElementById("weightForm");
const weightInput = document.getElementById("weightInput");
const weightDate = document.getElementById("weightDate");
const weightTableBody = document.getElementById("weightTableBody");
const mealForm = document.getElementById("mealForm");
const mealInput = document.getElementById("mealInput");
const caloriesInput = document.getElementById("caloriesInput");
const notesInput = document.getElementById("notesInput");
const mealDate = document.getElementById("mealDate");
const mealTableBody = document.getElementById("mealTableBody");

const DEFAULT_DATA = {
  profile: {
    name: "",
    goal: "strength",
    equipment: "dumbbells",
    days: 3,
  },
  program: [],
  weightLogs: [],
  meals: [],
};

const WORKOUT_LIBRARY = {
  strength: [
    "Barbell squats",
    "Bench press",
    "Deadlift",
    "Bent-over row",
    "Overhead press",
  ],
  hypertrophy: [
    "Dumbbell chest press",
    "Leg press",
    "Cable fly",
    "Romanian deadlift",
    "Lat pulldown",
  ],
  endurance: [
    "Interval run",
    "Battle rope",
    "Kettlebell swings",
    "Burpees",
    "Rowing machine",
  ],
};

const EQUIPMENT_TIPS = {
  bodyweight: "Use bodyweight exercises and add more reps for challenge.",
  dumbbells: "Pair dumbbell presses and rows for balanced muscle work.",
  barbell: "Focus on compound barbell lifts for strength progress.",
  machines: "Use machines to add volume and reduce joint stress.",
};

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    return structuredClone(DEFAULT_DATA);
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    return structuredClone(DEFAULT_DATA);
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function createDynamicProgram({ goal, equipment, days }) {
  const library = WORKOUT_LIBRARY[goal] || WORKOUT_LIBRARY.strength;
  const plan = [];
  const baseCount = Math.min(Math.max(days, 2), 6);

  for (let i = 1; i <= baseCount; i += 1) {
    const index = (i - 1) % library.length;
    const exercise = library[index];
    const workload = goal === "endurance" ? "3 rounds" : "4 sets";
    const repRange = goal === "strength" ? "5-6 reps" : goal === "hypertrophy" ? "10-15 reps" : "15-20 reps";

    plan.push(`Day ${i}: ${workload} of ${exercise} (${repRange})`);
  }

  return [
    `Goal: ${goal.charAt(0).toUpperCase() + goal.slice(1)}, Equipment: ${equipment}, Days: ${days}`,
    `Tip: ${EQUIPMENT_TIPS[equipment] || "Track consistently and adjust weekly."}`,
    ...plan,
  ];
}

function renderProfile(data) {
  nameInput.value = data.profile.name;
  goalInput.value = data.profile.goal;
  equipmentInput.value = data.profile.equipment;
  daysInput.value = data.profile.days;

  const nameText = data.profile.name ? data.profile.name : "Athlete";
  profileSummary.innerHTML = `
    <strong>${nameText}</strong> • Goal: ${data.profile.goal} • Equipment: ${data.profile.equipment} • ${data.profile.days} days / week
  `;
}

function renderProgram(data) {
  if (!data.program.length) {
    programContainer.innerHTML = "<p>No program yet — save your profile to generate one.</p>";
    return;
  }

  const items = data.program.map((line) => `<li>${line}</li>`).join("");
  programContainer.innerHTML = `
    <div class="program">
      <h3>Dynamic Program</h3>
      <ul>${items}</ul>
    </div>
  `;
}

function renderWeightLogs(weightLogs) {
  if (!weightLogs.length) {
    weightTableBody.innerHTML = `<tr><td colspan="2" class="empty-row">No weight entries yet.</td></tr>`;
    return;
  }

  const rows = weightLogs
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((entry) => `<tr><td>${entry.date}</td><td>${entry.weight}</td></tr>`)
    .join("");
  weightTableBody.innerHTML = rows;
}

function renderMeals(meals) {
  if (!meals.length) {
    mealTableBody.innerHTML = `<tr><td colspan="4" class="empty-row">No meals logged yet.</td></tr>`;
    return;
  }

  const rows = meals
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((entry) => `
      <tr>
        <td>${entry.date}</td>
        <td>${entry.meal}</td>
        <td>${entry.calories}</td>
        <td>${entry.notes}</td>
      </tr>
    `)
    .join("");
  mealTableBody.innerHTML = rows;
}

function handleProfileSave(event) {
  event.preventDefault();
  const data = loadData();

  data.profile.name = nameInput.value.trim();
  data.profile.goal = goalInput.value;
  data.profile.equipment = equipmentInput.value;
  data.profile.days = Number(daysInput.value) || 3;
  data.program = createDynamicProgram(data.profile);

  saveData(data);
  renderProfile(data);
  renderProgram(data);
}

function handleWeightAdd(event) {
  event.preventDefault();
  const data = loadData();

  const dateValue = weightDate.value || new Date().toISOString().slice(0, 10);
  const weightValue = Number(weightInput.value);
  if (!weightValue || weightValue <= 0) {
    return;
  }

  data.weightLogs.push({ date: dateValue, weight: weightValue.toFixed(1) });
  saveData(data);
  renderWeightLogs(data.weightLogs);
  weightInput.value = "";
  weightDate.value = "";
}

function handleMealAdd(event) {
  event.preventDefault();
  const data = loadData();

  const dateValue = mealDate.value || new Date().toISOString().slice(0, 10);
  const mealValue = mealInput.value.trim();
  const caloriesValue = Number(caloriesInput.value);
  const notesValue = notesInput.value.trim();

  if (!mealValue) {
    return;
  }

  data.meals.push({ date: dateValue, meal: mealValue, calories: caloriesValue || 0, notes: notesValue });
  saveData(data);
  renderMeals(data.meals);
  mealInput.value = "";
  caloriesInput.value = "";
  notesInput.value = "";
  mealDate.value = "";
}

function initializeApp() {
  const data = loadData();
  renderProfile(data);
  renderProgram(data);
  renderWeightLogs(data.weightLogs);
  renderMeals(data.meals);

  profileForm.addEventListener("submit", handleProfileSave);
  weightForm.addEventListener("submit", handleWeightAdd);
  mealForm.addEventListener("submit", handleMealAdd);
}

initializeApp();
