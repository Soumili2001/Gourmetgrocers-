import React,{useContext, useEffect, useState}from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import img from '../../Images/vegetables.jpg'
import { Link,useNavigate } from 'react-router-dom'
import './AuthPage.css'
import Footer from '../../Components/Footer/Footer'
import { toast } from 'react-toastify';
import { createNewUser} from '../../Services/UserServices';
import UserValidation from '../../Components/Validations/UserValidation'

function Register() {
  const [values, setvalues] = useState({
    fullname: '',
    username: "",
    email: "",
    password:''
  });
   
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

  


    function handleInput(event) {
      const newObj = { ...values, [event.target.name]: event.target.value };
      setvalues(newObj);
    }
    

      const submitFormHandler = (event=>{
        event.preventDefault();
        if (errors.fullname || errors.username || errors.email || errors.password) {
          return toast.error("Enter correct details");
        }
        const user = {
          username : values.username,
          password : values.password,
          email : values.email,
          fullName : values.fullname
        }
    
        createNewUser(user).then(response=>{
          console.log(response);
          
          toast.success(response.message);
          navigate('/login');
        }).catch(err=>{
          console.log(err);
          if(err?.response?.status===400){
            const errors = err?.response?.data;
            console.log(errors);
            Object.entries(errors).forEach(([key, val]) => {
              toast.error(key + ": "+val);
            });
          }
          else{
          toast.error(err?.response?.data?.message)
          }
        });
      })
      useEffect(() => {
        setErrors(UserValidation(values));
      }, [values]);
    
  


  return (
    <div className='authPage'>
        <Navbar reloadnavbar={false} />
        <div className='authcont'>
            <img src={img} alt='register'/>
            <form className='authform' onSubmit={submitFormHandler}>
                <h1>SignUp</h1>
                <div className='formgroup'>
                    <label htmlFor='fullName'>Full Name</label>
                    <input  required type='text'id='fullName' name="fullname" onChange={handleInput} />
                    {errors.fullname && (
                        <span className="text-danger">{errors.fullname}</span>
                      )}
                </div>
                <div className='formgroup'>
                    <label htmlFor='username'>UserName</label>
                    <input required type='text'id='username' name="username" onChange={handleInput} />
                    {errors.username && (
                        <span className="text-danger">{errors.username}</span>
                      )}
                </div>
                
                <div className='formgroup-row'>
                <div className='formgroup'>
                    <label htmlFor='email'>Email</label>
                    <input required type='email'id='email'  style={{width:'100%'}} name="email"  onChange={handleInput} />
                    {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                </div>
                <div className='formgroup'>
                    <label htmlFor='password'>Password</label>
                    <input required type='password'id='password' style={{width:'100%'}} name="password" onChange={handleInput}/>
                    {errors.password && (
                        <span className="text-danger">{errors.password}</span>
                      )}
                </div>
              </div>
              
                <button className='btn' style={{marginTop:'20px'}}>Register</button>
                <h2 className='or'>OR</h2>
                <Link to ='/login' className='stylenone'><button className='btn'>Login</button></Link>
            </form>
        
               
        
        </div>
       
        <div style={{backgroundColor:'rgb(240,240,240)',width:'100%',height:'1vh'}}></div>
        <Footer/>

    </div>
  )
}

export default Register