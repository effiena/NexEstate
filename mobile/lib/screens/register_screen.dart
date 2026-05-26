import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {

  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  bool loading = false;
  String error = "";

  Future<void> register() async {

    setState(() {
      loading = true;
      error = "";
    });

    try {

      final response = await http.post(
        Uri.parse("http://127.0.0.1:5000/register"),

        headers: {
          "Content-Type": "application/json",
        },

        body: jsonEncode({
          "name": nameController.text,
          "email": emailController.text,
          "password": passwordController.text,
        }),
      );

      final data = jsonDecode(response.body);

      if (response.statusCode == 200) {

        if (mounted) {

          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(data["message"]),
            ),
          );

          Navigator.pop(context);
        }

      } else {

        setState(() {
          error = "Registration failed";
        });
      }

    } catch (e) {

      setState(() {
        error = "Error: $e";
      });

    }

    setState(() {
      loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: const Text("Register"),
      ),

      body: Center(

        child: SingleChildScrollView(

          padding: const EdgeInsets.all(20),

          child: Container(

            constraints: const BoxConstraints(
              maxWidth: 400,
            ),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.stretch,

              children: [

                const Text(
                  "Create NexEstate Account",

                  textAlign: TextAlign.center,

                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                const SizedBox(height: 30),

                TextField(
                  controller: nameController,

                  decoration: const InputDecoration(
                    labelText: "Name",
                    border: OutlineInputBorder(),
                  ),
                ),

                const SizedBox(height: 16),

                TextField(
                  controller: emailController,

                  decoration: const InputDecoration(
                    labelText: "Email",
                    border: OutlineInputBorder(),
                  ),
                ),

                const SizedBox(height: 16),

                TextField(
                  controller: passwordController,
                  obscureText: true,

                  decoration: const InputDecoration(
                    labelText: "Password",
                    border: OutlineInputBorder(),
                  ),
                ),

                const SizedBox(height: 20),

                loading
                    ? const Center(
                        child: CircularProgressIndicator(),
                      )

                    : ElevatedButton(
                        onPressed: register,

                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(
                            vertical: 16,
                          ),
                        ),

                        child: const Text("Register"),
                      ),

                const SizedBox(height: 12),

                Text(
                  error,
                  textAlign: TextAlign.center,

                  style: const TextStyle(
                    color: Colors.red,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
