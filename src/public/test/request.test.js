const sendRequest = require('../js/request');
const exampleString = require('./jsonData/data');

describe(`Test the XHR request`, function () {
    test("sendRequest resolves the data object if everything is fine", () => {
        return expect(sendRequest('salv83/Codewars')).resolves.toEqual(exampleString);
    });
    test("sendRequest reject the status abject if there is an error", () => {
        var errorValue =  "{\"total_count\":0,\"incomplete_results\":false,\"items\":[]}";
        return expect(sendRequest('zhbnfdje')).resolves.toEqual(errorValue);
    });
});