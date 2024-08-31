let posts = ['/blog/entry2', '/blog/entry1'];

function makeAutobloggingWork() {
  var div = document.getElementsByClassName('content')[0];

  posts.forEach((post, index, array) => {
    fetch(post).then(response => response.text())
      .then(response => {
        response = response.split("\n--\n");

        var br, entryHeading, content, entry;

        br = () => document.createElement("br");

        entryHeading = document.createElement("p");
        entryHeading.id = `entry${index}`;
        entryHeading.class = "heading";
        entryHeading.innerText = response[0];

        content = document.createElement("p");
        content.class = "body";
        content.innerHTML = response[1];

        entry = [entryHeading, br(), content, br(), br(), br(), br()];
        entry.forEach(item => { div.appendChild(item) });

        document.getElementById('sidebar').innerHTML += `<li><a href="#entry${index}">${response[0].split(" (")[0]}</a></li>`;

      }).catch(err => console.log(err));
  });
}

document.addEventListener("DOMContentLoaded", makeAutobloggingWork);