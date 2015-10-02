/*  JavaScript library of helper methods by Todd Beckman.
    I hold no sentimental value over this so go ahead and
    use/modify/distribute as you please.
  */
(function(){window.GET=function(){var v={},p=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,k,l){v[k]=l;});return v;};window.INCLUDESTYLES=function (l){for(var i in l)document.write('<link rel="stylesheet" type="text/css" href="'+l[i]+'"/>');};window.INCLUDESCRIPTS=function(l){for(var i in l)document.write('<script type="text/javascript" src="'+l[i]+'"/></script>');};window.INPUTFOCUS=function(i){if(i.value==i.defaultValue){i.value="";i.style.color="#fff";}};window.INPUTBLUR=function(i){if(i.value==""){i.value=i.defaultValue;i.style.color="#888";}}}())