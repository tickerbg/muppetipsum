$(function() {
    var colorPicker = {
        "bigBird": "#efc70e",
        "elmo": "#c82322",
        "kermit": "#84a511",
        "oscar": "#76835d"
    }

    $('#select-box').on('click', 'a', function(evn) {
        var muppetId = $(evn.target).attr('alt');
        setSelected(muppetId, colorPicker[muppetId]);
    });
});

function setSelected(selection, color) {
    $('body').css('background-color', color);
    $('img').css('opacity', '0.5');
    $('#' + selection).css('opacity', '1');

    $('#content').empty();

    var html = `<center class="row s12" id="select-box">
    <h4 class="col s6">Choose your quots ipsum count:</h4>
    <div class="input-field col s3">
    <select id="quoteCount">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</optiosn>
    </select>
  </div>
  <div class="col s3">
  <a id= "submitButton" class="waves-effect waves-light btn-large  black">Go go goooo!</a>
  </div>
  </center>
  <div id="ipsum-content"></div>`

    $('#content').html(html);
    $('select').material_select();
    $("#submitButton").on("click", function(e) {
      var selectedQuoteCount = $("#quoteCount option:selected").text();
      $.ajax({
        url: 'http://localhost:3132/muppets/muppetCharacters/?filter_tag=' + selection,
        type: 'get',
        dataType: 'jsonp',
        jsonp: 'jsonp', // mongod is expecting the parameter name to be called "jsonp"
        success: function (data) {
          console.log('success', data);
          setData(data.rows[0].quotes, Number(selectedQuoteCount));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log('error', errorThrown);
          setError(errorThrown);
        }
      });
    });
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  let shuffled = array.slice(0, Math.floor(Math.random() * 3) + 7);
  console.log(shuffled);
  return shuffled;
}

function setData(data, paragraphCount) {
  var result = "";
  var $content = $('#ipsum-content');
  $content.empty();
  for (var i = 0; i < paragraphCount; i++) {
    result += "<h5>";
    var current = shuffle(data);
    for (var quote of data) {
      result += quote;
    }
    result += '</h5>';
  }

  $content.html(result);
}

function setError(errorMessage) {
  var $content = $('#ipsum-content');
  $content.empty();
  $content.text(errorMessage);
}
