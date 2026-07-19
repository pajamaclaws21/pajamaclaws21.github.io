let date = new Date();
let dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
let ordinal = () => { if (date.getDate() % 10 == 1) { return ("st") } else if (date.getDate() % 10 == 2) { return ("nd") } else if (date.getDate() % 10 == 3) { return ("rd") } else { return ("th") } };

console.log(`Today is ${dayOfWeek}, ${month} ${date.getDate()}${ordinal()}.`);