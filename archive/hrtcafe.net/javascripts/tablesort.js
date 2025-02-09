(function(){
  var cleanNumber = function(i) {
    var raw_no = i.replace(/[^\-?0-9.]/g, '');

    // Convert GBP to USD
    if (raw_no.indexOf('£') !== -1) {
      return parseFloat(raw_no) * 1.26;
    }

    // Convert EUR to USD
    if (raw_no.indexOf('€') !== -1) {
      return parseFloat(raw_no) * 1.08;
    }

    return raw_no;
  },

  compareNumber = function(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    a = isNaN(a) ? 0 : a;
    b = isNaN(b) ? 0 : b;

    return a - b;
  };

  Tablesort.extend('number', function(item) {
    return item.match(/^[-+]?[£\x24Û¢´€]?\d+\s*([,\.]\d{0,2})/) || // Prefixed currency
      item.match(/^[-+]?\d+\s*([,\.]\d{0,2})?[£\x24Û¢´€]/) || // Suffixed currency
      item.match(/^[-+]?(\d)*-?([,\.]){0,1}-?(\d)+([E,e][\-+][\d]+)?%?$/); // Number
  }, function(a, b) {
    a = cleanNumber(a);
    b = cleanNumber(b);

    return compareNumber(b, a);
  });
}());

document.querySelectorAll('[role="main"] table').forEach(function(table) {
  new Tablesort(table);
});
