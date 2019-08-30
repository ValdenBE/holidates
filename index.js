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
          // Boxes in terminal :
          const boxen = require('boxen');
          // Options for Boxen :
          const options = {
              borderColor : 'red',
              backgroundColor : 'black',
              padding : {
                  left : 5,
                  right : 5,
              },
              margin : {
                  top : 2,
                  bottom : 2,
                  left : 3,
                  right : 3
              },
              borderStyle : 'double',
              align : 'left',
              float : 'left',
          };
          // Create a new empty tab :
          const tab =[]
          // Create the " Check code" from countryList :
          const { getCode } = countryList;
          // Check for the countryCode :
          const countryCode = getCode(country)
//  Clear the terminal at start :
clear()
// Main script : ( Place a title, consult the API with the argument and log response (with layout))
    const holidates = async () => {
        try {
            const res = await axios.get(`${api}${year}/${countryCode}`)
            var data = res.data
            for (let index = 0; index < data.length; index++) {
                const element = data[index]
                tab.push(chalk.red('Date : ') + element.date + '   ' + (chalk.red( 'Name : ')) + element.name + newline)   
            }

            figlet(country, function(err, img) {
                let idA = chalk.red.underline(newline + newline +'Here is the list of holidays in '+ country + ':' + newline)
                let idB = tab.join("")
                let idC = chalk.red.underline(newline + 'There is actually ' + data.length + ' holidays in '+ country + newline + newline)
                console.log(boxen(img + idA + newline + idB + idC, options))
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
            });       
        } catch (err) 
            {
                console.log('Please try another Country, or verify the synthax of your choice')
            }
    };   
    holidates();


