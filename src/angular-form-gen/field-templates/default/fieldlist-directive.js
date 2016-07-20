fg.directive('fgFieldlist', function(fgUtils) {

  return {
    require: ['^fgField'],
    link: function($scope, $element, $attrs, $ctrls) {
      var field = $ctrls[0].field();

      $scope.addField = function() {
        if (field.schema.childs != null && field.schema.childs.fields != null) {
          var child = angular.copy(field.schema.childs.fields[0]);
          updateChild(child);
          field.schema.childs.fields.push(child);
        }
      }

      $scope.removeField = function(child) {
        if (field.schema.childs != null && field.schema.childs.fields != null && field.schema.childs.fields.length > 1) {
          console.log(JSON.stringify(child));
          var index = field.schema.childs.fields.indexOf(child);
          field.schema.childs.fields.splice(index, 1);
          $ctrls[0].removeChild(index);
        }
      }

      function updateChild(child) {
        child.name = 'field' + fgUtils.getUnique();
        if (child.childs) {
          for(var i in child.childs.fields) {
            updateChild(child.childs.fields[i]);
          }
        }
      }
    }
  };
});
