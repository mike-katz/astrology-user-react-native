import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    useColorScheme,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Feather from "react-native-vector-icons/Feather";
import { colors, Fonts } from "../../styles";
import { BackIcon } from "../../assets/icons";
import DatePickerDialog from "../../utils/DatePickerDialog";
import TimePickerDialog from "../../utils/TimePickerDialog";

const KundliMatchingScreen = ({ navigation, route }: any) => {
const [activeTab, setActiveTab] = useState<'open' | 'new'>('new');


const [boyName, setBoyName] = useState('');
const [boyDate, setBoyDate] = useState(new Date());
const [boyTime, setBoyTime] = useState(new Date());
const [boyNoTime, setBoyNoTime] = useState(false);
const [boyPlace, setBoyPlace] = useState('New Delhi, Delhi, India');


const [girlName, setGirlName] = useState('');
const [girlDate, setGirlDate] = useState(new Date());
const [girlTime, setGirlTime] = useState(new Date());
const [girlNoTime, setGirlNoTime] = useState(false);
const [girlPlace, setGirlPlace] = useState('New Delhi, Delhi, India');

const [showDatePickerModal, setShowDatePickerModal] = useState(false);
const [showTimePickerModal, setShowTimePickerModal] = useState(false);

const colorScheme = useColorScheme();

    const onSubmit = () => {

    };
    const openBirthPlaceScreen = () => {
        navigation.navigate("SearchPlaceScreen", {
            onSelect: (place: string) => {
                // setLocation(place); // Update input
            },
        });
    };
    const handleBack = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.left}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                <BackIcon size={16} tintColor={undefined} onPress={() => navigation.goBack()} />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.headerTitle}>Kundli Matching</Text>

                            <View style={styles.right} /> 
                    </View>

                    {/* Tabs */}
                               <View style={styles.walletBtnRow}>
                                <TouchableOpacity 
                                    style={[
                                styles.walletInactiveBtn,
                                activeTab === 'open' && styles.walletActiveBtn
                                ]} onPress={()=>setActiveTab('open')}>
                                    <Text style={[
                                styles.walletInactiveText,
                                activeTab === 'open' && styles.walletActiveText
                                ]}>Open Kundli</Text>
                                </TouchableOpacity>
                    
                                <TouchableOpacity 
                                    style={[
                                styles.paymentInactiveBtn,
                                activeTab === 'new' && styles.paymentActiveBtn
                                ]} onPress={()=>setActiveTab('new')}
                                >
                                    <Text style={[styles.paymentInactiveText, activeTab === 'new' && styles.paymentActiveText]}>New Matching</Text>
                                </TouchableOpacity>
                                </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:6 }}>

                    {/* Card - Boy's Details */}
                        <View style={styles.card}>
                        <Text style={styles.cardTitle}>Boy's Details</Text>

                        {/* Name field */}
                        <Text style={styles.inputLable}>Name*</Text>
                        <View style={styles.inputBox}>
                            <Feather name="user" size={18} color="#444" />
                            <TextInput
                                style={styles.input}
                                value={boyName}
                                onChangeText={setBoyName}
                                placeholder="Name"
                                placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
                                cursorColor={colors.primaryColor}
                            />
                        </View>

                    
                        {/* Date field */}
                        <Text style={styles.inputLable}>Birth Date</Text>
                        <TouchableOpacity style={styles.inputBox} onPress={() => setShowDatePickerModal(true)}>
                            <Feather name="calendar" size={18} color="#444" />
                            <Text style={styles.fieldText}>
                                {boyDate.toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </Text>
                        </TouchableOpacity>

                        {/* Time field */}
                        <Text style={styles.inputLable}>Birth Time</Text>
                        {(
                            
                            <TouchableOpacity style={styles.inputBox} onPress={() => setShowTimePickerModal(true)}>
                                <Feather name="clock" size={18} color="#444" />
                                <Text style={styles.fieldText}>
                                    {boyTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </Text>
                            </TouchableOpacity>
                        )}

                        {/* Checkbox */}
                        <View style={styles.checkboxRow}>

                            <TouchableOpacity onPress={() => setBoyNoTime(!boyNoTime)}>
                                <Feather
                                    name={boyNoTime ? "check-square" : "square"}
                                    size={18}
                                    color="#000"
                                />
                            </TouchableOpacity>

                            <Text style={styles.checkboxLabel}>Don't know my exact time of birth</Text>
                        </View>

                        {/* Note */}
                        <Text style={styles.noteText}>
                            Note: Without time of birth, we can still achieve up to 80% accurate predictions
                        </Text>

                        {/* Location */}
                        <Text style={styles.inputLable}>Birth Place</Text>
                        <TouchableOpacity style={styles.inputBox} onPress={openBirthPlaceScreen}>
                            <Feather name="map-pin" size={18} color="#444" />
                            <Text style={styles.fieldText}>{boyPlace}</Text>
                        </TouchableOpacity>

                    </View>


                    {/* Card - Girl's Details */}
                    <View style={styles.card}>
                    <Text style={styles.cardTitle}>Girl's Details</Text>   

                    
                        {/* Name field */}
                        <Text style={styles.inputLable}>Name*</Text>
                        <View style={styles.inputBox}>
                            <Feather name="user" size={18} color="#444" />
                            <TextInput
                                style={styles.input}
                                value={girlName}
                                onChangeText={setGirlName}
                                placeholder="Name"
                                placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
                                cursorColor={colors.primaryColor}
                            />
                        </View>

                    
                        {/* Date field */}
                        <Text style={styles.inputLable}>Birth Date</Text>
                        <TouchableOpacity style={styles.inputBox} onPress={() => setShowDatePickerModal(true)}>
                            <Feather name="calendar" size={18} color="#444" />
                            <Text style={styles.fieldText}>
                                {girlDate.toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </Text>
                        </TouchableOpacity>

                        {/* Time field */}
                        <Text style={styles.inputLable}>Birth Time</Text>
                        {(
                            
                            <TouchableOpacity style={styles.inputBox} onPress={() => setShowTimePickerModal(true)}>
                                <Feather name="clock" size={18} color="#444" />
                                <Text style={styles.fieldText}>
                                    {girlTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </Text>
                            </TouchableOpacity>
                        )}

                        {/* Checkbox */}
                        <View style={styles.checkboxRow}>

                            <TouchableOpacity onPress={() => setBoyNoTime(!boyNoTime)}>
                                <Feather
                                    name={boyNoTime ? "check-square" : "square"}
                                    size={18}
                                    color="#000"
                                />
                            </TouchableOpacity>

                            <Text style={styles.checkboxLabel}>Don't know my exact time of birth</Text>
                        </View>

                        {/* Note */}
                        <Text style={styles.noteText}>
                            Note: Without time of birth, we can still achieve up to 80% accurate predictions
                        </Text>

                        {/* Location */}
                        <Text style={styles.inputLable}>Birth Place</Text>
                        <TouchableOpacity style={styles.inputBox} onPress={openBirthPlaceScreen}>
                            <Feather name="map-pin" size={18} color="#444" />
                            <Text style={styles.fieldText}>{girlPlace}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{height: 70}} />{/* spacer for FAB */}

                    </ScrollView>

                    {/* DATE PICKER */}
                    <DatePickerDialog
                        visible={showDatePickerModal}
                        onClose={() => setShowDatePickerModal(false)}
                        onApply={(dateData) => {
                            console.log("User date:", dateData);
                            console.log("ISO:", dateData.toISOString());
                            console.log("Formatted:", dateData.toLocaleDateString());
                            setBoyDate(dateData);
                        }}
                            />
                    {/* TIME PICKER */}
                    <TimePickerDialog
                        visible={showTimePickerModal}
                        onClose={() => setShowTimePickerModal(false)}
                        onApply={(dateData) => {
                            console.log("User time:", dateData);
                            setBoyTime(dateData);
                            setBoyNoTime(false);
                        }}
                        />

                </View>


                {/* Floating yellow button */}
                <TouchableOpacity style={styles.fab} activeOpacity={0.9} onPress={onSubmit}>
                <Text style={styles.fabText}>Match Horoscope</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default KundliMatchingScreen;

const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#fff' },
header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 8,
  paddingVertical: 12,
  backgroundColor: "#fff",
  borderBottomColor: "gray",
  borderBottomWidth: 0.4,
},
left: {
  width: 40,
  justifyContent: "center",
  alignItems: "flex-start",
},
right: {
  width: 40, // 👈 same size as left for perfect center
},
headerTitle: {
  fontSize: 20,
  fontWeight: "600",
  fontFamily: Fonts.Medium,
  textAlign: "center",
  flex: 1, // 👈 takes remaining middle space
},

walletBtnRow: {
    flexDirection: "row",
    paddingHorizontal:5,
    paddingVertical:10
  },
  walletActiveBtn: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    borderRadius: 22,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  walletActiveText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    fontFamily:Fonts.Medium
  },
  walletInactiveBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 22,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  walletInactiveText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    fontFamily:Fonts.Medium
  },
  paymentActiveBtn: {
    flex: 1,
    backgroundColor:colors.primaryColor,
    borderRadius: 22,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentActiveText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    fontFamily:Fonts.Medium
  },
  paymentInactiveBtn: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 22,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentInactiveText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    fontFamily:Fonts.Medium
  },

    
card: {
backgroundColor: '#fff',
borderRadius: 14,
padding: 14,
marginTop: 12,
borderWidth: 1,
borderColor: '#EFEFEF',
},
cardTitle: { textAlign: 'center', fontSize: 18, fontWeight: '700', marginBottom: 8,fontFamily:Fonts.SemiBold},
label: { marginTop: 10, marginBottom: 6, color: '#333', fontWeight: '600' },
inputLable: { 
    fontSize: 14, 
    marginBottom: 8,
    color:'gray', 
    fontFamily: Fonts.Medium 
},
inputBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingHorizontal: 14,
        height: 45,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#eee",
    },
    input: {
        flex: 1,
        fontSize: 14,
        marginLeft: 10,
        fontFamily:Fonts.Medium
    },
    fieldText: {
        fontSize: 14,
        marginLeft: 10,
        color: "#333",
        fontFamily:Fonts.Medium
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 12,
        color: "#000",
        fontFamily:Fonts.Medium
    },
    noteText: {
        fontSize: 13,
        color: "#888",
        marginBottom: 20,
        fontFamily:Fonts.Medium
    },
    fab: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: '2%',
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
},
fabText: { fontWeight: '800', color: '#000', fontSize: 16,fontFamily:Fonts.Medium },
});
