chai = require 'chai'
expect = chai.expect
sinon = require 'sinon'
sinonChai = require 'sinon-chai'

chai.use sinonChai

describe "ProjectMergeRequestNotes", ->
  gitlab = null
  projects = null
  merge_requests = null
  notes = null

  before ->
    gitlab = (require '../')
      url: 'test'
      token: 'test'

    projects = gitlab.projects
    merge_requests = projects.merge_requests
    notes = merge_requests.notes

  beforeEach ->

  describe "list()", ->
    it "should use GET verb", ->
      getStub = sinon.stub notes, "get"

      notes.list 1, 2

      getStub.restore()
      expect(getStub).to.have.been.called

    it "should pass Numeric projectID and mergeRequestID to list", ->
      getStub = sinon.stub notes, "get"

      notes.list 1, 2

      getStub.restore()
      expect(getStub).to.have.been.calledWith "projects/1/merge_requests/2/notes"

    it "should pass Namespaced projectIDs to Utils.parseProjectId", ->
      getStub = sinon.stub notes, "get"

      notes.list "abc/def", 2

      getStub.restore()
      expect(getStub).to.have.been.calledWith "projects/abc%2Fdef/merge_requests/2/notes"

  describe "show()", ->
    it "should use GET verb", ->
      getStub = sinon.stub notes, "get"

      notes.show 1, 2, 3

      getStub.restore()
      expect(getStub).to.have.been.called

    it "should pass Numeric IDs to show", ->
      getStub = sinon.stub notes, "get"

      notes.show 1, 2, 3

      getStub.restore()
      expect(getStub).to.have.been.calledWith "projects/1/merge_requests/2/notes/3"

    it "should pass Namespaced projectIDs to Utils.parseProjectId", ->
      getStub = sinon.stub notes, "get"

      notes.show "abc/def", 2, 3

      getStub.restore()
      expect(getStub).to.have.been.calledWith "projects/abc%2Fdef/merge_requests/2/notes/3"

  describe "create()", ->
    it "should use POST verb", ->
      postStub = sinon.stub notes, "post"

      notes.create 1, 1, 30, "note"

      postStub.restore()
      expect(postStub).to.have.been.called

  describe "update()", ->
    it "should use PUT verb", ->
      putStub = sinon.stub notes, "put"

      notes.update 1, 1, 30, "updated note"

      putStub.restore()
      expect(putStub).to.have.been.called
