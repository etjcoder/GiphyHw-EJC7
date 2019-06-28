
//Images wont change data state from still to animate when clicked after adding a new set of images to html
//Seems to occur to every other set of images as you add. For example 1st set works, \
//when adding a second set the 1st set stops working. When adding a 3rd set the 1st/3rd work but the 2nd stops working, and so on
//Seems there a double, triple and quadruple click thing going on...


// JS file populates the button using an array of strings that I manually fill out
// Create  for loop to create the button divs
// When you click the button it sends the value to the Giphy API
// The Giphy API searches using the value of the button submitted and pulls 10 
// We will then append the GIFs to the HTML
// Then we can add an animate/stop the images based on click-states
// Include rating of each Gif underneath it 


var topics = ["Michael Jordan", "Allen Iverson", "Joel Embiid", "Chase Utley", "Donovan McNabb", "Carson Wentz", "Nick Foles", "Lebron James"];
var button
var value
var APIKey = "nsaE7HGaryen9cekkWHZYIy64JInPzwx"
var search

createButtons();

$("#search-button").on("click", function() {
    event.preventDefault();
    var searchValue = $("#search-text").val();

    topics.push(searchValue);
    console.log(topics);

    $("#button-container").empty();

    createButtons();
})

function createButtons() {
for (i = 0; i < topics.length; i++) {

    var animalChosen = topics[i];
    var animalButton = $("<button>");
    // $("<button>").attr("value", animalChosen); 
    $(animalButton).attr("value", animalChosen);
    $(animalButton).html(topics[i])
    $(animalButton).css("padding", "10");
    $(animalButton).css("margin", "5");
    $(animalButton).addClass("button");
    $(animalButton).addClass("btn-dark")
    
    $("#button-container").append(animalButton);


}

$(".button").on("click", function(){

    $("#images-holder").empty();
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
            $(imageCol).addClass("col-lg-3 col-md-4 col-sm-6")
            // $(imageCol).addClass()
            $(imageCol).css("text-align", "center");

            var ratingDiv = $("<div>");
            $(ratingDiv).text("Image Rating is: "  + searchImageRating);
            // $(ratingDiv).css("text-align", "center");
            // $(outerDiv).css('position', 'relative');
            // $(outerDiv).css('clear', 'both');

            var newGif = $('<img>');
            $(newGif).attr("src", searchImageURLstart);
            $(newGif).addClass("gif-image", "gif-image");
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

        $(".gif-image").on("click", function(){
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

};

