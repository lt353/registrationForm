import React, {useState} from "react";

function RegistrationForm() {
  
  // TODO: Create state variables here
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // State variables for validation requirements. Sets the initial state to true for everything
  const [usernameReqs, setUsernameReqs] = useState({ longEnough: true, onlyLettersDigits: true });
  const [passwordReqs, setPasswordReqs] = useState({ longEnough: true, upperCaseChar: true, specialChar: true });

  // Add state variables for error types
  const [usernameErrorType, setUsernameErrorType] = useState(null);
  const [passwordErrorType, setPasswordErrorType] = useState(null);
  
  function handleSubmit(event) {
    // TODO: Complete this function
    event.preventDefault();
    // Check username requirements 
    const isLongEnough = username.length >= 4;
    const usernameRegex = /^[a-z0-9]+$/;  
    // .test() is a method that checks if the string matches the regex
    const hasValidChars = usernameRegex.test(username);
    
    // Determine which username error to show (if any)
    if (!isLongEnough) {
      setUsernameErrorType('length');
    } else if (!hasValidChars) {
      setUsernameErrorType('chars');
    } else {
      setUsernameErrorType(null);
    }

    // Check password requirements individually
    const isPasswordLongEnough = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$]/.test(password);

    // Update password requirements state 
    setPasswordReqs({
        longEnough: isPasswordLongEnough,
        upperCaseChar: hasUppercase,
        specialChar: hasSpecialChar
    });
    
    // Determine which password error to show (if any)
    if (!isPasswordLongEnough) {
        setPasswordErrorType('length');
    } else if (!hasUppercase) {
        setPasswordErrorType('uppercase');
    } else if (!hasSpecialChar) {
        setPasswordErrorType('special');
    } else {
        setPasswordErrorType(null);
    }

    // Only submit if all validations pass
    if (isLongEnough && hasValidChars && isPasswordLongEnough && hasUppercase && hasSpecialChar) {
        event.target.submit();
    }
  }
  
  return (
    <form onSubmit={handleSubmit} target="_blank" method="post"
      action="https://wp.zybooks.com/form-viewer.php">
      <p>
        <label htmlFor="username">Username:</label>
        <input type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />

        {/* TODO: Add username error messages */}   
        {/* Show exactly one username error based on type */}
        {usernameErrorType === 'length' && (
          <span className="error">Must be at least four characters.</span>
        )}
        {usernameErrorType === 'chars' && (
          <span className="error">Only lowercase letters and digits acceptable.</span>
        )}
    
        <label htmlFor="password">Password:</label>
        <input type="text"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        {/* TODO: Add password error messages */}
        {passwordErrorType === 'length' && (
          <span className="error">Must be at least six characters.</span>
        )}
        {passwordErrorType === 'uppercase' && (
          <span className="error">Must contain an uppercase character.</span>
        )}
        {passwordErrorType === 'special' && (
          <span className="error">Must contain one of: ! @ # $</span>
        )}

      </p>
      <p>
        <button>Register</button>
      </p>
    </form>
  );
}

export default RegistrationForm;