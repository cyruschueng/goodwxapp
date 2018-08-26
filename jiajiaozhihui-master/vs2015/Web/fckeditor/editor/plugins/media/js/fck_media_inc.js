/*
 * Media Plugin for FCKeditor 2.5 SVN
 * Copyright (C) 2007 Riceball LEE (riceballl@hotmail.com)
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 * Scripts related to the Media dialog window (see fck_media.html).
 */

var
  cWindowMediaPlayer = 0
  , cRealMediaPlayer = 1
  , cQuickTimePlayer = 2
  , cFlashPlayer = 3
  , cShockwavePlayer = 4
  , cDefaultMediaPlayer = cWindowMediaPlayer
  ;

var cFckMediaElementName = 'fckmedia'; //embed | object | fckmedia
var cMediaTypeAttrName = 'mediatype';  //lowerCase only!!

var cWMp6Compatible = false;

//const cDefaultMediaPlayer = 0; //!!!DO NOT Use the constant! the IE do not support const!

var
    cMediaPlayerTypes = ['application/x-mplayer2', 'audio/x-pn-realaudio-plugin', 'video/quicktime', 'application/x-shockwave-flash', 'application/x-director']
  , cMediaPlayerClassId = [cWMp6Compatible? 'clsid:05589FA1-C356-11CE-BF01-00AA0055595A' : 'clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6', 'clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA'
        , 'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B', 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'
        , 'clsid:166B1BCA-3F9C-11CF-8075-444553540000'
    ]
  , cMediaPlayerCodebase = ['http://microsoft.com/windows/mediaplayer/en/download/', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab'
        , 'http://www.apple.com/quicktime/download/', 'http://www.macromedia.com/go/getflashplayer', 'http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab'
    ]
  ;

var
  cFCKMediaObjectAttrs = {width:1, height:1, align:1, id:1, name:1, 'class':1, className:1, style:1, title:1}; //the 'class' is keyword in IE!!
  //there are not object params in it.
  cFCKMediaSkipParams = {pluginspage:1, type:1}; 

var
  oWindowMediaPlayer = {id: cWindowMediaPlayer, type: cMediaPlayerTypes[cWindowMediaPlayer], ClsId: cMediaPlayerClassId[cWindowMediaPlayer], Codebase: cMediaPlayerCodebase[cWindowMediaPlayer]
    , Params: {autostart:true, enabled:true, enablecontextmenu:true, fullscreen:false, invokeurls:true, mute:false
        , stretchtofit:false, windowlessvideo:false, balance:'', baseurl:'', captioningid:'', currentmarker:''
        , currentposition:'', defaultframe:'', playcount:'', rate:'', uimode:'', volume:''
      }
  };
  oRealMediaPlayer = {id: cRealMediaPlayer, type: cMediaPlayerTypes[cRealMediaPlayer], ClsId: cMediaPlayerClassId[cRealMediaPlayer], Codebase: cMediaPlayerCodebase[cRealMediaPlayer]
    , Params: {autostart:true, loop:false, autogotourl:true, center:false, imagestatus:true, maintainaspect:false
        , nojava:false, prefetch:true, shuffle:false, console:'', controls:'', numloop:'', scriptcallbacks:''
      }
  };
  oQuickTimePlayer = {id: cQuickTimePlayer, type: cMediaPlayerTypes[cQuickTimePlayer], ClsId: cMediaPlayerClassId[cQuickTimePlayer], Codebase: cMediaPlayerCodebase[cQuickTimePlayer]
    , Params: {autoplay:true, loop:false, cache:false, controller:true, correction:['none', 'full'], enablejavascript:false
        , kioskmode:false, autohref:false, playeveryframe:false, targetcache:false, scale:'', starttime:'', endtime:'', target:'', qtsrcchokespeed:''
        , volume:'', qtsrc:''
      }
  };
  oFlashPlayer = {id: cFlashPlayer, type: cMediaPlayerTypes[cFlashPlayer], ClsId: cMediaPlayerClassId[cFlashPlayer], Codebase: cMediaPlayerCodebase[cFlashPlayer]
    , Params: {play:true, loop:false, menu:true, swliveconnect:true, quality:'', scale:'', salign:'', wmode:'', base:''
        , flashvars:''
      }
  };
  oShockwavePlayer = {id: cShockwavePlayer, type: cMediaPlayerTypes[cShockwavePlayer], ClsId: cMediaPlayerClassId[cShockwavePlayer], Codebase: cMediaPlayerCodebase[cShockwavePlayer]
    , Params: {autostart:true, sound:true, progress:false, swliveconnect:false, swvolume:'', swstretchstyle:'', swstretchhalign:'', swstretchvalign:''
      }
  };

var
  oFCKMediaPlayers = [oWindowMediaPlayer, oRealMediaPlayer, oQuickTimePlayer, oFlashPlayer, oShockwavePlayer];

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}

function debugListMember(o) {
  var s = '\n';
  if (typeof(o) == 'object') 
    s +=o.toSource();
  else
    s+= o;
  return s;
}

function GetMediaPlayerTypeId(aMediaType) {
  for (i = 0; i < cMediaPlayerTypes.length; i++ )
    if (aMediaType.toLowerCase() == cMediaPlayerTypes[i]) return i;
  return cDefaultMediaPlayer;
}

function isInt(aStr) {
  var i = parseInt(aStr);
  if (isNaN(i)) return false;
  i = i.toString();
  return (i == aStr);
}

function DequotedStr(aStr) {
  aStr = aStr.trim();
  //aStr.replace(/^(['"])(.*?)(\1)$/g, '$2');
  if (aStr.length > 2) {
    if (aStr.charAt(0) == '"' && aStr.charAt(aStr.length-1) == '"' )
      aStr = aStr.substring(1,aStr.length-1);
    else if (aStrcharAt(0) == '\'' && aStr.charAt(aStr.length-1) == '\'' )
      aStr = aStr.substring(1,aStr.length-1);
  }
  //alert(aStr+ ': dd:'+aStr.charAt(0)+ aStr.charAt(aStr.length-1));
  return aStr;
}

function WrapObjectToMedia(html, aMediaElementName) {
  //check media first
  function _ConvertMedia( m, params )
  {
    //split params to array
    m = params;
    var params  = params.match(/[\s]*(.+?)=['"](.*?)['"][\s]*/gi);
    var vObjectAttrs = '';
    var Result = '';
    var vParamName, vParamValue;
    var vIsMedia = false;
    for (var i = 0; i < params.length; i++) {
      vPos = params[i].indexOf('=');
      vParamName = params[i].substring(0, vPos).trim();
      vParamName = vParamName.toLowerCase();
      vParamValue = params[i].substring(vPos+1);
      vParamValue = DequotedStr(vParamValue);
      if (vParamName == cMediaTypeAttrName) {
        //alert(vParamName+':'+vParamValue);
        if (isInt(vParamValue)) {
          vIsMedia = true;
          vObjectAttrs += ' '+ cMediaTypeAttrName + '="' + vParamValue + '"';
          vObjectAttrs += ' classid="' +  oFCKMediaPlayers[vParamValue].ClsId + '"';
          vObjectAttrs += ' codebase="' +  oFCKMediaPlayers[vParamValue].Codebase + '"';
        }else {
          break;
        }
      } else if (cFCKMediaObjectAttrs[vParamName]) {
        vObjectAttrs += ' ' + vParamName + '="' + vParamValue + '"';
      } else if (!cFCKMediaSkipParams[vParamName]) {
        Result += '<param name="' + vParamName + '" value="' + vParamValue + '"/>';
      }
    } //for
    //wrap the <object> tag to <embed>
    if (vIsMedia) {
      Result = '<object' + vObjectAttrs + '>' + Result + '<embed' + m + '></embed></object>';
      //alert(Result);
      return Result;
    }
  }

  if (aMediaElementName == '') aMediaElementName = cFckMediaElementName;
  var regexMedia = new RegExp( '<'+aMediaElementName+'(.+?)><\/'+aMediaElementName+'>', 'gi' );
  //var regexMedia = /<fckMedia\s+(.+?)><\/fckMedia>/gi;
  //alert('b:'+html);
  return html.replace( regexMedia, _ConvertMedia ) ;
}