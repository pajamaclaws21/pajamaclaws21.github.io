let posts = ['/blog/entry2', '/blog/entry1'];
var div = document.getElementsByClassName('content')[0];

posts.forEach((post, index, array) => {
  fetch(post).then(response => response.text())
    .then(response => {
      response = response.split("\n--\n");

      var br, entryHeading, content, entry;

      br = () => document.createElement("br");

      entryHeading = document.createElement("p");
      entryHeading.id =  `entry${index}`;
      entryHeading.class = "heading";
      entryHeading.innerText = response[0];

      content = document.createElement("p");
      content.class = "body";
      content.innerHTML = response[1];

      entry = [entryHeading, br(), content, br(), br(), br(), br()];
      entry.forEach(item => {div.appendChild(item)});

    }).catch(err => console.log(err));
});