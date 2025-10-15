<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign In | Sign Up</title>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0f0c29;background:linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);position:relative;color:#ffffff;line-height:1.6;font-size:16px;font-family:'Poppins',sans-serif;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;}
body::before{content:'';position:fixed;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle at 20% 50%, rgba(120,119,198,0.3) 0%, transparent 50%),radial-gradient(circle at 80% 80%, rgba(138,43,226,0.2) 0%, transparent 50%);z-index:0;pointer-events:none;animation:gradientShift 10s ease infinite;}
@keyframes gradientShift{0%,100%{opacity:1;}50%{opacity:0.7;}}
.floating-shapes{position:fixed;width:100%;height:100%;overflow:hidden;z-index:0;pointer-events:none;}
.shape{position:absolute;opacity:0.1;animation:float 20s infinite ease-in-out;}
.shape:nth-child(1){width:80px;height:80px;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);border-radius:50%;top:10%;left:10%;animation-delay:0s;}
.shape:nth-child(2){width:60px;height:60px;background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%);border-radius:30%;top:70%;left:80%;animation-delay:2s;}
.shape:nth-child(3){width:100px;height:100px;background:linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);border-radius:50%;top:40%;right:10%;animation-delay:4s;}
.shape:nth-child(4){width:70px;height:70px;background:linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);border-radius:50%;bottom:20%;left:20%;animation-delay:6s;}
@keyframes float{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-30px) rotate(180deg);}}
.auth-container{position:relative;z-index:1;width:100%;max-width:450px;padding:20px;}
.auth-box{background:rgba(15,12,41,0.85);backdrop-filter:blur(30px);padding:50px 40px;border-radius:30px;box-shadow:0 20px 60px rgba(0,0,0,0.5);border:1px solid rgba(102,126,234,0.3);position:relative;overflow:hidden;animation:slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);}
@keyframes slideUp{0%{opacity:0;transform:translateY(50px);}100%{opacity:1;transform:translateY(0);}}
.auth-box::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%);animation:rotate 20s linear infinite;}
@keyframes rotate{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
.logo{text-align:center;margin-bottom:40px;position:relative;z-index:1;}
.logo h1{font-size:2.5em;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:800;margin-bottom:5px;animation:glow 2s ease-in-out infinite;}
@keyframes glow{0%,100%{filter:drop-shadow(0 0 20px rgba(102,126,234,0.5));}50%{filter:drop-shadow(0 0 40px rgba(102,126,234,0.8));}}
.logo p{color:#a78bfa;font-size:0.95em;font-weight:500;}
.form-container{position:relative;z-index:1;}
.form-container.hidden{display:none;}
.form-container.fade-out{animation:fadeOut 0.3s ease forwards;}
.form-container.fade-in{animation:fadeIn 0.4s ease forwards;}
@keyframes fadeOut{0%{opacity:1;transform:translateX(0);}100%{opacity:0;transform:translateX(-30px);}}
@keyframes fadeIn{0%{opacity:0;transform:translateX(30px);}100%{opacity:1;transform:translateX(0);}}
.form-group{margin-bottom:25px;}
.form-group label{display:block;margin-bottom:8px;color:#e2e8f0;font-weight:500;font-size:0.95em;transition:color 0.3s ease;}
.form-group input{width:100%;padding:16px 20px;border-radius:15px;border:2px solid rgba(102,126,234,0.3);background:rgba(15,12,41,0.6);color:#ffffff;font-size:1em;font-family:'Poppins',sans-serif;transition:all 0.4s cubic-bezier(0.4, 0, 0.2, 1);}
.form-group input::placeholder{color:rgba(255,255,255,0.4);}
.form-group input:focus{outline:none;border-color:#667eea;box-shadow:0 0 0 4px rgba(102,126,234,0.2);transform:translateY(-2px);background:rgba(15,12,41,0.8);}
.form-group input:focus + label{color:#667eea;}
.btn{width:100%;padding:16px;border-radius:15px;border:none;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;font-size:1.1em;font-weight:600;cursor:pointer;transition:all 0.4s cubic-bezier(0.4, 0, 0.2, 1);box-shadow:0 8px 25px rgba(102,126,234,0.4);font-family:'Poppins',sans-serif;margin-top:10px;position:relative;overflow:hidden;}
.btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);transition:left 0.6s ease;}
.btn:hover::before{left:100%;}
.btn:hover{transform:translateY(-3px);box-shadow:0 12px 35px rgba(102,126,234,0.6);}
.btn:active{transform:translateY(-1px);transition:all 0.1s;}
.btn:disabled{opacity:0.7;cursor:not-allowed;transform:translateY(0);}
.btn:disabled:hover{transform:translateY(0);box-shadow:0 8px 25px rgba(102,126,234,0.4);}
.divider{text-align:center;margin:30px 0;position:relative;}
.divider::before,.divider::after{content:'';position:absolute;top:50%;width:40%;height:1px;background:rgba(102,126,234,0.3);}
.divider::before{left:0;}
.divider::after{right:0;}
.divider span{color:#a78bfa;font-size:0.9em;background:rgba(15,12,41,0.85);padding:0 15px;position:relative;z-index:1;}
.switch-form{text-align:center;margin-top:25px;color:#e2e8f0;font-size:0.95em;}
.switch-form a{color:#667eea;text-decoration:none;font-weight:600;cursor:pointer;transition:all 0.3s ease;position:relative;}
.switch-form a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);transition:width 0.3s ease;}
.switch-form a:hover::after{width:100%;}
.switch-form a:hover{color:#764ba2;}
.alert{padding:15px 20px;border-radius:12px;margin-bottom:20px;font-size:0.95em;font-weight:500;animation:slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);}
@keyframes slideDown{0%{opacity:0;transform:translateY(-20px);}100%{opacity:1;transform:translateY(0);}}
.alert-success{background:rgba(67,233,123,0.2);border:1px solid rgba(67,233,123,0.4);color:#43e97b;}
.alert-error{background:rgba(245,87,108,0.2);border:1px solid rgba(245,87,108,0.4);color:#f5576c;}
.alert.fade-out{animation:fadeOutUp 0.3s ease forwards;}
@keyframes fadeOutUp{0%{opacity:1;transform:translateY(0);}100%{opacity:0;transform:translateY(-20px);}}
.loading{display:inline-block;width:16px;height:16px;border:3px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;margin-left:10px;vertical-align:middle;}
@keyframes spin{to{transform:rotate(360deg);}}
.input-error{border-color:#f5576c !important;animation:shake 0.5s ease;}
@keyframes shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-10px);}75%{transform:translateX(10px);}}
@media(max-width:768px){
  .auth-container{padding:15px;max-width:100%;}
  .auth-box{padding:40px 30px;border-radius:25px;}
  .logo h1{font-size:2em;}
  .form-group input{padding:14px 18px;}
  .btn{padding:14px;font-size:1em;}
}
@media(max-width:480px){
  .auth-box{padding:30px 20px;}
  .logo h1{font-size:1.8em;}
  .form-group{margin-bottom:20px;}
}
</style>
</head>
<body>

<div class="floating-shapes">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>

<div class="auth-container">
  <div class="auth-box">
    <div class="logo">
      <h1> Expense Tracker</h1>
      <p>Manage your finances smartly</p>
    </div>

    <div id="alert-container"></div>

    <!-- Sign In Form -->
    <div id="signin-form" class="form-container">
      <form id="signin">
        <div class="form-group">
          <label for="signin-email">Email Address</label>
          <input type="email" id="signin-email" placeholder="Enter your email" required>
        </div>
        <div class="form-group">
          <label for="signin-password">Password</label>
          <input type="password" id="signin-password" placeholder="Enter your password" required>
        </div>
        <button type="submit" class="btn">Sign In</button>
        <button onclick="window.location.href='index.html'">Login</button>

      </form>
      <div class="switch-form">
        Don't have an account? <a id="show-signup">Sign Up</a>
      </div>
    </div>

    <!-- Sign Up Form -->
    <div id="signup-form" class="form-container hidden">
      <form id="signup">
        <div class="form-group">
          <label for="signup-name">Full Name</label>
          <input type="text" id="signup-name" placeholder="Enter your name" required>
        </div>
        <div class="form-group">
          <label for="signup-phone">Phone Number</label>
          <input type="tel" id="signup-phone" placeholder="Enter your phone number" required>
        </div>
        <div class="form-group">
          <label for="signup-email">Email Address</label>
          <input type="email" id="signup-email" placeholder="Enter your email" required>
        </div>
        <div class="form-group">
          <label for="signup-password">Password</label>
          <input type="password" id="signup-password" placeholder="Create a password (min 6 characters)" required minlength="6">
        </div>
        <button type="submit" class="btn">Sign Up</button>
        <button onclick="window.location.href='main.html'">Login</button>

      </form>
      <div class="switch-form">
        Already have an account? <a id="show-signin">Sign In</a>
      </div>
    </div>
  </div>
</div>

<script>
// Initialize Supabase Client
// REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS
const SUPABASE_URL = 'https://mbdshqvhnniihvbiopod.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iZHNocXZobm5paWh2YmlvcG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0OTQwODIsImV4cCI6MjA3NjA3MDA4Mn0.gFHFwptPaz2yF5j48dnW8tb01DL0v245bRGrcgQP_eU';

let supabase = null;
let supabaseError = null;

// Check if credentials are set
if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
  supabaseError = 'Supabase credentials not configured';
  console.warn(⚠️ Please replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY with your actual Supabase credentials');
} else {
  try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase initialized successfully');
  } catch (error) {
    supabaseError = error.message;
    console.error('❌ Failed to initialize Supabase:', error);
  }
}

// DOM Elements
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showSignin = document.getElementById('show-signin');
const alertContainer = document.getElementById('alert-container');

// Switch between forms with smooth animation
function switchForms(hideForm, showForm) {
  clearAlert();
  hideForm.classList.add('fade-out');
  
  setTimeout(() => {
    hideForm.classList.add('hidden');
    hideForm.classList.remove('fade-out');
    showForm.classList.remove('hidden');
    showForm.classList.add('fade-in');
    
    setTimeout(() => {
      showForm.classList.remove('fade-in');
    }, 400);
  }, 300);
}

showSignup.addEventListener('click', (e) => {
  e.preventDefault();
  switchForms(signinForm, signupForm);
});

showSignin.addEventListener('click', (e) => {
  e.preventDefault();
  switchForms(signupForm, signinForm);
});

// Show alert message
function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  alertContainer.innerHTML = '';
  alertContainer.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.classList.add('fade-out');
    setTimeout(() => alertDiv.remove(), 300);
  }, 5000);
}

function clearAlert() {
  const alerts = alertContainer.querySelectorAll('.alert');
  alerts.forEach(alert => {
    alert.classList.add('fade-out');
    setTimeout(() => alert.remove(), 300);
  });
}

// Add error shake animation to input
function shakeInput(input) {
  input.classList.add('input-error');
  setTimeout(() => input.classList.remove('input-error'), 500);
}

// Sign In Handler
document.getElementById('signin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = e.target.querySelector('button');
  const originalText = button.textContent;
  
  const emailInput = document.getElementById('signin-email');
  const passwordInput = document.getElementById('signin-password');
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  if (!email || !password) {
    showAlert('Please fill in all fields', 'error');
    if (!email) shakeInput(emailInput);
    if (!password) shakeInput(passwordInput);
    return;
  }
  
  try {
    button.innerHTML = 'Signing In...<span class="loading"></span>';
    button.disabled = true;
    
    if (!supabase) {
      throw new Error('⚙️ Setup Required: Please add your Supabase URL and API key at the top of the HTML file.');
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    
    if (error) throw error;
    
    showAlert('Sign in successful! Welcome back 🎉', 'success');
    
    // Store user info in memory for the session
    if (data.user) {
      const userInfo = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || 'User',
        phone: data.user.user_metadata?.phone || ''
      };
      
      console.log('User logged in:', userInfo);
      
      // Redirect to main app after 1.5 seconds
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }
    
  } catch (error) {
    console.error('Sign in error:', error);
    showAlert(error.message || 'Sign in failed. Please check your credentials.', 'error');
    shakeInput(emailInput);
    shakeInput(passwordInput);
    button.innerHTML = originalText;
    button.disabled = false;
  }
});

// Sign Up Handler
document.getElementById('signup').addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = e.target.querySelector('button');
  const originalText = button.textContent;
  
  const nameInput = document.getElementById('signup-name');
  const phoneInput = document.getElementById('signup-phone');
  const emailInput = document.getElementById('signup-email');
  const passwordInput = document.getElementById('signup-password');
  
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // Validation
  if (!name || !phone || !email || !password) {
    showAlert('Please fill in all fields', 'error');
    if (!name) shakeInput(nameInput);
    if (!phone) shakeInput(phoneInput);
    if (!email) shakeInput(emailInput);
    if (!password) shakeInput(passwordInput);
    return;
  }
  
  // Validate phone number (10 digits)
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length !== 10) {
    showAlert('Please enter a valid 10-digit phone number', 'error');
    shakeInput(phoneInput);
    return;
  }
  
  // Validate password length
  if (password.length < 6) {
    showAlert('Password must be at least 6 characters long', 'error');
    shakeInput(passwordInput);
    return;
  }
  
  try {
    button.innerHTML = 'Creating Account...<span class="loading"></span>';
    button.disabled = true;
    
    if (!supabase) {
      throw new Error('⚙️ Setup Required: Please add your Supabase URL and API key at the top of the HTML file.');
    }
    
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          phone: phone
        }
      }
    });
    
    if (error) throw error;
    
    showAlert('Account created successfully! Please check your email to verify 📧', 'success');
    
    // Clear form
    e.target.reset();
    
    // Switch to sign in form after 2.5 seconds
    setTimeout(() => {
      switchForms(signupForm, signinForm);
    }, 2500);
    
  } catch (error) {
    console.error('Sign up error:', error);
    showAlert(error.message || 'Sign up failed. Please try again.', 'error');
    if (error.message.includes('email')) shakeInput(emailInput);
  } finally {
    button.innerHTML = originalText;
    button.disabled = false;
  }
});

// Check if user is already logged in
async function checkAuth() {
  if (!supabase) return;
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error('Auth check error:', error);
  }
}

// Check auth on page load
checkAuth();

// Listen for auth state changes
if (supabase) {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      console.log('User signed in:', session.user.email);
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out');
    }
  });
}

// Add input validation feedback
document.querySelectorAll('input[type="email"]').forEach(input => {
  input.addEventListener('blur', () => {
    if (input.value && !input.validity.valid) {
      shakeInput(input);
    }
  });
});

document.querySelectorAll('input[type="password"]').forEach(input => {
  input.addEventListener('blur', () => {
    if (input.value && input.value.length < 6) {
      shakeInput(input);
    }
  });
});
</script>
</body>
</html>	

