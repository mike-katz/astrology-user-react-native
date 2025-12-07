import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DatePicker from "react-native-date-picker";

import NameIcon from '../../assets/icons/NameIcon';
import GenderIcon from '../../assets/icons/GenderIcon';
import BirthdayIcon from '../../assets/icons/BirthdayIcon';
import TimeIcon from '../../assets/icons/TimeIcon';
import LocationIcon from '../../assets/icons/LocationIcon';
import LanguageIcon from '../../assets/icons/LanguageIcon';
import { BackIcon } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import TickIcon from '../../assets/icons/TickIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import { colors, Fonts } from '../../styles';
import MaleIcon from '../../assets/icons/MaleIcon';
import FemaleIcon from '../../assets/icons/FemaleIcon';
import YesGreenIcon from '../../assets/icons/YesGreenIcon';
import NoRedIcon from '../../assets/icons/NoRedIcon';
import SearchIcon from '../../assets/icons/SearchIcon';
import Checkbox from '../../utils/Checkbox';
import { CustomDialogManager2 } from '../../utils/CustomDialog2';
import { setUserDetails } from '../../redux/slices/userDetailsSlice';
import { updateProfileAction } from '../../redux/actions/UserActions';
import { AppSpinner } from '../../utils/AppSpinner';
import { useDispatch } from 'react-redux';

const FreeChatSteps = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);

    // form states
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState<Date>(new Date());
    // const [knowBirthTime, setKnowBirthTime] = useState<boolean | null>(null);
    const [birthTime, setBirthTime] = useState(new Date());
    const [dontKnow, setDontKnow] = useState(false);
    const [birthPlace, setBirthPlace] = useState('');
    const [languages, setLanguages] = useState<string[]>([]);
    const [activity, setActivity] = useState<boolean>(false);

    
    const stepIcons: Record<number, any> = {
        1: NameIcon,
        2: GenderIcon,
        3: BirthdayIcon,
        // 4: TimeIcon,
        4: TimeIcon,
        5: LocationIcon,
        6: LanguageIcon,
    };

    const toggleLanguage = (lang: string) => {
        setLanguages(prev =>
            prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
        );
    };

    const isNextEnabled = () => {
        switch (step) {
            case 1: return name.length > 0;
            case 2: return gender !== '';
            case 3: return !!birthDate;
            // case 4: return knowBirthTime !== null;
            case 4: return birthTime != null;
            case 5: return birthPlace !== '';
            case 6: return languages.length > 0;
            default: return false;
        }
    };

    const goNext = () => {
        if (step < 6) {
            setStep(step + 1);
        }
        if(step===6){
            onSubmit();
            // const formattedDate = birthDate
            //     ? birthDate.toLocaleDateString("en-GB", {
            //                         day: "numeric",
            //                         month: "long",
            //                         year: "numeric",
            //                     })
            //     : '';
            // Alert.alert(
            //     'Info->Name:' + name +
            //     '\n Gender:' + gender +
            //     '\nDate:' + formattedDate +
            //     '\nKnow BirthTime:' + knowBirthTime +
            //     '\nbirthTime:' + birthTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
            //     '\nBirthPlace:' + birthPlace +
            //     '\nLanguage:' + languages
            // );
        }
    };
    const goBack = () => step > 1 && setStep(step - 1);
    const handleBack = () => {
        navigation.goBack();
    }

    const onSubmit = () => {  
        setActivity(true);
            const data = {
                name: name,
                gender: gender,
                birthTime: dontKnow ? "" : birthTime.toTimeString().split(' ')[0],
                birthPlace: birthPlace,
                // currentAddress: currentAddress,
                // city: currentLocation,
                // pincode: pincode,
                dob:birthDate.toDateString(),
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
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'MainTabs' }]
                                        });
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
            setBirthPlace(place); // Update input
        },
        });
    };
    const handleDontKnowTime = () => {
        console.log("Dont know time:", !dontKnow);
        if(!dontKnow)
        setBirthTime(new Date('2000-01-01T12:00:00')); // Set to default time
        setDontKnow(!dontKnow);
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn}>
                        <BackIcon size={16} onPress={handleBack} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Enter Your Details</Text>
                </View>

                <View style={styles.mainContainer}>

                {/* Progress Dots */}
                <View style={styles.progressContainer}>
                    {Object.keys(stepIcons).map((key) => {
                        const index = Number(key);
                        const isActive = index <= step;
                        const IconComponent = stepIcons[index];

                        return (
                            <TouchableOpacity
                                key={key}
                                onPress={() => isActive && setStep(index)}
                                disabled={!isActive}
                                style={[
                                    styles.dot,
                                    { backgroundColor: isActive ? colors.primaryColor : '#D6D6D6' }
                                ]}
                            >
                                {isActive && <IconComponent width={8} height={8} />}
                            </TouchableOpacity>
                        );
                    })}

                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* STEP 1 — NAME */}
                    {step === 1 && (
                        <View style={styles.box}>
                            <Text style={styles.question}>Hey there!{"\n"}What is your name?</Text>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="Your Name"
                                style={styles.input}
                            />
                        </View>
                    )}

                    {/* STEP 2 — GENDER */}
                    {step === 2 && (
                        <View style={styles.box}>
                            <Text style={styles.question}>What is your gender?</Text>
                            <View style={styles.row}>
                                <View style={{flex:1,alignItems:'center',marginTop:10,marginLeft:'5%'}}>
                                <TouchableOpacity
                                    style={[styles.genderBtn, gender === 'Male' && styles.selectedBtn]}
                                    onPress={() => setGender('Male')}
                                >
                                    <MaleIcon height={50} stroke={gender === 'Male' ? '#fff' : '#000'}/>
                                </TouchableOpacity>
                                <Text style={styles.genderText}>Male</Text>
                                </View>

                                <View style={{flex:1,alignItems:'center',marginTop:10,marginRight:'5%'}}>
                                <TouchableOpacity
                                    style={[styles.genderBtn, gender === 'Female' && styles.selectedBtn]}
                                    onPress={() => setGender('Female') }
                                >
                                    <FemaleIcon height={50} stroke={gender === 'Female' ? '#fff' : '#000'}/>
                                </TouchableOpacity>
                                 <Text style={styles.genderText}>Female</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* STEP 3 — BIRTH DATE */}
                    {step === 3 && (
                        <View style={styles.box}>
                            <Text style={styles.question}>Enter your birth date</Text>
                               {/* <DateTimePicker
                                    value={birthDate || new Date()}
                                    mode="date"
                                    display="inline"
                                    maximumDate={new Date()}  
                                    minimumDate={new Date(1900, 0, 1)}
                                    onChange={(event, selected) => {
                                    if (selected) setBirthDate(selected);
                                        
                                    }}
                                /> */}
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <DatePicker 
                                        mode="date"
                                        date={birthDate || new Date()} 
                                        onDateChange={setBirthDate}
                                        maximumDate={new Date()}
                                        locale="en" 
                                        theme="light"
                                        />
                                </View>
                        </View>
                    )}

                    {/* STEP 4 — KNOW BIRTH TIME? */}
                    {/* {step === 4 && (
                        <View style={styles.box}>
                            <Text style={styles.question}>Do you know your time of birth?</Text>

                            <TouchableOpacity
                                style={[styles.optionBtn, knowBirthTime === true && styles.selectedOption]}
                                onPress={() => setKnowBirthTime(true)}
                            >
                                <YesGreenIcon width={22} height={22}/><Text style={styles.optionText}>Yes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.optionBtn, knowBirthTime === false && styles.selectedOption]}
                                onPress={() => setKnowBirthTime(false)}
                            >
                                <NoRedIcon width={22} height={22}/><Text style={styles.optionText}>No</Text>
                            </TouchableOpacity>

                            <Text style={styles.note}>Note: Without time of birth, we can still achieve upto 80% accurate predictions</Text>
                        </View>
                    )} */}

                    {/* STEP 5 — BIRTH TIME */}
                    {step === 4 && (
                        <View style={styles.box}>
                            <Text style={styles.question}>Enter your birth time</Text>
                            {/* <TextInput
                                placeholder="HH:MM AM/PM"
                                value={birthTime}
                                style={styles.input}
                                onChangeText={setBirthTime}
                            /> */}
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <DatePicker
                                        date={birthTime}
                                        onDateChange={(selectedTime) => {
                                            setBirthTime(selectedTime); // <-- pass value
                                            setDontKnow(false);
                                        }}
                                        mode="time"
                                        locale="en"
                                        theme="light"
                                        />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                                    <Checkbox
                                    value={dontKnow}
                                    onValueChange={()=>handleDontKnowTime()}
                                    />
                                    <Text style={{ marginLeft: 10 }}>Don’t know my exact time of birth</Text>
                                </View>
                        </View>
                    )}

                    {/* STEP 6 — PLACE OF BIRTH */}
                    {step === 5 && (
                        <View style={styles.box}>
                            <Text style={styles.question}>Where were you born?</Text>
  
                               <TouchableOpacity style={styles.searchContainer} onPress={openBirthPlaceScreen}>
        
                                <TextInput
                                    placeholder="Search"
                                    placeholderTextColor="#888"
                                    style={styles.inputSearch}
                                    editable={false}        // <-- cannot type
                                    pointerEvents="none"    // <-- prevents blocking touch
                                    value={birthPlace}
                                    />
                                <SearchIcon width={20} height={20} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* STEP 8 — LANGUAGES */}
                    {step === 6 && (
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
                    )}
                </ScrollView>

                {/* NEXT BUTTON */}
                <TouchableOpacity
                    style={[styles.nextBtn, { opacity: isNextEnabled() ? 1 : 0.4 }]}
                    disabled={!isNextEnabled()}
                    onPress={goNext}
                >
                    <Text style={styles.nextText}>{step === 6 ? "Start chat with Astrologer" : "Next"}</Text>
                </TouchableOpacity>

                </View>

                <AppSpinner show={activity} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default FreeChatSteps;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff'},
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    backBtn: {
        width: 60,
        height: 40,
        justifyContent: "center",
        paddingLeft: 10,
    },
    title: { fontSize: 20, fontWeight: '500',fontFamily:Fonts.Medium, marginLeft: 10 },
    mainContainer:{paddingHorizontal:20},
    progressContainer: { flexDirection: 'row', marginBottom: 20,marginTop:10 },
    dot: { width: 18, height: 18, borderRadius: 9, marginRight: 8, justifyContent: 'center', alignItems: 'center' },
    box: { marginBottom: 30 },
    question: { fontSize: 18, 
        fontWeight: '600',
        fontFamily:Fonts.SemiBold, 
        marginBottom: 15 ,
        color:'#707070'
    },
    searchContainer: {
    // marginHorizontal: 15,
    marginTop: 10,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,

    // iOS glassy/light shadow
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12 ,fontSize:14},
    inputSearch: {
    flex: 1,
    // marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
    row: { flexDirection: 'row',alignItems:'center', gap: 20 },
    genderBtn: { 
        borderWidth: 1, 
        borderRadius: 100, 
        justifyContent:'center',
        alignItems: 'center', 
        width: 80,
        height:80,
        borderColor:colors.primaryColor
    },
    genderText: { marginTop:5,fontSize: 16,fontFamily:Fonts.Medium },
    selectedBtn: {     
        backgroundColor:colors.primaryColor,
        borderColor:colors.primaryColor, 
    },
    optionBtn: { flexDirection:'row',
        alignItems:'center',
        borderWidth: 1, 
        borderRadius: 16, 
        padding: 15, 
        marginVertical: 10,
        borderColor:'#C4C4C4'},
    optionText:{marginLeft:10,fontSize: 16,fontFamily:Fonts.Medium},
    selectedOption: { backgroundColor: colors.primaryColor },
    note: { color: '#888', marginTop: 10 },
    langContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    langBtn: {
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderWidth: 1, borderColor: colors.primaryColor, borderRadius: 20
    },
    selectedLang: { backgroundColor: colors.primaryColor },
    langLabel:{fontSize: 14,fontFamily:Fonts.Medium},
    nextBtn: {
        backgroundColor: colors.primaryColor,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
    },
    nextText: { fontSize: 16, color: '#000', fontWeight: '600',fontFamily:Fonts.SemiBold },
});
