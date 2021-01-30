<?php 

// Dont work in Github

$name = $_POST['name'];
$text1 = $_POST['text'];
$email = $_POST['email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'имя пользователя почты отправитель';                 // РќР°С€ Р»РѕРіРёРЅ
$mail->Password = 'пароль этой почты';                           // РќР°С€ РїР°СЂРѕР»СЊ РѕС‚ СЏС‰РёРєР°
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('полное наименование почты отправителя', 'от кого');   // РћС‚ РєРѕРіРѕ РїРёСЃСЊРјРѕ 
$mail->addAddress('почта получатель');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные для контактов';
$mail->Body    = '
		Работодатель оставил контакты <br> 
	Имя: ' . $name . ' <br>
	E-mail: ' . $email . ' <br/>
	Текст сообщения: ' . $text1 . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>