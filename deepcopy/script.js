function deepCopy(obj) {
    if (obj === null) {
    return null
    };
    if (Number.isNaN(obj)) {
    return Number.NaN
    };
    let clObj = 0;
    if (obj instanceof Object) {
    if (Array.isArray(obj)) {
    clObj = [];

    let i=0;
    for (let v of obj) {
    if (v instanceof Object) {
    clObj[i] = deepCopy(v);
    i++;
    continue;
    }
    clObj[i] = v;
    i++;
    
    }
    } else {
        clObj = {};
    for (let i in obj) {
    if (obj[i] instanceof Object) {
    clObj[i] = deepCopy(obj[i]);
    continue;
    }
    clObj[i] = obj[i];
    }
    }
    
    
    
    } else {
    if(typeof(obj)==="string"){
        clObj = "";
    let i=0;
    for (let v of obj) {
    clObj[i] = v;
    i++;
    
    }
    }
    clObj = obj;
    }
    return clObj;
    }
    
    function deepCopyTest() {
    console.log("Тест 1");
    var h1 = {
    a: 5,
    b: {
    b1: 6,
    b2: 7
    },
    c: [33, 22],
    d: null,
    e: undefined,
    f: Number.NaN
    };
    var h2 = deepCopy(h1);
    let f = 0,
    t = 0;
    
    ((h1 === h2) === false) ? t++ : f++;
    ((h1.a === h2.a) === true) ? t++ : f++;
    ((h1.b === h2.b) === false) ? t++ : f++;
    ((h1.b.b1 === h2.b.b1) === true) ? t++ : f++;
    ((h1.c === h2.c) === false) ? t++ : f++;
    ((h1.c[0] === h2.c[0]) === true) ? t++ : f++;
    ((h1.d === h2.d) === true) ? t++ : f++;
    ((h1.e === h2.e) === true) ? t++ : f++;
    ((isNaN(h2.f)) === true) ? t++ : f++;
    ((h2.c instanceof Array) === true) ? t++ : f++;
    console.log("Тестов пройдено:" + t);
    console.log("Тестов провалено:" + f);
    
    
    console.log("Тест 2");
    f = 0;
    t = 0;
    var a1 = [5, {
    b1: 6,
    b2: 7
    },
    [33, 22], null, undefined, Number.NaN
    ];
    var a2 = deepCopy(a1);
    ((a1 === a2) === false) ? t++ : f++;
    ((typeof (a2) === typeof (a1)) === true) ? t++ : f++;
    ((a1[0] === a2[0]) === true) ? t++ : f++;
    ((a1[1] === a2[1]) === false) ? t++ : f++;
    ((a1[1].b1 === a2[1].b1) === true) ? t++ : f++;
    ((a1[2] === a2[2]) === false) ? t++ : f++;
    ((a1[2][0] === a2[2][0]) === true) ? t++ : f++;
    ((a1[3] === a2[3]) === true) ? t++ : f++;
    ((a1[4] === a2[4]) === true) ? t++ : f++;
    ((isNaN(a2[5])) === true) ? t++ : f++;
    ((a2[2] instanceof Array) === true) ? t++ : f++;
    console.log("Тестов пройдено:" + t);
    console.log("Тестов провалено:" + f);
    
    console.log("Тест 3");
    f = 0;
    t = 0;
    var v1 = "sss";
    var v2 = deepCopy(v1);
    ((typeof (v2) === typeof (v1)) === true) ? t++ : f++;
    ((v1 === v2) == true) ? t++ : f++;
    console.log("Тестов пройдено:" + t);
    console.log("Тестов провалено:" + f);
    
    console.log("Тест 4");
    f = 0;
    t = 0;
    var z1 = null;
    var z2 = deepCopy(z1);
    ((typeof (z2) === typeof (z1)) === true) ? t++ : f++;
    ((z1 === z2) === true) ? t++ : f++;
    console.log("Тестов пройдено:" + t);
    console.log("Тестов провалено:" + f);
    
    console.log("Тест 5");
    f = 0;
    t = 0;
    var n1 = Number.NaN;
    var n2 = deepCopy(n1);
    ((typeof (n2) === typeof (n1)) === true) ? t++ : f++;
    ((isNaN(n2)) === true) ? t++ : f++;
    console.log("Тестов пройдено:" + t);
    console.log("Тестов провалено:" + f);
    }