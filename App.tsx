import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, Modal, Button } from '@ant-design/react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Text, View } from './components/Themed';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // 采用useReducer优化改写
  const [publishModalVisible, setPublishModalVisible] = useState(false)

  const onClose = () => {
    setPublishModalVisible(false)
  }
  if (!isLoadingComplete) {
    return null;
  } else {
    return (

      <SafeAreaProvider>
        <Provider>
          <Navigation colorScheme={colorScheme} setPublishModalVisible={setPublishModalVisible} />
          <Modal
            popup
            visible={publishModalVisible}
            maskClosable
            animationType="slide-up"
            onClose={onClose}
          >
            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
              <Text style={{ textAlign: 'center' }}>Content...</Text>
              <Text style={{ textAlign: 'center' }}>Content...</Text>
            </View>
          </Modal>
        </Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
