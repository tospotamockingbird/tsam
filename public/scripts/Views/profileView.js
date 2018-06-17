'use strict';
function profileEvents() {
  $('#get-spotter').on('click', newSpotter.submit);
  $('#delete-db').on('click', newDeleter.submit);
};


const profileView = {};

profileView.appendData = function() {
    UserData.all.forEach( userSighting => {
    $('#profile-list').append(userSighting.toHtml(userSighting));
  });
}

const newSpotter = {};
newSpotter.submit = function(event) {
  let spotter = new spotterRequest({
    spotter: $('#spotter-input').val().toUpperCase()
    });
    spotter.requestSpotter();
};

const newDeleter = {};

newDeleter.submit = function(event) {
  let deleter = $('input[type=checkbox]:checked').map(function(index, el) {
      return $(el).val();
      }).get()
    requestDeleter(deleter);
}

function notSoFast() {
  alert("Not so fast, you saucy minx. Personalized accounts to come in beta 2.0!");
}

$(document).ready(function(){
  $(".delete-row").click(function(){
    $("table tbody").find('input[id="bird-checkbox"]').each(function(){
      if($(this).is(":checked")){
            $(this).parents("tr").remove();
          }
      });
    });
  });

  $(document).ready(function () {
  var tmp = [];

  $("input[id='bird-checkbox']").change(function() {
  var checked = $(this).val();
    if ($(this).is(':checked')) {
      tmp.push(checked);
    }else{
    tmp.splice($.inArray(checked, tmp),1);
    }
  });

  $('#button').on('click', function () {
		alert(tmp);
  });
});
