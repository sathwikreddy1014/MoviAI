export const checkValidData = (Email, Password, Name) => {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(Password);
    const isNameValid = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(Name);

    if (!isEmailValid) return "Email is not valid";
    if (!isPasswordValid) return "Password must be at least 8 characters with uppercase, lowercase, and number";
    if (Name && !isNameValid) return "Please enter a valid full name";
    
    return null;
};