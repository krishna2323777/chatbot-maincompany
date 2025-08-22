import React, { useState } from 'react';
import { DirectChatInterface } from './components/DirectChatInterface';
export function App() {
  return <div className="h-screen w-full bg-gray-50">
      <DirectChatInterface />
    </div>;
}