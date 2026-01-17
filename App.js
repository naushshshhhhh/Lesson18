import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 20
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    searchBar: {
        borderWidth: 1,
        marginBottom: 20,
        padding: 8,
        borderRadius: 5,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'black',
        height: 200,
    },
    characterName: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: '#333',
    },
    characterImage: {
        width: 150,
        height: '100%',
        resizeMode: 'contain',
    },
});

let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        const myurl = "https://onlinecardappwebservice-0fgy.onrender.com/allcards";
        fetch(myurl)
            .then((response) => response.json())
            .then((myJson) => {
                setMyData(myJson);
                originalData = myJson;
            })
            .catch((error) => console.error(error));
    }, []);

    const FilterData = (text) => {
        if (text !== '') {
            let myFilterData = originalData.filter((item) =>
                item.character_name.toLowerCase().includes(text.toLowerCase())
            );
            setMyData(myFilterData);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                {/* Displaying the Name */}
                <Text style={styles.characterName}>{item.character_name}</Text>

                <Image
                    source={{ uri: item.card_pic }}
                    style={styles.characterImage}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <Text style={styles.label}>Search:</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="Type character name..."
                onChangeText={(text) => FilterData(text)}
            />
            <FlatList
                data={myData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default App;