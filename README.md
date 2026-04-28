# Aqlli Sinfxona Monitoring Paneli (Smart Classroom v1.0)

Ushbu loyiha zamonaviy sinfxonalarni masofadan turib kuzatish uchun mo'ljallangan yuqori texnologiyali (futuristik) dashboard hisoblanadi.

## Xususiyatlari
- **Glassmorphism Dizayn**: Zamonaviy va shaffof interfeys.
- **Namlik Monitoringi**: Real vaqt rejimida namlik darajasini ko'rsatuvchi animatsion halqa.
- **Harakat Datchigi**: Xonada harakat aniqlanganda qizil pulsatsiyalanuvchi indikator.
- **So'nggi Faollik**: Barcha hodisalarni vaqt bilan qayd etib boruvchi log bo'limi.
- **To'liq Moslashuvchan (Responsive)**: Mobil va desktop qurilmalar uchun moslangan.

## Texnologiyalar
- HTML5 & JavaScript (Vanilla)
- Tailwind CSS v4
- Vite (Tezkor yig'ish vositasi)

## Ishga tushirish
Loyihani mahalliy kompyuterda ishga tushirish uchun:

1. Bog'liqliklarni o'rnating:
   ```bash
   npm install
   ```
2. Loyihani ishga tushiring:
   ```bash
   npm run dev
   ```

## Firebase-ga ulash
Loyiha Firebase yoki boshqa Backend tizimlariga ulanish uchun tayyor. `src/main.js` faylidagi placeholder ID'lardan foydalanishingiz mumkin:
- `humidity-val`: Namlik qiymati uchun.
- `motion-status`: Harakat holati uchun.
- `activity-log`: Hodisalar ro'yxati uchun.
