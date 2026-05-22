import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';

class CreateListingScreen extends StatefulWidget {
  const CreateListingScreen({super.key});

  @override
  State<CreateListingScreen> createState() => _CreateListingScreenState();
}

class _CreateListingScreenState extends State<CreateListingScreen> {

  final title = TextEditingController();
  final price = TextEditingController();
  final state = TextEditingController();
  final address = TextEditingController();

  bool loading = false;

  void createListing() async {
    setState(() => loading = true);

    final token = await AuthService.getToken();

    await ApiService.createListing(token!, {
      "title": title.text,
      "price": int.parse(price.text),
      "state": state.text,
      "address": address.text,
      "property_type": "Condo",
      "bedrooms": 3,
      "bathrooms": 2,
      "parking": 1,
      "built_up": "1200 sqft",
      "land_size": "1200 sqft",
      "description": "Flutter listing",
      "owner_name": "User",
      "owner_contact": "0123456789"
    });

    setState(() => loading = false);

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Create Listing")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: title, decoration: const InputDecoration(labelText: "Title")),
            TextField(controller: price, decoration: const InputDecoration(labelText: "Price")),
            TextField(controller: state, decoration: const InputDecoration(labelText: "State")),
            TextField(controller: address, decoration: const InputDecoration(labelText: "Address")),
            const SizedBox(height: 20),

            ElevatedButton(
              onPressed: loading ? null : createListing,
              child: Text(loading ? "Creating..." : "Create"),
            )
          ],
        ),
      ),
    );
  }
}
