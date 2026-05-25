import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import 'listings_screen.dart';
import 'create_listing_screen.dart';
import 'marketplace_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  // LOGOUT
  void logout(BuildContext context) async {
    await AuthService.logout();
    Navigator.pushReplacementNamed(context, '/');
  }

  // DASHBOARD CARD
  Widget dashboardCard({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    required Color color,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: 140,
        height: 140,
        child: Card(
          elevation: 3,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          child: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              color: color.withOpacity(0.1),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, size: 30, color: color),
                const SizedBox(height: 8),
                Text(
                  title,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],

      // APP BAR
      appBar: AppBar(
        title: const Text("NexEstate Dashboard"),
        actions: [
          IconButton(
            onPressed: () => logout(context),
            icon: const Icon(Icons.logout),
          ),
        ],
      ),

      // BODY
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            const Text(
              "Welcome Back 👋",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 6),

            Text(
              "Manage your property listings easily.",
              style: TextStyle(
                color: Colors.grey[700],
                fontSize: 13,
              ),
            ),

            const SizedBox(height: 20),

            Expanded(
              child: GridView(
                gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                  maxCrossAxisExtent: 160,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 1,
                ),

                children: [

                  // MY LISTINGS
                  dashboardCard(
                    icon: Icons.home_work,
                    title: "My Listings",
                    color: Colors.blue,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const ListingsScreen(),
                        ),
                      );
                    },
                  ),

                  // ADD LISTING
                  dashboardCard(
                    icon: Icons.add_business,
                    title: "Add Listing",
                    color: Colors.green,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const CreateListingScreen(),
                        ),
                      );
                    },
                  ),

                  // MARKETPLACE
                  dashboardCard(
                    icon: Icons.public,
                    title: "Marketplace",
                    color: Colors.teal,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const MarketplaceScreen(),
                        ),
                      );
                    },
                  ),

                  // SEARCH
                  dashboardCard(
                    icon: Icons.search,
                    title: "Search",
                    color: Colors.orange,
                    onTap: () {
                      Navigator.pushNamed(context, '/search');
                    },
                  ),

                  // AGENT PROFILE (FIXED)
                  dashboardCard(
                    icon: Icons.person,
                    title: "Agent Profile",
                    color: Colors.purple,
                    onTap: () {
                      Navigator.pushNamed(context, '/profile');
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
