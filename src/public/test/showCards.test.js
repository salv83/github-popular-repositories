const showCards = require("../js/showCards");

describe(`Test the function that produces the html for the table with all items got from GitHub API`, function () {
    it('get html for all the items', () => {
            const data = [
                {
                    full_name: "salv83/github-popular-repositories",
                    owner: {
                      login: "salv83",
                      avatar_url: "https://avatars.githubusercontent.com/u/3779059?v=4",
                    },
                    stargazers_count: 0,
                    forks_count: 0
                },
                {
                    full_name: "salv83/github-popular-repositories",
                    owner: {
                      login: "salv83",
                      avatar_url: "https://avatars.githubusercontent.com/u/3779059?v=4",
                    },
                    stargazers_count: 0,
                    forks_count: 0
                }
            ];
            expect(showCards(data)).toMatchSnapshot();
      });
});