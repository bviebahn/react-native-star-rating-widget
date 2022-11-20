import * as React from "react";

import { StyleSheet, View } from "react-native";
import BasicExample from "./BasicExample";
import CustomIconExample from "./CustomIconExample";

export default function App() {
    return (
        <View style={styles.container}>
            <BasicExample />
            <CustomIconExample />
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
