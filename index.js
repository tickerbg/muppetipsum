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
    <div class="input-field col s4">
    <select>
      <option value="" disabled selected>Choose muppet paragraphs count</option>
      <option value="1">Give me 1 quote!</option>
      <option value="2">Give me 2 quote!</option>
      <option value="3">Give me 3 quote!</option>
      <option value="4">Give me 4 quote!</option>
      <option value="5">Give me 5 quote!</option>
      <option value="6">Give me 6 quote!</option>
      <option value="7">Give me 7 quote!</option>
      <option value="8">Give me 8 quote!</option>
      <option value="9">Give me 9 quote!</option>
      <option value="10">Give me 10 quote!</option>
    </select>    
  </div> 
  <div class="col s4">
  <a class="waves-effect waves-light btn-large  black">Button</a> 
  </div>
  </center>
  <div id="insum-content"></div>`

    $('#content').html(selection);
    $('select').material_select();
}