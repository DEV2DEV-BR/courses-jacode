import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Tooltip, IconButton } from '@material-ui/core';
import { Save, Clear } from '@material-ui/icons';
import firebase from 'firebase';
import { notify } from '../../util/toast';

const FormAboutMe = () => {
  const [input, setInput] = useState('');
  const [progressLoad, setProgressLoad] = useState(false);

  const loadData = () => {
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setInput(doc.data().aboutMe);
            });
          });
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRegister = () => {
    setProgressLoad(true);
    const db = firebase.firestore();

    var userRef = db.collection('users').doc(localStorage.getItem('user'));

    // Update successful.
    userRef
      .update({
        aboutMe: input,
      })
      .then(function () {
        // upload image
        notify('Dados atualizados com sucesso!', 1000, 'success');

        setProgressLoad(false);
        // end upload
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
        notify('Falha ao atualizar os dados!', 1000, 'error');
        setProgressLoad(false);
      });
  };

  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control
          as="textarea"
          rows="6"
          value={input}
          placeholder="Faça uma boa descrição para que os recrutadores te conheçam melhor."
          onChange={(event) => setInput(event.target.value)}
        />
      </Form.Group>
      <Tooltip title="Salvar Alterações" placement="bottom-start">
        <IconButton
          aria-label="save"
          onClick={() => handleRegister()}
          disabled={progressLoad}
        >
          <Save />
        </IconButton>
      </Tooltip>
      <Tooltip title="Limpar" placement="bottom-start">
        <IconButton
          aria-label="save"
          onClick={() => setInput('')}
          disabled={progressLoad}
        >
          <Clear />
        </IconButton>
      </Tooltip>
    </Form>
  );
};

export default FormAboutMe;
