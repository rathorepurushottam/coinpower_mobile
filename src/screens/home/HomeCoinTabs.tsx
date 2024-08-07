import React from 'react';
import {View, StyleSheet} from 'react-native';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import {AppText, FOURTEEN, SECOND, YELLOW} from '../../common';
import {colors} from '../../theme/colors';
import {useAppSelector} from '../../store/hooks';
import {checkValue} from '../../helper/utility';

interface HomeCoinTabsProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  isGuest?: boolean;
}

const HomeCoinTabs = ({
  isGuest = false,
  activeTab,
  setActiveTab,
}: HomeCoinTabsProps) => {
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  return (
    <View style={styles.container}>
      <TouchableOpacityView
        style={styles.tabContainer}
        onPress={() => setActiveTab(0)}>
        <AppText
          type={FOURTEEN}
          color={activeTab === 0 ? YELLOW : SECOND}
          style={styles.tabName}>
          {checkValue(languages?.spot)}
        </AppText>
        {activeTab === 0 && <View style={styles.bottomView} />}
      </TouchableOpacityView>
      {!isGuest && (
        <TouchableOpacityView
          style={styles.tabContainer}
          onPress={() => setActiveTab(1)}>
          <AppText
            type={FOURTEEN}
            color={activeTab === 1 ? YELLOW : SECOND}
            style={styles.tabName}>
            {checkValue(languages?.favorite)}
          </AppText>
          {activeTab === 1 && <View style={styles.bottomView} />}
        </TouchableOpacityView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tabContainer: {
    marginRight: 20,
  },
  tabName: {},
  bottomView: {
    height: 2,
    width: '120%',
    marginTop: 3,
    borderRadius: 3,
    backgroundColor: colors.buttonBg,
    alignSelf: 'center',
  },
});
export default HomeCoinTabs;
