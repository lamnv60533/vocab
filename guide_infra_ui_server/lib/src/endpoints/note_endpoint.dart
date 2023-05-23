import 'dart:developer';

import 'package:serverpod/server.dart';

import '../generated/note.dart';
import 'package:aws_codepipeline_api/codepipeline-2015-07-09.dart';

class NoteEndpoint extends Endpoint {
  /// Create new note on the database
  Future<bool> createNote(Session session, Note note) async {
    await Note.insert(session, note);
    return true;
  }

  /// Delete note from database
  Future<bool> deleteNote(Session session, int id) async {
    final response =
        await Note.delete(session, where: (note) => note.id.equals(id));
    return response == 1;
  }

  /// Update an existing note with the given note object
  Future<bool> updateNote(Session session, Note note) async {
    final response = await Note.update(session, note);
    return response;
  }

  /// Retrieve all saved notes from the database
  Future<List<Note>> getNotes(Session session) async {
    final service = CodePipeline(region: 'ap-northeast-1');

    final pipeline = await service.listPipelines();
    pipeline.pipelines?.forEach((element) {
      print(element.name);
    });
    final testUIPipeline =
        await service.getPipeline(name: "pipeline-for-dev-kcmsr-test-ui");
    var config = PipelineDeclaration;
    final notes = Note.find(session);
    return notes;
  }
}
