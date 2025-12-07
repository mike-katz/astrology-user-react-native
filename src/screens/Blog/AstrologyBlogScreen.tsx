import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  RefreshControl,
  Animated,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../styles";
import Feather from "react-native-vector-icons/Feather";
import { BackIcon } from "../../assets/icons";
import SearchIcon from "../../assets/icons/SearchIcon";
import FastImage from "react-native-fast-image";

const AstrologyBlogScreen = () => {
  const navigation = useNavigation<any>();

  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      img: 'https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/11/14112553/Copy-of-Your-paragraph-text-7-768x488.jpg',
      title:
        "How Astrotalk Is Using AI to Become a Smarter, More Trusted Astrology Platform",
      author: "Astrologer Anshika",
      date: "Nov 14, 2025",
      views: 8787,
      link:'https://astrotalk.com/horoscope/todays-horoscope'
    },
    {
      id: 2,
      img: 'https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/11/06165917/WhatsApp-Image-2025-11-04-at-5.48.19-PM-300x150.jpeg',
      title:
        "Mars in Scorpio: Why Does Winning seem to be all you can think about!",
      author: "Astrologer Anshika",
      date: "Nov 06, 2025",
      views: 2342,
      link:'https://astrotalk.com/freekundli'
    },
    {
      id: 3,
      img: 'https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/10/29162102/Banners-1-300x150.png',
      title:
        "Suddenly Everyone’s Talking About Marriage? Jupiter enters Cancer!",
      author: "Astrologer Anshika",
      date: "Nov 03, 2025",
      views: 6564,
      link:'https://astrotalk.com/compatibility'
    },
  ]);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false); // simulation only
    }, 1200);
  }, []);


  const loadMore = () => {
    setPage(page + 1);

    // Add dummy new data
    setBlogs((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        img: 'https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/09/07113444/Copy-of-Your-paragraph-text-6-300x191.jpg',
        title: "Loaded more blog content example...",
        author: "Astrologer XYZ",
        date: "Nov 10, 2025",
        views: 1122,
        link:'https://astrotalk.com/compatibility'
      },
    ]);
  };

  const filteredData = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.push("WebviewScreen", { link_web: item.link })}
    >
      <View>
        <FastImage source={{ uri: item.img }} style={styles.cardImg} />

        {/* Eye + views top-right pill */}
        <View style={styles.eyeBadge}>
          <Feather name="eye" size={12} color="#000" />
          <Text style={styles.eyeText}>{item.views}</Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.cardAuthor}>By: {item.author}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

    const handleBack = () => {
        navigation.goBack();
    }

const searchHeight = useRef(new Animated.Value(0)).current;
const searchOpacity = useRef(new Animated.Value(0)).current;
const [showSearch, setShowSearch] = useState(false);
const toggleSearch = () => {
  const toValue = showSearch ? 0 : 1;

  setShowSearch(!showSearch);

  Animated.parallel([
    Animated.timing(searchHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }),
    Animated.timing(searchOpacity, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    })
  ]).start();
};

const animatedSearchStyle = {
  height: searchHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50], // collapsed → full height
  }),
  opacity: searchOpacity,
  transform: [
    {
      translateY: searchHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [-20, 0], // slide from top
      }),
    },
  ],
  overflow: "hidden",
};


  return (
         <SafeAreaProvider>
                <SafeAreaView style={styles.container}>

    <Animated.View   style={[
                styles.header,
                // { backgroundColor: headerBackgroundColor }
            ]}>
        <Text style={styles.headerTitle}>Astrology Blog</Text>

        <TouchableOpacity style={styles.backBtn}>
            <BackIcon size={16} onPress={handleBack} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareBtn} onPress={toggleSearch}>
            <SearchIcon size={20} />
        </TouchableOpacity>
        <View style={{ position:'absolute',width:'100%', height: .1,backgroundColor:'#7B7B7B',bottom:0 }}></View>
    </Animated.View>

      <Animated.View style={[styles.searchBox, animatedSearchStyle]}>
        <SearchIcon size={18} color="#777" />
        <TextInput
          placeholder="Search blogs..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </Animated.View>

      <FlatList
        data={filteredData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginTop: 8 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
               </SafeAreaView>
            </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

header: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerTitle: {
        position: 'absolute',
        textAlign: 'center',
        left: 0,
        right: 0,
        fontSize: 20,
        fontWeight: "500",
        color: "#000",
        fontFamily:Fonts.Medium
    },
    backBtn: {
        width: 60,
        height: 40,
        justifyContent: "center",
        paddingLeft: 10,
    },
    shareBtn: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 15,
    },

  // Search box below header
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    marginHorizontal: 16,
    paddingHorizontal: 12,
    marginVertical:12,
    borderRadius: 8,
    height: 44,

  },

  searchInput: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: Fonts.Medium,
    flex: 1,
    color: "#000",
  },

  // Card
  card: {
    marginHorizontal: 12,
    marginBottom: 18,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  cardImg: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  // Eye badge
  eyeBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  eyeText: {
    marginLeft: 5,
    fontSize: 13,
    color: "#000",
    fontFamily: Fonts.Medium,
  },

  cardTitle: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
    color: "#000",
    marginTop: 10,
    marginHorizontal: 10,
  },
metaRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingHorizontal: 10,
  marginTop: 5,
},
  cardAuthor: {
    marginLeft: 10,
    marginTop: 4,
    fontSize: 13,
    color: "#777",
    fontFamily: Fonts.Medium,
  },

  cardDate: {
    fontSize: 13,
    marginRight: 10,
    marginTop: 6,
    color: "#777",
    fontFamily: Fonts.Medium,
  },
});


export default AstrologyBlogScreen;
