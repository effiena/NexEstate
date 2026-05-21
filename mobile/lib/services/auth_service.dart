import 'package:shared_preferences/shared_preferences.dart';

class AuthService {

  static const String tokenKey = "jwt_token";

  // SAVE TOKEN
  static Future saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(tokenKey, token);
  }

  // GET TOKEN
  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(tokenKey);
  }

  // REMOVE TOKEN (logout)
  static Future logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(tokenKey);
  }
}
