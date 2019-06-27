
//Need to get it so that every image when clicked will respond
//Need to get it where an input creates a new button which works with the click functions
//Need to adjust col-lengths for each image to be mobile responsive


// JS file populates the button using an array of strings that I manually fill out
// Create  for loop to create the button divs
// When you click the button it sends the value to the Giphy API
// The Giphy API searches using the value of the button submitted and pulls 10 
// We will then append the GIFs to the HTML
// Then we can add an animate/stop the images based on click-states
// Include rating of each Gif underneath it 


var topics = ["dogs", "cats", "squirrels", "rabbits", "fish", "lizards"];
var button
var value
var APIKey = "nsaE7HGaryen9cekkWHZYIy64JInPzwx"
var search


for (i = 0; i < topics.length; i++) {

    var animalChosen = topics[i];
    var animalButton = $("<button>");
    // $("<button>").attr("value", animalChosen); 
    $(animalButton).attr("value", animalChosen);
    $(animalButton).html(topics[i])
    $(animalButton).css("padding", "10");
    $(animalButton).css("margin", "5");
    $(animalButton).addClass("button");
    
    $("#button-container").append(animalButton);


}

$(".button").on("click", function(){

    animalClicked = this.value;
    console.log(animalClicked);
    
    var search = animalClicked;
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + search + "&limit=10"

    console.log(queryURL);

    $.ajax({
        method: 'GET',
        url: queryURL
    }).then( function(response){
        console.log("The API was called!")
        console.log(response);
        searchArray = response.data;
        
        for (i = 0; i < searchArray.length; i++) {
            
            searchImageURLstart = searchArray[i].images.original_still.url;
            searchImageURLstill = searchArray[i].images.original_still.url;
            searchImageURLanimate = searchArray[i].images.original.url;
            console.log(searchImageURLstart);

            searchImageRating = searchArray[i].rating;

            var imageCol = $("<div>");
            $(imageCol).addClass("col-3")
            $(imageCol).css("text-align", "center");

            var ratingDiv = $("<div>");
            $(ratingDiv).text("Image Rating is: "  + searchImageRating);
            // $(ratingDiv).css("text-align", "center");
            // $(outerDiv).css('position', 'relative');
            // $(outerDiv).css('clear', 'both');

            var newGif = $('<img>');
            $(newGif).attr("src", searchImageURLstart);
            $(newGif).attr("id", "gif-image");
            $(newGif).attr("data-state", "still");
            $(newGif).attr("data-still", searchImageURLstill);
            $(newGif).attr("data-animate", searchImageURLanimate);
            $(newGif).attr("height", "200");
            $(newGif).attr("width", "200");
            // $(newGif).css("padding", "10");

            $(newGif).attr("alt", "Gif-Image" + [i]);
            

        

            $(imageCol).append(newGif);
            $(imageCol).append(ratingDiv);

            $("#images-holder").append(imageCol);
            // console.log(newGif[0].outerHTML);

            

        }
        
        $("#gif-image").on("click", function(){
            console.log("you clicked an image!");
        
            var state = $(this).attr("data-state");
            if(state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        
        })

    });





});

