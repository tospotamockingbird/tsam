'use strict';
const profileView = {};

profileView.initIndexPage = function() {
    $('#get-spotter').on('click', newSpotter.submit);

    UserData.all.forEach(function(project) {
        $('#profile-list').append(project.toHtml());
      });
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

// conflict is ok just combine

const newSpotter = {};

newSpotter.submit = function(event) {
  let spotter = new spotterRequest({
    spotter: $('#spotter-input').val().toUpperCase()
    });
  spotter.requestSpotter();
};

// const newDeleter = {};
//
// deleters.submit = function(event) {
//   let deleters = new deleterRequest({
//     spotter: $("input[type='checkbox']").val(); this will be all values of checked boxes
// $($0).is(":checked")
//     });
//   spotter.requestSpotter();
// };
