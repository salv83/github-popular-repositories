const singleCard = (item) => {
    let cardHtml = '';
    const repositoryName = item.full_name;
    const repositoryAuthor = item.owner.login;
    const authorProfilePicture = item.owner.avatar_url;
    const stargazersCount = item.stargazers_count;
    const forksCount = item.forks_count;
    const popular = isPopular(stargazersCount, forksCount);
    cardHtml = cardHtml + 
    `
    <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 bg-white">
        <td class="align-middle border-grey-light border hover:bg-gray-100 text-black p-3"><img class="m-auto rounded-full max-w-5rem h-auto" src="${authorProfilePicture}" alt="${repositoryAuthor}"></td>
        <td class="align-middle border-grey-light border hover:bg-gray-100 text-black p-3"><span class="block sm:hidden font-bold">Repository's Name: </span>${repositoryName}</td>
        <td class="align-middle border-grey-light border hover:bg-gray-100 text-black p-3"><span class="block sm:hidden font-bold">Author: </span>${repositoryAuthor}</td>
        <td class="align-middle border-grey-light border hover:bg-gray-100 text-black p-3"><span class="block sm:hidden font-bold">Stars: </span>${stargazersCount}</td>
        <td class="align-middle border-grey-light border hover:bg-gray-100 text-black p-3"><span class="block sm:hidden font-bold">Forks: </span>${forksCount}</td>
    `;
    if(popular){ 
        cardHtml = cardHtml + `<td class="align-middle border-grey-light border hover:bg-gray-100 text-black p-8 sm:p-3 popular-repository"></td></tr>`;
    }else{ 
        cardHtml = cardHtml + `<td class="align-middle border-grey-light border hover:bg-gray-100 text-black p-8 sm:p-3"></td></tr>`;
    }
    return cardHtml;
}

const isPopular = (stargazersCount, forksCount) => {
    const score = stargazersCount * 1 + forksCount * 2;
    if(score >= 500){
        return true;
    }else{
        return false;
    }
}

module.exports = singleCard;