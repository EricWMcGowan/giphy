

$(document).ready(function(){

    var topics = ["dogs", "cats", "birds", "monkeys", "horses", "pigs", "goats", "lamas"];

    function populateButtons(topics, classToAdd, areaToAddTo) {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", topics[i]);
            a.text(topics[i]);
            $(areaToAddTo).append(a);
          }
      
        }
      
        $(document).on("click", ".addAnimals", function() {
          $("#animals").empty();
          $(".addAnimals").removeClass("active");
          $(this).addClass("active");
      
          var type = $(this).attr("data-type");
          var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=G04Yl0DKpvJUT8JTadhKDDowkX3fYm6e&limit=10";
      
          $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              var results = response.data;
              console.log(results);
      
              for (var i = 0; i < results.length; i++) {
                var animalDiv = $("#animals");
      
                var rating = results[i].rating;
      
                var p = $("<p>").text("Rating: " + rating);
      
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
      
                var animalImage = $("<img>");
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");
      
                animalDiv.append(p);
                animalDiv.append(animalImage);
      
                $("#gifs").append(animalDiv);
              }
            });
        });
      
        $(document).on("click", ".animal-image", function() {
      
          var state = $(this).attr("data-state");
      
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      
        $("#addAnimal").on("click", function(event) {
          event.preventDefault();
          var newAnimal = $("input").eq(0).val();
      
          if (newAnimal.length > 2) {
            topics.push(newAnimal);
          }
      
          populateButtons(topics, "animalButtons", "#buttons-view");
      
        });
      
        populateButtons(topics, "animalButtons", "#buttons-view");
      });