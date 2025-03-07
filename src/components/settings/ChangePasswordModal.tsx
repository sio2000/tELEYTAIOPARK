import React from 'react';
import { X, AlertCircle, Key } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useLanguageStore } from '../../store/languageStore';
import { translations } from '../../utils/translations';
import { supabase } from '../../lib/supabase';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PasswordAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'error';
}

function PasswordAlertModal({ isOpen, onClose, message, type }: PasswordAlertModalProps) {
  if (!isOpen) return null;

  // Function to convert markdown bold to spans
  const formatMessage = (text: string) => {
    return text.split('**').map((part, index) => 
      index % 2 === 1 ? (
        <span key={index} className="font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl transform transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full ${
            type === 'success' ? 'bg-green-100' : 'bg-red-100'
          } flex items-center justify-center`}>
            <Key className={`h-6 w-6 ${
              type === 'success' ? 'text-green-600' : 'text-red-600'
            }`} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {type === 'success' ? 'Επιτυχία!' : 'Σφάλμα'}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          {formatMessage(message)}
        </p>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md text-white transition-colors ${
              type === 'success' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const { language } = useLanguageStore();
  const t = translations[language];
  const [showAlert, setShowAlert] = React.useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setShowAlert({
        show: true,
        message: t.passwordsDontMatch,
        type: 'error'
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setShowAlert({
        show: true,
        message: t.passwordUpdated,
        type: 'success'
      });
      
      // Clear form after successful update
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Close modal after a delay
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error: any) {
      setShowAlert({
        show: true,
        message: error.message || t.errorOccurred,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{t.changePassword}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              {t.close}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.oldPassword}
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.newPassword}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.confirmPassword}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={loading || !oldPassword || !newPassword || !confirmPassword}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? '...' : t.updatePassword}
              </button>
            </div>
          </form>
        </div>
      </div>
      <PasswordAlertModal 
        isOpen={showAlert.show}
        onClose={() => setShowAlert(prev => ({ ...prev, show: false }))}
        message={showAlert.message}
        type={showAlert.type}
      />
    </>
  );
} 