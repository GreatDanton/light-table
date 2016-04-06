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

  $('#openExplanation').click(function() {
    $('.modal').fadeIn(300);
    $('.overlay').fadeIn(300);
  });

  $('.closeModal').click(function() {
    $('.modal').fadeOut(300);
    $('.overlay').fadeOut(300);
  });

  $('.overlay').click(function() {
    $('.overlay').fadeOut(300);
    $('.modal').fadeOut(300);
  });

  $('#btn-fullscreen').click(function() {
    $('#fullscreen').fadeIn(300);
    drawBoard('boardFull',5,'#fullscreen');
    move1Animation('boardFull', move5grid);
    console.log('clicked');
  });


// draw all boards
  drawBoard('ten-drawBoard',10, '.drawingBoard');

  drawBoard('drawBoard',6,'.container');

  drawBoard('fiveLeds',5, '.container');

  drawBoard('fourLeds',4, '.container');

// ##### CHANGE GRID #####

$('.navigation > ul > li').click(function() {
  var grid = $(this).text();
  $('.text-area').val('');
  $('.navigation > ul > li').each(function() {
    $(this).removeClass('active');
  });
  $(this).addClass('active');


  $('.drawingBoard').html('');
  if (grid[0] == '4') {
    drawBoard('four-drawBoard',4,'.drawingBoard');
  } else if (grid[0] == '5') {
    drawBoard('five-drawBoard',5,'.drawingBoard');
  } else if (grid[0] == '6') {
    drawBoard('six-drawBoard',6,'.drawingBoard');
  } else if (grid.indexOf('10') > -1) {
    drawBoard('ten-drawBoard',10,'.drawingBoard');
  }
  $('.square').mousedown(function() {
    $(this).toggleClass('light');
  });
});


// ###### SAVE, CLEAR, LOAD button functions #####
$('#btn-clear').click(function() {
  $('.drawingBoard .light').each(function() {
    $(this).removeClass('light');
  });
  $('.text-area').val('');
});

$('#btn-save').click(function() {
  var arr = [];
  $('.drawingBoard .light').each(function() {
    var squareID = $(this).attr('id');
    squareID = squareID.slice(squareID.length - 2);
    arr.push("'" + squareID + "'");
  });
  $('.text-area').val('[' + arr + ']');
});

$('#btn-load').click(function() {
  var arr = [];
  arr = $('.text-area').val();
  // make array from text (remove ' and spaces)
  arr = arr.slice(2, arr.length - 2).replace(/['\s]/g, "").split(',');
  $('.drawingBoard .light').each(function() {
    $(this).removeClass('light');
  });
  var boardID = $('.drawingBoard > div').attr('id');
  for (i = 0; i < arr.length; i++) {
    $('#' + boardID + '-' + arr[i]).addClass('light');
  }
});


// draw on mouse hold function
$(document).mousedown(function() {
  $('.square').bind('mouseover', function() {
    $(this).toggleClass('light');
  });
})
.mouseup(function() {
  $('.square').unbind('mouseover');
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
['b3', 'b4', 'a3', 'a4', 'd1', 'd2', 'c1', 'c2'],
['a3','a4','b4','c1','d1','d2'], ['a3','a4','b1','b4','c1','c4','d1','d2'],
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

var move5grid = [['a1','a2','a4','a5','b2','b3','b4','c3','d2','d3','d4','e1','e2','e4','e5'],
['a3','b2','b3','b4','c3','d2','d3','d4','e3'],
['b3','c2','c3','c4','d3'],
['b2','b4','c3','d2','d4'],
['a3','b3','c1','c2','c3','c4','c5','d3','e3'],
['a1','a5','b2','b4','d2','d4','e1','e5'],
['a1','a2','a4','a5','b1','b2','b4','b5','d1','d2','d4','d5','e1','e2','e4','e5'],
['a2','a3','a4','b2','b3','b4','d2','d3','d4','e2','e3','e4'],
['b2','b3','b4','c2','c3','c4','d2','d3','d4'],
['b1','b2','b4','b5','c1','c2','c4','c5','d1','d2','d4','d5'],
['a1','a2','a4','a5','b1','b2','b4','b5','d1','d2','d4','d5','e1','e2','e4','e5'],
['a1','a3','a5','c1','c5','e1','e3','e5'],
['b2','b3','b4','c2','c4','d2','d3','d4'],
['a1','a3','a5','c1','c5','e1','e3','e5'],
['a1','a2','a3','b1','b3','c1','c2','c3','c4','c5','d3','d5','e3','e4','e5'],
['a3','a4','a5','b3','b5','c1','c2','c3','c4','c5','d1','d3','e1','e2','e3'],
['a1','a2','a3','a4','a5','b1','b5','c1','c2','c3','c4','c5','d1','d5','e1','e2','e3','e4','e5'],
['a2','a3','a4','b2','b4','c2','c4','d2','d4','e2','e3','e4'],
['a1','a2','a3','a4','a5','e1','e2','e3','e4','e5'],
['b1','b2','b3','b4','b5','d1','d2','d3','d4','d5'],
['c1','c2','c3','c4','c5'],
['a3','b3','c1','c2','c3','c4','c5','d3','e3'],
['a1','a3','a5','b3','c1','c2','c3','c4','c5','d3','e1','e3','e5'],
['a1','a3','a5','c1','c5','e1','e3','e5'],
['a2','a4','b1','b2','b3','b4','b5','c2','c3','c4','d1','d2','d3','d4','d5','e2','e4'],
['a1','a3','a5','b3','c1','c2','c4','c5','d3','e1','e3','e5'],
['a1','a5','c3','e1','e5'],
];

var move6grid =  [['a1','a6','b2','b5','c3','c4','d3','d4','e2','e5','f1','f6'],
['a2','a3','a4','a5','b1','b3','b4','b6','c1','c2','c5','c6','d1','d2','d5','d6','e1','e3','e4','e6','f2','f3','f4','f5'],
['a2','a3','a4','a5','b1','b6','c1','c3','c6','d1','d4','d6','e1','e6','f2','f3','f4','f5'],
['a2','a3','a4','a5','b1','b6','c1','c4','c6','d1','d3','d6','e1','e6','f2','f3','f4','f5'],
['a1','a3','a4','a5','a6','b1','c1','c6','d1','d6','e6','f1','f2','f3','f4','f6'],
['a1','a2','a4','a5','a6','b1','b6','c1','d6','e1','e6','f1','f2','f3','f5','f6'],
['a1','a2','a5','a6','b1','b2','b5','b6','e1','e2','e5','e6','f1','f2','f5','f6'],
['b2','b3','b5','b6','c2','c3','c5','c6','e2','e3','e5','e6','f2','f3','f5','f6'],
['b1','b2','b4','b5','c1','c2','c4','c5','e1','e2','e4','e5','f1','f2','f4','f5'],
['a1','a2','a4','a5','b1','b2','b4','b5','d1','d2','d4','d5','e1','e2','e4','e5'],
['a2','a3','a5','a6','b2','b3','b5','b6','d2','d3','d5','d6','e2','e3','e5','e6'],
['a1','a3','a4','a6','c1','c3','c4','c6','d1','d3','d4','d6','f1','f3','f4','f6'],
['a2','a3','a4','a5','b2','b3','b4','b5','e2','e3','e4','e5','f2','f3','f4','f5'],
['c2','c3','c4','c5','d2','d3','d4','d5'],
['b3','b4','c2','c3','c4','c5','d2','d3','d4','d5','e3','e4'],
['a4','a5','a6','b2','b3','b6','c2','c6','d1','d6','e1','e6','f1','f2','f3','f4','f5','f6'],
['a5','a6','b2','b3','b4','b6','c2','c6','d1','d6','e1','e6','f1','f2','f3','f4','f5','f6'],
['b2','b3','b4','b5','b6','c2','c6','d1','d6','e1','e6','f1','f2','f3','f4','f5','f6'],
['b2','b3','b4','b5','c2','c5','d1','d6','e1','e6','f1','f2','f3','f4','f5','f6'],
['b2','b3','b4','b5','c2','c5','d1','d5','e1','e6','f1','f2','f3','f4','f5','f6'],
['b2','b3','b4','b5','c2','c5','d1','d5','e1','e5','f1','f2','f3','f4','f5'],
['b2','b3','b4','b5','c2','c5','d1','d5','e1','e4','e5','f1','f2','f3'],
['b2','b3','b4','b5','c2','c5','d1','d5','e1','e3','e4','e5','f1','f2'],
['b2','b3','b4','b5','c2','c5','d1','d5','e1','e2','e3','e4','e5'],
['b2','b3','b4','b5','c2','c5','d2','d5','e2','e3','e4','e5'],
['a1','a6','b3','b4','c2','c5','d2','d5','e3','e4','f1','f6']
];

// ######### ANIMATION FUNCTION ##########
function move1Animation(board, move1) {
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

  var interval = window.setInterval(animation, 500);
}

move1Animation('fourLeds', move1);
move1Animation('drawBoard', move6grid);
move1Animation('fiveLeds', move5grid);

});
