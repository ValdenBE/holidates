#!/usr/bin/env node
// CountryList package :
const countryList = require('country-list');
// Api request :
const axios = require('axios');
// Text colors :
const chalk = require('chalk');
// Clear terminal package :
const clear = require('clear');
// Logo :
const figlet = require('figlet');
// Return to line in terminal :
const newline = '\n';
// Api :
const api =  'https://date.nager.at/api/v2/PublicHolidays/';
// Date of today :
var date = new Date();
// Get year :
var year = date.getFullYear();
// Get argument in terminal :
const args = process.argv;
// Select argument :
var country = args[2];
// Create the " Check code" from countryList :
const { getCode } = countryList;
// Check for the countryCode :
const countryCode = getCode(country);
//  Clear the terminal at start :
clear()
// Place the " Logo " :
figlet('HOLIDATES', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
// Main script : ( Place a title, consult the API with the argument and log response (with layout))
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


