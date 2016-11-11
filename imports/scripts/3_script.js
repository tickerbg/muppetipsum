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

    var selection = `<center class="row s12" id="select-box">
    <h4 class="col s6">Choose your quots ipsum count:</h4>
    <div class="input-field col s3">
    <select>
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
  <a class="waves-effect waves-light btn-large  black">Go go goooo!</a>
  </div>
  </center>
  <div id="insum-content"></div>`

    $('#content').html(selection);
    $('select').material_select();
}
