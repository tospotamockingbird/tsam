'use strict';

const profileView = {};

profileView.initIndexPage = function() {
    UserData.all.forEach(function(project) {
        $('#profile-list').append(project.toHtml());
      });
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


    