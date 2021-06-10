import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Tabs, Button, Icon } from '@ant-design/react-native';
import { Text, View } from '../components/Themed';

const renderContent = (tab: { title: string }, index: number) => {
  const content = [1, 2, 3, 4, 5, 6, 7, 8].map(i => {
    return (
      <View key={`${index}_${i}`} style={styles.itemContent}>
        <Text>
          {tab.title} - {i}
        </Text>
      </View>
    );
  });
  return <ScrollView style={{ backgroundColor: '#fff' }}>{content}</ScrollView>;
};

export default function MessageScreen() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const messageTabs: any[] = [
    { title: '未读' },
    { title: '已读' },
    { title: '系统通知' },
  ]

  useEffect(() => {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);




  return (
    <View style={styles.container}>
      <Tabs tabs={messageTabs} initialPage={1} tabBarPosition="top">
        {renderContent}
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  itemContent: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#ddd',
  }
});
