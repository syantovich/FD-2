function deepComp(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 !== typeof obj2) {
        return false;
    }else{
        if(obj1===null||obj2===null){return false;}
    }
    if (Number.isNaN(obj1) && Number.isNaN(obj2)) {
        return true;
    }
    if (typeof obj1 !== "object") {
        return obj1===obj2;
    }

    if(Array.isArray(obj1) !== Array.isArray(obj2)){return false;}
    if (obj1 instanceof Object) {
        if (Array.isArray(obj1)) {
            if(obj1.length !== obj2.length){return false;}
            for (let i = 0; obj1.length; i++) {
                    if (deepComp(obj1[i], obj2[i]) === false) {
                        return false;
                    }
                }
            
        } else {
                if(Object.keys(obj1).length!==Object.keys(obj2).length){return false;}
            for (let key in obj1) {

                if (!(key in obj2)) {
                    return false;
                }
                    if (deepComp(obj1[key], obj2[key]) === false) {
                        return false;
                    }



            }
        }
    }
    return true;
}

function deepCompTest() {
    var H1 = {
        a: 5,
        b: {
            b1: 6,
            b2: 7
        }
    };
    var H2 = {
        b: {
            b1: 6,
            b2: 7
        },
        a: 5
    };
    var H3 = {
        a: 5,
        b: {
            b1: 6
        }
    };
    var H4 = {
        a: 5,
        b: {
            b1: 66,
            b2: 7
        }
    };
    var H5 = {
        a: 5,
        b: {
            b1: 6,
            b2: 7,
            b3: 8
        }
    };
    var H6 = {
        a: null,
        b: undefined,
        c: Number.NaN
    };
    var H7 = {
        c: Number.NaN,
        b: undefined,
        a: null
    };
    var H8 = {
        a: 5,
        b: 6
    };
    var H9 = {
        c: 5,
        d: 6
    };
    var H10 = {
        a: 5
    };
    var A1 = [5, 7];
    var A2 = [5, 5, 7];
    var A3 = [5, 8, 7];
    let t = 0,
        f = 0;
    (deepComp(H1, H2) === true) ? t++ : console.log("Не пройден тест: "+ 1);
    (deepComp(H1, H3) === false) ? t++ : console.log("Не пройден тест: "+ 2);
    (deepComp(H1, H4) === false) ? t++ : console.log("Не пройден тест: "+ 3);
    (deepComp(H1, H5) === false) ? t++ : console.log("Не пройден тест: "+ 4);
    (deepComp(H6, H7) === true) ? t++ : console.log("Не пройден тест: "+ 5);
    (deepComp(H8, H9) === false) ? t++ : console.log("Не пройден тест: "+ 6);
    (deepComp(H8, H10) === false) ? t++ : console.log("Не пройден тест: "+ 7);
    (deepComp(null, H10) === false) ? t++ : console.log("Не пройден тест: "+ 8);
    (deepComp(H10, null) === false) ? t++ : console.log("Не пройден тест: "+ 9);
    (deepComp(null, null) === true) ? t++ : console.log("Не пройден тест: "+ 10);
    (deepComp(null, undefined) === false) ? t++ : console.log("Не пройден тест: "+ 11);
    (deepComp(5, "5") === false) ? t++ : console.log("Не пройден тест: "+ 12);
    (deepComp(5, H1) === false) ? t++ : console.log("Не пройден тест: "+ 13);
    (deepComp(A1, H1) === false) ? t++ : console.log("Не пройден тест: "+ 14);
    (deepComp(A2, A3) === false) ? t++ : console.log("Не пройден тест: "+ 15);
    (deepComp({
        a: 5,
        b: undefined
    }, {
        a: 5,
        c: undefined
    }) === false) ? t++ : console.log("Не пройден тест: "+ 16);
    (deepComp([5, 7], {
        0: 5,
        1: 7
    }) === false) ? t++ : console.log("Не пройден тест: "+ 17);
    (deepComp([5, 7], {
        0: 5,
        1: 7,
        length: 2
    }) === false) ? t++ : console.log("Не пройден тест: "+ 18);
    (deepComp("aaa", "bbb") === false) ? t++ : console.log("Не пройден тест: "+ 19);
    (deepComp(Number.NaN, Number.NaN) === true) ? t++ : console.log("Не пройден тест: "+ 20);
    console.log("Тестов пройдено:" + t+" из 20");
}
