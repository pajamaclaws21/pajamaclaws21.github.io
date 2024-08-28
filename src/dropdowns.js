function makeDropdownsWork() {
  let applicableClasses = ["dropdown", "insideDD"];

  applicableClasses.forEach((classname) => {
    Array.from(document.getElementsByClassName(classname)).forEach((item) => {
      document.getElementById(item.id).addEventListener("click", function() {
        let dropdown = document.getElementById(`${this.id}Items`);
        dropdown.hidden = !(dropdown.hidden);
      })
    });
  })
}

/*
Array.from(document.getElementsByClassName("dropdown")).forEach((item) => {
  document.getElementById(item.id).addEventListener("click", function() {
    let dropdown = document.getElementById(`${this.id}Items`);
    dropdown.hidden = !(dropdown.hidden);
  })
});
*/

document.addEventListener("DOMContentLoaded", makeDropdownsWork);