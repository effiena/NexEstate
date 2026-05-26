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
  final bankValue = TextEditingController();
  final sellingPrice = TextEditingController();
  final commissionRM = TextEditingController();

  final sizeSqft = TextEditingController();
  final landmark = TextEditingController();
  final community = TextEditingController();
  final parking = TextEditingController();
  final bedrooms = TextEditingController();
  final bathrooms = TextEditingController();

  final state = TextEditingController();
  final address = TextEditingController();

  String leaseType = "Leasehold";
  String condition = "Renovated";

  bool loading = false;

  void createListing() async {
    setState(() => loading = true);

    final token = await AuthService.getToken();

    await ApiService.createListing(token!, {
      "title": title.text,

      "bank_value": int.tryParse(bankValue.text) ?? 0,
      "selling_price": int.tryParse(sellingPrice.text) ?? 0,
      "commission_rm": double.tryParse(commissionRM.text) ?? 0,

      "size_sqft": int.tryParse(sizeSqft.text) ?? 0,

      "lease_type": leaseType,
      "condition": condition,

      "landmark": landmark.text,
      "community": community.text,

      "parking": int.tryParse(parking.text) ?? 0,
      "bedrooms": int.tryParse(bedrooms.text) ?? 0,
      "bathrooms": int.tryParse(bathrooms.text) ?? 0,

      "state": state.text,
      "address": address.text,

      "property_type": "Condo",
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
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [

            TextField(
              controller: title,
              decoration: const InputDecoration(labelText: "Title"),
            ),

            TextField(
              controller: bankValue,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: "Bank Value"),
            ),

            TextField(
              controller: sellingPrice,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: "Selling Price"),
            ),

            TextField(
              controller: commissionRM,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: "Commission Sold (RM)"),
            ),

            TextField(
              controller: sizeSqft,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: "Size (sqft)"),
            ),

            TextField(
              controller: landmark,
              decoration: const InputDecoration(labelText: "Landmark"),
            ),

            TextField(
              controller: community,
              decoration: const InputDecoration(labelText: "Community"),
            ),

            TextField(
              controller: parking,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: "Parking Spaces"),
            ),

            TextField(
              controller: bedrooms,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: "Bedrooms"),
            ),

            TextField(
              controller: bathrooms,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: "Bathrooms"),
            ),

            TextField(
              controller: state,
              decoration: const InputDecoration(labelText: "State"),
            ),

            TextField(
              controller: address,
              decoration: const InputDecoration(labelText: "Address"),
            ),

            const SizedBox(height: 15),

            // Lease Type
            DropdownButtonFormField(
              value: leaseType,
              items: const [
                DropdownMenuItem(value: "Leasehold", child: Text("Leasehold")),
                DropdownMenuItem(value: "Freehold", child: Text("Freehold")),
              ],
              onChanged: (val) {
                setState(() => leaseType = val.toString());
              },
              decoration: const InputDecoration(labelText: "Lease Type"),
            ),

            const SizedBox(height: 10),

            // Condition
            DropdownButtonFormField(
              value: condition,
              items: const [
                DropdownMenuItem(value: "Renovated", child: Text("Renovated")),
                DropdownMenuItem(value: "Semi Furnished", child: Text("Semi Furnished")),
                DropdownMenuItem(value: "Original", child: Text("Original")),
              ],
              onChanged: (val) {
                setState(() => condition = val.toString());
              },
              decoration: const InputDecoration(labelText: "Condition"),
            ),

            const SizedBox(height: 20),

            ElevatedButton(
              onPressed: loading ? null : createListing,
              child: Text(loading ? "Creating..." : "Create Listing"),
            )
          ],
        ),
      ),
    );
  }
}
