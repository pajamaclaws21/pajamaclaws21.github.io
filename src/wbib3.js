function accessor(url) {
    // Creates an AllOrigins URL to the desired resource.
    return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}
  
function replace(string, stringToReplace, thingReplacing) {
    // replaces stringToReplace with thingReplacing in the string.
    let splitData = string.split(stringToReplace)
    splitData.forEach((item, index, array) => {
      if (index != (array.length - 1)) {
        array[index] = item + thingReplacing;
      }
    });
    return splitData
}
  
function loadPage(url) {
    // Loads the desired resource.
    $.get(accessor(url), function (data) {
  
      let page = "https://" + url.split("//")[1].split("/")[0];
  
      // Change relative links to absolute links
      data = replace(data, '"//', '"https://').join(""); // This is used to load W***media images
      data = replace(data, '"/', '"' + page + "/").join("");
      document.getElementById("page").innerHTML = data;
  
      // Make it so every link that's clicked loads that page in WBIB
      let anchors = [].slice.call(document.getElementsByTagName("a"));
      anchors.forEach((element) => {
        element.addEventListener("click", function (event) {
          event.preventDefault();
          loadPage(this.href);
        })
      });
  
      // Make it so every image on the page loads. Used to load W***media images
      let images = [].slice.call(document.getElementsByTagName("img"));
      images.forEach((element) => {
        element.src = accessor(element.src);
      });
  
    });
}
  
var siteinput = document.getElementById("siteinput");
siteinput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      loadPage(document.getElementById("siteinput").value);
    }
});