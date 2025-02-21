var postCount = 7;
var posts = [];

function localizePosts() {
    for (let i = postCount; i > 0; i--) {
        posts[i + 1] = `https://pajamaclaws21.onrender.com/blog/entry${i}`;
    };

    posts = posts.reverse();
}

function onlyFromClass(name) {
    return document.getElementsByClassName(name)[0];
}

function makeAutobloggingWork() {
  var div = onlyFromClass("content");
  var sidebar = document.getElementById("entriesItems");

  localizePosts()

  posts.forEach((url, index, array) => {
    fetch(url).then(response => response.text())
      .then(response => {
        response = response.split("\n--\n");

        var br, entryNum, entryHeading, content, entry;

        br = () => document.createElement("br");
        entryNum = url.split("entry")[1];

        entryHeading = document.createElement("p");
        entryHeading.id = `entry${entryNum}`;
        entryHeading.className = "heading";
        entryHeading.innerText = response[0];

        content = document.createElement("p");
        content.className = "body";
        content.innerHTML = response[1];

        entry = [entryHeading, br(), content, br(), br(), br(), br()];
        entry.forEach(item => { div.appendChild(item) });

        sidebar.innerHTML += `<li><a href="#entry${entryNum}">${response[0].split(" (")[0]}</a></li>`;

      }).catch(err => console.log(err));
  });
}

document.addEventListener("DOMContentLoaded", makeAutobloggingWork);