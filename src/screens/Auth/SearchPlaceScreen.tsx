import React, { useState, useEffect } from "react";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { BackIcon } from "../../assets/icons";
import SearchIcon from "../../assets/icons/SearchIcon";
import { Fonts } from "../../styles";

interface LocationItem {
  city: string;
  state: string;
}

const RECENT: string[] = ["New Delhi", "Rajkot", "Ahmedabad"];

const SAMPLE_RESULTS: LocationItem[] = [
  { city: "Rajkot", state: "Gujarat, India" },
  { city: "Rajkot", state: "Rajasthan, India" },
  { city: "Railnagar (Rajkot)", state: "Gujarat, India" },
  { city: "Ratanpar (Rajkot)", state: "Gujarat, India" },
  { city: "Kankot (Rajkot)", state: "Gujarat, India" },
  { city: "Rajkot", state: "Punjab, Pakistan" },
  { city: "Mavdi (Rajkot)", state: "Gujarat, India" },
  { city: "AMRELI (Rajkot)", state: "Gujarat, India" },
  { city: "Vavdi (Rajkot)", state: "Gujarat, India" },
  { city: "Sapar (Rajkot)", state: "Gujarat, India" },
];

const SearchPlaceScreen=({ navigation, route }:any) => {
  const [query, setQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<LocationItem[]>(SAMPLE_RESULTS);
    
  const { onSelect } = route.params;

  const handleClickCity = (city: string) => {
    onSelect(city); // send back selected city
    navigation.goBack(); // return to previous screen
  };

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(SAMPLE_RESULTS);
      return;
    }

    const lower = query.toLowerCase();
    setFiltered(
      SAMPLE_RESULTS.filter(
        (item) =>
          item.city.toLowerCase().includes(lower) ||
          item.state.toLowerCase().includes(lower)
      )
    );
  }, [query]);

  const renderItem = ({ item }: { item: LocationItem }) => (
    <TouchableOpacity style={styles.row} onPress={() => handleClickCity(item.city)}>
      <Image
        source={require("../../assets/icons/astrologer_logo.png")}
        style={styles.locationIcon}
      />
      <View>
        <Text style={styles.city}>{item.city}</Text>
        <Text style={styles.state}>{item.state}</Text>
      </View>
    </TouchableOpacity>
  );
    const handleBack = () => {
        navigation.goBack();
    }
  return (
   <SafeAreaProvider>
               <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <BackIcon size={16} onPress={handleBack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Place of Birth</Text>
        <View style={{ width: 30 }} />
      </View>

    <View style={styles.mainContainer}>
      {/* Search bar */}
      <View style={styles.searchWrapper}>
 
        <SearchIcon width={20} height={20} />

        <TextInput
          value={query}
          onChangeText={(text) => setQuery(text)}
          placeholder="Search City"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Recently Searched */}
      <Text style={styles.recentTitle}>Recently Searched</Text>

      <View style={styles.recentChips}>
        {RECENT.map((item) => (
          <TouchableOpacity key={item} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Results */}
      <FlatList
        data={filtered}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      </View>
     </SafeAreaView>
        </SafeAreaProvider>
  );
};

export default SearchPlaceScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    // paddingHorizontal: 16,
    // paddingTop: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backBtn: {
      width: 60,
      height: 40,
      justifyContent: "center",
      paddingLeft: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily:Fonts.Medium,
  },
mainContainer:{
  paddingHorizontal: 16,
},
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 12,
    borderRadius: 30,
    height: 45,
    backgroundColor: "#FFF",
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#999",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  clearText: {
    fontSize: 18,
    color: "#999",
    paddingHorizontal: 5,
  },

  recentTitle: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
  },

  recentChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  chip: {
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: "#333",
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
  },

  locationIcon: {
    width: 22,
    height: 22,
    tintColor: "#555",
    marginRight: 15,
  },

  city: {
    fontSize: 16,
    fontWeight: "500",
  },
  state: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
});
