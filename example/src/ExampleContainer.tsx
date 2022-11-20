import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ExampleContainer({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 32,
        padding: 16,
        backgroundColor: "#fff",
        alignItems: "center",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    title: { fontSize: 18, marginBottom: 8, color: "#222" },
});
