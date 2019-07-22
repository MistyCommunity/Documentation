// Parse the current URL to determine the current category.
// This is the first directory in the URL path

// Tranform a dasherized and lower case string to a human-readable
// string with the first letter of each name uppercased.

// Usage:
// {{top-level-category path.href}}

module.exports = function (url){
    if( typeof url !== 'string' ){
      return;
    }
    var splitString = url.split('/')[1];
    var capitalized = splitString.charAt(0).toUpperCase() + splitString.slice(1);
    var stringNoDashes = capitalized.replace(/-/g, ' ');
    var stringToTitleCase = stringNoDashes.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    return stringToTitleCase;
  };
