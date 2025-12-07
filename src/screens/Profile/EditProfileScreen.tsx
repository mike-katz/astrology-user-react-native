import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Switch,
    Image,
    Platform,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DatePicker from "react-native-date-picker";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { colors, Fonts } from "../../styles";
import { BackIcon } from "../../assets/icons";
import { ServiceConstants } from "../../services/ServiceConstants";
import FastImage from "react-native-fast-image";
import { AppSpinner } from "../../utils/AppSpinner";
import { getUserDetails, updateProfileAction } from "../../redux/actions/UserActions";
import { CustomDialogManager2 } from "../../utils/CustomDialog2";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/slices/userDetailsSlice";
import DatePickerDialog from "../../utils/DatePickerDialog";
import TimePickerDialog from "../../utils/TimePickerDialog";
import PlusIcon from "../../assets/icons/PlusIcon";
import TickIcon from "../../assets/icons/TickIcon";
import ProfilePicPicker from "../../utils/ProfilePicPicker";

const EditProfileScreen = ({ navigation, route }: any) => {
     const dispatch = useDispatch();
    const [activity, setActivity] = useState<boolean>(false);
    const [showDatePickerModal, setShowDatePickerModal] = useState(false);
    const [showTimePickerModal, setShowTimePickerModal] = useState(false);
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [gender, setGender] = useState("Male");
    const [showGenderOptions, setShowGenderOptions] = useState(false);
    const [date, setDate] = useState(new Date(2005, 3, 8));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [dontKnowTime, setDontKnowTime] = useState(false);
    const [location, setLocation] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [languages, setLanguages] = useState<string[]>([]);
    const [pickerVisible, setPickerVisible] = useState(false);

    useEffect(() => {
        setName(ServiceConstants.User_NAME || "User");
        getUserDetailsApi();
    }, []);
    const getUserDetailsApi = () => {
      setActivity(false)
      getUserDetails().then(response => {
        setActivity(false)
        console.log("User Details Response:", response);
        const result = JSON.parse(response);
        ServiceConstants.User_NAME = result.data.name;
        setName(result.data.name);
        setGender(result.data.gender || "Male");
        if(result.data.dob){
            const dob = new Date(result.data.dob);
            setDate(dob);
        }
        if(result.data.birthTime){
            const [hh, mm, ss] = result.data.birthTime.split(":").map(Number);
            const date = new Date(); // today
            date.setHours(hh, mm, ss || 0, 0);
            setTime(date);
        }
        setLocation(result.data.birthPlace || '');
        setCurrentAddress(result.data.currentAddress || '');
        setPincode(result.data.pincode || '');
        setCurrentLocation(result.data.city || '');
        setProfilePic(result.data.profile || '');
        setLanguages(result.data.language || []);
        dispatch(setUserDetails(result.data));
      });
    }
    const toggleLanguage = (lang: string) => {
        setLanguages(prev =>
            prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
        );
    };
    const onUpdate = () => {
          // VALIDATION for name
        if (!name || name.trim() === "") {
            Alert.alert("Enter your name");
            return; // stop execution
        }
      
        setActivity(true);
            const data = {
                name: name,
                gender: gender,
                birthTime: dontKnowTime ? "" : time.toTimeString().split(' ')[0],
                birthPlace: location,
                currentAddress: currentAddress,
                city: currentLocation,
                pincode: pincode,
                // dob: date.toISOString().split('T')[0],
                dob:date.toDateString(),
                languages: languages,
              };
              updateProfileAction(data).then(response => {
                setActivity(false);
                const result = JSON.parse(response);
                  dispatch(setUserDetails({ name: name }));
                if (result.success == true){
                    Alert.alert(
                        "Updated Successfully",
                        "Your profile details have been updated.",
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    navigation.goBack();
                                }
                            }
                        ],
                        { cancelable: false }
                    );
                }else if(result.success == false){
                CustomDialogManager2.show({
                    title: 'Alert',
                    message: result.message,
                    type:2,
                    buttons: [
                    {
                        text: 'Ok',
                        onPress: () => {
                        
                        },
                        style: 'default',
                    },
                    ],
                });
            }
            });

    };
    const openBirthPlaceScreen = () => {
        navigation.navigate("SearchPlaceScreen", {
            onSelect: (place: string) => {
                setLocation(place); // Update input
            },
        });
    };

        const openCurrentPlaceScreen = () => {
        navigation.navigate("SearchPlaceScreen", {
            onSelect: (place: string) => {
                setCurrentLocation(place); // Update input
            },
        });
    };
    const handleBack = () => {
        navigation.goBack();
    }
    
    const handleDontKnowTime = () => {
        console.log("Dont know time:", !dontKnowTime);
        if(!dontKnowTime)
        setTime(new Date('2000-01-01T12:00:00')); // Set to default time
        setDontKnowTime(!dontKnowTime)
    }

const renderProfilePic = () => {
//   if (!profilePic) return defaultImage;

  // if it's require local file
  if (typeof profilePic === 'number') {
    return profilePic; // because require returns a number ID
  }

  // if it's local device path
  const isLocal =
    profilePic.startsWith('file:') ||
    profilePic.startsWith('content:') ||
    profilePic.startsWith('ph:') ||
    profilePic.startsWith('assets-library:') ||
    profilePic.startsWith('data:image');

  if (isLocal) {
    return { uri: profilePic };
  }

  // remote URL
  return {
    uri: profilePic,
    priority: FastImage.priority.high,
    cache: FastImage.cacheControl.immutable,
  };
};

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, backgroundColor: "#F8F8E8" }}>
                    {/* Header */}
                    <View style={styles.header}>
                       
                        <Text style={styles.headerTitle}>Edit Profile</Text>
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                            <BackIcon size={16} onPress={handleBack} />
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', width: '100%', height: .4, backgroundColor: '#7B7B7B', bottom: 0 }}></View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>

                        <TouchableOpacity style={{ alignItems: "center", marginBottom: 20 }} onPress={()=>{
                            setPickerVisible(true);
                        }}>
                                <FastImage
                                    source={renderProfilePic()}
                                    style={styles.profileImg}
                                />
                                <Text style={styles.phone}>{ServiceConstants.User_PHONE ? `+91-${ServiceConstants.User_PHONE}` : ""}</Text>
                        </TouchableOpacity>
                        {/* Name field */}
                        <Text style={styles.inputLable}>Name*</Text>
                        <View style={styles.inputBox}>
                            <Feather name="user" size={18} color="#444" />
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                            />
                        </View>

                        {/* Gender field */}
                        <Text style={styles.inputLable}>Gender</Text>
                        <TouchableOpacity style={styles.inputBox} onPress={() => setShowGenderOptions(!showGenderOptions)}>
                            <Feather name="send" size={18} color="#444" />
                            <Text style={styles.fieldText}>{gender}</Text>
                            <Feather name="chevron-down" size={20} color="#444" style={{ marginLeft: "auto" }} />
                        </TouchableOpacity>

                        {showGenderOptions && (
                            <View style={styles.dropdown}>
                                {["Male", "Female"].map((item) => (
                                    <TouchableOpacity
                                        key={item}
                                        onPress={() => {
                                            setGender(item);
                                            setShowGenderOptions(false);
                                        }}
                                        style={styles.dropdownItem}
                                    >
                                        <Text style={styles.dropdownText}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        {/* Date field */}
                        <Text style={styles.inputLable}>Date of Birth</Text>
                        <TouchableOpacity style={styles.inputBox} onPress={() => {
                            if(Platform.OS === 'android')
                                setShowDatePicker(true);
                            else
                                setShowDatePickerModal(true);
                            }}>
                            <Feather name="calendar" size={18} color="#444" />
                            <Text style={styles.fieldText}>
                                {date.toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </Text>
                        </TouchableOpacity>

                        {/* Time field */}
                        <Text style={styles.inputLable}>Time of Birth</Text>
                        {(
                            
                            <TouchableOpacity style={styles.inputBox} onPress={() => {
                                    if(Platform.OS === 'android')
                                        setShowTimePicker(true);
                                    else
                                        setShowTimePickerModal(true);
                                    }}>
                                <Feather name="clock" size={18} color="#444" />
                                <Text style={styles.fieldText}>
                                    {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </Text>
                            </TouchableOpacity>
                        )}

                        {/* Checkbox */}
                        <View style={styles.checkboxRow}>

                            <TouchableOpacity onPress={() => handleDontKnowTime()}>
                                <Feather
                                    name={dontKnowTime ? "check-square" : "square"}
                                    size={22}
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
                        <Text style={styles.inputLable}>Place of Birth</Text>
                        <TouchableOpacity style={styles.inputBox} onPress={openBirthPlaceScreen}>
                            <Feather name="map-pin" size={18} color="#444" />
                            <Text style={styles.fieldText}>{location}</Text>
                        </TouchableOpacity>

                        {/* Current Address field */}
                        <Text style={styles.inputLable}>Current Address</Text>
                        <View style={styles.inputBox}>
                            <Feather name="home" size={18} color="#444" />
                            <TextInput
                                style={styles.input}
                                value={currentAddress}
                                onChangeText={setCurrentAddress}
                                placeholder="Enter your current address"
                            />
                        </View>

                        {/* Current Location */}
                        <Text style={styles.inputLable}>City, State, Country</Text>
                        <TouchableOpacity style={styles.inputBox} onPress={openCurrentPlaceScreen}>
                            <Feather name="map-pin" size={18} color="#444" />
                            <Text style={styles.fieldText}>{currentLocation}</Text>
                        </TouchableOpacity>

                        {/* Pincode field */}
                        <Text style={styles.inputLable}>Pincode</Text>
                        <View style={styles.inputBox}>
                            <Feather name="map" size={18} color="#444" />
                            <TextInput
                                style={styles.input}
                                value={pincode}
                                onChangeText={setPincode}
                                placeholder="Enter your area pincode"
                            />
                        </View>
                        {/* Language field */}
                  
                            <View style={styles.box}>
                            <Text style={styles.question}>Select all your languages</Text>
                            <View style={styles.langContainer}>
                                {['Gujarati', 'English', 'Hindi', 'Punjabi', 'Tamil', 'Kannada', 'Malayalam', 'Marathi', 'Urdu', 'Telugu'].map(l => {
                                     const selected = languages.includes(l);
                                    return(<TouchableOpacity
                                        key={l}
                                        style={[styles.langBtn, selected && styles.selectedLang]}
                                        onPress={() => toggleLanguage(l)}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                        <Text style={styles.langLabel}>{l}</Text>
                                        {selected ? (<TickIcon width={12} height={12} />
                                        ) : (
                                        <PlusIcon width={12} height={12} />
                                        )}
                                        </View>
                                    </TouchableOpacity>);
                                })}
                            </View>
                        </View>


                        {/* Update Button */}
                        <TouchableOpacity style={styles.updateBtn} onPress={onUpdate}>
                            <Text style={styles.updateText}>Update</Text>
                        </TouchableOpacity>

                    </ScrollView>

                    {/* DATE PICKER */}
                    <DatePicker
                        modal
                        mode="date"
                        open={showDatePicker}
                        date={date}
                        maximumDate={new Date()}
                        onConfirm={(date) => {
                            setShowDatePicker(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setShowDatePicker(false)
                        }}
                       theme="light"
                        />

                    {/* TIME PICKER */}
                    <DatePicker
                        modal
                        mode="time"
                        open={showTimePicker}
                        date={time}
                        onConfirm={(selectedTime) => {
                            setShowTimePicker(false)
                            setTime(selectedTime)
                            setDontKnowTime(!dontKnowTime)
                        }}
                        onCancel={() => {
                            setShowTimePicker(false)
                        }}
                        theme="light"
                    />

                </View>

                <DatePickerDialog
                    visible={showDatePickerModal}
                    onClose={() => setShowDatePickerModal(false)}
                    onApply={(dateData) => {
                        console.log("User date:", dateData);
                          console.log("ISO:", dateData.toISOString());
                            console.log("Formatted:", dateData.toLocaleDateString());
                        setDate(dateData);
                    }}
                    />

                <TimePickerDialog
                    visible={showTimePickerModal}
                    onClose={() => setShowTimePickerModal(false)}
                    onApply={(dateData) => {
                        console.log("User date:", dateData);
                        setTime(dateData);
                        setDontKnowTime(!dontKnowTime)
                    }}
                    />

                <ProfilePicPicker
                    visible={pickerVisible}
                    initialAvatar={profilePic}
                    onSelect={(item) => {
                        console.log("Selected profile pic:", item);
                        setProfilePic(item.src); // save selection
                        setPickerVisible(false);
                    }}
                    onClose={() => setPickerVisible(false)}
                    />

                <AppSpinner show={activity} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical:16,
        backgroundColor: "#FFF",
    },
    headerTitle: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "600",
        fontFamily:Fonts.Medium
    },

    profileImg: {
        marginTop:20,
        width: 110,
        height: 110,
        borderRadius: 55,
        borderColor:colors.primaryColor,
        backgroundColor: '#FFFAE6', 
        borderWidth:1
  },
    phone: {
    marginTop: 8,
    color: "#666",
    fontSize: 13,
    fontFamily:Fonts.Regular
  },
    inputLable: { 
        fontSize: 16, 
        marginBottom: 8,
        color:'gray', 
        fontFamily: Fonts.Medium 
    },
    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingHorizontal: 14,
        height: 55,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#eee",
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        fontFamily:Fonts.Medium
    },
    fieldText: {
        fontSize: 16,
        marginLeft: 10,
        color: "#333",
        fontFamily:Fonts.Medium
    },
    dropdown: {
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 15,
    },
    dropdownItem: {
        padding: 12,
    },
    dropdownText: {
        fontSize: 16,
        fontFamily:Fonts.Medium
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 15,
        color: "#000",
        fontFamily:Fonts.Medium
    },
    noteText: {
        fontSize: 13,
        color: "#888",
        marginBottom: 20,
        fontFamily:Fonts.Medium
    },

    box: { marginBottom: 30 },
    question: { 
        fontSize: 16, 
        fontWeight: '600',
        fontFamily:Fonts.Medium, 
        marginBottom: 15 ,
         color:'gray',
    },
    langContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    langBtn: {
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderWidth: 1, borderColor: colors.primaryColor, borderRadius: 20
    },
    selectedLang: { backgroundColor: colors.primaryColor },
    langLabel:{fontSize: 14,fontFamily:Fonts.Medium},
    updateBtn: {
        backgroundColor: colors.primaryColor,
        paddingVertical: 15,
        borderRadius: 40,
        marginTop: 10,
        alignItems: "center",
    },
    updateText: {
        fontSize: 16,
        fontWeight: "600",
        fontFamily: Fonts.Medium
    },

});
