import 'package:flutter/material.dart';

class UserService with ChangeNotifier {
  String username = '';
  String email = '';
  List<String> roles = [];

  UserService();

  setUserInfo(String username, List<String> roles, String email) {
    this.username = username;
    this.roles = roles;
    this.email = email;
    notifyListeners();
  }
}
