#!/usr/bin/env node
"use strict";

const Tilda = require("tilda")
    , mersulTrenurilor = require("..")
    , Table = require("le-table")
    ;

new Tilda(`${__dirname}/../package.json`, {
    args: [
        {
            name: "train-id"
          , desc: "The train ID."
          , required: true
        }
    ],
    examples: [
        "mersul-trenurilor 367",
        "mersul-trenurilor 367 --json"
    ]
}).main(async action => {
    const res = await mersulTrenurilor.train(action.args["train-id"])
    if (process.argv.includes("--json")) {
        console.log(JSON.stringify(res, null, 4));
        return
    }
    console.log(`Train: ${res.train_category} ${res.train_number}`)
    console.log("Route")
    const resTable = new Table();
    res.route.forEach(c => {
        resTable.addRow([
            c.arrive_time,
            c.arrive_time_comment,
            c.location,
            c.distance,
            c.stop_comment,
            c.leave_time,
            c.leave_time_comment
        ])
    })
    console.log(resTable.stringify());
});
