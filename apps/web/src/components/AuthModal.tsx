import React, { useState } from 'react';
import { X, Lock, Phone, Mail, ArrowRight, ShieldCheck, UserCheck, Store, Shield } from 'lucide-react';
import type { User, Role } from '../types';
import { MOCK_USER } from '../data/mockData';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onShowToast
}) => {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [loginMethod, setLoginMethod] = useState<'OTP' | 'PASSWORD'>('OTP');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('vikram.rao@zenvora.dev');
  const [password, setPassword] = useState('zenvora@2026');
  const [name, setName] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMessage('');
    setOtpStep(true);
    onShowToast('Simulated OTP sent: Enter 1234 to verify', 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === '1234' || otpCode.length === 4) {
      onLoginSuccess(MOCK_USER);
      onShowToast(`Welcome back, ${MOCK_USER.name}!`, 'success');
      onClose();
    } else {
      setErrorMessage('Invalid OTP. Please enter 1234');
    }
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password');
      return;
    }
    onLoginSuccess(MOCK_USER);
    onShowToast(`Welcome back, ${MOCK_USER.name}!`, 'success');
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMessage('Please fill in all registration fields');
      return;
    }
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone,
      role: 'CUSTOMER',
      addresses: []
    };
    onLoginSuccess(newUser);
    onShowToast(`Account created successfully! Welcome to Zenvora, ${name}.`, 'success');
    onClose();
  };

  const handleQuickDemoLogin = (role: Role) => {
    let demoUser: User;
    if (role === 'SELLER') {
      demoUser = {
        id: 'usr-seller-01',
        name: 'Aura Audio Direct',
        email: 'merchant@auraaudio.com',
        phone: '+91 99000 11223',
        role: 'SELLER',
        addresses: []
      };
    } else if (role === 'ADMIN') {
      demoUser = {
        id: 'usr-admin-01',
        name: 'Zenvora Marketplace Ops',
        email: 'ops.admin@zenvora.dev',
        phone: '+91 90000 00001',
        role: 'ADMIN',
        addresses: []
      };
    } else {
      demoUser = MOCK_USER;
    }

    onLoginSuccess(demoUser);
    onShowToast(`Logged in as ${demoUser.name} (${demoUser.role})`, 'success');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal fade-in" onClick={e => e.stopPropagation()}>
        
        {/* Left Branding Hero Banner */}
        <div className="auth-hero-banner">
          <div className="auth-brand-badge">ZENVORA</div>
          <h2 className="auth-hero-heading">Everything You Want. One Destination.</h2>
          <p className="auth-hero-desc">
            Sign in to track orders, manage addresses, claim exclusive festive offers, and explore verified sellers.
          </p>
          <div className="auth-features-list">
            <div className="auth-feat-item">
              <ShieldCheck size={16} />
              <span>Zenvora Assured Quality</span>
            </div>
            <div className="auth-feat-item">
              <Lock size={16} />
              <span>Safe & Secure Authentication</span>
            </div>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="auth-form-container">
          <div className="auth-top-actions">
            <button className="close-modal-btn" onClick={onClose} aria-label="Close dialog">
              <X size={20} />
            </button>
          </div>

          <div className="auth-tabs-row">
            <button 
              className={`auth-tab-btn ${authMode === 'LOGIN' ? 'active' : ''}`}
              onClick={() => { setAuthMode('LOGIN'); setErrorMessage(''); setOtpStep(false); }}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab-btn ${authMode === 'REGISTER' ? 'active' : ''}`}
              onClick={() => { setAuthMode('REGISTER'); setErrorMessage(''); }}
            >
              New Customer? Register
            </button>
          </div>

          {errorMessage && <div className="form-error-banner">{errorMessage}</div>}

          {authMode === 'LOGIN' ? (
            <div>
              {/* Method Switcher */}
              <div className="method-switcher-row">
                <button 
                  className={`method-switch-btn ${loginMethod === 'OTP' ? 'selected' : ''}`}
                  onClick={() => { setLoginMethod('OTP'); setOtpStep(false); }}
                >
                  <Phone size={14} />
                  <span>Mobile OTP</span>
                </button>
                <button 
                  className={`method-switch-btn ${loginMethod === 'PASSWORD' ? 'selected' : ''}`}
                  onClick={() => setLoginMethod('PASSWORD')}
                >
                  <Mail size={14} />
                  <span>Email & Password</span>
                </button>
              </div>

              {loginMethod === 'OTP' ? (
                !otpStep ? (
                  <form onSubmit={handleSendOtp} className="auth-form">
                    <div className="form-group">
                      <label>Enter 10-Digit Mobile Number</label>
                      <div className="phone-input-wrap">
                        <span className="phone-prefix">+91</span>
                        <input
                          type="tel"
                          placeholder="e.g. 9876543210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn-accent auth-submit-btn">
                      <span>Request OTP</span>
                      <ArrowRight size={16} />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="auth-form">
                    <div className="otp-sent-info">
                      <span>OTP sent to <strong>+91 {phone}</strong></span>
                      <button type="button" className="change-num-link" onClick={() => setOtpStep(false)}>
                        Change
                      </button>
                    </div>
                    <div className="form-group">
                      <label>Enter 4-Digit OTP (Use: 1234)</label>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="• • • •"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="otp-input-field"
                        required
                        autoFocus
                      />
                    </div>
                    <button type="submit" className="btn-accent auth-submit-btn">
                      <span>Verify & Sign In</span>
                    </button>
                  </form>
                )
              ) : (
                <form onSubmit={handlePasswordLogin} className="auth-form">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary auth-submit-btn">
                    <span>Sign In</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Sen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="ananya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>10-Digit Mobile Number *</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-accent auth-submit-btn">
                <span>Create Zenvora Account</span>
              </button>
            </form>
          )}

          {/* Quick Demo Logins for Pair Programming / Review */}
          <div className="quick-demo-logins-box">
            <span className="demo-label">Instant Demo Login:</span>
            <div className="demo-btn-cluster">
              <button 
                type="button" 
                className="demo-pill-btn customer"
                onClick={() => handleQuickDemoLogin('CUSTOMER')}
              >
                <UserCheck size={13} />
                <span>Customer Demo</span>
              </button>
              <button 
                type="button" 
                className="demo-pill-btn seller"
                onClick={() => handleQuickDemoLogin('SELLER')}
              >
                <Store size={13} />
                <span>Seller Demo</span>
              </button>
              <button 
                type="button" 
                className="demo-pill-btn admin"
                onClick={() => handleQuickDemoLogin('ADMIN')}
              >
                <Shield size={13} />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
