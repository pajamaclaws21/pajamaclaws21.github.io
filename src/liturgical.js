function isLeapYear(year) {
  return (year % 100 === 0 ? year % 400 === 0 : year % 4 === 0);
}

// BEGINNING OF LITURGICAL CALENDAR CODE

// Source - https://stackoverflow.com/a/10050831
// Posted by Fuji, modified by community. See post 'Timeline' for change history
// Retrieved 2026-07-21, License - CC BY-SA 4.0
const range = (length) => { return [...Array(length).keys()] };

/*
* From gist: johndyer/easter.js
* Modified to include a JS date instead
* Calculates Easter in the Gregorian/Western (Catholic and Protestant) calendar 
* based on the algorithm by Oudin (1940) from http://www.tondering.dk/claus/cal/easter.php
*/
function getEaster(year) {
  var f = Math.floor,
    // Golden Number - 1
    G = year % 19,
    C = f(year / 100),
    // related to Epact
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    // number of days from 21 March to the Paschal full moon
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    // weekday for the Paschal full moon
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    // number of days from 21 March to the Sunday on or before the Paschal full moon
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4);

  return new Date(year, month - 1, day);
}

function isSunday(date) {
  return date.getDay() == 0;
}

// returns the date n days before a given date
function daysBefore(n, date) {
  if (n == 0) { return date } else {
    let daysFrom = n;
    if (date.getDate() < daysFrom) {
      let daysRemaining = daysFrom - date.getDate();
      if (date.getDate() == 1 && date.getMonth() == 0) {
        let oldYear = date.getFullYear() - 1;
        let daysInYear = isLeapYear(oldYear) ? 366 : 365;
        // I Do Not Know why this wants 12. it is conrusing to
        return new Date(oldYear, 12, daysInYear - daysRemaining);
      } else {
        let oldMonth = date.getMonth() - 1;
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][oldMonth];
        if (isLeapYear(date.getFullYear) && date.getMonth() == 1) {
          daysInMonth = 29;
        }
        return new Date(date.getFullYear(), oldMonth, daysInMonth - daysRemaining);
      }
    } else {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysFrom);
    }
  }; 

}
let nearestSunday = (date) => { return daysBefore(date.getDay(), date) };
let sundayOfWeekBefore = (date) => { return nearestSunday(daysBefore(1, date)); }

let year = 2000,
    christmas = new Date(year, 11, 25),
    boy = new Date(year, 0, 1),
    //commonYearSunday = boy.getDay() == 0,
    //leapYearSaturday = boy.getDay() == 6 && isLeapYear(year);
    // if common year sunday you need 53
    // if not common year sunday you need at least that mabny
    sundayCount = 60,
    lastSundayOfYear = nearestSunday(new Date(year, 11, 31)),
    sundayOfFirst = nearestSunday(new Date(year, 0, 0)).toString();

let sundayDates = range(sundayCount);
sundayDates.forEach((value, index, array) => {
  array[index] = daysBefore(7 * value, lastSundayOfYear).toString();
});

let firstSundayIndex = sundayDates.indexOf(sundayOfFirst);
sundayDates.length = firstSundayIndex + 1;