import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../styles';

export function AppSpinner({ show }) {

    if (show)
        return (
            <Modal visible={show} transparent={true}>
                <View style={style.Container}>
                    <ActivityIndicator size='large' color={colors.primaryColor} />
                </View>
            </Modal>
        )
    return null
}

const style = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `rgba(0,0,0,0.4)`,
        // transform: [{ scale: 1.2 }]
    }
});
