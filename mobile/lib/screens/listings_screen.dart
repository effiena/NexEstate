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

    loadListings();
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
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : listings.isEmpty
              ? const Center(
                  child: Text("No properties yet"),
                )
              : GridView.builder(
                  padding: const EdgeInsets.all(12),
                  gridDelegate:
                      const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 0.68,
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                  ),
                  itemCount: listings.length,
                  itemBuilder: (context, index) {

                    final item = listings[index];

                    return Card(
                      elevation: 4,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [

                            // Property Image Placeholder
                            Container(
                              height: 90,
                              width: double.infinity,
                              decoration: BoxDecoration(
                                color: Colors.grey[300],
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: const Center(
                                child: Icon(
                                  Icons.home,
                                  size: 45,
                                ),
                              ),
                            ),

                            const SizedBox(height: 10),

                            // Title
                            Text(
                              item['title'] ?? 'No Title',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),

                            const SizedBox(height: 6),

                            // Selling Price
                            Text(
                              "RM ${item['selling_price'] ?? 0}",
                              style: const TextStyle(
                                color: Colors.green,
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),

                            // Bank Value
                            Text(
                              "Bank Value: RM ${item['bank_value'] ?? 0}",
                              style: const TextStyle(fontSize: 12),
                            ),

                            // Commission
                            Text(
                              "Commission: RM ${item['commission_rm'] ?? 0}",
                              style: const TextStyle(fontSize: 12),
                            ),

                            const SizedBox(height: 5),

                            // Size
                            Text(
                              "${item['size_sqft'] ?? 0} sqft",
                              style: const TextStyle(fontSize: 12),
                            ),

                            // State
                            Text(
                              item['state'] ?? '',
                              style: const TextStyle(fontSize: 12),
                            ),

                            // Condition
                            Text(
                              item['condition'] ?? 'Unknown',
                              style: const TextStyle(fontSize: 12),
                            ),

                            // Lease Type
                            Text(
                              item['lease_type'] ?? '',
                              style: const TextStyle(fontSize: 12),
                            ),

                            // Bedrooms Bathrooms
                            Text(
                              "${item['bedrooms'] ?? 0} Bed • ${item['bathrooms'] ?? 0} Bath",
                              style: const TextStyle(fontSize: 12),
                            ),

                            // Parking
                            Text(
                              "${item['parking'] ?? 0} Parking",
                              style: const TextStyle(fontSize: 12),
                            ),

                            const Spacer(),

                            Row(
                              mainAxisAlignment:
                                  MainAxisAlignment.spaceBetween,
                              children: [

                                // Status
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 8,
                                    vertical: 4,
                                  ),
                                  decoration: BoxDecoration(
                                    color: Colors.green,
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Text(
                                    item['status'] ?? 'active',
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 11,
                                    ),
                                  ),
                                ),

                                // Delete Button
                                IconButton(
                                  icon: const Icon(
                                    Icons.delete,
                                    color: Colors.red,
                                  ),
                                  onPressed: () {
                                    deleteListing(item['id']);
                                  },
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
    );
  }
}
