$(function () {
  $(
    "#contactForm input,#contactForm textarea,#contactForm button"
  ).jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
      console.error($form, event, errors);
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      let firstName = $("input#name").val(); // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(" ") >= 0) {
        firstName = name.split(" ").slice(0, -1).join(" ");
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      
      const sendObj = {
        name: $("input#name").val(),
        email: $("input#email").val(),
        phone: $("input#phone").val(),
        message: $("textarea#message").val(),
        accessKey: $("input#accessKey").val(),
        honeypot: $("input#honeypot").val()
      };
      
      $.ajax({
            url: 'https://api.staticforms.xyz/submit', // url where to submit the request
            type: "POST", // type of action POST || GET
            dataType: 'json', // data type
            data: sendObj, // post data || get data
            success: function(result) {
                // you can see the result from the console
                // tab of the developer tools
                console.log(result);
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
     });

      // Success message
      $("#success").html("<div class='alert alert-success'>");
      $("#success > .alert-success")
        .html(
          "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
        )
        .append("</button>");
      $("#success > .alert-success").append(
        "<strong>Your message has been sent. </strong>"
      );
      $("#success > .alert-success").append("</div>");
      //clear all fields
      $("#contactForm").trigger("reset");

      setTimeout(function () {
        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
      }, 1000);
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
  $("#success").html("");
});
