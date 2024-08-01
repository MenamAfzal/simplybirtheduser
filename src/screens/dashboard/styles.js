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
    padding: moderateScale(15),
  },
  backgroundImage: {
    position: 'absolute',
    height: horizontalScale(348),
    width: verticalScale(392),
    alignSelf: 'center',
    bottom: 0,
    resizeMode: 'contain',
  },
  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  header: {
    fontSize: moderateScale(26),
    marginBottom: verticalScale(5),
    fontFamily: FONTS.w600,
  },
  heading: {
    fontSize: moderateScale(22),
    // marginBottom: verticalScale(5),
    fontFamily: FONTS.w600,
  },
  modalHeading: {
    marginTop: horizontalScale(10),
    color: 'rgba(216, 119, 119, 1)',
    fontFamily: FONTS.w700,
    fontSize: moderateScale(30),
  },
  modalSubheading: {
    color: 'rgba(0, 0, 0, 0.75)',
    fontFamily: FONTS.w600,
    fontSize: moderateScale(21),
    margin: moderateScale(5),
  },
  descriptionHeading: {
    color: 'rgba(0, 0, 0, 0.75)',
    fontFamily: FONTS.w400,
    fontSize: moderateScale(18),
    margin: moderateScale(5),
    textAlign: 'center',
  },
  flatlist: {
    margin: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    marginVertical: verticalScale(10),
    height: verticalScale(94),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: moderateScale(10),
    elevation: 5,
  },
  homeLearn: {
    flex: 1,
    height: verticalScale(155),
    width: horizontalScale(140),
    margin: horizontalScale(5),
    marginHorizontal: horizontalScale(5),
    borderRadius: moderateScale(10),
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 5,
    backgroundColor: '#fff',
  },
  textView: {
    flex: 3.5,
    margin: moderateScale(10),
  },
  profileView: {
    margin: moderateScale(10),
  },
  nameList: {
    color: COLORS.BLACK,
    fontSize: moderateScale(16),
    fontFamily: FONTS.w500,
  },
  descriptionList: {
    color: COLORS.BLACK,
    fontSize: moderateScale(14),
    fontFamily: FONTS.w300,
  },
  momentDescription: {
    color: COLORS.GREY,
    fontSize: moderateScale(14),
    fontFamily: FONTS.w300,
    marginLeft: moderateScale(10),
    textAlign: 'center',
  },
  moment: {
    columnGap: moderateScale(5),
    alignItems: 'center',
  },
  statusContainer: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(100),
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    top: moderateScale(40),
    left: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    height: moderateScale(15),
    width: moderateScale(15),
    borderRadius: moderateScale(100),
  },
  unRead: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(100),
    position: 'absolute',
    top: moderateScale(45),
    left: moderateScale(350),
  },
  unreadText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: FONTS.w500,
    fontSize: moderateScale(12),
    color: COLORS.WHITE,
  },
  sortByText: {
    fontSize: moderateScale(18),
    fontFamily: FONTS.w500,
    color: COLORS.GREY,
    marginLeft: moderateScale(40),
  },

  loadingstyle: {
    size: 'large',
    color: COLORS.PRIMARY,
  },

  Title: {
    fontSize: moderateScale(13),
    fontFamily: FONTS.w700,
    color: COLORS.BLACK,
    marginTop: verticalScale(5),
  },
  Description: {
    fontSize: moderateScale(19.5),
    fontFamily: FONTS.w300,
    flexWrap: 'wrap',
    color: COLORS.GREY,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
    paddingLeft: horizontalScale(15),
  },
  imageload: {
    alignSelf: 'center',
    height: verticalScale(100),
    width: horizontalScale(139),
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    overflow: 'hidden',
  },
});
export default styles;
