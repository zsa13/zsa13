<?php 

// Dont work in Github Page

$mail = new PHPMailer(true);
$mail->CharSet = 'utf-8';
$mail->isHTML(true); 

//От кого письмо
$mail->setFrom('полное наименование почты отправителя', 'от кого');
//Кому отправить
$mail->addAddress('почта получатель');
//Тело письма
$mail->Subject = 'Данные для контактов';

//Рука
$hand = "Правая";
if($_POST['hand'] == "right") {
	$hand = "Левая";
}

//Тело письма
$body = <h1>Встречайте письмо</h1>

if(trim(!empty($_POST['name']))) {
	$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))) {
	$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['hand']))) {
	$body.='<p><strong>Рука:</strong> '.$hand'</p>';
}
if(trim(!empty($_POST['age']))) {
	$body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
}
if(trim(!empty($_POST['message']))) {
	$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
}

//Прикрепить фото
if(!empty($_FILES['image']['tmp_name'])) {
	//путь загрузки файла
	$filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
	//Загрузка файла
	if (copy($_FILES['image']['tmp_name'], $filePath)) {
		$fileAttach = $filePath;
		$body.='<p><strong>Фото в приложении</strong></p>';
		$mail->addattachment($fileAttach);
	}
}

$mail->body = $body;

//Отправляем
if(!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены';
}
$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>