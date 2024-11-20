document.addEventListener("DOMContentLoaded", function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'nav.html', true);

    xhr.onload = function () {
        document.getElementById('nav__component').innerHTML = xhr.responseText;
        setActiveLink();
    };

    xhr.send();
});

function setActiveLink() {

    // obtains current url
    let currentUrl = window.location.href;

    if (currentUrl.endsWith('0/')) {
        currentUrl += 'index.html';
    }

    const menuLinks = document.querySelectorAll('.menu__link');

    menuLinks.forEach(link => {
        link.classList.remove('menu__item--active');
        link.classList.add('menu__item');
    });

    menuLinks.forEach(link => {
        console.log(link);
        // finds nav url match and set as active 
        if (currentUrl.endsWith(link.getAttribute('href'))) {
            link.classList.add('menu__item--active');
        }

    });
}