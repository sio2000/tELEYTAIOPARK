import React from 'react';
import { X, AlertCircle, Bell, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLanguageStore } from '../store/languageStore';
import { translations } from '../utils/translations';
import { ChangePasswordModal } from './settings/ChangePasswordModal';
import { supabase } from '../lib/supabase';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { useNavigate } from 'react-router-dom';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PremiumAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

interface NotificationAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'error';
}

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function PremiumAlertModal({ isOpen, onClose, onUpgrade }: PremiumAlertModalProps) {
  const { language } = useLanguageStore();
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl transform transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t.premiumFeatureAlert}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          {t.premiumFeatureMessage}
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={onUpgrade}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t.upgradeToPremium}
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationAlertModal({ isOpen, onClose, message, type }: NotificationAlertModalProps) {
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
            <Bell className={`h-6 w-6 ${
              type === 'success' ? 'text-green-600' : 'text-red-600'
            }`} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {type === 'success' ? 'Επιτυχία!' : 'Προσοχή!'}
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
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteAccountModal({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

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
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t.deleteAccountTitle}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          {formatMessage(t.deleteConfirm)}
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isDeleting ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              t.confirmDelete
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AccountSettingsModal({ isOpen, onClose }: AccountSettingsModalProps) {
  const { user, setUser } = useAuthStore();
  const { language } = useLanguageStore();
  const t = translations[language];
  const navigate = useNavigate();
  const { status } = useSubscriptionStore();
  const [name, setName] = React.useState(user?.user_metadata?.name || '');
  const [loading, setLoading] = React.useState(false);
  const [notifications, setNotifications] = React.useState({
    nearbySpots: false
  });
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPremiumAlert, setShowPremiumAlert] = React.useState(false);
  const [notificationAlert, setNotificationAlert] = React.useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');

      const { data, error: updateError } = await supabase.auth.updateUser({
        data: { name: name }
      });

      if (updateError) throw updateError;

      if (data.user) {
        setUser(data.user);
        setSuccessMessage('Οι αλλαγές αποθηκεύτηκαν με επιτυχία!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Παρουσιάστηκε σφάλμα κατά την αποθήκευση των αλλαγών');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handlePasswordChange = () => {
    setShowPasswordModal(true);
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      
      // First delete user's data from all related tables
      const { error: deleteSpots } = await supabase
        .from('parking_spots')
        .delete()
        .eq('user_id', user?.id);
      
      if (deleteSpots) throw deleteSpots;

      // Delete from profiles table
      const { error: deleteProfile } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user?.id);
      
      if (deleteProfile) throw deleteProfile;

      // Delete the user from auth.users
      const { error: deleteUser } = await supabase.rpc('delete_user');
      if (deleteUser) throw deleteUser;

      // Finally sign out
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      navigate('/login');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      setNotificationAlert({
        show: true,
        message: t.errorOccurred,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationToggle = async () => {
    if (!notifications.nearbySpots) {
      if (status !== 'premium') {
        setShowPremiumAlert(true);
        return;
      }

      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotifications(prev => ({ ...prev, nearbySpots: true }));
          setNotificationAlert({
            show: true,
            message: t.notificationsEnabled,
            type: 'success'
          });
        } else {
          setNotificationAlert({
            show: true,
            message: t.allowNotifications,
            type: 'error'
          });
        }
      } catch (error) {
        setNotificationAlert({
          show: true,
          message: t.errorOccurred,
          type: 'error'
        });
      }
    } else {
      setNotifications(prev => ({ ...prev, nearbySpots: false }));
      setNotificationAlert({
        show: true,
        message: t.notificationsDisabled,
        type: 'success'
      });
    }
  };

  const handleUpgrade = () => {
    setShowPremiumAlert(false);
    onClose();
    navigate('/pricing');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center overflow-auto">
        <div className="bg-white rounded-lg w-full max-w-md p-6 m-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{t.accountSettings}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.name}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.email}
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>

            <button
              onClick={handleSaveChanges}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                t.saveChanges
              )}
            </button>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">{t.notificationSettings}</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-700">{t.nearbyNotifications}</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={notifications.nearbySpots}
                      onChange={handleNotificationToggle}
                    />
                    <div
                      className={`block w-14 h-8 rounded-full transition-colors ${
                        notifications.nearbySpots ? 'bg-blue-600' : 'bg-gray-300'
                      } ${status !== 'premium' ? 'opacity-50' : ''}`}
                    />
                    <div
                      className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                        notifications.nearbySpots ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </label>
                {status !== 'premium' && (
                  <p className="text-xs text-gray-500 italic">
                    {t.premiumOnlyFeature}
                  </p>
                )}
              </div>
            </div>

            <button
              className="w-full border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50"
              onClick={handlePasswordChange}
            >
              {t.changePassword}
            </button>

            <button
              className="w-full border border-red-600 text-red-600 py-2 rounded-md hover:bg-red-50"
              onClick={() => setShowDeleteConfirm(true)}
            >
              {t.deleteAccount}
            </button>
          </div>
        </div>
      </div>
      <PremiumAlertModal 
        isOpen={showPremiumAlert}
        onClose={() => setShowPremiumAlert(false)}
        onUpgrade={handleUpgrade}
      />
      <NotificationAlertModal 
        isOpen={notificationAlert.show}
        onClose={() => setNotificationAlert(prev => ({ ...prev, show: false }))}
        message={notificationAlert.message}
        type={notificationAlert.type}
      />
      <ChangePasswordModal 
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
      <DeleteAccountModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
} 