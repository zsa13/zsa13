"use strict";

document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);
        

        if(error === 0) {

            form.classList.add('_sending');
        //Форма прошла проверку валидации, отправляем
        
            let response = await fetch('mailer/smart.php', {
                method: 'POST',
                body: formData
            });
        // Нужно получить ответ об успешности отправки
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка');
                form.classList.remove('_sending');
            }
            
        } else {
            alert('Заполните обязательные поля');
        }
        
    }
    function formValidate(form) {
        let error = 0,
            formReq = document.querySelectorAll('._req');

        for (let index=0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    //Присваиваем класс _error самому объекту и родителю
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    //Убираем класс _error самому объекту и родителю
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    //Тест email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }
    
    
    // Preview
    //Получение input file в переменную
    const formImage = document.getElementById('formImage'),
    //Получаем div  для превью фото в переменную
        formPreview = document.getElementById('formPreview');
    
    //Слушаем изменения в инпуте file
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        //проверяем тип файла
        if (!['image/jpeg', 'image.png', 'image/gif'].includes(file.type)) {
            alert('разрешены только изображения');
            formImage.value = '';
            return;
        }
        //проверяем размер файла (<2Мб)
        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть менее 2 Мб');
            return;
        }
        //Включаем img в div
        const reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);

    }
});




