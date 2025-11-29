
// ===== server/utils/generateUsername.js =====
const adjectives = [
  'Green', 'Clean', 'Eco', 'Fresh', 'Pure', 'Bright', 'Clear', 'Smart',
  'Quick', 'Kind', 'Wise', 'Bold', 'Calm', 'Cool', 'Fair', 'Fast'
];

const nouns = [
  'Helper', 'Guardian', 'Reporter', 'Keeper', 'Warrior', 'Hero', 'Scout',
  'Ranger', 'Defender', 'Champion', 'Cleaner', 'Saver', 'Protector'
];

const generateUsername = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adj}${noun}${number}`;
};

module.exports = { generateUsername };