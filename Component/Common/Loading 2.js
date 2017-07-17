
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Modal,
  ActivityIndicator
} from 'react-native';

const SIZES = ['small', 'large'];

const propTypes = {
  visible: React.PropTypes.bool,
  color: React.PropTypes.string,
  size: React.PropTypes.oneOf(SIZES),
  overlayColor: React.PropTypes.string,
  onRequestClose: React.PropTypes.func
};

const Loading = ({ visible, color, size, overlayColor, onRequestClose }) => (
  <Modal
    visible={visible}
    transparent
    onRequestClose={onRequestClose}
  >
    {visible ?
      <View
        key={'spinner'}
        style={styles.container}
      >
        <View style={[styles.background, { backgroundColor: overlayColor }]}>
          <View style={styles.loading}>
            <ActivityIndicator
              size={size}
              color={color}
            />
            <Text style={styles.loadingText}>数据加载中...</Text>
          </View>
        </View>
      </View> :
      <View key={'spinner'} />}
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2.5,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#fcfcfc'
  }
});

Loading.propTypes = propTypes;

Loading.defaultProps = {
  visible: false,
  color: 'white',
  size: 'large',
  overlayColor: 'transparent',
  onRequestClose() {}
};

export default Loading;
