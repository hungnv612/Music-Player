var header  = document.getElementById("header");
var box_list = document.getElementById("box-list");
var box_about = document.getElementById("box-about");
var title = document.getElementById("title");
var box_detail_song = document.getElementById("box-detail-song");
var button_back = document.getElementById("back");
var box_home = document.getElementById("box-home");
var button_about = document.getElementById("about");
var button_clear = document.getElementById("clear");
var img_song = document.getElementById("img_song");

/*client_id*/
var client_id = "aba2c7918a43ab0cc467124cfc00a9c7";

var audio = document.getElementById("audio");

function button_back_page()
{
  if(button_back.className.startsWith("button-back list"))
  {
    /*show header(back, title, about), page list*/
    header.className = "header";
    button_back.className = "button-back true";
    title.className = "title title_active";
    button_about.className = "button-about true";
    box_list.className = "box-list true";

    /*hidden header(clear), page home, about, detail-song*/
    button_clear.className = "button-clear false";
    box_home.className = "box-home false";
    box_about.className = "box-about false";
    box_detail_song.className = "box-detail-song false";

    /*change onclick button back*/
    button_back.className  = "button-back home true";
  }
  else{
    
    /*hidden header, list, about, detail-song*/
    header.className = "header hidden-header";
    box_list.className = "box-list false";
    box_about.className = "box-about false";
    title.className = "title";
    box_detail_song.className = "box-detail-song false";

    /*show page home*/
    box_home.className = "box-home home true";

    /*change onclick button back*/
    button_back.className  = "button-back home true";
  }
  /*end: if(button_back.className == "button-back home" || button_back.className == "button-back")*/
}
/*end: function button_back()*/

function button_play()
{
  /*show header(back, title, about), page list*/
  header.className = "header";
  button_back.className = "button-back true";
  title.className = "title title_active";
  button_about.className = "button-about true";
  box_list.className = "box-list true";

  /*hidden header(clear), page home, about, detail-song*/
  button_clear.className = "button-clear false";
  box_home.className = "box-home false";
  box_about.className = "box-about false";
  box_detail_song.className = "box-detail-song false";

  /*change onclick button back*/
  button_back.className  = "button-back home true";

  this.get_list_song();
}
/*end: function button_play()*/

function button_show_about()
{
  /*hidden header(back, title, about), list, home, detail-song*/
  button_back.className = "button-back false";
  title.className = "title false";
  button_about.className = "button-about false";
  box_list.className = "box-list false";
  box_home.className = "box-home false";
  box_detail_song.className = "box-detail-song false";

  /*show header(clear) page about,*/
  box_about.className = "box-about true";
  document.getElementById("clear").className = "button-clear true";
}
/*end: function button_about()*/

function play_song($id_song)
{
  img_song.src = "images/giphy.gif";
  detail_song.innerHTML = "";

  /*hidden header(clear), page home, list, about*/
  button_clear.className = "button-clear false";
  box_home.className = "box-home false";
  box_list.className = "box-list false";
  box_about.className = "box-about false";
  
  /*show page detail song*/
  box_detail_song.className = "box-detail-song true";

  /*change onclick button back*/
  button_back.className  = "button-back list true";

  

  /*get detail song*/
  this.get_detail_song($id_song);
}
/*end: function play_song()*/

function get_list_song(){
  var api_list_song = "https://api.soundcloud.com/users/192171467/playlists?random=20&client_id="+client_id;

  var content_list = document.getElementById("content-list");
  var list_song = "";
  fetch(api_list_song)
    .then(response => {
      return response.json();
    })
    .then(data => {
      data[0].tracks.forEach(function(tracks)
      {
        console.log(tracks);
        list_song +=
              "<div onclick='play_song("+tracks.id+")' id='"+tracks.id+"' class='box-content'><div class='img-box-content-list'> <img src='"+tracks.artwork_url+"'></div><div class='text-box-content-list'><p class='title-song'>"+tracks.title+"</p> <p class='composed'>"+tracks.user.username+"</p> </div> <div class='clear'></div></div>";
      }) 
      content_list.innerHTML = list_song;
    })
}

function get_detail_song($id_song){
  var api_detail_song = "https://api.soundcloud.com/tracks/"+$id_song+"?client_id="+client_id;
  var detail_song = document.getElementById("detail_song");
  fetch(api_detail_song)
    .then(response => {
      return response.json();
    })
    .then(data => {
      img_song.src = data.artwork_url;

      detail_song.innerHTML = "<h1>"+data.title+"</h1><p>"+data.user.username+"</p>";

      /*play song*/
      audio.src = "https://api.soundcloud.com/tracks/"+$id_song+"/stream?client_id=aba2c7918a43ab0cc467124cfc00a9c7"
      audio.play();
      console.log(data);
    })
}