function load_rss(){
    var num = 1;
   $("#rss-container").html("");
   $("#rss-container").rss("https://pt.ign.com/feed.xml", {
      limit: 20,
      ssl: true,
      effect: 'show',
      dateFormat: 'MMMM DD, YYYY',
      entryTemplate: 
      "<div class='card' style='width: 18rem;'>\
      <div class='gradient'></div>\
      <div class='image'>\
    {teaserImage}\
  </div>\
    <div class='card-body'>\
      <h2 class='card-title'>{title}</h2>\
    </div>\
  </div>",
      error: function(error){
        console.log(error);
      },
      onData: function(data){
        $("#current-feed").text("Current feed: "+"antaranews.com"); // Change this later
      }
    },function(){
      $(".entry").each(function(index){
        if(index%2!=0) $(this).addClass("entry2"); // Fix this later with css
      });
    });
  }
  
  

  let start = new Date().getSeconds();
    let now = 0;
    console.log(start);
    load_rss(); 
   

    setTimeout(function(){
        window.location.reload(1);
     }, 5000);