
# Popular GitHub Repositories


The goal is to create a single page application that consumes GitHub’s API, and after providing
a repository name, displays the following information:
- Repository's name and author
- Author's profile picture
- Repository's stars and forks
- Whether a repository is popular or not

For this exercise, “popular repository” means one for which score >= 500 where

`score = num_stars * 1 + num_forks * 2.`

To retrieve information about a particular repository, use GitHub's official REST API.

### Installation

In order to run the service locally we need to perform the following commands from the root folder of the project:

`npm install`

and

`npm start`

From the browser we use the service through the following url

[http://localhost:8888/](http://localhost:8888/)

### Code
The source code is developed used plain Javascript.
The frontend is styled using a little bit of SCSS and the classes of the framework Tailwind, I have only defined a custom class max-w-5rem inside the tailwind.config.js used to set the max-width for the avatar picture of a repository

```
module.exports = {
  content: ["./src/public/index.html"],
  theme: {
    extend: {
      maxWidth: {
        '5rem': '5rem',
      }
    }
  },
  plugins: [],
}
```

#### Dependencies
For the production mode I have installed tailwindcss, node-sass and dotenv to use the environment variables.
For the development mode I have installed jest 
```
        "devDependencies": {
    "eslint": "^8.36.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.27.5",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0",
    "nodemon": "^2.0.21",
    "npm-run-all": "^4.1.5",
    "parcel-bundler": "^1.12.5"},
	
	"dependencies": {
    "dotenv": "^16.0.3",
    "node-sass": "^8.0.0",
    "tailwindcss": "^3.2.7"
  }
```

#### GitHub REST API
GitHub provide us two ways to get information about a repository given the name:
1. [https://api.github.com/repos/airbnb/javascript](https://api.github.com/repos/airbnb/javascript)
2. [https://api.github.com/search/repositories?q=airbnb/javascript%20in:name](https://api.github.com/search/repositories?q=airbnb/javascript%20in:name)

I will use the second one because it give us more interesting results and in this case the name of the repository's author in not needed. 

About the authentication it looks that to perform the GET call the token we don't need to use anymore the fine-grained personal access tokens, for this reason the code lines that set the custom header for the authentication are commented inside the function [sendRequest](https://github.com/salv83/github-popular-repositories/blob/master/src/public/js/request.js).



```
    /*
    xhr.withCredentials = true; 
    xhr.setRequestHeader("Accept", "application/vnd.github+json");
    xhr.setRequestHeader("Authorization", `token ${token}`);
    xhr.setRequestHeader("X-GitHub-Api-Version", "2022-11-28");
    */
```

#### Frontend Description
The frontend is divided in two section: 
- the left side shows an input field where the used can insert the name of the repository to search and two buttons, the Search button to submit the request and the Clear button to clear the result of the previous search.
- the right side shows a table with the required information
	- Repository's name and author
	- Author's profile picture
	- Repository's stars and forks
	- Whether a repository is popular or not

#### Functions Description
#### main.js
In this file I manage the user's interaction with the frontend. When the DOM is loaded I define Event Listener
1. this Event Listener manage the click on the search button and call the function  submitForm()
```
        searchButton.addEventListener('click', function(event) {
            submitForm(event);
        });
```
2. this Event Listener manage the submit event fired when the user press the Enter key
```
        document.getElementById("search").addEventListener('submit', function(event) {
            submitForm(event);
        });
```
3. this Event Listener is used to hide the error message under the form when the user click on the close button
```
        document.querySelector("#search-error span").addEventListener('click', function(event) {
            document.getElementById("search-error").classList.add("hidden");
        });;
```
4. When the user click on the Clear button this event listner clear the innerHTML of the table on the right side of the frontend and clear the content of the input field
```
        document.getElementById("clear-table").addEventListener('click', function(event) {
            document.getElementById('repository-name').value = '';
            document.getElementById('repo-cards').innerHTML = '';
        });
```

#### request.js
In this file is defined the function sendRequest that build the path we have to use to execute the GET call, it load the baseURL 
https://api.github.com/search/repositories
from the environment variables 
then the function attaches to baseURL the query string composed by the q= parameter, the name of the repository typed by the user and the in:name parameter used by GitHub to perform the search with the repository name 
```
    const baseURL = process.env.GITHUB_API_URL;
    const token = process.env.GITHUB_TOKEN;
    const query = `?q=${repo_name}%20in:name`;
    const path = `${baseURL}${query}`;
```
Once the path is built it's executed the API call using the XMLHttpRequest object.

#### submitForm.js
When the form is submitted the submitForm function get the value of the input field and use the sendRequest function to get the data from the API and  if the data got from the API contains more then 0 items it calls the showCards function to generate the html that render the table with the repository info. If there are 0 items it will display an error message under the form. 

#### showCards.js
showCards performs an iteration over the items got from the API call and pass each single item to the  singleCard function that generate each row of the table.

#### singleCard.js
Given an item this function take the information  we need
```
    const repositoryName = item.full_name;
    const repositoryAuthor = item.owner.login;
    const authorProfilePicture = item.owner.avatar_url;
    const stargazersCount = item.stargazers_count;
    const forksCount = item.forks_count;
```
calculate if the repository is popular using the isPopular function
```
const isPopular = (stargazersCount, forksCount) => {
    const score = stargazersCount * 1 + forksCount * 2;
    if(score >= 500){
        return true;
    }else{
        return false;
    }
}
```
and generate the html of each single row of the table.

#### Unit test
The unit tests are located inside the folder src/public/test, and there are three test suites for the most relevant functions

**singleCard.test.js**
In this test given an item as input we generate a screenshot of the html generated by the singleCard function. The snapshot artifact is committed alongside code changes then Jest compares the rendered output with the previous snapshot. If they match, the test will pass. If they don't match, either the test runner found a bug and the code should be fixed, or the implementation has changed and the snapshot needs to be updated.

**showCards.test.js**
Also this test use the screenshot technique.

**request.test.js**
Check if the promise returned by the sendRequest resolves in one case with string, I compare this string with exampleString that simulate the one returned by the API, if the two string are equal the test pass. 
Same thing in the second case where I check if the results are empty in this case the string returned is compared with the errorValue string that contains the stringified version of this object 

```
{
  status: this.status,
  statusText: xhr.statusText
}
````
