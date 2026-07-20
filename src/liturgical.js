// a test

function goldenNumber(year){
  return ((year + 1) % 19) || 19;
}

function isLeapYear(year){
  return (year % 100 === 0 ? year % 400 === 0 : year % 4 === 0);
}

function sundayLetter(year){
  let letterPattern = [];
  let century = year - 1900 > 99 ? 20 : 21;
  if (century == 20) { letterPattern = ["g", "f", "e", "d", "c", "b", "A"] } else { letterPattern = ["A", "g", "f", "e", "d", "c", "b"]};

  if (year == 2000){ return "b"};

  let years = [];
  for(let i=0; i<100; i++){
    years.push(i);
    // Add an extra entry for leap years
    // We can ignore 2000 as a possibility because it's been handled already
    if(isLeapYear(i) && i != 0){years.push(i + "*")};
  }

  let sundayLetters = [];
  years.forEach((item, index, array) => {
    sundayLetters[index] = letterPattern[index % 7];
  });

  return sundayLetters[years.indexOf(year % 100 + (isLeapYear(year) ? "*" : 0))];
}

