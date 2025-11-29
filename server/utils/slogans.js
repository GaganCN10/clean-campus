// ===== server/utils/slogans.js =====
const slogans = [
  "Keep your campus clean, keep your future green! 🌱",
  "A clean college is a smart college! 🎓",
  "Waste today, want tomorrow - Choose wisely! ♻️",
  "Small steps, big change - Report waste today! 👣",
  "Be the change you want to see in your campus! 🌟",
  "Clean campus, clear mind, bright future! 🧠",
  "Every report counts towards a cleaner tomorrow! 📊",
  "Together we can make our college spotless! 🤝",
  "Your actions today shape tomorrow's environment! 🌍",
  "Clean spaces inspire great minds! 💡"
];

const getTodaySlogan = () => {
  const today = new Date();
  const dayIndex = today.getDate() % slogans.length;
  return slogans[dayIndex];
};

module.exports = { slogans, getTodaySlogan };