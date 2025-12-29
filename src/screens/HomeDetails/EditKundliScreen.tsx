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
import moment from "moment";
import { CustomDialogManager2 } from "../../utils/CustomDialog2";
import { decryptData, secretKey } from "../../services/requests";
import { editProfileAction } from "../../redux/actions/UserActions";
import { useDispatch } from "react-redux";
import { updateProfileListItem } from "../../redux/slices/profileListSlice";

const EditKundliScreen = ({ navigation, route }: any) => {
    const { onSelect, item } = route.params;
     const colorScheme = useColorScheme();
     const dispatch = useDispatch();
    const [name, setName] = useState(item.name);
    const [gender, setGender] = useState(item.gender.toUpperCase());
    const [showGenderOptions, setShowGenderOptions] = useState(false);
    const dateFormatted = moment(item.dob).format("DD MMM YY");
    const timeFormate = moment(item.birth_time,"HH:mm:ss").format("hh:mm A");
    const [date, setDate] = useState(dateFormatted);
    const [time, setTime] = useState(timeFormate);
    const [showDatePickerModal, setShowDatePickerModal] = useState(false);
    const [showTimePickerModal, setShowTimePickerModal] = useState(false);

    const [dontKnowTime, setDontKnowTime] = useState(false);

    const [location, setLocation] = useState(item.birth_place);
const validateForm = () => {
  if (!name || name.trim().length === 0) {
    
    CustomDialogManager2.show({
            title: 'Alert',
            message: "Please enter name",
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
    return false;
  }

  if (!gender) {
        CustomDialogManager2.show({
            title: 'Alert',
            message: "Please select gender",
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
    return false;
  }

  if (!date) {
        CustomDialogManager2.show({
        title: 'Alert',
        message: "Please select date of birth",
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
    return false;
  }

  if (!dontKnowTime && !time) {
            CustomDialogManager2.show({
        title: 'Alert',
        message: "Please select time of birth",
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
    return false;
  }

  if (!location || location.trim().length === 0) {
    CustomDialogManager2.show({
        title: 'Alert',
        message: "Please select birth place",
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
    return false;
  }

  return true;
};

    const onUpdate = () => {
        // ❌ Stop if validation fails
        if (!validateForm()) return;

        // ✅ Prepare payload (example)
        const payload = {
            profileId: item.id,
            name:name,
            gender: gender.toLowerCase(),
            dob: moment(date, "DD MMM YY").format("YYYY-MM-DD"),
            birthTime:moment(time, "hh:mm A").format("HH:mm:ss"),
            birthPlace: location,
        };
        console.log("Update payload:", payload);

        editProfileAction(payload).then(response => {
            const result = JSON.parse(response);
            if (result.success == true){
                console.log("Profile Edited ==="+JSON.stringify(result));

                      Alert.alert(
                                            "Profile Updated",
                                            result.message,
                                            [
                                            
                                            {
                                                text: "Ok",
                                                onPress: () => {
                
                                       navigation.goBack();
                                        dispatch(
                                            updateProfileListItem({
                                                id: item.id,
                                                changes: { name: payload.name,gender:payload.gender,birth_time:payload.birthTime,dob:payload.dob,birth_place:payload.birthPlace },
                                            })
                                            );
                                                },
                                            },
                                            ]
                                        );
                
                // CustomDialogManager2.show({
                //         title: 'Profile Updated',
                //         message: result.message,
                //         type:1,
                //         buttons: [
                //         {
                //             text: 'Ok',
                //             onPress: () => {
                //                 navigation.goBack();
                //                 dispatch(
                //                     updateProfileListItem({
                //                         id: item.id,
                //                         changes: { name: payload.name,gender:payload.gender,birth_time:payload.birthTime,dob:payload.dob,birth_place:payload.birthPlace },
                //                     })
                //                     );
                //             },
                //             style: 'default',
                //         },
                //         ],
                //     });
                }else if(result.success == false){
                    const result2 = decryptData(result.error,secretKey);
                    const result3 = JSON.parse(result2);
                        CustomDialogManager2.show({
                            title: 'Alert',
                            message: result3.message,
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
    const handleBack = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, backgroundColor: "#F8F8E8" }}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <BackIcon size={16} onPress={handleBack} tintColor={undefined} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Edit Kundli</Text>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>

                        {/* Name field */}
                        <View style={styles.inputBox}>
                            <Feather name="user" size={18} color="#444" />
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Name"
                                placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
                                cursorColor={colors.primaryColor}
                            />
                        </View>

                        {/* Gender field */}
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
                        <TouchableOpacity style={styles.inputBox} onPress={() => setShowDatePickerModal(true)}>
                            <Feather name="calendar" size={18} color="#444" />
                            <Text style={styles.fieldText}>
                                {date}
                            </Text>
                        </TouchableOpacity>

                        {/* Time field */}
                        {(
                            <TouchableOpacity style={styles.inputBox} onPress={() => setShowTimePickerModal(true)}>
                                <Feather name="clock" size={18} color="#444" />
                                <Text style={styles.fieldText}>
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        )}

                        {/* Checkbox */}
                        <View style={styles.checkboxRow}>

                            <TouchableOpacity onPress={() => setDontKnowTime(!dontKnowTime)}>
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
                        <TouchableOpacity style={styles.inputBox} onPress={openBirthPlaceScreen}>
                            <Feather name="map-pin" size={18} color="#444" />
                            <Text style={styles.fieldText}>{location}</Text>
                        </TouchableOpacity>

                        {/* Update Button */}
                        <TouchableOpacity style={styles.updateBtn} onPress={onUpdate}>
                            <Text style={styles.updateText}>Update</Text>
                        </TouchableOpacity>

                    </ScrollView>

                    {/* DATE PICKER */}
                    <DatePickerDialog
                        visible={showDatePickerModal}
                        onClose={() => setShowDatePickerModal(false)}
                        onApply={(date:any) => {
                            console.log("User date:", date);
                            const dateFormatted = moment(new Date(date)).format("DD MMM YY");
                            setDate(dateFormatted);
                        }}
                            />
                    {/* TIME PICKER */}
                    <TimePickerDialog
                        visible={showTimePickerModal}
                        onClose={() => setShowTimePickerModal(false)}
                        onApply={(time:any) => {
                            console.log("User time:", time);
                             const timeFormate = moment(new Date(time),"HH:mm:ss").format("hh:mm A");
                            setTime(timeFormate);
                            setDontKnowTime(false);
                        }}
                        />

                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default EditKundliScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 16,
        fontFamily:Fonts.Medium
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
