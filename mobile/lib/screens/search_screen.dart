import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  List results = [];
  bool loading = false;

  final stateController = TextEditingController();
  final minPriceController = TextEditingController();
  final maxPriceController = TextEditingController();

  Future<void> searchListings() async {
    setState(() {
      loading = true;
      results = [];
    });

    try {
      final uri = Uri.parse(
        "http://192.168.0.123:5000/search"
        "?state=${stateController.text}"
        "&min_price=${minPriceController.text}"
        "&max_price=${maxPriceController.text}",
      );

      final res = await http.get(uri);

      if (res.statusCode == 200) {
        setState(() {
          results = jsonDecode(res.body);
          loading = false;
        });
      } else {
        setState(() {
          loading = false;
        });
      }
    } catch (e) {
      setState(() {
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Search Listings")),

      body: Padding(
        padding: const EdgeInsets.all(16),

        child: Column(
          children: [

            // STATE
            TextField(
              controller: stateController,
              decoration: const InputDecoration(
                labelText: "State (e.g. Johor)",
              ),
            ),

            const SizedBox(height: 10),

            // MIN PRICE
            TextField(
              controller: minPriceController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: "Min Price",
              ),
            ),

            const SizedBox(height: 10),

            // MAX PRICE
            TextField(
              controller: maxPriceController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: "Max Price",
              ),
            ),

            const SizedBox(height: 10),

            // SEARCH BUTTON
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: searchListings,
                child: const Text("Search"),
              ),
            ),

            const SizedBox(height: 20),

            // RESULTS
            loading
                ? const CircularProgressIndicator()
                : Expanded(
                    child: results.isEmpty
                        ? const Text("No results found")
                        : ListView.builder(
                            itemCount: results.length,
                            itemBuilder: (context, index) {
                              final item = results[index];

                              return Card(
                                child: ListTile(
                                  title: Text(item['title'] ?? "No title"),
                                  subtitle: Text(item['state'] ?? "No state"),
                                  trailing: Text(
                                    "RM ${item['price'] ?? 0}",
                                  ),
                                ),
                              );
                            },
                          ),
                  ),
          ],
        ),
      ),
    );
  }
}
