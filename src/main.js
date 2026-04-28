import './style.css'
import { database } from './firebase-config';
import { ref, onValue } from "firebase/database";

// Konfiguratsiya
const RING_RADIUS = 80;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

// DOM Elementlari
const humidityVal = document.getElementById('humidity-val');
const humidityRing = document.getElementById('humidity-ring');

const lightVal = document.getElementById('light-val');
const lightRing = document.getElementById('light-ring');

const motionStatus = document.getElementById('motion-status');
const motionStatusBadge = document.getElementById('motion-status-badge');
const motionIconContainer = document.getElementById('motion-icon-container');
const motionIcon = document.getElementById('motion-icon');

const activityLog = document.getElementById('activity-log');

/**
 * Progress halqasini yangilash (Namlik va Yorug'lik uchun)
 */
function updateRing(element, ring, value) {
  if (element && ring) {
    element.textContent = `${value}%`;
    const offset = RING_CIRCUMFERENCE - (value / 100) * RING_CIRCUMFERENCE;
    ring.style.strokeDashoffset = offset;
  }
}

/**
 * Harakat holatini yangilash
 */
function updateMotionStatus(isActive) {
  if (isActive) {
    motionStatus.textContent = 'Harakat Aniqlandi!';
    motionStatusBadge.className = 'px-6 py-2 rounded-full border border-red-500/50 bg-red-500/20 text-red-500 font-semibold text-sm tracking-wide motion-active';
    motionIconContainer.className = 'w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/30';
    motionIcon.className = 'h-10 w-10 text-red-500';
    addLogEntry('Asosiy hududda harakat aniqlandi', 'text-red-400');
  } else {
    motionStatus.textContent = "Harakat yo'q";
    motionStatusBadge.className = 'px-6 py-2 rounded-full border border-emeraldAccent/30 bg-emeraldAccent/10 text-emeraldAccent font-semibold text-sm tracking-wide';
    motionIconContainer.className = 'w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10';
    motionIcon.className = 'h-10 w-10 text-white/40';
  }
}

/**
 * Logga yangi yozuv qo'shish
 */
function addLogEntry(message, textClass = 'text-white/70') {
  const timestamp = new Date().toLocaleTimeString('uz-UZ', { hour12: false });
  const entry = document.createElement('div');
  entry.className = 'flex justify-between items-center text-sm p-3 rounded-xl bg-white/5 border border-white/5 animate-in fade-in slide-in-from-bottom-1 duration-500';
  entry.innerHTML = `
    <span class="${textClass}">${message}</span>
    <span class="text-white/30 font-mono">${timestamp}</span>
  `;
  
  activityLog.insertBefore(entry, activityLog.firstChild);
  if (activityLog.children.length > 10) activityLog.removeChild(activityLog.lastChild);
}

// --- FIREBASE LISTENERS ---

// 1. Namlikni o'qish
const humidityRef = ref(database, 'sensor/namlik');
onValue(humidityRef, (snapshot) => {
  const val = snapshot.val();
  if (val !== null) {
    updateRing(humidityVal, humidityRing, Math.round(val));
    console.log("Yangi namlik:", val);
  }
});

// 2. Harakatni o'qish
const motionRef = ref(database, 'sensor/harakat');
onValue(motionRef, (snapshot) => {
  const val = snapshot.val();
  // Arduino 0 yoki 1 yuboradi
  updateMotionStatus(val == 1);
  console.log("Harakat holati:", val);
});

// 3. Yorug'likni o'qish (YANGI)
const lightRef = ref(database, 'sensor/yoruglik');
onValue(lightRef, (snapshot) => {
  const val = snapshot.val();
  if (val !== null) {
    updateRing(lightVal, lightRing, Math.round(val));
    addLogEntry(`Yorug'lik darajasi yangilandi: ${val}%`, 'text-sunYellow');
    console.log("Yangi yorug'lik:", val);
  }
});

// Boshlang'ich loglar
addLogEntry('Tizim muvaffaqiyatli ishga tushirildi');
addLogEntry('Firebase bilan aloqa o\'rnatildi');

console.log('Aqlli Sinfxona Paneli: Firebase rejimida ishga tushdi');
