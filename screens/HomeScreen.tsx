import React, { useState, useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { SearchBar, Tabs, Icon } from "@ant-design/react-native";
import { Text, View } from "../components/Themed";

export default function HomeScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const homeTabs: any[] = [
    { title: "最近" },
    { title: "小计" },
    { title: "知识库" },
    { title: "团队" },
  ];
  useEffect(() => {
    fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar placeholder="搜索" maxLength={8} />
      <Tabs
        tabs={homeTabs}
        renderTabBar={(tabProps) => (
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              width: "100%",
            }}
          >
            {tabProps.tabs.map((tab, i) => (
              // change the style to fit your needs
              <TouchableOpacity
                activeOpacity={0.9}
                key={tab.key || i}
                style={{
                  marginRight: 40,
                  borderBottomWidth: tabProps.activeTab === i ? 2 : 0,
                  paddingVertical: 10,
                }}
                onPress={() => {
                  const { goToTab, onTabClick } = tabProps;
                  // tslint:disable-next-line:no-unused-expression
                  onTabClick && onTabClick(homeTabs[i], i);
                  // tslint:disable-next-line:no-unused-expression
                  goToTab && goToTab(i);
                }}
              >
                <Text
                  style={{
                    color: tabProps.activeTab === i ? "black" : undefined,
                    fontSize: 16,
                  }}
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      >
        <View style={styles.container}>
          <Text>最近</Text>
        </View>
        <View style={styles.container}>
          <Text>小计</Text>
        </View>
        <View style={styles.container}>
          <Text>知识库</Text>
        </View>
        <View style={styles.container}>
          <Text>团队</Text>
        </View>
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
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
