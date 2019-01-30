var players = ["Kobe Bryant", 
            "Lance Stephenon", 
            "Lebron James", 
            "Lamar Odom",
            "Kevin Garnett",
            "Shaquille O'neal",
            "Stephen Curry",
            "Vince Carter",
            "Julius Erving",
            "Tim Duncan",
            "Jerry West"];

      // Function for displaying data
function renderButtons() {

  $(".button-display").empty();

  for (var i = 0; i < players.length; i++) {
    var a = $("<button>");
    a.addClass("clicker btn btn-primary");
    a.attr("data-name", players[i]);
    a.text(players[i]);
    $(".button-display").append(a);
    console.log('player array =' + players + '-');
  }
}

renderButtons();

$('#add-player').on("click", function(event) {

  event.preventDefault();
  var player = $("#player-input").val().trim();
  console.log(player);
  if (players == '') {
    alert('please insert your favorite player')
  }
  else {
    players.push(player);
    console.log('player array =' + player + '-');
    $("#player-input").val('')
    renderButtons();
  }
});

$("body").on("click", '.clicker', function() {
  
  var players = $(this).attr("data-name");
  console.log("data-name -" + players + "-");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    players + "&api_key=dc6zaTOxFJmzC&limit=10";
  console.log("query -" + queryURL + "-");

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {

      var results = response.data;
      console.log(response);
      $('#images').empty();

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $('<p>')
          .append('<span class="label label-lg label-info">Rating: <span class="badge">' + rating + '</span></span>');
//         <button class="btn btn-primary" type="button">
//   Messages <span class="badge">4</span>
// </button>

        var playerImage = $("<img class='img-thumbnail'>");
        var playerUrl = results[i].images.fixed_height.url;
        var playerStill = results[i].images.fixed_height_still.url;
        playerImage.attr({
            src: playerStill,
            'data-still': playerStill,
            'data-animate': playerUrl,
            'data-state':"still"
        });

        gifDiv.prepend(p);
        gifDiv.prepend(playerImage);

        $("#images").prepend(gifDiv);
      };
    });
});

$("body").on("click", '.img-thumbnail', function() {

  var state = $(this).attr('data-state');

  if (state == 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  }
  else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});