$( document ).ready(function() {

// Initial array of animals
	var animals = ['chicken', 'cat', 'monkey', 'skunk', 'pig', 'bird', 'lizard'];

// ========================================================

	// displayGiphy function now re-renders the HTML to display the appropriate content. 
	function displayGiphy(){

		var giphy = $(this).attr('data-name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ giphy +"&api_key=dc6zaTOxFJmzC&limit=10";
		
		// Creates AJAX call for the specific  giphy being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			// Creates an element to hold the image 
			var results = response.data;
			  for (var i = 0; i < results.length; i++) {
			 			
					if (results[i].rating == "r" || results[i].rating == "pg-13")
		            {

		            }
		            else {
		              var gifDiv = $('<div class="item">')

		             var rating = results[i].rating;

		             var p = $('<p>').text( "Rating: " + rating);

		             var personImage = $('<img>');
		             personImage.attr('src', results[i].images.fixed_height_still.url);
		             personImage.attr('data-still', results[i].images.fixed_height_still.url);
		             personImage.attr('data-animate', results[i].images.fixed_height.url);
		             personImage.addClass("stateGif");

		             gifDiv.append(p)
		             gifDiv.append(personImage)

		             $('#gifsAppearHere').prepend(gifDiv);

		            	// alert(personImage);               
		            } //closing else

			    } //closing for loop

		});  //closing ajax 

	} // closing displayGiphy

// ========================================================

	// Generic function for displaying giphy data 
	function renderButtons(){ 

		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();

		// Loops through the array of movies
		for (var i = 0; i < animals.length; i++){

			// Then dynamicaly generates buttons for each movie in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('giphyBtn'); // Added a class 
		    a.attr('data-name', animals[i]); // Added a data-attribute
		    a.text(animals[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	} //closing renderButtons

// ========================================================

	function startStop(){
		var state = $(this).attr('data-state');
		 console.log(state);
		        if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
	} //closing startStop

// ========================================================

	// This function handles events where one button is clicked
	$('#addGif').on('click', function(){

		// $('#buttonsView').empty();
		// This line of code will grab the input from the textbox
		var giphy2 = $('#gif-input').val();

		// The giphy from the textbox is then added to our array
		animals.push(giphy2);
		
		// Our array then runs which handles the processing of our anmal giphy array
		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	});

// ========================================================

	// Generic function for displaying the displaGiphy and enable startStop
	$(document).on('click', '.giphyBtn', displayGiphy);
	$(document).on('click', '.stateGif', startStop);

// ========================================================

	// This calls the renderButtons() function
	renderButtons();
})