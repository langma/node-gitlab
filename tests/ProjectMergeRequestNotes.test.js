(function() {
  var chai, expect, sinon, sinonChai;

  chai = require('chai');

  expect = chai.expect;

  sinon = require('sinon');

  sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  describe("ProjectMergeRequestNotes", function() {
    var gitlab, merge_requests, notes, projects;
    gitlab = null;
    projects = null;
    merge_requests = null;
    notes = null;
    before(function() {
      gitlab = (require('../'))({
        url: 'test',
        token: 'test'
      });
      projects = gitlab.projects;
      merge_requests = projects.merge_requests;
      return notes = merge_requests.notes;
    });
    beforeEach(function() {});
    describe("list()", function() {
      it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(notes, "get");
        notes.list(1, 2);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
      it("should pass Numeric projectID and mergeRequestID to list", function() {
        var getStub;
        getStub = sinon.stub(notes, "get");
        notes.list(1, 2);
        getStub.restore();
        return expect(getStub).to.have.been.calledWith("projects/1/merge_requests/2/notes");
      });
      return it("should pass Namespaced projectIDs to Utils.parseProjectId", function() {
        var getStub;
        getStub = sinon.stub(notes, "get");
        notes.list("abc/def", 2);
        getStub.restore();
        return expect(getStub).to.have.been.calledWith("projects/abc%2Fdef/merge_requests/2/notes");
      });
    });
    describe("show()", function() {
      it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(notes, "get");
        notes.show(1, 2, 3);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
      it("should pass Numeric IDs to show", function() {
        var getStub;
        getStub = sinon.stub(notes, "get");
        notes.show(1, 2, 3);
        getStub.restore();
        return expect(getStub).to.have.been.calledWith("projects/1/merge_requests/2/notes/3");
      });
      return it("should pass Namespaced projectIDs to Utils.parseProjectId", function() {
        var getStub;
        getStub = sinon.stub(notes, "get");
        notes.show("abc/def", 2, 3);
        getStub.restore();
        return expect(getStub).to.have.been.calledWith("projects/abc%2Fdef/merge_requests/2/notes/3");
      });
    });
    describe("create()", function() {
      return it("should use POST verb", function() {
        var postStub;
        postStub = sinon.stub(notes, "post");
        notes.create(1, 1, 30, "note");
        postStub.restore();
        return expect(postStub).to.have.been.called;
      });
    });
    return describe("update()", function() {
      return it("should use PUT verb", function() {
        var putStub;
        putStub = sinon.stub(notes, "put");
        notes.update(1, 1, 30, "updated note");
        putStub.restore();
        return expect(putStub).to.have.been.called;
      });
    });
  });

}).call(this);
