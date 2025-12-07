import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Switch,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DatePicker from "react-native-date-picker";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { colors, Fonts } from "../../styles";
import { BackIcon } from "../../assets/icons";

const EditKundliScreen = ({ navigation, route }: any) => {
    //   const navigation = useNavigation<any>();
    const { onSelect, item } = route.params;
    const [name, setName] = useState(item.name);
    const [gender, setGender] = useState("Female");
    const [showGenderOptions, setShowGenderOptions] = useState(false);

    const [date, setDate] = useState(new Date(2005, 3, 8));
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [dontKnowTime, setDontKnowTime] = useState(false);

    const [location, setLocation] = useState(item.location);
    interface KundliItem {
        id: string;
        name: string;
        date: string;
        location: string;
    }
    const onUpdate = () => {

        const updatedData: KundliItem = {
            id: item.id,
            name: name,
            date: date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }) + ', ' + time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            location: location,
        };

        Alert.alert(
            "Updated Successfully",
            "Your kundli details have been updated.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        onSelect(updatedData);
                        navigation.goBack();
                        console.log("OK Pressed");
                    }
                }
            ],
            { cancelable: false }
        );
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
                            <BackIcon size={16} onPress={handleBack} />
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
                        <TouchableOpacity style={styles.inputBox} onPress={() => setShowDatePicker(true)}>
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
                        {(
                            <TouchableOpacity style={styles.inputBox} onPress={() => setShowTimePicker(true)}>
                                <Feather name="clock" size={18} color="#444" />
                                <Text style={styles.fieldText}>
                                    {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
                    <DatePicker
                        modal
                        mode="date"
                        open={showDatePicker}
                        date={date}
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
                        date={date}
                        onConfirm={(selectedTime) => {
                            setShowTimePicker(false)
                            setTime(selectedTime)
                        }}
                        onCancel={() => {
                            setShowTimePicker(false)
                        }}
                        theme="light"
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
