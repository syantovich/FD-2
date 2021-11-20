"use strict";

function HashStorageFunc() {
    let self = this;
    self.storage = JSON.parse(window.localStorage.getItem("lsStorage"))||{};
    self.addValue = function (key, value) {
        self.storage[key] = value;
        self.local();
    };
    self.getValue = function (key) {
        return self.storage[key];
    };
    self.deleteValue = function (key) {


        if (self.storage[key] !== undefined) {
            delete self.storage[key];
            self.local();
            return true;
        } else {
            return false;
        }
    };

    self.getKeys = function () {
        return Object.keys(self.storage);
    };
    self.local= function(){
        let jsonStorage=JSON.stringify(this.storage);
        window.localStorage.setItem("lsStorage",jsonStorage);

    };
}

var drinkStorage = new HashStorageFunc();
let add = function () {
    let k = prompt("название напитка");
    let value = function () {
        let v = {};
        v.alc = prompt("Напиток алкогольный?");
        v.rec = prompt("Рецепт напитка");
        return v;
    };
    return drinkStorage.addValue(k, value());
};
let get = function () {
    let name = prompt("Введите название напитка"),
        getName = drinkStorage.getValue(name);
    if (getName === undefined) {
        alert("Такого напитка не существует");
        return;
    }
    alert(`Напиток ${name}\nАлкогольный: ${getName.alc}\nРецепт: ${getName.rec}`);
};