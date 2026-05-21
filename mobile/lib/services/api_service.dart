import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {

  static const String baseUrl = "http://127.0.0.1:5000";

  static Future<String?> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200) {
      return data['token'];
    }

    return null;
  }

  static Future<List<dynamic>> getMyListings(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/my-listings'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      return List<dynamic>.from(jsonDecode(response.body));
    }

    return [];
  }
}
