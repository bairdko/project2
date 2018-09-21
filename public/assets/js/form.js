
$(document).on("click","#submit",function(){
  event.preventDefault();

  var newProfile = {
    user_id: 6, /*will need to replace later*/
    profile_id_type: parseInt($("#profile_type").val().trim()),
    profile_name: $("#profile_name").val().trim(),
    user_pseudo: $("#user_pseudo").val().trim()

  };

  var newDetails = {
    
    details:[
      {
        profile_id: 0, /*will need to replace later*/
        detail_type_id: 1,
        short_desc: $("#text_short").val().trim(),
        long_desc: $("#text_long").val().trim(),
        url: null
      },
      {
        profile_id: 0, /*will need to replace later*/
        detail_type_id: $("#detail_type1").val().trim(),
        short_desc: null,
        long_desc: $("#link1_desc").val().trim(),
        url: $("#link1_url").val().trim()
      },
      {
        profile_id: 0, /*will need to replace later*/
        detail_type_id: $("#detail_type2").val().trim(),
        short_desc: null,
        long_desc: $("#link2_desc").val().trim(),
        url: $("#link2_url").val().trim()
      },
      {
        profile_id: 0, /*will need to replace later*/
        detail_type_id: $("#detail_type3").val().trim(),
        short_desc: null,
        long_desc: $("#link3_desc").val().trim(),
        url: 
        $("#link3_url").val().trim()
      }]
  };

  $.ajax("/api/profile",{
    type: "POST",
    data: newProfile
  }).then(
    function(){
      console.log("posted");
      location.reload();
    
  });



//end onclick
});