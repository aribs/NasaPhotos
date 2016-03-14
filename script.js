/**
 * Created by alejoribes on 14/3/16.
 */
var countScroll = 0;
$(document).ready(function(){
    getDayPhoto();
});


function getDayPhoto(){
    var url = 'https://api.nasa.gov/planetary/apod?api_key=EZmJv8gcKksbviAsCRfmVaLDIrrCGJxFjBOst5Es'
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        success:function(response){printPhoto(response)},
        error: function(){console.log("error, number not found")},
    });
}

function printPhoto(response){
    $('#imgOfDay').attr( "src", response.hdurl);
    $('.card-title').text(response.title);
    $('#infoText').text(response.explanation);
    $('#author').text(response.copyright);
};

function getRandomPhoto(){
    var url = 'https://api.nasa.gov/planetary/apod?api_key=EZmJv8gcKksbviAsCRfmVaLDIrrCGJxFjBOst5Es&date=' + getRandomYear() + '-' + getRandomMonth() + '-' + getRandomDay()
    $.ajax({
        url: url,
        type: 'GET',
        success:function(response){printRandomPhoto(response)},
        error: function(){console.log("error, photo not found")},
    });

};

function printRandomPhoto(response){
    $('.container').append('<div class="card"> <div class="card-image waves-effect waves-block waves-light"> <img class="activator" src="' +response.hdurl +'"> </div> <div class="card-content"> <span class="card-title activator grey-text text-darken-4">'+ response.title+'<i class="material-icons right">more_vert</i></span> </div> <div class="card-reveal"> <span class="card-title grey-text text-darken-4">'+ response.title+'<i class="material-icons right">close</i></span> <p id="infoText">'+ response.explanation +'</p> <p>Autor:</p>'+ response.copyright +' <p id="author"></p> </div> </div>');
};

function getRandomMonth(){
    return Math.floor(Math.random() * (12 - 1 + 1)) + 1;
};
function getRandomDay(){
    return Math.floor(Math.random() * (30 - 1 + 1)) + 1;
};
function getRandomYear(){
    return Math.floor(Math.random() * (2015 - 2005 + 1)) + 2005;
};

$(document).on('scroll',function(){
    if(countScroll <= 50){
        getRandomPhoto();
        countScroll++;
    }
});