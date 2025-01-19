import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import axios from "axios";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "expo-router";

const API_URL = "https://habitstestproject.vercel.app";

console.log("Using API URL:", API_URL); // Debugging
console.log("Component is rendering!");

export default function HomeScreen() {

    const navigation = useNavigation();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log("Fetching from API:", API_URL); // Debugging API call

        axios.get(`${API_URL}/products`)
            .then(response => {
                console.log("API Response:", response.data); // Debug API response
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error); // Debug API error
            });
    }, []);



    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const cartTotal = cart
        .reduce((acc, item) => acc + Number(item.price.toString().replace(/[^0-9.]/g, "")), 0)
        .toFixed(2);

    return (
        <ScrollView style={tw`flex-1 bg-gray-100 p-5`}>
            <View style={tw`items-center my-6`}>
                <Text testID="title" style={tw`text-3xl font-bold text-blue-600`}>
                    🛍️ Buddy's Shopping World
                </Text>
            </View>
            {/* Cart Summary */}
            <View style={tw`p-4 bg-blue-600 rounded-lg mb-4`}>
                <Text style={tw`text-white text-lg font-bold`}>
                    🛒 Cart Total: ${cartTotal} ({cart.length} items)
                </Text>
            </View>

            {/* Search Bar */}
            <TextInput
                placeholder="Search products..."
                onChangeText={setSearch}
                style={tw`border p-3 rounded-lg bg-white text-lg mb-4`}
            />

            {/* Product List */}
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const itemPrice = Number(item.price.toString().replace(/[^0-9.]/g, ""));

                    return (
                        <View style={tw`p-4 bg-white rounded-lg mb-3 shadow-lg`}>
                            <Text style={tw`text-lg font-semibold mt-2`}>{item.name}</Text>
                            <Text style={tw`text-gray-500`}> ${itemPrice.toFixed(2)}</Text>
                            <TouchableOpacity
                                style={tw`bg-blue-500 p-2 rounded mt-2`}
                                onPress={() => addToCart(item)}
                            >
                                <Text style={tw`text-white text-center font-bold`}>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </ScrollView>
    );
}