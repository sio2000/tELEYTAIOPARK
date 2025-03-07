import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';
import { useLanguageStore } from '../../store/languageStore';
import { translations } from '../../utils/translations';
import { Link, useNavigate } from 'react-router-dom';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
        <div className="prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Όροι και Προϋποθέσεις Χρήσης  e-Parking</h2>
          <p className="text-gray-500 italic">Τελευταία Ενημέρωση: Μάρτιος 2024</p>

          <div className="mt-6 space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-900">Εισαγωγή</h3>
              <p className="mt-2 text-gray-600">
                Καλώς ήρθατε στο e-Parking. Διαβάστε προσεκτικά τους παρακάτω όρους πριν χρησιμοποιήσετε την εφαρμογή μας.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">Αποδοχή Όρων</h3>
              <p className="mt-2 text-gray-600">
                Χρησιμοποιώντας την εφαρμογή e-Parking, αποδέχεστε αυτούς τους όρους χρήσης. Εάν διαφωνείτε με οποιονδήποτε από τους όρους, παρακαλούμε μην χρησιμοποιήσετε την εφαρμογή μας.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">1. Περιγραφή Υπηρεσίας</h3>
              <p className="mt-2 text-gray-600">
                Το e-Parking είναι μια εφαρμογή που επιτρέπει στους χρήστες να εντοπίζουν και να μοιράζονται διαθέσιμες θέσεις στάθμευσης. Προσφέρουμε δωρεάν και premium λειτουργίες.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">2. Εγγραφή Λογαριασμού</h3>
              <p className="mt-2 text-gray-600">
                Για να χρησιμοποιήσετε την εφαρμογή, πρέπει να δημιουργήσετε λογαριασμό παρέχοντας ακριβείς και πλήρεις πληροφορίες. Είστε υπεύθυνοι για την προστασία του κωδικού πρόσβασής σας.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">3. Χρήση της Υπηρεσίας</h3>
              <p className="mt-2 text-gray-600">
                Συμφωνείτε να χρησιμοποιείτε την υπηρεσία μόνο για νόμιμους σκοπούς και με τρόπο που δεν παραβιάζει τα δικαιώματα τρίτων. Απαγορεύεται η κατάχρηση της υπηρεσίας ή η παροχή ψευδών πληροφοριών.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">4. Premium Συνδρομή</h3>
              <p className="mt-2 text-gray-600">
                Οι premium χρήστες έχουν πρόσβαση σε πρόσθετες λειτουργίες. Οι χρεώσεις και οι όροι πληρωμής περιγράφονται στη σελίδα τιμολόγησης. Μπορείτε να ακυρώσετε τη συνδρομή σας οποιαδήποτε στιγμή.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">5. Προστασία Προσωπικών Δεδομένων</h3>
              <p className="mt-2 text-gray-600">
                Η συλλογή και επεξεργασία των προσωπικών σας δεδομένων διέπεται από την Πολιτική Απορρήτου μας. Χρησιμοποιώντας την εφαρμογή, συναινείτε στη συλλογή και χρήση των δεδομένων σας σύμφωνα με αυτήν.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">6. Τοποθεσία και Ειδοποιήσεις</h3>
              <p className="mt-2 text-gray-600">
                Η εφαρμογή χρησιμοποιεί δεδομένα τοποθεσίας και αποστέλλει ειδοποιήσεις. Μπορείτε να ελέγξετε αυτές τις ρυθμίσεις μέσω των ρυθμίσεων της συσκευής σας.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">7. Περιορισμός Ευθύνης</h3>
              <p className="mt-2 text-gray-600">
                Το e-Parking παρέχεται "ως έχει" χωρίς εγγυήσεις. Δεν φέρουμε ευθύνη για τυχόν ζημιές που προκύπτουν από τη χρήση της εφαρμογής.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">8. Τροποποιήσεις</h3>
              <p className="mt-2 text-gray-600">
                Διατηρούμε το δικαίωμα να τροποποιήσουμε αυτούς τους όρους ανά πάσα στιγμή. Οι αλλαγές θα ανακοινώνονται μέσω της εφαρμογής.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">9. Καταγγελία</h3>
              <p className="mt-2 text-gray-600">
                Μπορούμε να τερματίσουμε ή να αναστείλουμε την πρόσβασή σας στην υπηρεσία άμεσα, χωρίς προειδοποίηση, για παραβίαση των όρων χρήσης.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">10. Επικοινωνία</h3>
              <p className="mt-2 text-gray-600">
                Για ερωτήσεις σχετικά με τους όρους χρήσης, επικοινωνήστε μαζί μας στο support@e-parking.gr.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900">11. Σύνδεση μέσω Google</h3>
              <p className="mt-2 text-gray-600">
                Σε περίπτωση που συνδέεστε στην εφαρμογή χρησιμοποιώντας τον λογαριασμό σας Google, συναινείτε επίσης στους όρους και τις προϋποθέσεις της εφαρμογής, καθώς και στην Πολιτική Απορρήτου. Εξασφαλίζετε ότι κατανοείτε και αποδέχεστε τη συλλογή και επεξεργασία των προσωπικών σας δεδομένων σύμφωνα με αυτές τις πολιτικές.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 
                transition-colors duration-200 font-medium"
            >
              Κλείσιμο
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SignInPage() {
  console.log('SignInPage rendering');
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { language } = useLanguageStore();
  const t = translations[language];
  const [showTerms, setShowTerms] = React.useState(false);
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setError('Πρέπει να αποδεχτείτε τους Όρους και Προϋποθέσεις για να συνεχίσετε.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data?.session?.user) {
        console.log('Sign in successful:', data.session.user);
        setUser(data.session.user);
        navigate('/', { replace: true });
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the current domain
      const redirectUrl = window.location.hostname.includes('localhost')
        ? `${window.location.origin}/auth/callback`
        : 'https://67c8b2ce93cc13db64833189--eparkinggg.netlify.app/auth/callback';

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        console.error('Google sign in error:', error);
        throw error;
      }

      if (data) {
        console.log('Google sign in successful:', data);
      }
      
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Έλεγχος αν ο χρήστης είναι ήδη συνδεδεμένος
  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate('/', { replace: true });
      }
    };
    
    checkUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4">
        <select
          value={language}
          onChange={(e) => useLanguageStore.setState({ language: e.target.value as 'el' | 'en' })}
          className="block w-20 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm 
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer
            hover:border-blue-500 transition-colors duration-200"
        >
          <option value="el">🇬🇷 EL</option>
          <option value="en">🇬🇧 EN</option>
        </select>
      </div>

      <div className="w-full max-w-md mx-auto space-y-8">
        <div>
          <img
            className="mx-auto h-[256px] w-auto"
            src="/assets/plogo.png"
            alt="e-Parking"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t.signIn}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleEmailSignIn}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                {t.email}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                  border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t.email}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                  border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t.password}
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="terms" className="text-sm text-gray-500">
                Συμφωνώ με τους{' '}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Όρους και Προϋποθέσεις
                </button>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading || !acceptedTerms}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent
                text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t.signingIn : t.signIn}
            </button>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300
                rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 hover:shadow-md group"
            >
              <img
                className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:scale-110"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google Logo"
              />
              {t.continueWithGoogle}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                {t.orContinueWith}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/signup"
              className="w-full flex justify-center py-2 px-4 border border-blue-600
                text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-colors duration-200"
            >
              {t.createAccount}
            </Link>
          </div>
        </div>
      </div>

      <TermsModal 
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />
    </div>
  );
} 