/**
 * Mock data for stores/locations
 * TODO: Replace with real API calls to /api/stores
 */

export interface Store {
  id: string;
  name: string;
  city: string;
  image: string;
}

export const MOCK_STORES: Store[] = [
  {
    id: "1",
    name: "Boutique boulangerie n°1",
    city: "Bali",
    image: "/images/pantry-shelf.jpg",
  },
  {
    id: "2",
    name: "test",
    city: "paris",
    image: "/images/pantry-shelf.jpg",
  },
  {
    id: "3",
    name: "Mur Mur",
    city: "Canggu",
    image: "/images/pantry-shelf.jpg",
  },
];
