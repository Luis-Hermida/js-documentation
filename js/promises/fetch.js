//////////
// Fetch
//////////
/*
    In frontend programming, promises are often used for network requests. So let's see an extended
    example of that.

    We'll use the fetch method to load the information about the user from the remote server. It has a
    lot of optional parameters, but the basic syntax is quite simple:

    let promise = fetch(url);

    This makes a network request the the 'url' and returns a promise. The promise resolves with a
    'response' object when the remote server responds with headers, but before the full response is
    downloaded.

    To read the full response, we should call the method 'response.text()': it returns a promise
    that resolves when the full text is downloaded from the remote server, with that text as a result.

    The code below makes a request to 'user.json' and loads its text from the server:
*/
fetch("/article/promise-chaining/user.json")
  // .then below runs when the remote server responds
  .then(function (response) {
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function (text) {
    // ...and here's the content of the remote file
    console.log(text); // {"name": "iliakan", "isAdmin": true}
  });

/*
    The 'response' object returned from 'fetch' also includes the method 'response.json()'
    that reads the remote data and parses it as JSON. In our case that's even more conveninent
*/
// same as above, but response.json() parses the remote content as JSON
fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => console.log(user.name)); // iliakan, got user name

/*
    As a good practice, an asynchronous action should always return a promise. That makes it
    possible to plan actions after it; even if we don't plan to extend the chain now, we may need it
    later. 

    If a .then (or catch/finally , doesn’t matter) handler returns a promise, the rest of the
    chain waits until it settles. When it does, its result (or error) is passed further.

    Good practices - Examplen
*/
// Reusable functions
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// Use them:
loadJson("/article/promise-chaining/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => console.log(`Finished showing ${githubUser.name}`));
