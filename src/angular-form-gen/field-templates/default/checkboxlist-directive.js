fg.directive('fgCheckboxlist', function() {

  function validateRequired(validation, value, options) {

    var required = validation ? validation.required : false;

    // Set in field-templates/default/checkboxlist.ng.html

    if(required) {

      // Ensures that at least one option is checked

      var x = options.length;

      while(x--) {
        if(value[options[x].value]) {
          return true;
        }
      }

      return false;
    }

    return true;

  }

  function selectionCount(value) {
    var c = 0;

    for(var k in value) {
      if(value[k]) {
        c += 1;
      }
    }

    return c;
  }

  return {
    require: ['^fgField'],
    link: function($scope, $element, $attrs, $ctrls) {


    }
  };
});
