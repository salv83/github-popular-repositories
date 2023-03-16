'use strict';

const sendRequest = require("./request");

document.addEventListener("DOMContentLoaded", function(event) { 
    const searchButton = document.getElementById("search-repository");
    if(searchButton){
        searchButton.addEventListener('click', function(event) {
          sendRequest('salv83/github-popular-repositories');
        });
	}
});