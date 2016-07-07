'use strict';

var startsWith = require('lodash/startsWith');
var DragAndDropHandler = require('../../ui/DragAndDropHandler');
var InsertImageCommand = require('./InsertImageCommand');

function DropImage() {}

DropImage.Prototype = function() {

  this.drop = function(params, context) {
    var target = params.target;
    // precondition: we need a surface and a selection
    // and act only if there are image files
    var surface = target.surface;
    var selection = target.selection;
    var files = params.data.files;
    if (!surface || !selection || !files || files.length === 0) return;
    // pick only the images
    files = files.filter(function(file) {
      return startsWith(file.type, 'image');
    });
    if (files.length === 0) return;
    context.commandManager.executeCommand(InsertImageCommand.static.name, {
      surface: surface,
      selection: selection,
      files: files
    });
    // this lets DropManager know that drop was handled
    return true;
  };

};

DragAndDropHandler.extend(DropImage);

module.exports = DropImage;
