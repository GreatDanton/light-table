$('document').ready(function() {


  // ###### GLOBAL VARIABLES ######
  var alphabet = "abcdefghijklmn";

  // ####### FUNCTIONS #######
  function drawBoard(id, rows, body) {
    var divID;
    $(body).append("<div id='" + id + "' class='board'></div>");

    for (i = 0; i < rows; i++) {
      var rowID = alphabet[i];
      // append row to container
      $('#' + id).append("<div class='table-row' id='" + rowID + "'></div>");

      for (j = 1; j < rows + 1; j++) {
        var squareID = id + '-' + alphabet[i] + j;
      $('#' + id + ' #' + rowID).append("<div class='square' id='" + squareID +"'></div>");
      }
    }
    // create table
  }


// draw all boards
  drawBoard('tenLeds',10, '.tenLed');

  drawBoard('drawBoard',6,'.container');

  drawBoard('fiveLeds',5, 'body');

  drawBoard('fourLeds',4, 'body');


// ###### SAVE, CLEAR, LOAD button functions #####
$('#ten-clear').click(function() {
  $('#tenLeds .light').each(function() {
    $(this).removeClass('light');
  });
  $('.text-area').val('');
});

$('#ten-save').click(function() {
  var arr = [];
  $('#tenLeds .light').each(function() {
    var squareID = $(this).attr('id').slice(8);
    arr.push("'" + squareID + "'");
  });
  $('.text-area').val('[' + arr + ']');
});

$('#ten-load').click(function() {
  var arr = [];
  arr = $('.text-area').val();
  arr = arr.slice(2, arr.length - 2).replace(/[']/g, "").split(',');
  $('#tenLeds .light').each(function() {
    $(this).removeClass('light');
  });
  for (i = 0; i < arr.length; i++) {
    $('#tenLeds-' + arr[i]).addClass('light');
  }
  console.log('clicked');
});


// draw on mouse hold function
var mouseBtnDown = false;
$(document).mousedown(function() {
  mouseBtnDown = true;

  $('.square').mouseover(function() {
    var sqID = $(this).attr('id');
    if (mouseBtnDown) {
      $('#' + sqID).toggleClass('light');
    }
  });
}).mouseup(function() {
  mouseBtnDown = false;
});

$('.square').mousedown(function() {
  $(this).toggleClass('light');
});

// ####### Coordinates for move 1 ########
var move1 = [['a1', 'a4', 'd1', 'd4'], ['a1', 'a4', 'd1', 'd4', 'b2', 'c3'],
['a1', 'a4', 'd1', 'd4', 'b2', 'c3', 'c2', 'b3'], ['b2', 'b3', 'c2', 'c3'],
['b2', 'b3', 'c2', 'c3', 'a2', 'a3', 'd2', 'd3'],
['b2', 'b3', 'c2', 'c3', 'b1', 'c1', 'b4', 'c4'],
['b1', 'c1', 'b4', 'c4', 'a1', 'a2', 'a3', 'a4', 'd1', 'd2', 'd3', 'd4'],
['b1', 'b2', 'c3', 'c4', 'a1', 'a2','d3', 'd4'],
['b3', 'b4', 'a3', 'a4', 'd1', 'd2', 'c1', 'c2'], ['a3','a4','b4','c1','d1','d2'], ['a3','a4','b1','b4','c1','c4','d1','d2'],
['a1','a4','b1','b4','c1','c4','d1','d4'],
['a1','a2','b1','b4','c1','c4','d3','d4'],
['a1','a2','a3','b1','c4','d2','d3','d4'],
['a1','a2','a3','a4','d1','d2','d3','d4'],
['a2','a3','a4','b4','c1','d1','d2','d3'],
['a3','a4','b1','b4','c1','c4','d1','d2'],
['a1','a4','b1','b4','c1','c4','d1','d4'],
['a2','a3','b2','b3','c2','c3','d2','d3'],
['b2','b3','c2','c3'], ['b2','b3','c2'], ['b2','b3'], ['b3'], [], ['c3'],
['c3', 'c2'], ['b2','c2','c3'], ['b2','b3','c2','c3'],
['a1','a4','b2','b3','c2','c3','d1','d4']
];


// ######### ANIMATION FUNCTION ##########
function move1Animation(board) {
  var I = 0;

  function animation() {
    $('#' + board + ' .light').each(function() {
      $(this).removeClass('light');
    });
    for (j = 0; j < move1[I].length; j++) {
      $('#' + board + '-' + move1[I][j]).addClass('light');
    }
    I += 1;

    if (I == move1.length) {
      //window.clearInterval(interval);
      I = 0;
    }
  }

  var interval = window.setInterval(animation, 600);
}

move1Animation('fourLeds');
move1Animation('drawBoard');
move1Animation('fiveLeds');
//move1Animation('tenLeds');


});
