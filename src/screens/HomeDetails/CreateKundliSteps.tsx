import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DatePicker from "react-native-date-picker";

import NameIcon from '../../assets/icons/NameIcon';
import GenderIcon from '../../assets/icons/GenderIcon';
import BirthdayIcon from '../../assets/icons/BirthdayIcon';
import TimeIcon from '../../assets/icons/TimeIcon';
import LocationIcon from '../../assets/icons/LocationIcon';
import { BackIcon } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { colors, Fonts } from '../../styles';
import MaleIcon from '../../assets/icons/MaleIcon';
import FemaleIcon from '../../assets/icons/FemaleIcon';
import YesGreenIcon from '../../assets/icons/YesGreenIcon';
import NoRedIcon from '../../assets/icons/NoRedIcon';
import SearchIcon from '../../assets/icons/SearchIcon';
import Checkbox from '../../utils/Checkbox';

const CreateKundliSteps = () => {
    const navigation = useNavigation<any>();
    const [step, setStep] = useState(1);

    // form states
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState<Date|null>(new Date());
    const [knowBirthTime, setKnowBirthTime] = useState<boolean | null>(null);
    const [birthTime, setBirthTime] = useState(new Date());
    const [dontKnow, setDontKnow] = useState(false);
    const [birthPlace, setBirthPlace] = useState('');
    
    const stepIcons: Record<number, any> = {
        1: NameIcon,
        2: GenderIcon,
        3: BirthdayIcon,
        4: TimeIcon,
        5: TimeIcon,
        6: LocationIcon,
    };

    const isNextEnabled = () => {
        switch (step) {
            case 1: return name.length > 0;
            case 2: return gender !== '';
            case 3: return !!birthDate;
            case 4: return knowBirthTime !== null;
            case 5: return knowBirthTime === false ? true : birthTime != null;
            case 6: return birthPlace !== '';
            default: return false;
        }
    };

    const goNext = () => {
        if (step < 6) {
            setStep(step + 1);
        }
        if(step===6){
            navigation.goBack();
            // Alert.alert('Info->Name:'+name+'\n Gender:'+gender+'\nDate:'+birthDate+'\nKnow BirthTime:'+knowBirthTime+'\nbirthTime:'+birthTime+'\nBirthPlace:'+birthPlace);
        }
    };
    const goBack = () => step > 1 && setStep(step - 1);
    const handleBack = () => {
        navigation.goBack();
    }
    const openBirthPlaceScreen = () => {
        navigation.navigate("SearchPlaceScreen", {
        onSelect: (place: string) => {
            setBirthPlace(place); 
        },
        });
    };
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
                                    { backgroundColor: isActive ? '#FBB917' : '#D6D6D6' }
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
                    {step === 4 && (
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
                    )}

                    {/* STEP 5 — BIRTH TIME */}
                    {step === 5 && knowBirthTime === true && (
                        <View style={styles.box}>
                            <Text style={styles.question}>Enter your birth time</Text>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <DatePicker
                                        date={birthTime}
                                        onDateChange={setBirthTime}
                                        mode="time"
                                        locale="en"
                                        theme="light"
                                        />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                                    <Checkbox
                                    value={dontKnow}
                                    onValueChange={setDontKnow}
                                    
                                    />
                                    <Text style={{ marginLeft: 10 }}>Don’t know my exact time of birth</Text>
                                </View>
                        </View>
                    )}

                    {/* STEP 6 — PLACE OF BIRTH */}
                    {step === 6 && (
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

                </ScrollView>

                {/* NEXT BUTTON */}
                <TouchableOpacity
                    style={[styles.nextBtn, { opacity: isNextEnabled() ? 1 : 0.4 }]}
                    disabled={!isNextEnabled()}
                    onPress={goNext}
                >
                    <Text style={styles.nextText}>{step === 6 ? "Submit" : "Next"}</Text>
                </TouchableOpacity>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default CreateKundliSteps;

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
    question: { fontSize: 18, fontWeight: '600',fontFamily:Fonts.SemiBold, marginBottom: 15 ,color:'#707070'},
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
        backgroundColor: colors.primaryColor,
        borderColor: colors.primaryColor, 
    },
    optionBtn: { flexDirection:'row',
        alignItems:'center',
        borderWidth: 1, 
        borderRadius: 16, 
        padding: 15, 
        marginVertical: 10,
        borderColor:'#C4C4C4' 
    },
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
