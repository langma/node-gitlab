(function() {
  var BaseModel, ProjectMergeRequestNotes, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  ProjectMergeRequestNotes = (function(superClass) {
    extend(ProjectMergeRequestNotes, superClass);

    function ProjectMergeRequestNotes() {
      this.update = bind(this.update, this);
      this.create = bind(this.create, this);
      this.show = bind(this.show, this);
      this.list = bind(this.list, this);
      return ProjectMergeRequestNotes.__super__.constructor.apply(this, arguments);
    }

    ProjectMergeRequestNotes.prototype.list = function(projectId, mergeRequestId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      if ('function' === typeof params) {
        fn = params;
        params = {};
      }
      if (params.page == null) {
        params.page = 1;
      }
      if (params.per_page == null) {
        params.per_page = 100;
      }
      this.debug("Projects::mergeRequestNotes()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/merge_requests/" + (parseInt(mergeRequestId)) + "/notes", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMergeRequestNotes.prototype.show = function(projectId, mergeRequestId, noteId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::showMergeRequestNote()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/merge_requests/" + (parseInt(mergeRequestId)) + "/notes/" + (parseInt(noteId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMergeRequestNotes.prototype.create = function(projectId, mergeRequestId, note, fn) {
      var params;
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::createMergeRequestNote()");
      params = {
        body: note
      };
      return this.post("projects/" + (Utils.parseProjectId(projectId)) + "/merge_requests/" + (parseInt(mergeRequestId)), params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMergeRequestNotes.prototype.update = function(projectId, mergeRequestId, noteId, note, fn) {
      var params;
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::saveMergeRequest()");
      params = {
        body: note
      };
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/merge_requests/" + (parseInt(mergeRequestId)) + "/notes/" + noteId, params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    return ProjectMergeRequestNotes;

  })(BaseModel);

  module.exports = function(client) {
    return new ProjectMergeRequestNotes(client);
  };

}).call(this);
