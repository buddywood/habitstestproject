import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/products`).then(response => {
      setProducts(response.data);
    });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <View style={{ padding: 20 }}>
      <Text>🛒 Cart Total: ${cartTotal} ({cart.length} items)</Text>

      <TextInput
        placeholder="Search products..."
        onChangeText={setSearch}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.name} - ${item.price.toFixed(2)}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
    </View>
  );
}
