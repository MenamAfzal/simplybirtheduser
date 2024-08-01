import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale } from '../utils/Metrics'
import { COLORS, FONTS } from '../constants'
interface Props {
    title?: Array<any>,
}
const SegmentedTab = (props: Props) => {
    const [isActive, setIsactive] = useState(true);
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Pressable style={{ ...styles.activeSlider, backgroundColor: isActive == true ? COLORS.PRIMARY : COLORS.WHITE }} onPress={() => { setIsactive(true) }}>
                    <Text style={{ ...styles.activeSliderText, color: isActive == true ? COLORS.WHITE : COLORS.GREY }}>{props.title}</Text>
                </Pressable>
                <Pressable style={{ ...styles.inactiveSlider, backgroundColor: isActive == false ? COLORS.PRIMARY : COLORS.WHITE }} onPress={() => { setIsactive(false) }}>
                    <Text style={{ ...styles.inActiveSliderText, color: isActive == false ? COLORS.WHITE : COLORS.GREY }}>{props.title}</Text>
                </Pressable>
            </View>
            {isActive == true ? (<View><Text></Text></View>) : (<View><Text></Text></View>)}
        </View>
    )
}

export default SegmentedTab

const styles = StyleSheet.create({
    main: {
        width: moderateScale(206),
        height: moderateScale(40),
        borderColor: COLORS.PRIMARY,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(50),

    },
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    activeSlider: {
        width: moderateScale(100),
        height: moderateScale(38),
        borderRadius: moderateScale(50),
        justifyContent: 'center',
    },
    activeSliderText: {
        fontFamily: FONTS.w500,
        fontSize: moderateScale(18),
        textAlign: 'center'
    },
    inactiveSlider: {
        width: moderateScale(103),
        height: moderateScale(38),
        backgroundColor: COLORS.WHITE,
        borderRadius: moderateScale(50),
        justifyContent: 'center',
    },
    inActiveSliderText: {
        fontFamily: FONTS.w500,
        fontSize: moderateScale(18),
        color: COLORS.GREY,
        textAlign: 'center'
    },
})