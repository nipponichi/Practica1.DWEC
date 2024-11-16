document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'nav.html', true);

    xhr.onload = function() {
        document.getElementById('nav__component').innerHTML = xhr.responseText;
    };

    xhr.send();
});

