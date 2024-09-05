'use client';
import { createContext, useContext, useState } from "react";

// Define a proper type for the userData state
interface UserDataType {
    name: string;
    id: string;
    recentfiles: string[];
}

// Define the AppContextType with proper types
interface AppContextType {
    userData: UserDataType;
    setuserData: (userData: UserDataType) => void;
}

// Set up the context with a proper default value for userData
const AppContext = createContext<AppContextType>({
    userData: {id:'', name: 'nitesh', recentfiles: [] }, 
    setuserData: () => { }
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
    // Define state for userData with the UserDataType structure
    const [userData, setuserData] = useState<UserDataType>({id:'', name: 'nitesh', recentfiles: [] });

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
