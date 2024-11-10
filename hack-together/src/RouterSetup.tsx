import { Routes, Route, useParams } from 'react-router-dom';
import SessionManager from './SessionManager';
import CanvasApp from './CanvasApp';
import { ReactTogether } from 'react-together';
import React from 'react';

interface RoomSessionWrapperProps {
  children: React.ReactNode;
}

function RoomSessionWrapper({ children }: RoomSessionWrapperProps) {
  const { roomId } = useParams();
  
  return (
    <ReactTogether
      sessionParams={{
        appId: "dev.reacttogether.hacktogetherapp",
        apiKey: "2F0ycxv7oTQKzT9TFUcIgydcSdMacginczP0KSlc7o",
        name: roomId || 'default',
        password: 'shared-session-password'
      }}
    >
      {children}
    </ReactTogether>
  );
}

function RouterSetup() {
  return (
    <Routes>
      <Route path="/" element={<SessionManager />} />
      <Route
        path="/room/:roomId"
        element={
          <RoomSessionWrapper>
            <CanvasApp />
          </RoomSessionWrapper>
        }
      />
    </Routes>
  );
}

export default RouterSetup;
