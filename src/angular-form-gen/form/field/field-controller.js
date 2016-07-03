fg.controller('fgFieldController', function($scope, fgUtils) {

  var self = this;
  var _form, _field;

  this.init = function(fgFormCtrl, fieldSchema, editMode, parent) {

    self.initForm(fgFormCtrl);
    self.initField(fieldSchema);
    self.initDefaultData(fieldSchema, editMode, parent);

    $scope.form = _form;
    $scope.field = _field;

  };

  this.initForm = function(fgFormCtrl) {
    _form = fgFormCtrl ? fgFormCtrl.model : {};

    return _form;
  };

  this.initField = function(fieldSchema) {

    _field = {
      $_id: 'id' + fgUtils.getUnique(),
      schema: fieldSchema,
      data: {}
    };

    if (fieldSchema) {
      _field.data.name = fieldSchema.name
    }

    $scope.$watch('field.schema.name', function(value, oldValue) {
      self.registerState(value);
    });

    return _field;
  };

  this.initDefaultData = function(fieldSchema, editMode, parent) {

    var fieldName = fieldSchema.name;

    _form.data = _form.data || [];

    if (_form.data.fields == null) {
      _form.data.fields = [];
    }

    if (_field) {
      if (parent) {
        if (parent.data.fields == null) {
          parent.data.fields = [];
        }
        parent.data.fields.push(_field.data);
      } else {
        _form.data.fields.push(_field.data);
      }
    }

    if (editMode) {

      $scope.$watch('field.schema.value', function(value) {
        if (_field !== undefined) {
          _field.data.value = value;
        }
      });

      $scope.$watch('field.schema.name', function(value, oldValue) {
        if(value !== oldValue) {
          _field.data.name = value;
        }
      });

    } else if (_field !== undefined && _field.data.value === undefined && fieldSchema.value !== undefined) {
      _field.data.value = angular.copy(fieldSchema.value);
    }

    return _form.data;
  };

  this.setFieldState = function(state) {
    // Called by the field-input directive
    _field.state = state;
    self.registerState(_field.schema.name);
  };

  this.registerState = function(fieldName) {
    // Re-register the ngModelCtrl with the form controller
    // whenever the name of the field has been modified.

    if (_form.state && _field.state) {
      _form.state.$removeControl(_field.state);
      _field.state.$name = fieldName;
      _form.state.$addControl(_field.state);
    }

    _field.name = fieldName;

  };

  this.field = function() {
    return _field;
  };

  this.form = function() {
    return _form;
  };
});
