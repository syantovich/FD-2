function buildWrapper (tag){
    let x = function(text,atr={}){
        let mn = function(str){
            let mnemonika = {
                "&":`&amp;`,
                "'":`&apos;`,
                '"':`&quot;`,
                "<":`&lt;`,
                ">":`&gt;`
            }
            for(let keyMnemonika in mnemonika){
            if(str.indexOf(keyMnemonika)!==-1){
                str=str.split(`${keyMnemonika}`).join(`${mnemonika[keyMnemonika]}`);
            }
        }
        return str;
        }

        let newAtr = "";
        text = mn(text);
        for(key in atr){
            newAtr += ` ${key}='${mn(atr[key])}'` ;
        }
        let newString = `<${tag}${newAtr}>${text}</${tag}>`;
        return newString;
    };
    return x;
}
function test(){
    var wrapP=buildWrapper("P");   // строим функцию для оборачивания текста в тег P
  console.log( wrapP("Однажды в студёную зимнюю пору") );
  console.log("<P>Однажды в студёную зимнюю пору</P> Должно быть");
  console.log("---------------------------------------------");
  console.log( wrapP("Однажды в студёную зимнюю пору",{lang:"ru"}) );
  console.log("<P lang='ru'>Однажды в студёную зимнюю пору</P>");
  console.log("---------------------------------------------");
  console.log( wrapP("Однажды в <студёную> зимнюю пору") );
  console.log("<P>Однажды в &lt;студёную&gt; зимнюю пору</P> Должно быть");
  console.log("---------------------------------------------");
  var wrapH1=buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
  console.log( wrapH1("СТИХИ",{align:"center",title:"M&M's"}) );
  console.log("<H1 align='center' title='M&amp;M&apos;s'>СТИХИ</H1> Должно быть");
  console.log("---------------------------------------------");
}