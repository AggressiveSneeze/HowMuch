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
	'THB' : ['baht']

}

function input_parser(input) {
	output = {};
	//not 
	reg = /^([+-]?\d*([,.e]?\d*)*\s\w+\s)*$/
	matches=reg.exec(input);

	//somehow cycle through matches and get the output array/map as required.


	return output;
}


//Works.
//input is the map of unparsed/'dirty' currency names to their amounts
//output is map of clean codes to their amounts.
function currency_code_mapper(unparsed_currency_map) {
	output = {};
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

var obj = {'aussie dollars': 25, 
			'baht':350};

console.log(currency_code_mapper(obj));			