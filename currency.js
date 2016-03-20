//Input: "150 rupees plus 20 dollars plus bla bla bla"
//Input: Chosen currency.
//Output: "x in chosen currency"

//https://www.npmjs.com/package/money

//var	decimal_num = /^[-+]?\d+(\.\d+)?$/ ;

//var any_num = /^[+-]?\d*([,.e]?\d*)*$/ ;

//var cur_word = /\w+/
 
//(any num \s \w*)*  

//var final_reg = /^([+-]?\d*([,.e]?\d*)*\s\w+\s)*$/

//http://openexchangerates.github.io/money.js/#fx.rates

//ideal case:

//150.11 cur1 + 102.41 cur2 + 102.3123 cur3
//
//intermediate: map: 
// ['cur1' : 150.11,
	// 'cur2' : 102.41,
	// 'cur3' : 102.3123]


//Currency codes:
//https://en.wikipedia.org/wiki/ISO_4217#Active_codes

//var fx=require('money');
//var $= require('jquery');
//var http=require('http');
generate_form();

function generate_form() {
	txt="<form name='form' onsubmit='do_stuff()'>";
	txt+="Input: <input type = 'text' name='input'>";
	txt+="Output Currency: <input type ='text' name='output'>";
	txt+="<input type='submit' value='submit'";
	txt+="</form>";
	$("body").append(txt);
}



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
//assuming given is a currency code.
//amounts is a map with keys of codes, values of number amount of this currency.
function sum_to_given_currency(given,amounts) {

	var sum = 0.0;
	for (var currency in amounts) {
		if (amounts.hasOwnProperty(currency)) {
			sum+=fx(amounts[currency]).from(currency).to(given);
		}
	}
	return sum;
}

function runner () {
	var test_string = '125.12321 rupees + 21.123 aussie dollars + 413 usd';
	//test_string = '123 usd';
	a=currency_code_mapper(input_parser(test_string))
	console.log('this is a');
	console.log(a);
	console.log('final');
	console.log(sum_to_given_currency('AUD',a));
}	

//var obj = {'aussie dollars': 25, 
//			'baht':350};
function do_stuff () {
	console.log('here123');
	var url = 'http://openexchangerates.org/api/latest.json?app_id=0be3bc96f6a547909684a9f767d48793';
	http.get(url,function(res) {
		var body = '';
		res.on('data',function(chunk) {
			body+=chunk;
		});

		res.on('end',function() {
			var response=JSON.parse(body);
			fx.rates=response.rates;
			fx.base=response.base;
			console.log('got a response: ', response);
			runner();
		});
	}).on('error',function(e){
		console.log('got an error: ',e);
	});
}
//setTimeout(runner,500);
