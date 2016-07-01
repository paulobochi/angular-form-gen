fg.directive('fgFieldlist', function() {

  return {
    require: ['^fgField'],
    link: function($scope, $element, $attrs, $ctrls) {
      var field = $ctrls[0].field();

      $scope.addField = function() {
        if (field.schema.childs != null && field.schema.childs.fields != null) {
          var child = angular.copy(field.schema.childs.fields[0]);
          field.schema.childs.fields.push(child);
        }
      }
    }
  };
});
