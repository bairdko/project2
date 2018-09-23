
$(document).on("click","#submit",function(){
  event.preventDefault();

  var newProfile = {
    user_id: 6, /*will need to replace later*/
    profile_type_id: parseInt($("#profile_type").val().trim()),
    profile_name: $("#profile_name").val().trim(),
    user_pseudo: $("#user_pseudo").val().trim(),
    text: $("#text_long").val().trim(),
    detail_type_id1: $("#detail_type1").val().trim(),
    desc1: $("#link1_desc").val().trim(),
    url1: $("#link1_url").val().trim(),
    detail_type_id2: $("#detail_type2").val().trim(),
    desc2: $("#link2_desc").val().trim(),
    url2: $("#link2_url").val().trim(),
    detail_type_id3: $("#detail_type3").val().trim(),
    desc3: $("#link3_desc").val().trim(),
    url3: $("#link3_url").val().trim()
  };




  $.ajax("/api/profile",{
    type: "POST",
    data: newProfile
  }).then(
    function(){
      console.log("posted");
      // location.reload();
    
  });

//end onclick
});