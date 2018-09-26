
var displayOnEvent = function(idInput){
  $(idInput).css('display', 'block');
}


var textFormResponse = function(formId,displayId){
  $(document).on('blur', formId, function(){
    displayOnEvent(displayId);
  });
};

var buttonFormResponse = function(formId,displayId){
  $(document).on('click', formId, function(){
    displayOnEvent(displayId);

    $(formId).prop('disabled');

  });
};

var detailFormResponse = function(formId,displayId){
  $(document).on('click', formId, function(){
    displayOnEvent(displayId);

    $(formId).prop('disabled');


    $('#submitRow').css('display', 'block');
  });
};



buttonFormResponse('.persona-type','#personaName');

textFormResponse('#personaNameA','#userPseudo');

textFormResponse('#userPseudoA','#detailsInput');

detailFormResponse('#textInput','#text_long');

detailFormResponse('#social','#sociallinks');

detailFormResponse('#custom','#customLinks');


$(document).on("click","#submit",function(){
  event.preventDefault();

  var tempArr = [ $(".persona-type").val(), $("#profile_name").val(),
    $("#user_pseudo").val(), $("#text_long").val(), $("#detail_type1").val(),
    $("#link1_url").val(),$("#detail_type2").val(), $("#link2_url").val(),
    $("#detail_type3").val(), $("#link3_url").val(),$("#custom1_desc").val(),
    $("#custom1_url").val(),$("#custom2_desc").val(),$("#custom2_url").val()
  ];

  for(var i = 0; i < tempArr.length; i++){
    if(!tempArr[i]){
      tempArr[i] = null;
    }
    else{
      tempArr[i].trim();
    }
  }

  var newProfile = {
    profile_type_id: parseInt(tempArr[0]),
    profile_name: tempArr[1],
    user_pseudo: tempArr[2],
    text: tempArr[3],
    detail_type_id1: tempArr[4],
    url1: tempArr[5],
    detail_type_id2: tempArr[6],
    url2: tempArr[7],
    detail_type_id3: tempArr[8],
    url3: tempArr[9],
    description4: tempArr[10],
    url4: tempArr[11],
    description5: tempArr[12],
    url5: tempArr[13]
  };


  //var dataURL;


  $.ajax({url:window.location.origin + "/api/profile",
    type: "POST",
    data: newProfile
  }).then(
    function(res){
      console.log("posted");
      dataURL = res;

      $('#qr').css('display','block');
      $('#qr').attr('src',dataURL);
  });


//end onclick
});
