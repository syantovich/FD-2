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
            let nameAtr = key;
            for(let v of nameAtr){
                if(v===v.toUpperCase()){
                    nameAtr=nameAtr.split(`${v}`).join(`-${v.toLowerCase()}`);
                }
            }
            newAtr += ` ${nameAtr}='${mn(atr[key])}'` ;
        }
        let newString = `<${tag}${newAtr}>${text}</${tag}>`;
        return newString;
    };
    return x;
}
function test(){
    var wrapP=buildWrapper("P");   // строим функцию для оборачивания текста в тег P
  console.log( wrapP("Однажды в студёную зимнюю пору") );
  console.log("Должно быть <P>Однажды в студёную зимнюю пору</P>");
  console.log("---------------------------------------------");
  console.log( wrapP("Однажды в студёную зимнюю пору",{lang:"ru"}) );
  console.log("Должно быть <P lang='ru'>Однажды в студёную зимнюю пору</P>");
  console.log("---------------------------------------------");
  console.log( wrapP("Однажды в <студёную> зимнюю пору") );
  console.log("Должно быть <P>Однажды в &lt;студёную&gt; зимнюю пору</P>");
  console.log("---------------------------------------------");
  var wrapH1=buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
  console.log( wrapH1("СТИХИ",{align:"center",title:"M&M's"}) );
  console.log("Должно быть <H1 align='center' title='M&amp;M&apos;s'>СТИХИ</H1>");
  console.log("---------------------------------------------");
}