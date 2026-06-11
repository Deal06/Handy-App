import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import homeIcon from '../assets/homeIcon.png';
import challengeIcon from '../assets/challengeIcon.png';
import slvshIcon from '../assets/slvshIcon.png';
import communityIcon from '../assets/communityIcon.png';
import liveIcon from '../assets/liveIcon.png';
import bergbild from '../assets/bergbild.png';
import settingsIcon from '../assets/settingsIcon.png';

import ChallengeSettings from './ChallengeSettings';
import { getFilteredTrick } from '../api.js';

//Dafür sorgen das footer auch sichtbar ist wenn tricks angezeigt werden. Momentan nicht sichtbar

export default function Challenge() {

  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("challenge");

  const [settingsVisible, setSettingsVisible] = useState(false);

  const [settings, setSettings] = useState({

    minRotation: 0,

    maxRotation: 0,

    withUnnaty: false,

    withInverted: false,

  });

  const [currentTrick, setCurrentTrick] = useState(null);

  const fetchNextTrick = async () => {

    const trick = await getFilteredTrick(settings);

    if (trick) {
      setCurrentTrick(trick);
    } else {
      setCurrentTrick({name : 'Kein Trick mit diesen Einstellungen gefunden!'})
    }

  };

  return (

    <ImageBackground source={bergbild} style={styles.background} resizeMode="cover">

      <View style={styles.container}>

        <Text style={styles.title}>Learn. Land. Level up!</Text>

        <View style={styles.box}>

          <ScrollView>

            {currentTrick ? (
              <Text style={styles.boxText}>{currentTrick.name}</Text>
            ) : (
              <Text style={styles.boxText}>Welcome to the Challenge site. Go to the settings and choose the difficulty of tricks that you want to get!</Text>
            )}

          </ScrollView>

          <TouchableOpacity style={styles.settingsButton} onPress={() => setSettingsVisible(true)}>

            <Image source={settingsIcon} style={styles.settingsIcon} />

          </TouchableOpacity>

        </View>

        <View style={styles.buttons}>

          <TouchableOpacity style={styles.sendIt} onPress={fetchNextTrick}>

            <Text style={styles.sendItText}>Send it!</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.AddTodo} onPress={() => navigation.navigate("TrickToDo")}>

            <Text style={styles.AddTodoText}>Todo-List</Text>

          </TouchableOpacity>

        </View>

        {currentTrick && (

          <View style={styles.trickContainer}>

            <Text style={styles.trickText}>Trick geschafft?</Text>

            <View style={styles.nextButtons}>

              <TouchableOpacity onPress={fetchNextTrick} style={styles.nextButton}>

                <Text style={styles.nextButtonText}>✔</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={fetchNextTrick} style={styles.nextButton}>

                <Text style={styles.nextButtonText}>✖</Text>

              </TouchableOpacity>

            </View>

          </View>

        )}

        {/* FOOTER */}

        <View style={styles.footer}>

          <TouchableOpacity style={styles.footerItem} onPress={() => { setActiveTab("home"); navigation.navigate("TrickToDo"); }}>

            <View style={[styles.activeCircle, activeTab === "home" && styles.activeCircleShown]} />

            <Image source={homeIcon} style={styles.footerIcon}/>

            <Text style={[styles.footerText, activeTab === "home" && styles.footerTextActive]}>Home</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem} onPress={() => { setActiveTab("challenge"); navigation.navigate("Challenge"); }}>

            <View style={[styles.activeCircle, activeTab === "challenge" && styles.activeCircleShown]} />

            <Image source={challengeIcon} style={styles.challengeIcon}/>

            <Text style={[styles.footerText, activeTab === "challenge" && styles.footerTextActive]}>Challenge</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem} onPress={() => setActiveTab("slvsh")}>

            <View style={[styles.activeCircle, activeTab === "slvsh" && styles.activeCircleShown]} />

            <Image source={slvshIcon} style={styles.slvshIcon}/>

            <Text style={[styles.footerText, activeTab === "slvsh" && styles.footerTextActive]}>SLVSH</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem} onPress={() => setActiveTab("friends")}>

            <View style={[styles.activeCircle, activeTab === "friends" && styles.activeCircleShown]} />

            <Image source={communityIcon} style={styles.footerIcon}/>

            <Text style={[styles.footerText, activeTab === "friends" && styles.footerTextActive]}>Friends</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem} onPress={() => setActiveTab("live")}>

            <View style={[styles.activeCircle, activeTab === "live" && styles.activeCircleShown]} />

            <Image source={liveIcon} style={styles.footerIcon}/>

            <Text style={[styles.footerText, activeTab === "live" && styles.footerTextActive]}>Live Info</Text>

          </TouchableOpacity>

        </View>

        {settingsVisible && (

          <View style={styles.overlay}>

            <View style={styles.bottomSheet}>

              <ChallengeSettings

                close={() => setSettingsVisible(false)}

                onApply={(newSettings) => setSettings(newSettings)}

              />

            </View>

          </View>

        )}

      </View>

    </ImageBackground>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: 'transparent',

    padding: 20,

  },

  background: {

    flex: 1,

    width: '100%',

    height: '100%',

  },

  title: {

    fontSize: 24,

    fontWeight: 'bold',

    marginBottom: 10,

    marginTop: 50,

    color: 'black',

    textAlign: 'center',

    backgroundColor: 'rgba(0,0,255,0.7)',

    height: 100,

    borderWidth: 2,

    borderColor: 'black',

    borderRadius: 10,

    paddingTop: 30,

  },

  box: {

    borderWidth: 2,

    borderColor: 'black',

    borderRadius: 10,

    padding: 15,

    backgroundColor: 'rgba(128,128,128,0.7)',

    height: 400,

    boxShadow: '0px 4px 10px black',

  },

  boxText: {

    fontSize: 24,

    textAlign: 'center',

    paddingTop: 100,

  },

  settingsButton: {

    position: 'absolute',

    right: 8,

    top: 8,

    padding: 5,

  },

  settingsIcon: {

    width: 50,

    height: 50,

  },

  buttons: {

    alignItems: 'center',

    justifyContent: 'space-around',

    flexDirection: 'row',

    marginTop: 20,

  },

  sendIt: {

    backgroundColor: 'blue',

    height: 70,

    width: 130,

    borderColor: 'black',

    borderRadius: 10,

    borderWidth: 2,

  },

  sendItText: {

    textAlign: 'center',

    paddingTop: 12,

    color: 'white',

    fontSize: 24,

  },

  AddTodo: {

    backgroundColor: 'gold',

    height: 70,

    width: 150,

    borderColor: 'black',

    borderRadius: 10,

    borderWidth: 2,

  },

  AddTodoText: {

    textAlign: 'center',

    paddingTop: 12,

    color: 'black',

    fontSize: 24,

  },

  trickContainer: {

    marginTop: 20,

    padding: 15,

    backgroundColor: 'rgba(255,255,255,0.7)',

    borderRadius: 10,

  },

  trickText: {

    fontSize: 22,

    textAlign: 'center',

    marginBottom: 15,

  },

  nextButtons: {

    flexDirection: 'row',

    justifyContent: 'space-around',

  },

  nextButton: {

    backgroundColor: 'blue',

    padding: 10,

    borderRadius: 5,

    width: 50,

    alignItems: 'center',

  },

  nextButtonText: {

    color: 'white',

    fontSize: 24,

  },

  /* FOOTER */

  footer: {

    backgroundColor: 'rgba(0,0,255,0.7)',

    marginTop: 30,

    height: 100,

    flexDirection: 'row',

    justifyContent: 'space-around',

    alignItems: 'center',

    borderWidth: 2,

    borderColor: 'black',

    borderRadius: 10,

  },

  footerItem: {

    alignItems: 'center',

    justifyContent: 'center',

    width: 70,

  },

  footerIcon: {

    height: 30,

    width: 30,

  },

  challengeIcon: {

    height: 30,

    width: 50,

  },

  slvshIcon: {

    height: 30,

    width: 50,

  },

  footerText: {

    marginTop: 4,

    color: 'black',

    fontSize: 12,

    textAlign: 'center',

  },

  footerTextActive: {

    color: 'black',

    fontWeight: 'bold',

  },

  activeCircle: {

    position: "absolute",

    top: -5,

    width: 45,

    height: 40,

    borderRadius: 20,

    backgroundColor: "transparent",

  },

  activeCircleShown: {

    backgroundColor: "#4EC3FF",

  },

  overlay: {

    position: "absolute",

    top: 0,

    left: 0,

    right: 0,

    bottom: 0,

    justifyContent: "flex-end",

    backgroundColor: "rgba(0,0,0,0.3)",

  },

  bottomSheet: {

    height: "50%",

    backgroundColor: "gray",

    borderTopLeftRadius: 20,

    borderTopRightRadius: 20,

    borderWidth: 2,

    borderColor: "black",

    padding: 20,

  },

});
