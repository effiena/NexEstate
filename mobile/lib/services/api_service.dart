import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {

  // ⚠️ IMPORTANT: change this if needed
  static const String baseUrl = "http://localhost:5000";

  // =========================
  // LOGIN
  // =========================
  static Future<String?> login(String email, String password) async {
    try {
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
      } else {
        print("Login error: ${data['message']}");
        return null;
      }
    } catch (e) {
      print("Login exception: $e");
      return null;
    }
  }

  // =========================
  // GET MY LISTINGS
  // =========================
  static Future<List<dynamic>> getMyListings(String token) async {
    try {
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
    } catch (e) {
      print("Get listings error: $e");
      return [];
    }
  }

  // =========================
  // CREATE LISTING (NEW)
  // =========================
  static Future<bool> createListing(
    String token,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/listings'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(data),
      );

      return response.statusCode == 200 || response.statusCode == 201;
    } catch (e) {
      print("Create listing error: $e");
      return false;
    }
  }

// ===================
// DELETE LISTING
// ===================
  static Future<bool> deleteListing(int id, String token) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/listings/$id'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    return response.statusCode == 200;
  }





  // =========================
  // GET ALL LISTINGS (SEARCH MARKET)
  // =========================
  static Future<List<dynamic>> getAllListings() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/listings'),
      );

      if (response.statusCode == 200) {
        return List<dynamic>.from(jsonDecode(response.body));
      }

      return [];
    } catch (e) {
      print("Get all listings error: $e");
      return [];
    }
  }
}
