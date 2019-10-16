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
      url: "/articles/save/" + thisId
   }).done(function (data, res) {
      console.log(data);
      res.redirect("/");
   });
});

// Delete the article
$(".delete").on("click", function () {
   var thisId = $(this).attr("data-id");
   $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisId
   }).done(function (data, res) {
      console.log(data);
      res.redirect("/saved");
   });
});

// Save the note
$(".save-note").on("click", function () {
   var thisId = $(this).attr("data-id");
   $.ajax({
      method: "POST",
      url: "/notes/save/" + thisId,
      data: {
         text: $("#note-body" + thisId).val()
      }
   }).done(function (data, res) {
      console.log(data);
      $("#note-body" + thisId).val("");
      $(".modalNote").modal("hide");
      res.redirect("/saved");
   });
});

// Deleting the note
$(".delete-note").on("click", function () {
   var noteId = $(this).attr("data-note-id");
   var articleId = $(this).attr("data-article-id");
   $.ajax({
      method: "DELETE",
      url: "/notes/delete/" + noteId + "/" + articleId
   }).done(function (data, res) {
      console.log(data);
      $(".modalNote").modal("hide");
      res.redirect("/saved");
   });
});

// Delete button
$("#delete-button").on("click", function () {
   $.ajax({
      method: "GET",
      url: "/clear"
   }).done(function (data, res) {
      console.log("Articles cleared!");
      res.redirect("/");
   });
});

