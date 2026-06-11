import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image, ImageBackground, Animated } from 'react-native';
import CheckBox from 'expo-checkbox';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import homeIcon from '../assets/homeIcon.png';
import challengeIcon from '../assets/challengeIcon.png';
import slvshIcon from '../assets/slvshIcon.png';
import communityIcon from '../assets/communityIcon.png';
import liveIcon from '../assets/liveIcon.png';
import bergbild from '../assets/bergbild.png';

export default function TrickToDo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const swipeRefs = useRef({});
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("home");

  const texte = [
    "Ready to send it today?",
    "New Day, new tricks!",
    "Powday = no fall damage",
    "Push your limits today",
    "Go big or go home"
  ];
  const [index, setIndex] = useState(0);

  // ---------- ROTATING TEXT ----------
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % texte.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ---------- LOAD TODOS ----------
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const saved = await AsyncStorage.getItem("todos");
        if (saved) {
          setTodos(JSON.parse(saved));
        }
      } catch (e) {
        console.log("Error loading todos:", e);
      }
    };
    loadTodos();
  }, []);

  // ---------- SAVE TODOS ----------
  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
      } catch (e) {
        console.log("Error saving todos:", e);
      }
    };
    save();
  }, [todos]);

  // ---------- ADD TODO ----------
  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const newItem = { name: newTodo, done: false };
    setTodos([...todos, newItem]);
    setNewTodo("");
  };

  const toggleDone = (index) => {
    const updated = [...todos];
    updated[index].done = !updated[index].done;
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);

    const ref = swipeRefs.current[index];
    if (ref?.close) ref.close();
  };

  const renderRightActions = (progress, dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTodo(index)}>
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>Löschen</Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground source={bergbild} style={styles.background} resizeMode='cover'>
        <View style={styles.container}>

          <Text style={styles.title}>{texte[index]}</Text>

          <View style={styles.box}>
            <TextInput
              placeholder="Add a new trick"
              value={newTodo}
              onChangeText={setNewTodo}
              style={styles.input}
              placeholderTextColor='black'
              maxLength={20}
            />

            <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
              <Text style={styles.buttonText}>Add to my list</Text>
            </TouchableOpacity>

            <ScrollView style={styles.list}>
              {todos.length === 0 ? (
                <Text>No tricks yet</Text>
              ) : (
                todos.map((todo, idx) => (
                  <Swipeable
                    key={idx}
                    ref={ref => swipeRefs.current[idx] = ref}
                    renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, idx)}
                  >
                    <View style={styles.todoItem}>
                      <CheckBox
                        value={todo.done}
                        onValueChange={() => toggleDone(idx)}
                        color={todo.done ? "green" : "black"}
                      />
                      <Text style={[styles.todoText, todo.done && styles.done]}>{todo.name}</Text>
                    </View>
                  </Swipeable>
                ))
              )}
            </ScrollView>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>

            <TouchableOpacity
              style={styles.footerItem}
              onPress={() => {
                setActiveTab("home");
                navigation.navigate("TrickVorgabe");
              }}
            >
              <View style={[styles.activeCircle, activeTab === "home" && styles.activeCircleShown]} />
              <Image source={homeIcon} style={styles.footerIcon}/>
              <Text style={[styles.footerText, activeTab === "home" && styles.footerTextActive]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerItem}
              onPress={() => {
                setActiveTab("challenge");
                navigation.navigate("Challenge");
              }}
            >
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
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    backgroundColor: 'transparent', 
    padding: 20, 
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
    paddingTop: 28,
  },

  box: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    height: 500,

    // REAL RN SHADOW
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },

  input: { 
    borderWidth: 1, 
    borderColor: 'black', 
    padding: 10, 
    marginVertical: 10, 
    borderRadius: 5, 
    color: 'black' 
  },

  list: { 
    marginTop: 10 
  },

  todoItem: { 
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  todoText: { 
    marginLeft: 10,
    fontSize: 18 
  },

  done: { 
    textDecorationLine: 'line-through', 
    color: 'gray' 
  },

  button: {
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 10,
    width: 200,
    alignSelf: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  footer: {
    backgroundColor: 'rgba(0,0,255,0.7)',
    marginTop: 20,
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

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 5,
  },

  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
