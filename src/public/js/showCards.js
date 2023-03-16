const singleCard = require("./singleCard");

const showCards = (cards) => {
    let cardHtml = '';
    for (var i = 0, len = cards.length; i < len; i++) {
        cardHtml = cardHtml + singleCard(cards[i]);
    }
    return cardHtml;
}

module.exports = showCards;