import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NetworkContext } from '../service/NetworkProvider';

const NetworkStatus = () => {
    const { isConnected } = useContext(NetworkContext);

    if (isConnected) {
        return null;
    }

    return (
        <View style={{ backgroundColor: 'black', }}>
            <View style={{ backgroundColor: '#e55656', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[styles.text, { width: '100%' }]}>You are offline</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    offline: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginTop: 8,
        marginBottom: 5
    },
    text: {
        color: 'white',
        fontSize: 16,
        paddingLeft: 5,
        paddingVertical: 10,
        width: '80%',
    },
});

export default NetworkStatus;
