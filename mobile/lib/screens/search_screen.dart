import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  Map<String, dynamic>? user;
  bool loading = true;
  String? error;

  Future<void> loadProfile() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString("token");

      if (token == null) {
        setState(() {
          error = "No token found. Please login again.";
          loading = false;
        });
        return;
      }

      final res = await http.get(
        Uri.parse("http://192.168.0.123:5000/profile"),
        headers: {
          "Authorization": "Bearer $token",
        },
      );

      if (res.statusCode == 200) {
        setState(() {
          user = jsonDecode(res.body);
          loading = false;
        });
      } else {
        setState(() {
          error = "Failed to load profile (${res.statusCode})";
          loading = false;
        });
      }
    } catch (e) {
      setState(() {
        error = "Error: $e";
        loading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    loadProfile();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Agent Profile")),

      body: loading
          ? const Center(child: CircularProgressIndicator())

          : error != null
              ? Center(
                  child: Text(
                    error!,
                    style: const TextStyle(color: Colors.red),
                  ),
                )

              : Padding(
                  padding: const EdgeInsets.all(16),

                  child: Card(
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),

                    child: ListTile(
                      leading: const Icon(Icons.person, size: 40),
                      title: Text(user?['name'] ?? "No name"),
                      subtitle: Text(user?['email'] ?? "No email"),
                    ),
                  ),
                ),
    );
  }
}
