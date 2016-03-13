//Input: "150 rupees plus 20 dollars plus bla bla bla"
//Input: Chosen currency.
//Output: "x in chosen currency"

//https://www.npmjs.com/package/money

var	decimal_num = /^[-+]?\d+(\.\d+)?$/ ;

var any_num = /^[+-]?\d*([,.e]?\d*)*$/ ;

var cur_word = /\w+/
 
//(any num \s \w*)*  

var final_reg = /^([+-]?\d*([,.e]?\d*)*\s\w+\s)*$/


//ideal case:

//150.11 cur1 + 102.41 cur2 + 102.3123 cur3
//
//intermediate: map: 
// ['cur1' : 150.11,
	// 'cur2' : 102.41,
	// 'cur3' : 102.3123]


//Currency codes:
//https://en.wikipedia.org/wiki/ISO_4217#Active_codes



// {
// 	AUD: ['aussie dollars', 'possible names]

// }


// 150AUD 


// 128



/**

flow:

*input string of '150 rupees + ...'
*parse and break up into map of currency to name
*parse name into the map of known names for each currency code
*update map/make new map
*exit/continue gracefully at this point if there wasn't a match for something
*now we have a map with (code: amount)*
*Convert to given currency on a running sum and output.


**/


//basic test map:

var standards = {
	'AUD' : ['aussie dollars', 'australian dollars', 'dollaroos', 'aud'],
	'USD' : ['dollars','us dollars', 'usd'],
	'THB' : ['baht'],
	'INR' : ['rupees']

}

function input_parser(input) {
	var output = {};
	var info;
	//not 
	//reg = /^([+-]?\d*([,.e]?\d*)*\s\w+\s)*$/
	//matches=reg.exec(input);
	//TODO: handle commas.
	var basic_reg = /(\d+\.?\d+)\s(.*)/;
	//somehow cycle through matches and get the output array/map as required.

	var amounts = input.split('+');
	console.log('amounts is: ' + amounts);

	for (var i=0; i<amounts.length; i++) {
		info=basic_reg.exec(amounts[i].trim())
		output[info[2]]=info[1];
		//key is dirty currency name, value is amount.
	}
	return output;
}


//Works.
//input is the map of unparsed/'dirty' currency names to their amounts
//output is map of clean codes to their amounts.
function currency_code_mapper(unparsed_currency_map) {
	var output = {};
	for(var nickname in unparsed_currency_map) {
		if (unparsed_currency_map.hasOwnProperty(nickname)) {
			for (var code in standards) {
				if (standards.hasOwnProperty(code)) {
					if (contains(standards[code],nickname)) {
						output[code]=unparsed_currency_map[nickname];
						break;
					}
				}
			}
		}
	}
	return output;
}


function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

// var obj = {'aussie dollars': 25, 
// 			'baht':350};

var test_string = '125.12321 rupees + 278,1231.123 aussie dollars + 413 usd';

console.log(currency_code_mapper(input_parser(test_string)));			