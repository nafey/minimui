import { useState, useEffect, useRef } from "react";
import { CircleCheck, CircleX } from "lucide-react";

const Toast = ({ message, type = "info", duration = 1500, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef(null);

  // Set toast background color based on type
  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  const startTimer = () => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, duration);
  };

  useEffect(() => {
    startTimer();

    // Clear timeout on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    // Clear the timeout when mouse enters
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    // Restart the timeout when mouse leaves
    startTimer();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 py-2 px-4 rounded-lg shadow-lg text-white text-sm transition-opacity duration-500 bg-neutral-800`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="mr-8">{message}</div>
        {type === "success" ? (
          <CircleCheck size={18} color="green" />
        ) : (
          <CircleX size={18} color="red" />
        )}
      </div>
    </div>
  );
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <>
      <div className="fixed top-4 right-4 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Example buttons to trigger toasts */}
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => addToast("Info message")}
        >
          Info Toast
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => addToast("Success message", "success")}
        >
          Success Toast
        </button>
      </div>
    </>
  );
};

export { Toast, ToastContainer };
