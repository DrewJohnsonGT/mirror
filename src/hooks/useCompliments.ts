import { useEffect, useState } from 'react';
import { COMPLIMENTS_REFRESH_RATE } from 'util/constants';

enum TimeOfDay {
  Morning,
  Afternoon,
  Evening,
  Night,
}

enum TimeOfYear {
  Spring,
  Summer,
  Fall,
  Winter,
}

const MORNING = [
  'Good morning my angel',
  'Good morning!',
  'Good morning beautiful',
  'Rise and shine hotstuff',
  'Good Morn',
  'Morning boob!',
  'Good morning boobels',
  'Good morning boob',
  'Morning boob',
  'Morn Bube',
  'Morn büb',
  'Morning',
  'Morning Sexy',
  'Enjoy your day!',
  'How was your sleep?',
  'Each morning we are born again',
  'Good morning, you are amazing',
  'Good morning, angel',
  'Sun up, sweetie',
  'Start your day with sparkle ✨ my love!',
  'Morning shines brighter with your smile 😊',
  'Have a radiant day ahead, beautiful!',
  'Wake up, the world awaits your magic! 🪄',
  'Let your positivity bloom this morning!',
];

const MORNING_WINTER = [
  'Merry Morning, my Christmas star! 🌟',
  'Good morning, my winter wonder! ⛄',
  'Wake up, my festive joy! 🎄',
  'Ho Ho Ho! 🎅 Rise and shine, Christmas angel!',
  'Jingle all the way into the day, beautiful! 🔔',
  'Good morning, my gift of every day! 🎁',
  'Frosty mornings are warm with you, my love! ❄️',
  'Rise and sparkle, my winter queen! 🌬️',
  'Good morning, snow angel! ❄️',
  'Chilly mornings, warm hearts with you! 🔥',
  'Wake up to a winter wonderland, my darling! ❄️',
];

const AFTERNOON = [
  "What's for lunch good lookin?",
  "I'm grateful to know you",
  'You light up the room',
  'You deserve a hug right now',
  'You should be proud of yourself',
  "You're more helpful than you realize",
  "You're killing it büb",
  'Your smile brightens my afternoon',
  'Hope your day is as wonderful as you are!',
  "Just a reminder: you're absolutely amazing!",
  "You're doing great, keep it up!",
  'Sending a little sunshine your way this afternoon!',
];

const AFTER_NOON_WINTER = [
  'Sparkling as bright as Christmas lights at noon!',
  "You're as sweet as a Christmas cookie, hope your day is too!",
  'Feeling festive yet, gorgeous? 🎄',
  "You're the warmth in this winter afternoon!",
  'Your smile is as cozy as a Christmas hug!',
  'Cozy up to a lovely afternoon, beauty! ☕',
  'Your laughter is the jingle in my day! 🔔',
  'May your afternoon be filled with holiday cheer! 🎄',
  "You're the sparkle in the snow, lovely!",
  'Afternoons glow better with your joy! ✨',
];

const EVENING = [
  'Wow, you look hot!',
  'You look nice!',
  'Hi, sexy!',
  'Your perspective is refreshing',
  'You have a great sense of humor',
  "You've got an awesome sense of humor!",
  'You are really courageous 💪',
  'Your kindness is a balm to all who encounter it',
  "You're all that and a super-size bag of chips",
  "On a scale from 1 to 10, you're an 11.5",
  'You are strong 💪',
  'Evening’s glow looks lovely on you',
  'Winding down? You’ve earned it, beautiful',
  'Your energy tonight is so captivating!',
  'Cheers to a relaxing evening, you deserve the best',
  'Your presence lights up the night',
];

const EVENING_WINTER = [
  'Evening greetings to my Christmas delight!',
  'You glow brighter than the Christmas tree lights!',
  'Hope your evening is as joyful as a Christmas carol!',
  'You make every evening merry and bright!',
  'All is calm, all is bright, especially with you tonight!',
  'Cozy evening wishes to my winter star! 🌟',
  'You light up the night more than the fireplace! 🔥',
  "Let's wrap up this chilly evening with warmth! 🧣",
  'Your smile could melt frost, lovely evening!',
  'Evenings are merrier with you around.',
];

const NIGHT = [
  'Goodnight gorgeous',
  'Night Night',
  'Have a good sleep',
  'Have good sleeps',
  'Sweet dreams sexy',
  'Drift into dreams, my love',
  'The stars envy your glow tonight ⭐',
  'Rest well, my nighttime charm',
  'Close your eyes to beautiful dreams',
  'Let the moon lull you to sleep, beautiful 🌙',
];

const NIGHT_WINTER = [
  'Goodnight, my silent night beauty!',
  'Dream of sugarplums, my sweet!',
  'May your night be as peaceful as a Christmas Eve! 🎄',
  'Sleep in heavenly peace, love.',
  'Sweet Christmas dreams, my love. 🎄',
  'May your night be as magical as Christmas itself! 🎄',
  'May your night be as bright as a Christmas star! 🌟',
  'Let the silent night cradle you to sleep',
  'Nuzzle into the night with winter’s embrace ❄️',
  'Dream sweetly under the twinkling frost ✨',
  'Goodnight, let the snowflakes kiss you to sleep',
  'Wrapped in blankets and my love, goodnight! 🌨️',
];

const ANYTIME = [
  "You're an awesome friend",
  "You're a gift to those around you 🎁",
  "You're a smart cookie 🧠",
  'You are awesome!',
  'You have impeccable manners',
  'I like your style',
  'You have the best laugh',
  'I appreciate you',
  'You are the most perfect you there is',
  'You are enough',
  "You're strong 💪",
  "You're even more beautiful on the inside than you are on the outside 😉",
  'You have the courage of your convictions',
  "I'm inspired by you",
  'Wow the mirror actually works 🤪',
  "You're like a ray of sunshine on a really dreary day",
  'You are making a difference',
  'Thank you for being there for me',
  'You bring out the best in other people',
  'Hi boob',
  '😇',
  'Hello boob',
  'Hi bübels',
  'Hi büb',
  'YEET',
  'You dazzle me with your brilliance!',
  'Every day is better because of you',
  'You’re a bright spot in any moment',
  'Elegance and joy are in all you do',
  'You’re like a breath of fresh air',
  // XMAS
  // "You're as magical as a Christmas miracle! 🎄",
  // 'Your heart is as full as a Christmas stocking!',
  // 'You sparkle like snowflakes in the sun! ❄️❄️❄️',
  // "You're the reason for the season's joy!",
  // 'Your spirit is as festive as Christmas itself!',
  // "You're the jingle to my bells! 🔔",
  // 'You are the reason for the season!',
  // 'You are the Christmas magic!',
];

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12 && hour > 2) {
    return TimeOfDay.Morning;
  }
  if (hour >= 12 && hour < 17) {
    return TimeOfDay.Afternoon;
  }
  if (hour >= 17 && hour <= 21) {
    return TimeOfDay.Evening;
  }
  return TimeOfDay.Night;
};

const getTimeOfYear = () => {
  const month = new Date().getMonth();
  if (month >= 10 && month <= 11) {
    return TimeOfYear.Winter;
  }
  if (month >= 2 && month <= 4) {
    return TimeOfYear.Spring;
  }
  if (month >= 5 && month <= 7) {
    return TimeOfYear.Summer;
  }
  return TimeOfYear.Fall;
};

const randomValue = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const timeMap = {
  [TimeOfDay.Morning]: MORNING,
  [TimeOfDay.Afternoon]: AFTERNOON,
  [TimeOfDay.Evening]: EVENING,
  [TimeOfDay.Night]: NIGHT,
};

const winterTimeMap = {
  [TimeOfDay.Morning]: MORNING_WINTER,
  [TimeOfDay.Afternoon]: AFTER_NOON_WINTER,
  [TimeOfDay.Evening]: EVENING_WINTER,
  [TimeOfDay.Night]: NIGHT_WINTER,
};

const getCompliment = (timeOfDay: TimeOfDay) => {
  if (Math.random() < 0.25) return randomValue(ANYTIME);
  if (getTimeOfYear() === TimeOfYear.Winter && Math.random() < 0.5) {
    return randomValue(winterTimeMap[timeOfDay]);
  }
  return randomValue(timeMap[timeOfDay]);
};

export const useCompliments = () => {
  const [compliment, setCompliment] = useState('');
  useEffect(() => {
    const timeOfDay = getTimeOfDay();
    setCompliment(getCompliment(timeOfDay));
    const complimentsInterval = setInterval(() => {
      const timeOfDay = getTimeOfDay();
      setCompliment(getCompliment(timeOfDay));
    }, COMPLIMENTS_REFRESH_RATE);
    return () => {
      clearInterval(complimentsInterval);
    };
  }, []);
  return { compliment };
};
