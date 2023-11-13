import React,{useState,useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import FormContainer from '../Components/FormContainer';
import Loader from '../Components/Loader';
import {useRegisterMutation} from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice';
import {toast} from 'react-toastify';

const RegisterScreen = () => {

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState(''); 
 const [confirmPassword, setConfirmPassword] = useState(''); 

 const dispatch = useDispatch();
 const navigate = useNavigate();


 const [register, {isLoading}] = useRegisterMutation();
 const {userInfo} = useSelector((state) => state.auth);

 const {search} = useLocation();
 const sp = new URLSearchParams(search);
 const redirect = sp.get('redirect') || '/';

 useEffect(()=>{
   if(userInfo){
    navigate(redirect);
   }
 },[userInfo, redirect, navigate]);
 
 const submitHandler = async(e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error('Password not matched');
      return;
    }else{
      try {
         const res = await register({name, email, password}).unwrap();
         dispatch(setCredentials({...res}));
         navigate(redirect);
     } catch (err) {
        toast.error(err?.data?.message || err.error); 
     }
    }  
 }

  return (
    <FormContainer>
       <h1>Sign Up</h1>
       <Form onSubmit={submitHandler}>
       <Form.Group controlId='name' className='my-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
               type='text'
               placeholder='Enter name'
               value={name}
               onChange={(e)=> setName(e.target.value)}
            />
        </Form.Group>
        <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
               type='email'
               placeholder='Enter email'
               value={email}
               onChange={(e)=> setEmail(e.target.value)}
            />
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
               type='password'
               placeholder='Enter password'
               value={password}
               onChange={(e)=> setPassword(e.target.value)}
            />
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
               type='password'
               placeholder='Confirm password'
               value={confirmPassword}
               onChange={(e)=> setConfirmPassword(e.target.value)}
            />
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
            Register
        </Button>
        {isLoading && <Loader/>}
       </Form>
       <Row className='my-3'>
         <Col>
         Already have an account?  <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
         
         </Col>
       </Row>
    </FormContainer>
  )
}

export default RegisterScreen;