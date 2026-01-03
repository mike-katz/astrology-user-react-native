import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
  useColorScheme,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, Fonts } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { BackIcon } from "../../assets/icons";
import SearchIcon from "../../assets/icons/SearchIcon";
import EditIcon from "../../assets/icons/EditIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import { ServiceConstants } from "../../services/ServiceConstants";

interface KundliItem {
  id: string;
  name: string;
  date: string;
  location: string;
}

const KundliScreen = () => {
  const navigation = useNavigation<any>();
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [kundlis,setKundlis] = useState<KundliItem[]>([
    {
      id: "1",
      name: "ANKIT",
      date: "30 August 2002, 12:00 PM",
      location: "Ahmedabad, Gujarat, India",
    },
    {
      id: "2",
      name: "Uttam",
      date: "30 August 2002, 12:00 PM",
      location: "Ahmedabad, Gujarat, India",
    },
        {
      id: "3",
      name: "Sarju",
      date: "30 August 2002, 12:00 PM",
      location: "Ahmedabad, Gujarat, India",
    },
    {
      id: "4",
      name: "Akshay",
      date: "30 August 2002, 12:00 PM",
      location: "Ahmedabad, Gujarat, India",
    },
        {
      id: "5",
      name: "Hardik",
      date: "30 August 2002, 12:00 PM",
      location: "Ahmedabad, Gujarat, India",
    },
    {
      id: "6",
      name: "Sandeep",
      date: "30 August 2002, 12:00 PM",
      location: "Ahmedabad, Gujarat, India",
    },
        {
      id: "7",
      name: "Krunal",
      date: "30 August 2002, 12:00 PM",
      location: "Ahmedabad, Gujarat, India",
    }
  ]);

  const filtered = kundlis.filter((k) =>
    k.name.toLowerCase().includes(search.toLowerCase())
  );



const onRefresh = async () => {
  setRefreshing(true);

  // Simulate API call (1 second)
  setTimeout(() => {
    // TODO: Load latest kundli data from API here
    setRefreshing(false);
  }, 1000);
  // const newData = await fetchKundliList(); // your API
  // setKundlis(newData);

  setRefreshing(false);
};

  const renderItem = ({ item }: { item: KundliItem }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>

            <View style={{flexDirection:'row',position:'absolute',top:10,right:10,alignItems:'center',gap:10}}>
                <TouchableOpacity onPress={()=>handleEdit(item)}>
                    <EditIcon width={24}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleDelete(item)}>
                    <DeleteIcon width={15}/>
                </TouchableOpacity>
            </View>
    </View>
  );
    const handleBack = () => {
        navigation.goBack();
    }
    const handleEdit = (item:KundliItem) => {
        
      navigation.navigate("EditKundliScreen", {
        onSelect: (data: KundliItem) => {
            // Update the list by replacing the edited item if it exists, otherwise append it
            setKundlis(prev => {
              const exists = prev.some(k => k.id === data.id);
              if (exists) {
                return prev.map(k => (k.id === data.id ? data : k));
              }
              return [...prev, data];
            });
        },item,
        });
    }
    const handleDelete = (item:KundliItem) => {
         Alert.alert(
            "Delete Kundli",
            "Are you sure you want to permanently delete this Kundli?",
            [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: () =>{
                setKundlis(prev => prev.filter(k => k.id !== item.id));
                
            }}
            ]
        );
    }
  return (
       <SafeAreaProvider>
         <SafeAreaView style={styles.container}>

        <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
            <BackIcon size={16} onPress={handleBack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kundli</Text>
      
        </View>

        <View style={{ flex:1,paddingHorizontal:16, paddingTop: 10,}}>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
            <SearchIcon width={20} height={20} color="#555"  />
            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search kundli by name"
                style={styles.searchInput}
                placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
                cursorColor={colors.primaryColor}
                />
       </View>

        {/* List */}
        <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 90, flexGrow: 1 }}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListEmptyComponent={
                <View style={{ flex:1, justifyContent:'center', alignItems:'center', marginTop: 50 }}>
                <Text style={{ fontSize: 16, color: "#888", fontFamily: Fonts.Medium }}>
                    No Record Found
                </Text>
                </View>
            }
        />

        <View style={styles.floatingWrap}>
            <Pressable style={styles.floatingBtn}  onPress={() => navigation.push('CreateKundliSteps')}>
                <Text style={styles.floatingText}>Create New Kundli</Text>
            </Pressable>
        </View>
        
        </View> 
       </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default KundliScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height:50,
    // marginBottom: 20,
    borderBottomColor:'gray',
    borderBottomWidth:.4
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

  /** Search bar */
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 12,
    borderRadius: 30,
    height: 45,
    backgroundColor: "#FFF",
    marginBottom:20
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily:Fonts.Medium,
    marginLeft:5
  },

  /** Card */
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginHorizontal:3
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  /** Avatar circle */
  avatar: {
    backgroundColor: colors.primaryColor,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    fontFamily:Fonts.Medium
  },

  /** Text */
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    fontFamily:Fonts.Medium
  },
  date: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
    fontFamily:Fonts.Medium
  },
  location: {
    fontSize: 13,
    color: "#666",
    fontFamily:Fonts.Medium
  },
  // Floating Button Wrapper
  floatingWrap: {
      position: "absolute",
      bottom: '3%',
      left: 0,
      right: 0,
      alignItems: "center",
  },

  floatingBtn: {
      flexDirection: "row",
      backgroundColor: colors.primaryColor,
      width: "92%",
      paddingVertical: 15,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",

      // SHADOW
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 6,
  },


  floatingText: {
      fontSize: 14,
      fontWeight: "600",
      color: "#000",
      fontFamily:Fonts.SemiBold
  },

});
