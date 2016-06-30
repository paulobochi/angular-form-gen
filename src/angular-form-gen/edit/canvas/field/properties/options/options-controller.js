fg.controller('fgPropertyFieldOptionsController', function($scope) {

  var self = this;
  var optionCounter = 1;

  // Monitor for changes in the options array and ensure a
  // watch for every option value.
  // Watchers are deleted when removing options from the array.

  $scope.$watchCollection('field.properties.options', function(options) {
    if (options) {
      angular.forEach(options, function(option) {
        if (!option.$_valueWatchFn) {
          option.$_valueWatchFn = $scope.$watch(function() {
            return option.value;
          }, handleValueChange);
        }
      });
    }
  });

  function handleValueChange(newValue, oldValue) {

    // Called by the watch collection
    // Ensure that when the selected value is changed, this
    // is synced to the field value.

    if (newValue !== oldValue) {
      if ($scope.multiple) {
        $scope.field.value[newValue] = $scope.field.value[oldValue];
        delete $scope.field.value[oldValue];
      } else {
        if (oldValue === $scope.field.value) {
          $scope.field.value = newValue;
        }
      }
    }
  }

  this.toggleOption = function(optionValue) {

    // Only used in multiple === false
    // Allow the user to deselect an option from the list

    if($scope.field.type !== 'selectlist' && optionValue === $scope.field.value) {
      $scope.field.value = undefined;
    }

  };

  this.addOption = function() {

    if (!$scope.field.properties.options) {
      $scope.field.properties.options = [];
    }

    var option = {
      value: 'Option ' + optionCounter++
    };

    $scope.field.properties.options.push(option);

    var count = $scope.field.properties.options.length;

    if(!$scope.multiple && count === 1) {
      $scope.field.value = option.value;
    }

  };

  this.removeOption = function(index) {
    var options = $scope.field.properties.options.splice(index, 1);

    if (options && options.length) {

      var option = options[0];

      if ($scope.multiple) {

        if($scope.field.value[option.value] !== undefined)
          delete $scope.field.value[option.value];

      } else {

        if (option.value === $scope.field.value && $scope.field.properties.options.length) {
          $scope.field.value = $scope.field.properties.options[0].value;
        }

        option.$_valueWatchFn();
      }
    }
  };

});
