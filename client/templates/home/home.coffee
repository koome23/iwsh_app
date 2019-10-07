Template.home.rendered = ->
  document.title = "Home | Trend Micro"
  $("<meta>", { name: "description", content: "Trend Micro App" }).appendTo "head"
