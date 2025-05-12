import { useNotification } from '../../context/NotificationContext';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getToastClasses = (type: string) => {
    const baseClasses = "flex items-center p-4 mb-3 rounded-md shadow-md relative w-full max-w-sm";
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-50 border border-green-200`;
      case 'error':
        return `${baseClasses} bg-red-50 border border-red-200`;
      case 'warning':
        return `${baseClasses} bg-yellow-50 border border-yellow-200`;
      default:
        return `${baseClasses} bg-blue-50 border border-blue-200`;
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end space-y-2">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={getToastClasses(notification.type)}
        >
          <div className="mr-3">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{notification.message}</p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;