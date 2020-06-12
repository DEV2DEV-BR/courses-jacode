import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import Certificates from '../../components/Certificates';
import Copyright from '../../components/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function MyCertificates(props) {
  const classes = useStyles();

  const [history, setHistory] = useState(props.history);

  useEffect(() => {
    return () => {
      setHistory('');
    };
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <div className={classes.appBarSpacer} />
      </div>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Certificates
              hours="5,5"
              name="Daniel de Andrade Lopes"
              courseName="Programador Android 2020"
              date="10/01/2021"
              author="Daniel Lopes"
              urlSignature="https://firebasestorage.googleapis.com/v0/b/jacode-stg.appspot.com/o/31-05-2020_17-33-01.png?alt=media&token=b27927fd-7aa3-4264-ae08-13740060608d"
              school="JACODE CURSOS"
              site="www.jacode.com.br"
            />
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
