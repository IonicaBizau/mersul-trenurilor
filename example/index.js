"use strict";

var mersulTrenurilor = require("../lib");

mersulTrenurilor.train("10242").then(function (result) {
    console.log(result);
    // =>
    // {
    //   train_category: '',
    //   train_number: '10242',
    //   route: [
    //     {
    //       arrive_time: '',
    //       arrive_time_comment: '',
    //       location: 'Măneciu',
    //       distance: 'km 0',
    //       stop_comment: '',
    //       leave_time: 'la timp*',
    //       leave_time_comment: 'la timp*'
    //     },
    //     {
    //       arrive_time: '4:46',
    //       arrive_time_comment: 'la timp*',
    //       location: 'Gheaba 2',
    //       distance: 'km 1',
    //       stop_comment: '1 min oprire',
    //       leave_time: 'la timp*',
    //       leave_time_comment: 'la timp*'
    //     },
    //     ...
    //     {
    //       arrive_time: '6:20',
    //       arrive_time_comment: 'la timp*',
    //       location: 'Ploiești Sud',
    //       distance: 'km 51',
    //       stop_comment: '',
    //       leave_time: '',
    //       leave_time_comment: ''
    //     }
    //   ]
    // }
}).catch(console.error);