import * as React from "react";

import { StyleSheet, View } from "react-native";
import BasicExample from "./BasicExample";

export default function App() {
    return (
        <View style={styles.container}>
            <BasicExample />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
