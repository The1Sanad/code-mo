import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  type: NotificationType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function Notification({
  type,
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 5000,
}: NotificationProps) {
  useEffect(() => {
    let timer: number;
    
    if (isVisible && autoClose) {
      timer = window.setTimeout(() => {
        onClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = (): string => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500 text-green-400';
      case 'error':
        return 'bg-red-500/10 border-red-500 text-red-400';
      case 'info':
        return 'bg-blue-500/10 border-blue-500 text-blue-400';
      default:
        return 'bg-gray-500/10 border-gray-500 text-gray-400';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md animate-slide-in-right">
      <div className={`flex items-center p-4 rounded-lg border ${getTypeStyles()} shadow-lg`}>
        <div className="mr-3">
          {getIcon()}
        </div>
        <div className="flex-1 mr-2">
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-700/50 transition"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Add animation to index.css
// @keyframes slide-in-right {
//   from {
//     transform: translateX(100%);
//     opacity: 0;
//   }
//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// }
// 
// .animate-slide-in-right {
//   animation: slide-in-right 0.3s ease-out forwards;
// }