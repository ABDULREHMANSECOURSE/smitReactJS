import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, UserCircle } from 'lucide-react'; 

// --- Global Constants and Utilities ---

/**
 * Utility: Converts file to Base64 string.
 */
const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

// =========================================================================
//                               EXTERNAL COMPONENTS
// =========================================================================

// --- 1. Message Component (In place of Alert) ---
const MessageDisplay = ({ message, type }) => {
    if (!message) return null;
    const baseClasses = "message-display p-3 rounded-lg w-full text-center font-medium transition-opacity duration-300";
    const colorStyle = type === 'error'
        ? { backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fca5a5' }
        : { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' };

    return (
        <div style={colorStyle} className={`mt-4 ${baseClasses}`} role="alert">
            {message}
        </div>
    );
};

// --- 2. Login Component ---
const LoginComponent = ({
    loginEmail, setLoginEmail, loginPassword, setLoginPassword,
    showLoginPassword, setShowLoginPassword, handleLogin, toggleView
}) => (
    <form onSubmit={handleLogin} className="auth-form">
        <div className="form-section border-y py-8 px-2">
            <div className="input-group">
                <label htmlFor="emailL" className="input-label">Email:</label>
                <input
                    type="email"
                    id="emailL"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="form-input"
                    placeholder="Enter your email"
                />
            </div>
            <div className="input-group">
                <label htmlFor="passwordL" className="input-label">Password:</label>
                <div className="password-input-wrapper">
                    <input
                        type={showLoginPassword ? 'text' : 'password'}
                        id="passwordL"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="form-input-password"
                        placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="password-toggle-btn">
                        {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>
        </div>
        <button
            type="submit"
            className="submit-btn primary-btn"
        >
            Log In
        </button>
        <button
            type="button"
            onClick={() => toggleView('/signup')}
            className="toggle-view-btn"
        >
            Don't have an account? Create a New Account
        </button>
    </form>
);

// --- 3. Sign Up Component ---
const SignUpComponent = ({
    signUpForm, handleSignUpChange, handleSignUp, handleImageChange, toggleView,
    showSignUpPassword, setShowSignUpPassword, profileImageBase64
}) => (
    <form onSubmit={handleSignUp} className="auth-form space-y-5-override">
        
        {/* Profile Image Upload */}
        <div className="profile-upload-area">
            <label className="input-label">
                Profile Photo (Required)
            </label>
            <div className="profile-image-container">
                {profileImageBase64 ? (
                    <img src={profileImageBase64} alt="Profile Preview" className="profile-image" />
                ) : (
                    <UserCircle size={48} style={{ color: '#6b7280' }} />
                )}
                <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="profile-file-input"
                />
            </div>
        </div>

        {/* Name Fields */}
        <div className="name-fields-group">
            <div className="input-group flex-1-override">
                <label htmlFor="fName" className="input-label">First Name</label>
                <input type="text" id="fName" value={signUpForm.fName} onChange={handleSignUpChange} required className="form-input" placeholder="First Name" />
            </div>
            <div className="input-group flex-1-override">
                <label htmlFor="lName" className="input-label">Last Name</label>
                <input type="text" id="lName" value={signUpForm.lName} onChange={handleSignUpChange} required className="form-input" placeholder="Last Name" />
            </div>
        </div>

        {/* Gender Select */}
        <select id="gender" value={signUpForm.gender} onChange={handleSignUpChange} required className="form-input gender-select-override">
            <option value="select gender" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>

        {/* Email & Password */}
        <div className="w-full space-y-4-override">
            <div className="input-group">
                <label htmlFor="email" className="input-label">Email</label>
                <input type="email" id="email" value={signUpForm.email} onChange={handleSignUpChange} required className="form-input" placeholder="youremail@example.com" />
            </div>
            <div className="input-group">
                <label htmlFor="passwordS" className="input-label">Password</label>
                <div className="password-input-wrapper">
                    <input
                        type={showSignUpPassword ? 'text' : 'password'}
                        id="password" 
                        value={signUpForm.password}
                        onChange={handleSignUpChange}
                        required
                        className="form-input-password"
                        placeholder="Minimum 8 characters"
                    />
                    <button type="button" onClick={() => setShowSignUpPassword(!showSignUpPassword)} className="password-toggle-btn">
                        {showSignUpPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>
        </div>

        {/* DOB & Phone */}
        <div className="w-full space-y-4-override">
            <div className="input-group">
                <label htmlFor="dob" className="input-label">Date of Birth (DOB)</label>
                <input type="date" id="dob" value={signUpForm.dob} onChange={handleSignUpChange} required className="form-input" style={{color: '#374151'}} />
            </div>
            <div className="input-group">
                <label htmlFor="phoneNumber" className="input-label">Phone Number (E.g: +92 XXX XXXXXXX)</label>
                <input type="tel" id="phoneNumber" value={signUpForm.phoneNumber} onChange={handleSignUpChange} required className="form-input" placeholder="+92 XXX XXXXXXX" />
            </div>
        </div>
        

        <button
            type="submit"
            className="submit-btn primary-btn mt-5-override"
        >
            Create Account
        </button>
        <button
            type="button"
            onClick={() => toggleView('/login')}
            className="toggle-view-btn mt-neg10-override"
        >
            Already have an account? Log In
        </button>
    </form>
);

// --- 4. Profile Component ---
const ProfileComponent = ({ loggedAccountData, handleLogout, toggleView }) => {
    // Redirects to login page if no data (Route Guard)
    const [redirected, setRedirected] = useState(false);
    
    useEffect(() => {
        if (!loggedAccountData) {
            if (!redirected) {
                const timer = setTimeout(() => {
                    toggleView('/login');
                    setRedirected(true);
                }, 500); 
                return () => clearTimeout(timer);
            }
        }
    }, [loggedAccountData, toggleView, redirected]);

    if (!loggedAccountData) {
        return <div className="loading-message">Profile data not found. Redirecting to login...</div>;
    }

    const { fName, lName, dob, gender, email, phoneNumber, profileImageBase64 } = loggedAccountData;

    return (
        <div className="profile-container">
            <h2 className="profile-title">Your Profile</h2>

            {/* Profile Image */}
            <div className="profile-image-large-container">
                {profileImageBase64 ? (
                    <img src={profileImageBase64} alt="Profile" className="profile-image" />
                ) : (
                    <UserCircle size={80} style={{ color: '#9ca3af' }} />
                )}
            </div>

            <div className="profile-data-wrapper">
                <ProfileInfoBox title="Name" value={`${fName} ${lName}`} />
                <ProfileInfoBox title="Email" value={email} />
                <ProfileInfoBox title="Date of Birth (DOB)" value={dob} />
                <ProfileInfoBox title="Gender" value={gender} />
                <ProfileInfoBox title="Phone Number" value={phoneNumber} />
            </div>
            
            <button
                onClick={handleLogout}
                className="logout-btn"
            >
                Log Out
            </button>
        </div>
    );
};

const ProfileInfoBox = ({ title, value }) => (
    <div className="info-box">
        <h4 className="info-title">{title}</h4>
        <p className="info-value">{value}</p>
    </div>
);


// =========================================================================
//                                MAIN COMPONENT
// =========================================================================

export default function App() {
    // NOTE: Using localStorage as requested by the provided code structure.
    // For a real-world application, Firebase Firestore would be mandatory.
    
    const [currentView, setCurrentView] = useState('/login');

    // State for storing all registered accounts
    const [accounts, setAccounts] = useState([]);
    // State for the currently logged-in user's data
    const [loggedAccountData, setLoggedAccountData] = useState(null);

    // Login Form States
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    // Sign Up Form States
    const [signUpForm, setSignUpForm] = useState({
        fName: '', lName: '', gender: 'select gender', email: '',
        password: '', dob: '', phoneNumber: '',
    });
    const [profileImageBase64, setProfileImageBase64] = useState(null); 
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);
    
    // Message State
    const [message, setMessage] = useState({ text: null, type: null });

    // Function to change view (simulated routing)
    const toggleView = useCallback((path) => {
        setCurrentView(path);
        setMessage({ text: null, type: null });
    }, []);

    // --- Initial Data Load and Auto-Login Check (Login Protection) ---
    useEffect(() => {
        // 1. Load all accounts data
        const storedAccounts = localStorage.getItem('accounts');
        if (storedAccounts) {
            setAccounts(JSON.parse(storedAccounts));
        }

        // 2. Check login session
        const storedLoggedEmail = localStorage.getItem('logedAccount');
        
        if (storedLoggedEmail && storedLoggedEmail !== 'null') {
            const email = JSON.parse(storedLoggedEmail);
            
            const allAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];
            const user = allAccounts.find(acc => acc.email === email); 
            
            if (user) {
                setLoggedAccountData(user);
                // If logged in, navigate to profile
                setCurrentView('/profile');
            } else {
                localStorage.removeItem('logedAccount');
            }
        }
    }, []);

    // --- Handlers ---
    
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await readFileAsBase64(file);
                setProfileImageBase64(base64);
                handleMessage('Image uploaded successfully!', 'success');
            } catch (error) {
                handleMessage('Could not read image file.', 'error');
                setProfileImageBase64(null);
            }
        }
    };

    const handleSignUpChange = (e) => {
        const { id, value } = e.target;
        setSignUpForm(prev => ({ ...prev, [id]: value }));
    };

    const handleMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: null, type: null }), 5000);
    };

    // --- Sign Up Logic ---
    const handleSignUp = (e) => {
        e.preventDefault();
        setMessage({ text: null, type: null });

        const user = { profileImageBase64: profileImageBase64 }; 
        let isValid = true;

        // NEW: Check if profile image is uploaded
        if (isValid && !profileImageBase64) {
            handleMessage('Profile photo is required.', 'error'); 
            isValid = false;
        }

        // Validation Checks (English messages)
        if (isValid && (signUpForm.fName.length < 3 || signUpForm.fName.length > 12)) {
            handleMessage('First Name must be between 3 and 12 characters.', 'error'); isValid = false;
        } else if (isValid) { user.fName = signUpForm.fName; }

        if (isValid && (signUpForm.lName.length < 3 || signUpForm.lName.length > 12)) {
            handleMessage('Last Name must be between 3 and 12 characters.', 'error'); isValid = false;
        } else if (isValid) { user.lName = signUpForm.lName; }

        if (isValid && signUpForm.gender === 'select gender') {
            handleMessage('Please select gender.', 'error'); isValid = false;
        } else if (isValid) { user.gender = signUpForm.gender; }

        if (isValid) {
            const lowerCaseEmail = signUpForm.email.toLowerCase(); 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (accounts.some(eF => eF.email === lowerCaseEmail)) {
                handleMessage('This email already exists.', 'error'); isValid = false;
            } else if (!emailRegex.test(lowerCaseEmail)) {
                handleMessage('Please enter a valid email address.', 'error'); isValid = false;
            } else {
                user.email = lowerCaseEmail; // Save email in lowercase
            }
        }

        if (isValid) {
            if (signUpForm.password.includes(' ')) {
                handleMessage("Password should not contain spaces.", 'error'); isValid = false;
            } else if (signUpForm.password.length < 8) {
                handleMessage("Password must be at least 8 characters long.", 'error'); isValid = false;
            } else {
                user.password = signUpForm.password;
            }
        }

        if (isValid && !signUpForm.dob) {
            handleMessage('Please enter a valid Date of Birth.', 'error'); isValid = false;
        } else if (isValid) { user.dob = signUpForm.dob; }

        if (isValid) {
            // Regex for Pakistani phone format 03XXXXXXXXX (with optional international prefix)
            const phoneNumberRegex = /^((\+92|0092|92)?(0)?)(3)([0-9]{9})$/;
            if (!phoneNumberRegex.test(signUpForm.phoneNumber)) {
                handleMessage('Invalid phone number (Pakistani format: e.g., 03XXXXXXXXX is required).', 'error'); isValid = false;
            } else {
                user.phoneNumber = signUpForm.phoneNumber;
            }
        }

        // Final Save 
        if (isValid) {
            const newAccounts = [...accounts, user];
            setAccounts(newAccounts);
            localStorage.setItem('accounts', JSON.stringify(newAccounts));

            handleMessage('Account created successfully! You can now log in.', 'success');

            setSignUpForm({
                fName: '', lName: '', gender: 'select gender', email: '',
                password: '', dob: '', phoneNumber: '',
            });
            setProfileImageBase64(null); 
            
            toggleView('/login');
        }
    };

    // --- Log In Logic ---
    const handleLogin = (e) => {
        e.preventDefault();
        setMessage({ text: null, type: null });

        const lowerCaseLoginEmail = loginEmail.toLowerCase(); 

        const foundUser = accounts.find(
            (acc) => acc.email === lowerCaseLoginEmail && acc.password === loginPassword
        );

        if (foundUser) {
            // Save only the lowercase email for session
            localStorage.setItem('logedAccount', JSON.stringify(foundUser.email));
            
            setLoggedAccountData(foundUser); 

            handleMessage(`Login Successful! Welcome, ${foundUser.fName}!`, 'success');

            setLoginEmail('');
            setLoginPassword('');
            
            // Navigate to profile view
            toggleView('/profile');
        } else {
            handleMessage("Login Failed: Invalid Email or Password.", 'error');
        }
    };

    // --- Log Out Logic ---
    const handleLogout = () => {
        setLoggedAccountData(null);
        localStorage.removeItem('logedAccount');
        handleMessage('You have been successfully logged out.', 'success');
        toggleView('/login');
    };

    // --- Conditional View Rendering (Simulated Router) ---
    const renderCurrentView = () => {
        switch (currentView) {
            case '/login':
            case '/default':
                return (
                    <>
                        <h2 className="main-heading">Log In</h2>
                        <LoginComponent
                            loginEmail={loginEmail} setLoginEmail={setLoginEmail}
                            loginPassword={loginPassword} setLoginPassword={setLoginPassword}
                            showLoginPassword={showLoginPassword} setShowLoginPassword={setShowLoginPassword}
                            handleLogin={handleLogin} toggleView={toggleView}
                        />
                    </>
                );
            case '/signup':
                return (
                    <>
                        <h2 className="main-heading">Create New Account</h2>
                        <SignUpComponent
                            signUpForm={signUpForm} handleSignUpChange={handleSignUpChange}
                            handleSignUp={handleSignUp} toggleView={toggleView}
                            handleImageChange={handleImageChange} profileImageBase64={profileImageBase64}
                            showSignUpPassword={showSignUpPassword} setShowSignUpPassword={setShowSignUpPassword}
                        />
                    </>
                );
            case '/profile':
                // ProfileComponent handles its own redirection (Route Guard)
                return (
                    <ProfileComponent
                        loggedAccountData={loggedAccountData}
                        handleLogout={handleLogout}
                        toggleView={toggleView}
                    />
                );
            default:
                // Redirect to login if route is invalid
                return toggleView('/login');
        }
    };

    return (
        <>
        {/* INTERNAL CSS BLOCK */}
        <style>
            {`
                /* Base Reset and Layout */
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Inter', sans-serif;
                    background-color: #f9fafb; /* bg-gray-50 */
                }
                
                .app-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: flex-start; /* items-start */
                    justify-content: center;
                    padding: 1rem; /* p-4 */
                }

                @media (min-width: 640px) {
                    .app-container {
                        padding: 2rem; /* sm:p-8 */
                    }
                }

                /* Authentication Card/Box */
                .auth-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #ffffff;
                    padding: 1.5rem; /* p-6 */
                    border-radius: 1.5rem; /* rounded-3xl */
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-2xl */
                    width: 100%;
                    max-width: 28rem; /* max-w-md */
                    margin-top: 2rem;
                    transition: all 0.5s ease-in-out;
                    box-sizing: border-box;
                }

                @media (min-width: 640px) {
                    .auth-card {
                        padding: 2.5rem; /* sm:p-10 */
                    }
                }

                /* Headers and Typography */
                .main-heading {
                    font-size: 1.875rem; /* text-3xl */
                    font-weight: 700; /* font-bold */
                    color: #1f2937; /* text-gray-800 */
                    margin-bottom: 1.5rem; /* mb-6 */
                }

                .auth-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    row-gap: 1.5rem; /* space-y-6 */
                }
                
                .space-y-5-override > div { margin-top: 1.25rem; }
                .space-y-4-override > div { margin-top: 1rem; }
                .mt-5-override { margin-top: 1.25rem; }
                .mt-neg10-override { margin-top: -0.625rem; padding-bottom: 1rem; }

                /* Inputs and Groups */
                .input-group {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    row-gap: 0.5rem; /* space-y-2 */
                }

                .input-label {
                    font-weight: 600; /* font-semibold */
                    color: #374151; /* text-gray-700 */
                }

                .form-input, .gender-select-override {
                    width: 100%;
                    padding: 0.75rem; /* p-3 */
                    background-color: #f3f4f6; /* bg-gray-100 */
                    border: 1px solid #e5e7eb; /* border border-gray-200 */
                    border-radius: 0.5rem; /* rounded-lg */
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }

                .form-input:focus {
                    border-color: #4f46e5; /* focus:ring-indigo-500 */
                    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5); /* focus:ring-2 */
                }
                
                .form-section {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    row-gap: 1.5rem; /* space-y-6 */
                    border-top: 1px solid #d1d5db; /* border-y border-gray-300 */
                    border-bottom: 1px solid #d1d5db;
                }

                /* Password Input Specifics */
                .password-input-wrapper {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    background-color: #f3f4f6;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    padding-right: 0.5rem;
                }
                
                .form-input-password {
                    flex-grow: 1;
                    padding: 0.75rem;
                    background-color: transparent;
                    border: none;
                    outline: none;
                }
                
                .password-toggle-btn {
                    padding: 0.25rem;
                    color: #6b7280; /* text-gray-500 */
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: color 0.2s;
                }
                
                .password-toggle-btn:hover {
                    color: #4f46e5; /* hover:text-indigo-600 */
                }

                /* Name Fields Group (Sign Up) */
                .name-fields-group {
                    display: flex;
                    width: 100%;
                    column-gap: 1rem; /* gap-4 */
                }
                
                .flex-1-override {
                    flex: 1;
                }

                /* Buttons */
                .submit-btn {
                    width: 100%;
                    padding: 0.75rem 0; /* py-3 */
                    font-size: 1.25rem; /* text-xl */
                    font-weight: 700; /* font-bold */
                    color: white;
                    border-radius: 0.75rem; /* rounded-xl */
                    border: none;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); /* shadow-lg */
                    transition: background-color 0.2s, transform 0.2s;
                    cursor: pointer;
                }
                
                .primary-btn {
                    background-color: #4f46e5; /* bg-indigo-600 */
                }
                
                .primary-btn:hover {
                    background-color: #4338ca; /* hover:bg-indigo-700 */
                    transform: scale(1.01);
                }

                .toggle-view-btn {
                    font-size: 0.875rem; /* text-sm */
                    color: #6366f1; /* text-indigo-500 */
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                
                .toggle-view-btn:hover {
                    color: #4338ca; /* hover:text-indigo-700 */
                }

                /* Profile Upload */
                .profile-upload-area {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    row-gap: 0.75rem; /* space-y-3 */
                }

                .profile-image-container {
                    position: relative;
                    width: 6rem; /* w-24 */
                    height: 6rem; /* h-24 */
                    border-radius: 50%;
                    border: 4px solid #818cf8; /* border-4 border-indigo-400 */
                    overflow: hidden;
                    background-color: #e5e7eb; /* bg-gray-200 */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
                
                .profile-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .profile-file-input {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    cursor: pointer;
                }

                /* Profile View */
                .profile-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    row-gap: 1.5rem; /* space-y-6 */
                    padding: 1rem; /* p-4 */
                }

                .profile-title {
                    font-size: 1.875rem;
                    font-weight: 800; /* font-extrabold */
                    color: #4338ca; /* text-indigo-700 */
                    margin-bottom: 1rem;
                }

                .profile-image-large-container {
                    width: 8rem; /* w-32 */
                    height: 8rem; /* h-32 */
                    border-radius: 50%;
                    overflow: hidden;
                    border: 4px solid #6366f1; /* border-4 border-indigo-500 */
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05); /* shadow-lg */
                    margin-bottom: 1rem;
                    background-color: #e5e7eb;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .profile-data-wrapper {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    row-gap: 1rem; /* space-y-4 */
                }

                .info-box {
                    background-color: #f3f4f6; /* bg-gray-100 */
                    padding: 1rem; /* p-4 */
                    border-radius: 0.75rem; /* rounded-xl */
                    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); /* shadow-inner */
                }

                .info-title {
                    font-size: 0.875rem; /* text-sm */
                    font-weight: 600; /* font-semibold */
                    color: #6b7280; /* text-gray-500 */
                }

                .info-value {
                    font-size: 1.25rem; /* text-xl */
                    font-weight: 500; /* font-medium */
                    color: #1f2937; /* text-gray-800 */
                }

                .logout-btn {
                    width: 100%;
                    padding: 0.75rem 0;
                    font-size: 1.125rem; /* text-lg */
                    font-weight: 700;
                    color: #4f46e5;
                    border: 1px solid #4f46e5;
                    background-color: transparent;
                    border-radius: 0.75rem;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1); /* shadow-md */
                    transition: background-color 0.2s;
                    margin-top: 1.5rem; /* mt-6 */
                    cursor: pointer;
                }

                .logout-btn:hover {
                    background-color: #eef2ff; /* hover:bg-indigo-50 */
                }
                
                .loading-message {
                    padding: 1rem;
                    text-align: center;
                    color: #6b7280;
                    font-weight: 600;
                }
                
            `}
        </style>
        
        <div className="app-container">
            <div className="auth-card">

                {/* Status Message */}
                <MessageDisplay message={message.text} type={message.type} />

                {/* Conditional View Rendering */}
                {renderCurrentView()}
            </div>
        </div>
        </>
    );
}