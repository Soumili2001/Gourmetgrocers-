import React from 'react'


function UserValidation(values) {
    const errors = {};
  
  const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.username != "" && values.username.trim().length < 2) {
      errors.username = "Minimum of 2 characters required";
    }
    else if (values.username.trim().length >10) {
        errors.username = "Maximum of 10 characters required";
    }
    if(values.password !="" && values.password.length<8){
        errors.password="Minimum of 8 characters required"
    }
   else if(values.password !="" && (!passwordRegex.test(values.password))){
     errors.password="The password must have at least one letter, one number and one special character"
   }
  
   if(values.email !="" && (!emailRegex.test(values.email))){
    errors.email="Invalid Email Address"
}

  if(values.fullname !="" && values.fullname.trim().length<5){
    errors.fullname="Minimum of 5 characters required"
  }

    return errors;
}
  
  export default UserValidation;
  