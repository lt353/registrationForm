import React, { useState } from "react";

function RegistrationForm() {
 // Initialize state variables for form inputs
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 
 // Initialize state for username validation requirements
 // Both start as true to avoid showing errors before form submission
 const [usernameReqs, setUsernameReqs] = useState({
   longEnough: true,        // Tracks if username is at least 4 characters
   onlyLettersDigits: true, // Tracks if username has only valid characters
 });
 
 // Initialize state for password validation requirements
 // All start as true to avoid showing errors before form submission
 const [passwordReqs, setPasswordReqs] = useState({
   longEnough: true,      // Tracks if password is at least 6 characters
   upperCaseChar: true,   // Tracks if password has at least one uppercase letter
   specialChar: true,     // Tracks if password has at least one special character
 });
 
 function handleSubmit(event) {
   // Prevent default form submission behavior, meaning the page won't refresh when
   // the form is submitted
   event.preventDefault();
   
   // Perform username validation
   const longEnough = username.length >= 4;
   const onlyLettersDigits = /^[a-z0-9]+$/.test(username);
   
   // Update username requirements state with validation results
   setUsernameReqs({ longEnough, onlyLettersDigits });
   
   // Perform password validation
   const pwLongEnough = password.length >= 6;
   const upperCaseChar = /[A-Z]/.test(password);
   const specialChar = /[!@#$]/.test(password);
   
   // Update password requirements state with validation results
   setPasswordReqs({
     longEnough: pwLongEnough,
     upperCaseChar,
     specialChar,
   });
   
   // Only submit the form if all validations pass
   if (
     longEnough &&
     onlyLettersDigits &&
     pwLongEnough &&
     upperCaseChar &&
     specialChar
   ) {
     // Submit the form if all validations pass
     event.target.submit();
   }
 }
 
 return (
   <form
     onSubmit={handleSubmit}
     target="_blank"
     method="post"
     action="https://wp.zybooks.com/form-viewer.php"
   >
     <p>
       <label htmlFor="username">Username:</label>
       <input
         type="text"
         id="username"
         name="username"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
       />
       {/* Show username length error only if that specific validation fails */}
       {!usernameReqs.longEnough && (
         <span className="error">Must be at least four characters.</span>
       )}
       {/* Show invalid character error ONLY if length is valid but chars are invalid */}
       {usernameReqs.longEnough && !usernameReqs.onlyLettersDigits && (
         <span className="error">
           Only lowercase letters and digits acceptable.
         </span>
       )}
     </p>
     <p>
       <label htmlFor="password">Password:</label>
       <input
         type="password" {/* Using password type for security */}
         id="password"
         name="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       />
       {/* Show password length error only if that specific validation fails */}
       {!passwordReqs.longEnough && (
         <span className="error">Must be at least six characters.</span>
       )}
       {/* Show uppercase error ONLY if length is valid but uppercase is missing */}
       {passwordReqs.longEnough && !passwordReqs.upperCaseChar && (
         <span className="error">Must contain an uppercase character.</span>
       )}
       {/* Show special char error ONLY if both length and uppercase are valid */}
       {passwordReqs.longEnough &&
         passwordReqs.upperCaseChar &&
         !passwordReqs.specialChar && (
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