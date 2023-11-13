import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Badge,Navbar, Nav, Container, NavLink, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {useLogoutMutation} from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';

const Header = () => {
   const {cartItems} = useSelector((state)=> state.cart);
   const {userInfo} = useSelector((state)=> state.auth);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [logoutApiCall] = useLogoutMutation();

   const logoutHandler = async () => {
   try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
   } catch (err) {
      console.log(err)
   }
   }

  return (
    <header>    
    <Navbar bg='dark' variant='dark ' expand='md' collapseOnSelect>
     <Container>
      <LinkContainer to='/'>
        <Navbar.Brand>
            Sell Shop
            </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
           <LinkContainer to='/cart'>  
           <NavLink>
            <FaShoppingCart/> Cart
            {
              cartItems.length > 0 && (
                <Badge pill style={{marginLeft: '5px'}}>
                  {cartItems.reduce((a,c)=> a + c.qty, 0)}
                </Badge>
              )
            }
           </NavLink>
           </LinkContainer>
           {userInfo ? (
            <NavDropdown title={userInfo.name} id="username">
             <LinkContainer to='/profile'>
              <NavDropdown.Item>Profile</NavDropdown.Item>
             </LinkContainer>
             <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
           ) : (
            <LinkContainer to='/login'> 
            <NavLink>
             <FaUser/> Sign In
             </NavLink>
            </LinkContainer>
           )}
           
          </Nav>
        </Navbar.Collapse>
     </Container>
    </Navbar>
    </header>
  )
}

export default Header