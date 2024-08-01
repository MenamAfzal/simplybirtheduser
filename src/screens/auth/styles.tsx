import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../utils/Metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: horizontalScale(15),
  },
  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: verticalScale(95),
    width: horizontalScale(120),
    marginTop: verticalScale(40),
  },
  backgroundImage: {
    position: 'absolute',
    height: horizontalScale(348),
    width: verticalScale(392),
    alignSelf: 'center',
    bottom: 0,
    resizeMode: 'contain',
  },
  header: {
    fontSize: moderateScale(40),
    marginBottom: verticalScale(5),
    fontFamily: FONTS.w600,
  },
  forgotCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
    alignItems: 'center',
  },
  profileSetupSec: {flexDirection: 'row', marginTop: verticalScale(15)},
  profileSetupLabel: {
    fontFamily: FONTS.w400,
    flex: 1,
    fontSize: moderateScale(20),
  },
  profileSetupValue: {flex: 2},
  subtitle: {fontFamily: FONTS.w400, fontSize: moderateScale(22)},
  rememberMe: {
    fontFamily: FONTS.w400,
    fontSize: moderateScale(18),
    marginStart: horizontalScale(10),
  },
  forgotPass: {
    fontFamily: FONTS.w500,
    color: '#D87777',
    fontSize: moderateScale(18),
  },
  dividerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  divider: {flex: 1, height: 1, backgroundColor: '#00000033'},
  dividerText: {
    fontFamily: FONTS.w300,
    flex: 1,
    color: '#373541CC',
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  socialLogin: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    top: moderateScale(40),
  },
  otpStyle: {
    backgroundColor: '#F5F5F5',
    minHeight: verticalScale(50),
    marginEnd: horizontalScale(20),
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    width: verticalScale(50),
  },
});

export default styles;
