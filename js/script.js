
$('.get-json').click(addelements);
let filedata;
function addelements () {
	$('#form input').remove();
	$('.result').empty();
	$.getJSON('https://api.myjson.com/bins/jcmhn', function(data) {	
		filedata = data;	
		$.unique(data.text.join(' ').match( /\{.*?\}/g ).sort()).map( function ( value, key ) {
				addelement( value );
			});
		}
	)
}

function addelement (str) {
	let newElem = $("<input type='text' name='"+ str +"' class='inp' placeholder = '" + str.replace(/[\{\}]/g, '') + "' />");
	$('#form').append(newElem);
}

$('#form').on('submit', function( event ) {
	event.preventDefault();
});

$('.create-but').click(insertwords);

function insertwords () {
	let newdat = {};
	newdat.text = filedata.text.slice();
	$('.inp').each(
		function( index, element ) {
			newdat.text = newdat.text.map(
				function( elem ) {
					return elem.replace(
						$(element).attr('name'),
						$(element).val() ? $(element).val() : $(element).attr('placeholder')
						);
					}
				);
		}
	);
	$('.result').text(newdat.text.join(' ').replace(/[\{\}]/g, ''));
}
