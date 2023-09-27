
function copyToClipboard(data) {
  if (!window.isSecureContext) return {
    isSuccess: false,
    content: 'Unable to copy, blocked by browser'
  }
  navigator.clipboard.writeText(data);
  return {
    isSuccess: true,
    content: 'Copied to the clipboard'
  };
}

function stringToHslColor(str, s = 50, l = 65) {
  if (!str) return 'hsl(0,0,0)';
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  var h = hash % 360;
  return 'hsl('+h+', '+s+'%, '+l+'%)';
}

export { copyToClipboard, stringToHslColor }