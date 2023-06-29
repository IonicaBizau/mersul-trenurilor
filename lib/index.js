"use strict";

const scrapeIt = require("scrape-it")
const axios = require("axios")
const puppeteer = require("puppeteer")

class MersulTrenurilor {
    /**
     * train
     * Information about a given train ID.
     *
     * @name train
     * @function
     * @param {Number} id The train ID (e.g. `367`, not IR367)
     * @return {Promise} A promise resolving with the scraped train information:
     *
     *      - `train_category` (String): The train category.
     *      - `train_number` (String): The train number.
     *      - `route` (Array): An array of objects containing:
     *        - `arrive_time` (String): The arrive time.
     *        - `arrive_time_comment` (String): Arrive time comment (such as delays)
     *        - `location` (String): The stop information.
     *        - `distance` (String): The number of the km in the route.
     *        - `stop_comment (String): The stop comment, such as how long the stop time is.
     *        - `leave_time` (String): The leave time.
     *        - `leave_time_comment` (String): The leave time comment.
     *
     */
    static async train (id) {
        const pageUrl = `https://mersultrenurilor.infofer.ro/ro-RO/Tren/${id}`

        const browser = await puppeteer.launch({
            headless: true,
            args: [],
            headless: "old"
        });

        const page = await browser.newPage();
        await page.goto(pageUrl);
        await page.setViewport({width: 1080, height: 1024});
        await page.waitForSelector("#div-results > .jumbotron");
        const textSelector = await page.waitForSelector('#div-results');
        const resultsHTML = await textSelector.evaluate(el => el.innerHTML);

        const res = await scrapeIt.scrapeHTML(resultsHTML, {
            train_category: { selector: ".span-train-category-ir:eq(0)", convert: t => t.trim() },
            train_number: { selector: ".color-blue", eq: 0 },
            route: {
                listItem: ".list-group > .list-group-item"
              , data: {
                    arrive_time: ".div-middle:eq(0) .text-1-3rem",
                    arrive_time_comment: ".div-middle:eq(0) .text-0-8rem.color-gray",
                    location: "a:eq(0)",
                    distance: ".div-middle:eq(1) .col-md-2",
                    stop_comment: ".col-md-3:eq(0)",
                    leave_time: ".col-3.col-md-2 .div-middle .text-0-8rem.text-right",
                    leave_time_comment: ".col-3.col-md-2 .div-middle .text-0-8rem.text-right.color-gray",
                }
            }
        })

        res.route = res.route.filter(c =>
            Object.keys(c).some(k => c[k])
        )

        await browser.close();

        return res
    }
}

module.exports = MersulTrenurilor
