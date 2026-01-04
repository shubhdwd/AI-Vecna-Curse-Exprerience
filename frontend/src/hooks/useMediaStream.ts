import { useState, useCallback, useRef, useEffect } from 'react';

interface MediaStreamState {
  stream: MediaStream | null;
  error: string | null;
  isLoading: boolean;
}

export function useMediaStream() {
  const [state, setState] = useState<MediaStreamState>({
    stream: null,
    error: null,
    isLoading: false,
  });
  
  const streamRef = useRef<MediaStream | null>(null);

  const startStream = useCallback(async () => {
    setState({ stream: null, error: null, isLoading: true });

    try {
      // Check if mediaDevices is available
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera/microphone not supported in this browser');
      }

      // Check for secure context
      const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
      if (location.protocol !== 'https:' && !isLocalhost) {
        throw new Error('Camera/mic require HTTPS or localhost');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
        audio: true,
      });

      streamRef.current = stream;
      setState({ stream, error: null, isLoading: false });
      return stream;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to access camera/microphone';
      setState({ stream: null, error, isLoading: false });
      return null;
    }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setState({ stream: null, error: null, isLoading: false });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return {
    ...state,
    startStream,
    stopStream,
  };
}
