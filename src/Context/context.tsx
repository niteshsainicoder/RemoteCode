'use client';
import { createContext, useContext, useState } from "react";

// Define a proper type for the userData state

interface FileData {
    codeContent: string,
    language: string,
    title: string,
    _id: string
  }

interface UserDataType {
    name: string;
    id: string;
    recentfiles: FileData[];
    currentfile: FileData | null ;
}

// Define the AppContextType with proper types
interface AppContextType {
    userData: UserDataType;
    setuserData: (userData: UserDataType) => void;
}

// Set up the context with a proper default value for userData
const AppContext = createContext<AppContextType>({
    userData: {id:'', name: '', recentfiles: [],currentfile: null}, 
    setuserData: () => { }
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
    // Define state for userData with the UserDataType structure
    const [userData, setuserData] = useState<UserDataType>({id:'', name: '', recentfiles: [],currentfile: null});

    return (
        <AppContext.Provider value={{ userData, setuserData }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    // Make sure to return the context value
    return useContext(AppContext);
}
