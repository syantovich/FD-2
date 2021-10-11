var formDef1=
[
{label:'Название сайта:',kind:'longtext',name:'sitename'},
{label:'URL сайта:',kind:'longtext',name:'siteurl'},
{label:'Посетителей в сутки:',kind:'number',name:'visitors'},
{label:'E-mail для связи:',kind:'shorttext',name:'email'},
{label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
{label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
{label:'Разрешить отзывы:',kind:'check',name:'votes'},
{label:'Описание сайта:',kind:'memo',name:'description'},
{label:'Опубликовать:',kind:'submit'},
];

var formDef2=
[
{label:'Фамилия:',kind:'longtext',name:'lastname'},
{label:'Имя:',kind:'longtext',name:'firstname'},
{label:'Отчество:',kind:'longtext',name:'secondname'},
{label:'Возраст:',kind:'number',name:'age'},
{label:'Зарегистрироваться:',kind:'submit'},
];
function createForm(nameForm){
    var formTag = document.createElement("form");
    formTag.setAttribute("action", "http://fe.it-academy.by/TestForm.php");
    formTag.setAttribute("method","get"); 
    var classForm=document.getElementsByClassName("form");
    for (var i = 0; i < nameForm.length; i++){
        var newLabel=document.createElement("label");
        var newDiv=document.createElement("div");
        let v=nameForm[i];
        if (v.label){
            newLabel.append(v.label);
            newLabel.setAttribute("for",`${v.name}`);
            newDiv.append(newLabel);
        }
        var newInput=document.createElement("input");
        if (v.kind=="radio"){
            for(let r=0;r<v.variants.length;r++){
                newDiv.append(`<input type="radio" name="${v.name}" value="${v[variants][r].value}">${v[variants][r].text}</input>`)
            }

        }else{
            if(v.kind=="combo"){
                var newSelect=document.createElement("select");
                newSelect.setAttribute("name",`${v.name}`);
                for(let r=0;r<v.variants.length;r++){
                    newSelect.append(`<option  value="${v[variants][r].value}">${v[variants][r].text}</option>`)
                }
                newDiv.append(newSelect);
            }else{
               newInput.setAttribute("name",v.name);
               newInput.setAttribute("type",v.kind); 
            }  
        }
        console.log(newDiv);
        classForm.innerHTML=newDiv;
        
    }

}