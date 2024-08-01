import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { IMAGES } from '../constants'
import { horizontalScale, moderateScale, verticalScale } from '../utils/Metrics'

export default function Background() {
    return (
        <View style={styles.backgroundImage}>
            <Image source={IMAGES.BACKGROUND} />
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute', height: horizontalScale(350),
        width: verticalScale(392), alignSelf: 'center', bottom: 0, resizeMode: 'contain'
    },
})