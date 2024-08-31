var postCount = 2;
var posts = [];

function localizePosts() {
    // Change this so it works w Netlify
    for (let i = 0; i < postCount; i++) {
        posts[i] = `https://pajamaclaws21.github.io/blog/entry${i + 1}`;
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

        sidebar.innerHTML += `<li><a href="#entry${index}">${response[0].split(" (")[0]}</a></li>`;

      }).catch(err => console.log(err));
  });
}

document.addEventListener("DOMContentLoaded", makeAutobloggingWork);