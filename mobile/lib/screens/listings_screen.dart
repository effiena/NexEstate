import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';

class ListingsScreen extends StatefulWidget {
  const ListingsScreen({super.key});

  @override
  State<ListingsScreen> createState() => _ListingsScreenState();
}

class _ListingsScreenState extends State<ListingsScreen> {
  List listings = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    loadListings();
  }

  Future<void> loadListings() async {
    setState(() => loading = true);

    final token = await AuthService.getToken();

    if (token == null) {
      setState(() {
        listings = [];
        loading = false;
      });
      return;
    }

    final data = await ApiService.getMyListings(token);

    setState(() {
      listings = data;
      loading = false;
    });
  }

  Future<void> deleteListing(int id) async {
    final token = await AuthService.getToken();
    if (token == null) return;

    await ApiService.deleteListing(id, token);

    loadListings(); // refresh after delete
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("My Listings"),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: loadListings,
          ),
        ],
      ),

      body: loading
          ? const Center(child: CircularProgressIndicator())
          : listings.isEmpty
              ? const Center(child: Text("No properties yet"))
              : GridView.builder(
                  padding: const EdgeInsets.all(12),
                  gridDelegate:
                      const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 0.75,
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                  ),
                  itemCount: listings.length,
                  itemBuilder: (context, index) {
                    final item = listings[index];

                    return Card(
                      elevation: 4,
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              height: 80,
                              color: Colors.grey[300],
                              child: const Center(
                                child: Icon(Icons.home, size: 40),
                              ),
                            ),

                            const SizedBox(height: 10),

                            Text(
                              item['title'] ?? '',
                              style: const TextStyle(
                                  fontWeight: FontWeight.bold),
                            ),

                            Text("RM ${item['price']}"),
                            Text(item['state'] ?? ''),

                            const Spacer(),

                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: Colors.green,
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Text(
                                    item['status'] ?? 'active',
                                    style:
                                        const TextStyle(color: Colors.white),
                                  ),
                                ),

                                IconButton(
                                  icon: const Icon(Icons.delete,
                                      color: Colors.red),
                                  onPressed: () =>
                                      deleteListing(item['id']),
                                ),
                              ],
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
