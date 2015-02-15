BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectMergeRequestNotes extends BaseModel
  list: (projectId, mergeRequestId, params={}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params={}

    params.page ?= 1
    params.per_page ?= 100

    @debug "Projects::mergeRequestNotes()"
    @get "projects/#{Utils.parseProjectId projectId}/merge_requests/#{parseInt mergeRequestId}/notes", params, (data) => fn data if fn

  show: (projectId, mergeRequestId, noteId, fn = null) =>
    @debug "Projects::showMergeRequestNote()"
    @get "projects/#{Utils.parseProjectId projectId}/merge_requests/#{parseInt mergeRequestId}/notes/#{parseInt noteId}", (data) => fn data if fn

  create: (projectId, mergeRequestId, note, fn = null) =>
    @debug "Projects::createMergeRequestNote()"
    params =
      body: note
    @post "projects/#{Utils.parseProjectId projectId}/merge_requests/#{parseInt mergeRequestId}", params, (data) => fn data if fn

  update: (projectId, mergeRequestId, noteId, note, fn = null) =>
    @debug "Projects::updateMergeRequestNote()"
    params =
      body: note
    @put "projects/#{Utils.parseProjectId projectId}/merge_requests/#{parseInt mergeRequestId}/notes/#{noteId}", params, (data) => fn data if fn

module.exports = (client) -> new ProjectMergeRequestNotes client
