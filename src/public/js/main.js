'use strict';
import submitForm from "./submitForm";

document.addEventListener("DOMContentLoaded", function(event) { 
    const searchButton = document.getElementById("search-repository");
    if(searchButton){
        searchButton.addEventListener('click', function(event) {
            submitForm(event);
        });
        document.getElementById("search").addEventListener('submit', function(event) {
            submitForm(event);
        });
        document.querySelector("#search-error span").addEventListener('click', function(event) {
            document.getElementById("search-error").classList.add("hidden");
        });;
        document.getElementById("clear-table").addEventListener('click', function(event) {
            document.getElementById('repository-name').value = '';
            document.getElementById('repo-cards').innerHTML = '';
        });
	}
});