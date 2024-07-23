function makeDropdownsWork() {
    Array.from(document.getElementsByClassName("dropdown")).forEach((item) => {
      document.getElementById(item.id).addEventListener("click", function() {
        let dropdown = document.getElementById(`${this.id}Items`);
        dropdown.hidden = !(dropdown.hidden);
      })
    });
  }
  document.addEventListener("DOMContentLoaded", makeDropdownsWork);