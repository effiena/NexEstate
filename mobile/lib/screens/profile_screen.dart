import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Agent Profile"),
      ),

      body: const Center(
        child: Text(
          "Agent Profile Screen",
          style: TextStyle(fontSize: 22),
        ),
      ),
    );
  }
}
