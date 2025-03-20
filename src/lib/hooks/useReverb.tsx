'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getEchoInstance } from "../websocket/config";

type ReverbContextType = {
    listen: (event: string, callback: Function) => void;
}

const ReverbContext = createContext<ReverbContextType | undefined>(undefined);

export const ReverbProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ReverbContext.Provider value={{ listen: () => { } }}>
            {children}
        </ReverbContext.Provider>
    );
}

export const useReverb = (channelName: string) => {
    const context = useContext(ReverbContext);
    if (!context) {
        throw new Error("useReverb must be used within a ReverbProvider");
    }

    const [channel, setChannel] = useState<any>(null);

    useEffect(() => {
        if (channelName) {
            const echo = getEchoInstance();
            if (echo) {
                setChannel(echo.channel(channelName));
            }
        }

        return () => {
            if (channel) {
                channel.stopListening();
            }
        }

    }, [channelName]);

    const listen = (event: string, callback: Function) => {
        if (channel) {
            channel.listen(event, callback);
        }
    };

    return { listen, channel };
};
