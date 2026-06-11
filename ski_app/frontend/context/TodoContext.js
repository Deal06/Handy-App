import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  // Lade gespeicherte ToDos beim App-Start
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const saved = await AsyncStorage.getItem("todos");
        if (saved) {
          setTodos(JSON.parse(saved));
        }
      } catch (error) {
        console.log("Fehler beim Laden:", error);
      }
    };

    loadTodos();
  }, []);

  // Speichere ToDos jedes Mal, wenn sich etwas ändert
  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
      } catch (error) {
        console.log("Fehler beim Speichern:", error);
      }
    };

    saveTodos();
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}
