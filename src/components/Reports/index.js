import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CustomChart from '../CustomChart';

const useStyles = makeStyles((theme) => ({
  border: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '4px',
    borderColor: '#dedede',
    maxWidth: '80%',
  },

  card: {
    padding: '0 30px 0 30px',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#e5e0e0',
      borderRadius: '4px',
    },
  },
}));

function Reports() {
  const classes = useStyles();

  return (
    <>
      <Container
        className={classes.border}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div className={classes.card}>
            <h4>Total de Alunos: 15 </h4>
          </div>
          <div className={classes.card}>
            <h4>Cursos Ativos: 3 </h4>
          </div>
          <div className={classes.card}>
            <h4>Cursos Inativos: 4 </h4>
          </div>
        </div>
      </Container>
      <Container
        className={classes.border}
        style={{
          marginTop: '10px',
          padding: '10px',
          height: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CustomChart />
      </Container>
    </>
  );
}

export default Reports;
