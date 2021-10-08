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