import sendRequest from "./request";
import showCards from "./showCards";

const submitForm = (event) => {
    event.preventDefault();
    document.getElementById("search-error").classList.add("hidden");
    const inputElement = document.getElementById('repository-name');
    const repositoryName = inputElement.value;
    if(repositoryName && repositoryName.length !== 0 && repositoryName !== 0){
        const data = sendRequest(repositoryName);
        data.then(function(result) {
            if(result){
                const parsedData = JSON.parse(result);
                if(parsedData && parsedData.items && parsedData.items.length > 0){
                    const cardsHtml = showCards(parsedData.items);
                    if(cardsHtml && cardsHtml !== ''){
                        document.getElementById('repo-cards').innerHTML = cardsHtml;
                    }
                }else{
                    document.getElementById("search-error").classList.remove("hidden");
                }
            }
        });
    }
}

module.exports = submitForm;