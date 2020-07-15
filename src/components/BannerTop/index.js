import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Banner from '../../assets/banner.png';
import FreeAccount from '../../assets/freeaccount.png';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function BannerTop(props) {
  const classes = useStyles();
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputCellphone, setInputCellphone] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [progress, setProgress] = useState(false);

  const notifySuccess = (message, time) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: time || 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const notifyError = (message, time) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: time || 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    let date = new Date();

    setProgress(true);

    const name = inputName;

    if (
      inputName.trim() !== '' &&
      inputEmail.trim() !== '' &&
      inputPassword !== '' &&
      inputConfirmPassword !== '' &&
      inputCellphone !== ''
    ) {
      if (inputPassword === inputConfirmPassword) {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(inputEmail.trim(), inputPassword)
          .then(function (success) {
            const cloudFirestore = firebase.firestore();

            cloudFirestore
              .collection('users')
              .add({
                name,
                email: success.user.email,
                cellphone: inputCellphone,
                uid: success.user.uid,
                userType: 'student',
                createdAt: date,
                id: '',
              })
              .then(function (doc) {
                cloudFirestore.collection('users').doc(doc.id).update({
                  id: doc.id,
                });
                notifySuccess('Parabéns!');
                props.history.push('/sign-in');
                setProgress(false);
              })
              .catch(function (error) {
                console.error('Error adding domcument', error);
              });
          })
          .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            notifyError(error.message, 4000);
            setProgress(false);
            console.log(errorCode, errorMessage);
          });
      } else {
        notifyError('Password does not match!');
        setProgress(false);
      }
    } else {
      notifyError('Preencha todos os campos');
      setProgress(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '50%',
        }}
      >
        <div className={classes.paper}>
          <img
            src={FreeAccount}
            alt="free account"
            style={{ position: 'relative', width: '600px' }}
          />
          <form
            className={classes.form}
            onSubmit={handleRegister}
            style={{ maxWidth: '300px' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  value={inputEmail}
                  onChange={(event) => setInputEmail(event.target.value)}
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            {progress ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: 20,
                }}
              >
                <CircularProgress />
                <p style={{ margin: 10 }}>Aguarde...</p>
              </div>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: 'rgba(126,64,144,1)', color: '#fff' }}
                className={classes.submit}
              >
                Matricule-se
              </Button>
            )}
          </form>
        </div>
      </div>
      <img src={Banner} alt="image" style={{ width: '800px' }} />
    </div>
  );
}
