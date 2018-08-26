
function SearchHighlight1(idVal, keyWord) {
            oId = document.getElementById(idVal);
            var content = oId.innerHTML;    
            var keyWordArr = keyWord.replace(/[\s]+/g, '').split('');
            var regContent;
            for (var n = 0; n < keyWordArr.length; n++) {
                //re = new RegExp(">[\s\S]*?"+keyWordArr[n]+"[\s\S]*?<\S","gmi");
                regContent = new RegExp(""+keyWordArr[n]+"", "gmi");
                content = content.replace(regContent, '<span style="color:red">' + keyWordArr[n] + '</span>');
            }
            oId.innerHTML = content;
        }