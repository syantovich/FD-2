let sitename = document.querySelectorAll(".text");
var i = false;

function validForm(e) {
    if (e.value.trim() == "") {
        e.nextElementSibling.innerHTML = "Значение не должно быть пустым!";
        (!i) ? i = e: i;
    } else {
        if (e.value.trim().length > 39 && sitename[4] != e) {
            ;
            e.nextElementSibling.innerHTML = "Введите значение меньше 40";
            (!i) ? i = e: i;
        } else {
            e.nextElementSibling.innerHTML = "";
        }
    }
    return i;
};

sitename.forEach(e => {
    e.addEventListener("blur", () => validForm(e));
});

function checkRadio(e) {
    if (e.checked) {
        if (e.value == 1) {
            e.parentNode.nextElementSibling.innerHTML = "Размещение не может быть бесплатным";
            (!i) ? i = e: i;
        } else {
            e.parentNode.nextElementSibling.innerHTML = "";
        }
    }
    return i;
}
var radio = document.querySelectorAll(".radio");
radio.forEach(e => {
    e.addEventListener("change", () => checkRadio(e))
})

function checkSelect(e) {
    if (e.value == 1) {
        e.nextElementSibling.innerHTML = "Рубрика здоровье временно не работает";
        (!i) ? i = e: i;
    } else {
        e.nextElementSibling.innerHTML = "";
    }
    return i;
}
let sel = document.querySelector(".sel");
sel.addEventListener("change", () => checkSelect(sel));

function checkBox(e) {
    if (!e.checked) {
        e.nextElementSibling.innerHTML = "Необходимо разрешить отзывы";
        (!i) ? i = e: i;
    } else {
        e.nextElementSibling.innerHTML = "";
    }
    return i;
}
let check = document.querySelector(".check");
check.addEventListener("change", () => checkBox(check));
let subm = document.querySelector(".subm");

subm.addEventListener("click", (event) => {
    i = false;
    sitename.forEach(e => {
        validForm(e);
    });
    radio.forEach(e => {
        checkRadio(e)
    });
    checkSelect(sel);
    checkBox(check);
    if (i) {
        i.focus();
        event.preventDefault()
    };
});