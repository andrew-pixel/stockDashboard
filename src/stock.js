import { restClient } from "@polygon.io/client-js"
var POLY_API_KEY = "Z5OtvcXRLJqmpiyEC6RjTKMPV0XqvKn9"


var d = new Date()
d.setDate(d.getDate() - 1)
export var yesterday = d.getFullYear() + "-" + String((d.getMonth() + 1)).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, "0");

d.setDate(d.getDate() - 35)
export var monthago = d.getFullYear() + "-" + String((d.getMonth() + 1)).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, "0");

const rest = restClient(POLY_API_KEY)
var result;
var stocksData
rest.stocks.aggregatesGroupedDaily(yesterday).then((data) => {

    stocksData = data

}).catch(e => {
    console.error('An error happened:', e);

});

export async function GetWeekData(ticker) {
    var data = await rest.stocks.aggregates(ticker, 1, "day", monthago, yesterday,)

    return data



}

export function GetData(ticker) {

    result = stocksData.results.filter((e) => e.T === ticker);

    if (result.length === 0) {
        return 0;
    }
    return result[0];
}

// c*number
// The close price for the symbol in the given time period.

// h*number
// The highest price for the symbol in the given time period.

// l*number
// The lowest price for the symbol in the given time period.

// ninteger
// The number of transactions in the aggregate window.

// o*number
// The open price for the symbol in the given time period.

// otcboolean
// Whether or not this aggregate is for an OTC ticker. This field will be left off if false.

// t*integer
// The Unix Msec timestamp for the start of the aggregate window.

// v*number
// The trading volume of the symbol in the given time period.

// vwnumber
// The volume weighted average price.
