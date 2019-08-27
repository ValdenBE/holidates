#!/usr/bin/env node
const countryList = require('country-list');
//
const axios = require('axios');
//
const chalk = require('chalk');

const clear = require('clear');
//
const api =  'https://date.nager.at/api/v2/PublicHolidays/';
//
var date = new Date();
//
var year = date.getFullYear();
//
const args = process.argv;
//console.log(args)
var country = args[2];
//console.log(country)
const { getCode } = countryList;
//
const countryCode = getCode(country);
//console.log(countryCode);
var figlet = require('figlet');
clear()
const newline = '\n';
figlet('HOLIDATES', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
    const holidates = async () => {
        try {
            const res = await axios.get(`${api}${year}/${countryCode}`)
            var data = res.data
            console.log(chalk.red.underline(newline + newline +'Here is the list of holidays in '+ country + ':' + newline));
            data.forEach(element =>
                {
                    console.log(chalk.red('Date : ') + element.date + '   ' + (chalk.red( 'Name : ')) + element.name);
                });
            console.log(chalk.red.underline(newline + 'There is actually ' + data.length + ' holidays in '+ country + newline + newline));
        } catch (err) 
            {
                console.error(err);
            }
    };   
    holidates();


