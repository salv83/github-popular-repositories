const singleCard = require("../js/singleCard");

describe(`Test the function that produces the html for a single item got from GitHub API`, function () {
    it('produce html for a not popular repository', () => {
        const item = {
            full_name: "salv83/github-popular-repositories",
            owner: {
              login: "salv83",
              avatar_url: "https://avatars.githubusercontent.com/u/3779059?v=4",
            },
            stargazers_count: 0,
            forks_count: 0
        };
        expect(singleCard(item)).toMatchSnapshot();
      });
      it('produce html for a popular repository', () => {
        const item = {
            full_name: "salv83/github-popular-repositories",
            owner: {
              login: "salv83",
              avatar_url: "https://avatars.githubusercontent.com/u/3779059?v=4",
            },
            stargazers_count: 200,
            forks_count: 200
        };
        expect(singleCard(item)).toMatchSnapshot();
      });
});