import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { api } from "../api/api";

interface Person {
    id: string,
    name: string,
    isOnline: boolean,
    lastMessage:string,
    Dp: string,
    chatId:string,
}

interface PersonContext {
    person: Person | null,
    setPerson: React.Dispatch<React.SetStateAction<Person | null>>,
    expanded: boolean,
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    chatId: string | null
}
//create a context
const PersonContext = createContext<PersonContext | undefined>(undefined);


//create a provider
export const PersonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [person, setPerson] = useState<Person | null>(null);
    const [chatId, setChatId] = useState<string | null>(null)
    const [expanded, setExpanded] = useState(true);
    const context = useAuth();

    const genChatId = async () => {
        if (person) {
            setChatId(person.chatId);
        } else {
            setChatId(null)
        }
    }

    useEffect(() => {
        genChatId();
    }, [person])
    return (
        <PersonContext.Provider value={{ person, setPerson, expanded, setExpanded, chatId }}>
            {children}
        </PersonContext.Provider>
    )

}

//create  a custom hook

export const usePerson = () => {
    const context = useContext(PersonContext);
    if (context) return context;
    return null;
}
