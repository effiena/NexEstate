import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ODHomePage extends StatefulWidget {
  const ODHomePage({super.key});

  @override
  State<ODHomePage> createState() => _ODHomePageState();
}

class _ODHomePageState extends State<ODHomePage> {
  List listings = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchListings();
  }

  Future<void> fetchListings() async {
    final res = await http.get(
      Uri.parse("http://192.168.0.123:5000/search"),
    );

    if (res.statusCode == 200) {
      setState(() {
        listings = jsonDecode(res.body);
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("OD Legacy Properties"),
        backgroundColor: Colors.black,
      ),

      body: loading
          ? const Center(child: CircularProgressIndicator())
          : GridView.builder(
              padding: const EdgeInsets.all(16),
              gridDelegate:
                  const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                childAspectRatio: 1.2,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
              ),
              itemCount: listings.length,
              itemBuilder: (context, index) {
                final item = listings[index];

                return Card(
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [

                        Text(
                          item['title'] ?? '',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        const SizedBox(height: 10),

                        Text("State: ${item['state']}"),
                        Text("Price: RM ${item['price']}"),

                        const Spacer(),

                        ElevatedButton(
                          onPressed: () {},
                          child: const Text("View Details"),
                        )
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}
