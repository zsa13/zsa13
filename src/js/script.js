

const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeCross = document.querySelector('.menu__close'),
    closeElem = document.querySelectorAll('.menu__link'),
    closeMenu = document.querySelector('.menu__overlay');
    



hamburger.addEventListener('click', () => {
menu.classList.add('active');
});

closeElem.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.remove('active');
        });
});

closeMenu.addEventListener('click', () => {
    menu.classList.remove('active');
});

closeCross.addEventListener('click', () => {
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.skills__ratings-counter'),
    lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});



//Form

$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");

        $('form').trigger('reset');
    });
    return false;
});
