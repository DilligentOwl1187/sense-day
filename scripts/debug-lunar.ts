
import { Solar } from 'lunar-javascript';

const solar = Solar.fromYmdHms(2000, 1, 1, 12, 0, 0);
const lunar = solar.getLunar();
const eightChar = lunar.getEightChar();
const yearGan = eightChar.getYearGan();

console.log("Type of yearGan:", typeof yearGan);
console.log("Value of yearGan:", yearGan);
console.log("Is yearGan string?", typeof yearGan === 'string');
console.log("Available keys:", Object.keys(yearGan));

try {
    console.log("getWuXing:", yearGan.getWuXing());
} catch (e) {
    console.log("getWuXing failed:", e.message);
}
