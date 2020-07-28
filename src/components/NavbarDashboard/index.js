import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Form, Nav, Navbar } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Menu from '../../components/Menu';
import { logout } from '../../services/auth';
import { Container, IconContainerButton } from './styles'
import { Link } from 'react-router-dom'
export default function NavBarDashboard(props) {
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setuserData(doc.data());
            });
          });
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      setuserData(false);
    };
  }, []);

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleLogout = () => {
    logout();
    firebase.auth().signOut();
    localStorage.clear();
    notifyError('Até logo!');
    props.history.push('/');
  };

  const redirectToShop = () => {
    props.history.push('/');
  };

  const redirectToCart = () => {
    props.history.push('/cart');
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: 'rgba(126,64,144,0.9)' }}>
      <Menu history={props.history} />
      <Link to="/dashboard">
        <Navbar.Brand style={{ color: '#fff' }}>
          <b>{`<JACODE/> XD`}</b>
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Form inline>
          <Container>

            <IconContainerButton>
              <IconButton
                color="inherit"
                onClick={redirectToShop}
                style={{ marginRight: 15, padding: 0 }}
              >
                <Badge color="secondary">
                  <StorefrontIcon />
                </Badge>
                <p style={{ fontSize: 12, margin: 2 }}>Loja</p>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={redirectToCart}
                style={{ marginRight: 15, padding: 0 }}
              >
                <Badge color="secondary">
                  <ShoppingCartIcon />
                </Badge>
                <p style={{ fontSize: 12, margin: 2 }}>Carrinho</p>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={handleLogout}
                style={{ margin: 0, padding: 0 }}
              >
                <Badge color="secondary">
                  <ExitToAppIcon />
                </Badge>
                <p style={{ fontSize: 12, margin: 2 }}>Sair</p>
              </IconButton>
            </IconContainerButton>

            <p style={{ padding: 0, margin: '10px 0px 0px 6px' }}>
              <b>Bem vindo:</b> {userData.name}
            </p>
          </Container>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
