// Scrape Button
$("#scrape-button").on("click", function () {
   $.ajax({
      method: "GET",
      url: "/scrape",
   }).done(function (data, res) {
      console.log(data);
      res.redirect("/");
   });
});

// Saving articles
$(".save").on("click", function () {
   var thisId = $(this).attr("data-id");
   $.ajax({
      method: "POST",
      url: "/articles/save" + thisId
   }).done(function (data, res) {
      console.log(data);
      res.redirect("/");
   });
});

