// 1. Firebase kutubxonalarini CDN orqali yuklaymiz (GitHub Pages uchun eng ishonchli yo'l)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// 2. Sizning Firebase ma'lumotlaringiz
const firebaseConfig = {
    apiKey: "AIzaSyA3gctj8nnm6pMMso-owslS_Lb95WVTViE",
    authDomain: "smartclassroom-274df.firebaseapp.com",
    databaseURL: "https://smartclassroom-274df-default-rtdb.firebaseio.com",
    projectId: "smartclassroom-274df",
    storageBucket: "smartclassroom-274df.firebasestorage.app",
    messagingSenderId: "696050966221",
    appId: "1:696050966221:web:eed68122b461dbf5a89384"
};

// Firebase-ni ishga tushirish
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 3. UI elementlarini topib olamiz
const humVal = document.getElementById('humidity-val');
const humRing = document.getElementById('humidity-ring');
const lightVal = document.getElementById('light-val');
const lightRing = document.getElementById('light-ring');
const motStatus = document.getElementById('motion-status');
const motIconCont = document.getElementById('motion-icon-container');
const logList = document.getElementById('activity-log');

// Ring (aylana) animatsiyasi uchun hisoblagich (440 - bu stroke-dasharray qiymati)
const updateRing = (el, val) => {
    const offset = 440 - (440 * val) / 100;
    el.style.strokeDashoffset = offset;
};

// 4. Firebase-dan ma'lumotlarni "jonli" eshitish
const sensorRef = ref(db, 'sensor');

onValue(sensorRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Namlikni yangilash
        if (data.namlik !== undefined) {
            const h = Math.round(data.namlik);
            humVal.innerText = h + "%";
            updateRing(humRing, h);
        }

        // Yorug'likni yangilash
        if (data.yoruglik !== undefined) {
            const l = Math.round(data.yoruglik);
            lightVal.innerText = l + "%";
            updateRing(lightRing, l);
        }

        // Harakatni yangilash
        if (data.harakat !== undefined) {
            if (data.harakat === 1) {
                motStatus.innerText = "HARAKAT BOR!";
                motStatus.style.color = "#ef4444"; // Qizil
                motIconCont.style.borderColor = "#ef4444";
                addLog("Xonada harakat aniqlandi!");
            } else {
                motStatus.innerText = "Tinch (Harakat yo'q)";
                motStatus.style.color = "#10b981"; // Yashil
                motIconCont.style.borderColor = "rgba(255,255,255,0.1)";
            }
        }
    }
});

// Log qo'shish funksiyasi
function addLog(msg) {
    const time = new Date().toLocaleTimeString();
    const newLog = document.createElement('p');
    newLog.innerHTML = `<span class="text-white/20">[${time}]</span> ${msg}`;
    logList.prepend(newLog); // Eng yangisini tepaga qo'yadi
    
    // Loglar ko'payib ketmasligi uchun (oxirgi 5 tasi qoladi)
    if (logList.childNodes.length > 5) {
        logList.removeChild(logList.lastChild);
    }
}