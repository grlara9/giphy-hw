var topics = ["barcelona", "real madrid", "world cup", "cristiano ronaldo"];

function displaygiphy(){
    var name = $(this).attr("soccer-name"); 
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=C5MXwAwWjRStWW7W65o0n4rTpghzGZCD&limit=10";
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
    console.log(response);

    $("#show-giphy").empty();

    for (var i = 0; i < response.data.length; i++) {
    // Creates a div to hold the movie
    var newDiv = $("<div class='soccer'>");
    // Retrieves the Rating Data
    var rated = response.data[i].rating;
     
   // Creates an element to have the rating displayed
   var rat = $("<p>").text("Rating: " + rated);
   // Displays the rating
   newDiv.append(rat);

   var animated = response.data[i].images.fixed_height.gif;
   var still= response.data[i].images.fixed_height_still.url;

   var imageGit=$("<img>");
            
   // Defaulting gifs to still
   imageGit.attr("src", still);
   imageGit.attr("data-still", still);
   imageGit.attr("data-animate", animated);
   imageGit.attr("data-state", "still");

   
   newDiv.prepend(imageGit);
   $("#show-giphy").prepend(newDiv);
   // Retrieves the release year
   //var released = response.Released;
   // Creates an element to hold the release year
  // var rel= $("<p>").text("Released: " + released);
   
   // Displays the release year
   //newDiv.append(rel);
   // Retrieves the plot
   //var plot = response.Plot;
   // Creates an element to hold the plot
   // Appends the plot
   //var p = $("<p>").text("Plot: " + plot);
   //console.log(p);
   //newDiv.append(p);
   // Creates an element to hold the image
   //var imgUrl = response.Poster;
   // Appends the image
    //var image =  $("<img").attr("src", imgUrl);
   
    //newDiv.append(image);
   // Puts the entire Movie above the previous movies.
   //$("#movies-view").prepend(newDiv);
    }
});
}

// Onclick function to animate/pause gifs
$("#show-giphy").on("click", function() {

    var state = $(this).attr("data-state");
    // If state = still, on click will animate the gif
    if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");}
    // Otherwise, if state != still, gif will pause on click   
    else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});

function renderButton(){
    $("#show-buttons").empty();
        //Loop through topics array
        for(var i =0;i<topics.length; i++){
            //Create Button
            var button = $("<button>");
            //Added Attribute soccer-name
            button.attr("soccer-name",topics[i]);
            //initial button text
            button.text(topics[i]);
            //Added button to the show buttons div
    $("#show-buttons").append(button);
}

}
    $("#add").on("click", function(event){
        event.preventDefault();

        var input = $("#giphy-input").val().trim();
        //Input is push to the topics array
        topics.push(input);
        $("#giphy-input").val("");
        //call function 
        renderButton();
});

$(document).on("click", displaygiphy);
renderButton();