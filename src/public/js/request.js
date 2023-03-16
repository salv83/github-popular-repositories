require('dotenv').config()

const sendRequest = (repo_name) => {
  return new Promise(function (resolve, reject) {
    const baseURL = process.env.GITHUB_API_URL;
    const token = process.env.GITHUB_TOKEN;
    const query = `?q=${repo_name}%20in:name`;
    const path = `${baseURL}${query}`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.withCredentials = true;
    
    xhr.setRequestHeader("Accept", "application/vnd.github+json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("X-GitHub-Api-Version", "2022-11-28");

    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
        
      }
      else {
        reject({
              status: this.status,
              statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
          status: this.status,
          statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

module.exports = sendRequest;




