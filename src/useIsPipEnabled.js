import { useState, useEffect } from 'react';
import { Platform, NativeEventEmitter } from 'react-native';

import AndroidPip from './AndroidPip';

const eventEmitter = Platform.OS === 'android' ? 
  new NativeEventEmitter(NativeModules.RNAndroidPip) : null;

export default () => {
  const [isPip, setIsPip] = useState(false);

  useEffect(() => {
    let listener;
    if (Platform.OS === 'android') {
      listener= eventEmitter.addListener('PIP_MODE_CHANGE', setIsPip);
    }

    return () => {
      listener?.remove();
    };
  }, []);

  return isPip;
}

