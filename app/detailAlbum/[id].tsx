import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface Photo {
    id: number;
    title: string;
}

const { width } = Dimensions.get('window');

export default function PhotosScreen() {
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme ?? "light");

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get<Photo[]>('https://jsonplaceholder.typicode.com/photos?_limit=20')
            .then((response) => {
                setPhotos(response.data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#6200ea" />
                <Text style={styles.loadingText}>Loading photos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: `https://picsum.photos/seed/${item.id}/300/200` }}
                            style={styles.image}
                        />
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const getStyles = (colorScheme: string) => 
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
            padding: 10,
        },
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
        },
        loadingText: {
            marginTop: 10,
            fontSize: 16,
            color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
        },
        row: {
            justifyContent: 'space-between',
        },
        card: {
            backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
            marginBottom: 15,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colorScheme === 'dark' ? Colors.dark.border : Colors.light.border,
            overflow: 'hidden',
            width: width / 2 - 15,
        },
        image: {
            width: '100%',
            height: 150,
        },
        title: {
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 8,
            color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
        },
    })