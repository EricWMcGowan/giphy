


//create an array of animals
var topics = ["dogs", "cats", "birds", "monkeys", "horses", "pigs", "goats", "lamas"];


function getUserInput(){
	var userInput= $("#animal-input").val().trim();
	console.log(userInput);
	return userInput;

}

//put the users input into a query string
function getQueryString(str){
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    str + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);
    return queryURL;

}

//make a create button function
function createButton(topics){
	$("#animal").empty();
	for(var i =0; i< topics.length; i++){
		var animalButton = $("<button>");
		animalButton.addClass("giphy");
    animalButton.addClass("btn btn-primary");
		animalButton.attr("type","button");
		animalButton.attr("data-name",topics[i]);
		animalButton.text(topics[i]);
		$("#animal").append(animalButton);
	}

}
createButton(topics);

//var userInput;

//adds a button to the animal div when the sumbit button is clicked
$("#addAnimal").on("click",function(event){
	event.preventDefault();
	var userInput= getUserInput();
	topics.push(userInput);
	createButton(topics);
  //console.log(topics);
  console.log(topics);
	

});

//action for  animalButtons
function giphInfo(){

	//empty the gifs div so animals can be replaced everytime button is clicked
	$("#gifs").empty();
	var myAnimal = $(this).attr("data-name");
	console.log(myAnimal);

	//create query string
	var queryString=getQueryString(myAnimal);

	//call to the api
	$.ajax({
          url: queryString,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
          //console.log(results);
          var animalDiv = $("<div id=gifAnimalsDiv>");
          //console.log(results.length);

          for(var i=0;i<results.length; i++){
          	//animalDiv.empty();

          	var animalImage = $("<img>");
            var animalImageDiv = $("<div id=imageDiv>");

            var ratingParagraph = $("<p>");
            ratingParagraph.attr("id","ratings");
            ratingParagraph.text(results[i].rating);

          	animalImage.attr('src',results[i].images.fixed_height_still.url);
          	animalImage.attr("data-state", "still");
          	animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          	animalImage.attr("data-animate", results[i].images.fixed_height.url);
          	animalImage.addClass("animalGifs");

            animalImageDiv.append(ratingParagraph);
            animalImageDiv.append(animalImage);
            $("#gifs").append(animalImageDiv);

            //$(animalDiv).append(ratingParagraph);

          	//$(animalDiv).append(animalImage);
            
          	
          }
          //$("#gifs").append(animalDiv);

          //get the still images
          //get the action images
      });
	

//});
}
// Adding a click event listener to all elements with a class of "giphy"
$(document).on("click", ".giphy", giphInfo);

//when you dynamically event binding


//action for the giphs active and still states

function clickedAnimals(){
$(".animalGifs").on("click", function(){
	var gifState = $(this).attr("data-state");
	
	if (gifState === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
	//console.log(gifState);
}
$(document).on("click", ".animalGifs", clickedAnimals);