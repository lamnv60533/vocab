import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class StorageItem {
  StorageItem(this.key, this.value);

  final String key;
  final String value;
}

class StorageService {
  final _secureStorage = const FlutterSecureStorage();

  Future<void> writeSecureData(StorageItem newItem) async {
    await _secureStorage.write(key: newItem.key, value: newItem.value);
  }

  Future<String?> readSecureData(String key) async {
    return await _secureStorage.read(key: key);
  }

  Future setAccessToken(String accessToken) async {
    await _secureStorage.write(key: "accessToken", value: accessToken);
  }

  Future getAccessToken() async {
    return await _secureStorage.read(key: "accessToken");
  }

  Future removeStorageValue(String key) async {
    await _secureStorage.delete(key: key);
  }
}
