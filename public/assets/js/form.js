
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

  var newProfile = {

    profile_type_id: parseInt($(".persona-type").val()),
    profile_name: $("#profile_name").val(),
    user_pseudo: $("#user_pseudo").val(),
    text: $("#text_long").val(),
    detail_type_id1: $("#detail_type1").val(),
    url1: $("#link1_url").val(),
    detail_type_id2: $("#detail_type2").val(),
    url2: $("#link2_url").val(),
    detail_type_id3: $("#detail_type3").val(),
    url3: $("#link3_url").val(),
    description4: $("#custom1_desc").val(),
    url4: $("#custom1_url").val(),
    description5: $("#custom2_desc").val(),
    url5: $("#custom2_url").val()
  };

  //trimming data if exists
  for (element in newProfile){

    // if(element === '' || element == undefined){
    //   newProfile[element] = null;
    // }

    // if(element !== undefined){
    //   newProfile[element].trim();
    // }

    
  };


  //var dataURL;


  $.ajax("/api/profile",{
    type: "POST",
    data: newProfile
  }).then(
    function(res){
      console.log("posted");
      
      // dataURL = res.dataURL;
      // console.log(dataURL);
  });

  // $('#qr').css('display','block');
  // $('#qr').attr('src','dataURL');

//end onclick
});
