import { useState, useEffect } from 'react';
import { TimeOfDay } from 'types';

const REFRESH_RATE = 30000;

const MORNING = [
    `Good morning my angel`,
    `Good morning!`,
    `Good morning beautiful`,
    `Rise and shine hotstuff`,
    `Good Morn`,
    `Morning boob!`,
    `Good morning boobels`,
    `Good morning boob`,
    `Morning boob`,
    `Morn Bube`,
    `Morn büb`,
    `Morning`,
    `Morning Sexy`,
    `Enjoy your day!`,
    `How was your sleep?`,
    `Each morning we are born again`,
    `Good morning, you are amazing`,
    `Good morning, angel`,
    `Sun up, sweetie`,
];

const AFTERNOON = [
    `What's for lunch good lookin?`,
    `I'm grateful to know you`,
    `You light up the room`,
    `You deserve a hug right now`,
    `You should be proud of yourself`,
    `You're more helpful than you realize`,
    `You're killing it büb`,
];
const EVENING = [
    `Wow, you look hot!`,
    `You look nice!`,
    `Hi, sexy!`,
    `Your perspective is refreshing`,
    `You have a great sense of humor`,
    `You've got an awesome sense of humor!`,
    `You are really courageous 💪`,
    `Your kindness is a balm to all who encounter it`,
    `You're all that and a super-size bag of chips`,
    `On a scale from 1 to 10, you're an 11.5`,
    `You are strong 💪`,
];
const NIGHT = [
    `Goodnight gorgeous`,
    `Night Night`,
    `Have a good sleep`,
    `Have good sleeps`,
    `Sweet dreams sexy`,
];
const ANYTIME = [
    `You're an awesome friend`,
    `You're a gift to those around you`,
    `You're a smart cookie 🧠`,
    `You are awesome!`,
    `You have impeccable manners`,
    `I like your style`,
    `You have the best laugh`,
    `I appreciate you`,
    `You are the most perfect you there is`,
    `You are enough`,
    `You're strong 💪`,
    `You're even more beautiful on the inside than you are on the outside 😉`,
    `You have the courage of your convictions`,
    `I'm inspired by you`,
    `You're like a ray of sunshine on a really dreary day`,
    `You are making a difference`,
    `Thank you for being there for me`,
    `You bring out the best in other people`,
    `Hi boob`,
    `Hello boob`,
    `Hi bübels`,
    `Hi büb`,
];

const getTimeOfDay = () => {
    const hour = new Date().getHours() + 1;
    if (hour < 12 && hour > 2) {
        return TimeOfDay.Morning;
    }
    if (hour > 12 && hour < 17) {
        return TimeOfDay.Afternoon;
    }
    if (hour >= 17 && hour <= 21) {
        return TimeOfDay.Evening;
    }
    return TimeOfDay.Night;
};

const randomValue = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

const timeMap = {
    [TimeOfDay.Morning]: MORNING,
    [TimeOfDay.Afternoon]: AFTERNOON,
    [TimeOfDay.Evening]: EVENING,
    [TimeOfDay.Night]: NIGHT,
};
const getCompliment = (timeOfDay: TimeOfDay) => {
    if (Math.random() < 0.25) return randomValue(ANYTIME);
    return randomValue(timeMap[timeOfDay]);
};
export const useCompliments = () => {
    const [compliment, setCompliment] = useState('');
    useEffect(() => {
        const timeOfDay = getTimeOfDay();
        setCompliment(getCompliment(timeOfDay));
        setInterval(() => {
            const timeOfDay = getTimeOfDay();
            setCompliment(getCompliment(timeOfDay));
        }, REFRESH_RATE);
    }, []);
    return { compliment };
};
