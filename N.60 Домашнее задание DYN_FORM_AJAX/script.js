
function createForm(nameForm){

    var formTag = document.createElement("form");
    formTag.setAttribute("action", "http://fe.it-academy.by/TestForm.php");
    formTag.setAttribute("method","get"); 
    var classForm=document.querySelector("body");
    for (var i = 0; i < nameForm.length; i++){
        var newLabel=document.createElement("label");
        var newDiv=document.createElement("div");
        let v=nameForm[i];
        if (v.label){
            newLabel.innerHTML=v.label;
            newLabel.setAttribute("for",v.name);   
            if (v.kind!="submit"){
                            newDiv.appendChild(newLabel);
            }

            
        }
        var newInput=document.createElement("input");
        switch(v.kind){
            case "radio":
                for(let r=0;r<v.variants.length;r++){
                    var newRadio=document.createElement("input");
                    var newText=document.createElement("label");
                    newText.innerHTML=v.variants[r].text;
                    newText.for=v.name;
                    newRadio.type="radio";
                    newRadio.name=v.name;
                    newRadio.id=v.name;
                    newRadio.value=v.variants[r].value;
                    newDiv.append(newRadio);
                    newDiv.append(newText);
                    
                }
            break;
            case "combo":
                var newSelect=document.createElement("select");
                newSelect.setAttribute("name",v.name);
                newSelect.id=v.name;
                for(let r=0;r<v.variants.length;r++){
                    var newOptions=document.createElement("option");
                    newOptions.setAttribute("value",v.variants[r].value);
                    newOptions.innerText=v.variants[r].text;
                    newSelect.append(newOptions);
                }
                newDiv.append(newSelect);
            break;
            case "check":
                newInput.setAttribute("name",v.name);
               newInput.setAttribute("type","checkbox"); 
               newDiv.append(newInput);
            break;
            case "memo":
                let newTextarea=document.createElement("textarea");
                newTextarea.name=v.name;
                newDiv.append(newTextarea);
            break;
            case "submit":
                var newSubmit=document.createElement("input");
                newSubmit.value=v.caption;
                newSubmit.type="submit";
                formTag.append(newSubmit);
            break;
            default:
                    newInput.setAttribute("name",v.name);
                    newInput.setAttribute("type",v.kind); 
                    newDiv.append(newInput);
            break;
        }

        formTag.appendChild(newDiv)    ;
        console.log(classForm);
        
    }
    formTag.style.marginBottom="50px";
    classForm.append(formTag);

}

function dyn_form_AjAX (urlArr,i){

if(i<urlArr.length){
    $.ajax(urlArr[i],{
        type:"GET",
        dataType:"json",
        success:function(data){
            createForm(data);
            i++;
            dyn_form_AjAX(urlArr,i);
        },
        error:console.log(urlArr+" "+i)
    });

}
}
let urlArr=["https://fe.it-academy.by/Examples/dyn_form_ajax/formDef1.json","https://fe.it-academy.by/Examples/dyn_form_ajax/formDef2.json"];
dyn_form_AjAX(urlArr,0);