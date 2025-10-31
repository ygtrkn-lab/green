'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function NotificationPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if notifications are already granted or denied
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        // Only show prompt if permission hasn't been granted or denied
        const timer = setTimeout(() => setShow(true), 3000); // Show after 3 seconds
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleRequestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Create a larger icon for the notification
        const canvas = document.createElement('canvas');
        canvas.width = 192;
        canvas.height = 192;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Create a green background
          ctx.fillStyle = '#8DC63F';
          ctx.fillRect(0, 0, 192, 192);
          
          // Add GREEN text
          ctx.fillStyle = 'white';
          ctx.font = 'bold 48px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('GREEN', 96, 80);
          ctx.font = 'bold 24px Arial';
          ctx.fillText('PC', 96, 120);
          
          const iconUrl = canvas.toDataURL();
          
          new Notification('GREEN Bildirimler', {
            body: 'Kampanyalardan haberdar olacaksınız!',
            icon: iconUrl
          });
        } else {
          // Fallback to static logo if canvas context is not available
          new Notification('GREEN Bildirimler', {
            body: 'Kampanyalardan haberdar olacaksınız!',
            icon: '/images/kurumsal-logo/green-logo.svg'
          });
        }
      }
      setShow(false);
    } catch (error) {
      console.error('Notification permission error:', error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-xl shadow-lg p-4 animate-float z-50">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-16 h-16 relative">
          <Image
            src="/images/kurumsal-logo/green-logo.svg"
            alt="GREEN Logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-medium mb-2">
            Kampanyalardan haberdar olmak için bildirimleri açın.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => setShow(false)}
              className="flex-1 px-4 py-2 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Daha Sonra
            </button>
            <button
              onClick={handleRequestPermission}
              className="flex-1 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors gaming-btn"
            >
              Bildirimleri Aç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
