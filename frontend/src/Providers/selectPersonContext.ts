import { createContext,useContext,useState } from "react";

interface Person{
    name:String,
    id:String,
    online:Boolean,
}

interface PersonContext{
    person:Person,
    
}