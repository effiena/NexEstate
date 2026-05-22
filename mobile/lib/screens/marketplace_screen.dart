import 'package:flutter/material.dart';

class MarketplaceScreen extends StatelessWidget {
  const MarketplaceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Marketplace"),
      ),
      body: const Center(
        child: Text(
          "All Property Listings",
          style: TextStyle(fontSize: 22),
        ),
      ),
    );
  }
}
