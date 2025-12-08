// src/shared/hooks/useNetworkStatus.ts
import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useAppStore } from '../stores/useAppStore';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const online = !!state.isConnected;
      const reachable = state.isInternetReachable;
      
      setIsOnline(online);
      setIsInternetReachable(reachable);

      // Log network changes for debugging
      if (online !== isOnline) {
        console.log(`🌐 Network status: ${online ? 'ONLINE' : 'OFFLINE'}`);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isOnline]);

  return {
    isOnline,
    isInternetReachable: isInternetReachable === null ? true : isInternetReachable, // Default to true if null
    isFullyOnline: isOnline && (isInternetReachable === null ? true : isInternetReachable)
  };
};

// Simple hook for components that just need online status
export const useIsOnline = (): boolean => {
  const { isFullyOnline } = useNetworkStatus();
  return isFullyOnline;
};