import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyAs5O6AY-pRpv71JUH4bkfQ8J9yJoGGBO0",
    authDomain: "worldgreenline-aeeb4.firebaseapp.com",
    projectId: "worldgreenline-aeeb4",
    storageBucket: "worldgreenline-aeeb4.appspot.com",
    messagingSenderId: "562117248346",
    appId: "1:562117248346:web:fd1925ac1fb641d90b1f63",
    measurementId: "G-2SN6M8Z9YF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// --- Helper Components & Icons (Unchanged) ---
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const FormInput = ({ id, type, value, onChange, label }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required
        className="mt-1 block w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </div>
);

// Success notification that slides in from the right
const SuccessNotification = () => (
    <div style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        backgroundColor: '#28a745',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: 1001,
        animation: 'slideInFromRight 0.5s ease-out forwards'
    }}>
        <style>
        {`
            @keyframes slideInFromRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `}
        </style>
        Login Successful! Redirecting...
    </div>
);

// ✅ NEW: Welcome Screen for already logged-in users
const WelcomeScreen = ({ user, onLogout }) => (
    <div className="text-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-900">You are already logged in.</h1>
        <p className="text-gray-600">Welcome back, <span className="font-semibold">{user.email}</span>!</p>
        <button 
            onClick={onLogout} 
            className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 active:scale-95 transition-all duration-200"
        >
            Logout
        </button>
    </div>
);

const AuthForm = ({ mode, onSubmit, setMode }) => {
    // This component remains unchanged and works correctly.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const isLogin = mode === 'login';
    const isSignup = mode === 'signup';
    const isForgotPassword = mode === 'forgotPassword';
    useEffect(() => { setEmail(''); setPassword(''); setMessage({ type: '', text: '' }); }, [mode]);
    const handleSubmit = async (e) => { e.preventDefault(); setLoading(true); setMessage({ type: '', text: '' }); try { const resultMessage = await onSubmit(email, password); if (isSignup || isForgotPassword) { setMessage({ type: 'success', text: resultMessage }); setEmail(''); setPassword(''); } } catch (error) { setMessage({ type: 'error', text: error.message.replace('Firebase: ', '') }); } finally { setLoading(false); } };
    const getTitle = () => { if (isLogin) return 'Welcome Back!'; if (isSignup) return 'Create Your Account'; return 'Reset Password'; };
    const getDescription = () => { if (isSignup) return 'Enter your email to get started. We will send you a link to set up your password.'; return null; }
    const getButtonText = () => { if (isLogin) return 'Login'; if (isSignup) return 'Send Setup Link'; return 'Send Reset Link'; }
    return (
    <div className="space-y-6">
        <div className="text-center"><h1 className="text-3xl font-bold text-gray-900">{getTitle()}</h1>{getDescription() && <p className="mt-2 text-gray-600">{getDescription()}</p>}</div>
        {!isForgotPassword && (<div className="flex bg-gray-100 p-1 rounded-lg"><button onClick={() => setMode('login')} className={`flex-1 py-2 text-center font-semibold rounded-md transition-all duration-300 ${isLogin ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>Login</button><button onClick={() => setMode('signup')} className={`flex-1 py-2 text-center font-semibold rounded-md transition-all duration-300 ${isSignup ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>Sign Up</button></div>)}
        {message.text && ( <div className={`p-3 rounded-lg text-center text-sm font-medium ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message.text}</div> )}
        <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address"/>
            {isLogin && ( <FormInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password"/> )}
            {isLogin && ( <div className="text-right"><a href="#" onClick={(e) => { e.preventDefault(); setMode('forgotPassword'); }} className="text-sm text-blue-600 hover:underline">Forgot Password?</a></div> )}
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed">{loading ? <Spinner /> : getButtonText()}</button>
            {isForgotPassword && ( <div className="text-center"><a href="#" onClick={(e) => { e.preventDefault(); setMode('login'); }} className="text-sm text-blue-600 hover:underline">&larr; Back to Login</a></div> )}
        </form>
    </div>
    );
};


export default function Admin() {
  // ✅ MODIFIED: Added 'user' state to track login status
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('login');
  const [authReady, setAuthReady] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // This effect now just checks who is logged in and sets the state.
  // It no longer automatically redirects you.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []); // Runs once on component mount

  // --- Auth Handler Functions ---
  const handleSignup = async (email) => {
    const temporaryPassword = Math.random().toString(36).slice(2) + 'aA1!';
    await createUserWithEmailAndPassword(auth, email, temporaryPassword);
    await sendPasswordResetEmail(auth, email);
    return 'Account created! Please check your email for a secure link to set up your password.';
  };

  // ✅ MODIFIED: Login handler now triggers the success message and redirect
  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(() => {
      // User has successfully logged in via the form.
      setShowSuccess(true); // Show notification
      setTimeout(() => {
        navigate('/'); // Redirect to homepage
      }, 2000);
    });
    // Errors will be caught by the AuthForm's handleSubmit
  };

  const handlePasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email).then(() => {
        return 'Password reset email sent! Check your inbox.';
    });
  };

  // ✅ NEW: Logout handler
  const handleLogout = () => {
    signOut(auth);
  };
  
  const getSubmitHandler = () => {
    if (mode === 'login') return handleLogin;
    if (mode === 'signup') return handleSignup;
    return handlePasswordReset;
  };
  
  // Render a loading state until Firebase is ready
  if (!authReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // --- Final Render Logic ---
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      {/* Show notification only when a fresh login happens */}
      {showSuccess && <SuccessNotification />}
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-500">
        {user ? (
          // If a user is already logged in, show the Welcome screen
          <WelcomeScreen user={user} onLogout={handleLogout} />
        ) : (
          // If no user is logged in, show the Login/Signup form
          <AuthForm
            mode={mode}
            onSubmit={getSubmitHandler()}
            setMode={setMode}
          />
        )}
      </div>
    </div>
  );
}
