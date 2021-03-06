/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs 
  */
$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // something to have when submit produces an error ?
            // Not decided if I need it yet
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            $.ajax({
                url: "./api/contact.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                cache: false,
                success: function(data) {
                    // Success message
                    console.log("message sent is:" + name +", " + email + ", " + message);
                    console.log("return data is:" + data);
                    if(data == "Your email is invalid"){
                        $('#success').html("<div class='alert alert-danger'><strong>Sorry, it seems your email is invalid or fields are blank, if you have issue with this form, please email me directly to barron.diana1994@gmail.com. Sorry for the inconvenience!</strong></div>");
                    }else{
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<strong>Your message has been sent. </strong>");
                        $('#success > .alert-success').append('</div>');
                        //clear all fields
                        $('#contactForm').trigger("reset");
                    }
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    // $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    //     .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + name + ", it seems my mail server is not responding...</strong> Could you please email me directly to barron.diana1994@gmail.com? Sorry for the inconvenience!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
