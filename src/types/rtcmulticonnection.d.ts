// rtcmulticonnection.d.ts

declare module 'rtcmulticonnection' {
    class RTCMultiConnection {
      constructor();
  
      // Add methods and properties based on your usage
      socketURL: string;
      socketMessageEvent: string;
      session: {
        audio: boolean;
        video: boolean;
        oneway: boolean;
      };
      sessionid:string;
      isInitiator:boolean;

      sdpConstraints: {
        mandatory: {
          OfferToReceiveAudio: boolean;
          OfferToReceiveVideo: boolean;
        };
      };
      iceServers: Array<{
        urls: string;
        username?: string;
        credential?: string;
      }>;
  
      videosContainer: HTMLElement;
  
      join(roomId: string, callback?: () => void): void;
      onstream: (event: any) => void;
      onstreamended: (event: any) => void;
      onMediaError: (e: any) => void;
  
      // Add more methods and properties as needed
  
      // Note: The types for the methods and properties should match the actual implementation
    }
  
    export = RTCMultiConnection;
  }
  