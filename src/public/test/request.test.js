const sendRequest = require('../js/request');
const data = require('./jsonData/data.json');


describe(`Test the XHR request`, function () {
    test("sendRequest resolves the data object if everything is fine", () => {
        return expect(sendRequest('salv83/github-popular-repositories')).resolves.toEqual(data);
    });
    test("sendRequest reject the status abject if there is an error", () => {
        return expect(sendRequest('salv83/github-popular-repositories')).rejects.toEqual({status: 0, statusText: ""});
    });
});