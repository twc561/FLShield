
'use client';

import { useState, useEffect, useCallback } from 'react';

type GeolocationState = {
  isLoading: boolean;
  position: GeolocationPosition | null;
  error: string | null;
  hasPermission: boolean;
};

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    isLoading: true,
    position: null,
    error: null,
    hasPermission: false,
  });

  const checkPermission = useCallback(async () => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: 'Geolocation is not supported by your browser.', isLoading: false }));
      return;
    }
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
      if (permissionStatus.state === 'granted') {
        setState(s => ({ ...s, hasPermission: true, isLoading: false }));
        // Automatically fetch location if permission is already granted
        fetchLocation();
      } else if (permissionStatus.state === 'prompt') {
         setState(s => ({ ...s, hasPermission: false, isLoading: false }));
      } else {
        setState(s => ({ ...s, hasPermission: false, error: 'Location access was denied. Please enable it in your browser settings.', isLoading: false }));
      }
      permissionStatus.onchange = () => {
        if(permissionStatus.state === 'granted') {
            setState(s => ({...s, hasPermission: true, error: null}));
            fetchLocation();
        } else {
            setState(s => ({...s, hasPermission: false, position: null, error: 'Location access was denied.'}));
        }
      };
    } catch {
        // Some browsers might not support permissions.query, fallback to direct request
        setState(s => ({ ...s, hasPermission: false, isLoading: false }));
    }
  }, []);

  const fetchLocation = () => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          isLoading: false,
          position,
          error: null,
          hasPermission: true,
        });
      },
      (error) => {
        setState({
          isLoading: false,
          position: null,
          error: `Error retrieving location: ${error.message}`,
          hasPermission: true, // Permission was granted but failed to get location
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };
  
  const requestPermission = () => {
      if (!navigator.geolocation) {
          setState(s => ({...s, error: "Geolocation not supported."}));
          return;
      }
      fetchLocation();
  };

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return { ...state, requestPermission };
}
