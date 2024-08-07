import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {colors} from '../theme/colors';
import {useAppSelector} from '../store/hooks';

interface SpinnerSecondProps {
  loading?: boolean;
}

const SpinnerSecond = ({loading}: SpinnerSecondProps) => {
  const isLoading = useAppSelector(state => state.auth.isLoading);

  return (
    <>
      {isLoading || loading ? (
        <View style={[styles.spinnerStyle]}>
          <ActivityIndicator size={'large'} color={colors.buttonBg} />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00000080',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});

export {SpinnerSecond};
