<?php
require 'sendgrid-php/vendor/autoload.php';

// check if fields passed are empty
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "Your email is invalid";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	

$from = new SendGrid\Email("Admin", "admin@yanzhangit.com");
$subject = "Diana Barron Artwork Website Contact Form: $name"; 
$to = new SendGrid\Email("Yan Zhang", "zhangyan612@gmail.com");
$content = new SendGrid\Content("text/plain", "You have received a new message from your website's contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message");
$mail = new SendGrid\Mail($from, $subject, $to, $content);
$apiKey = getenv('SENDGRID_API_KEY');
$sg = new \SendGrid($apiKey);
$response = $sg->client->mail()->send()->post($mail);

//mail($to,$email_subject,$email_body,$headers);
return true;			
?>