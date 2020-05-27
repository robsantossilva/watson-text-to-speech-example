import React, { useState, useEffect }  from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import img from './static/watson.png';
import ListComentarios from './components/ListComentarios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from './services/api';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Robson dos Santos Silva'} | <a href={`https://github.com/robsantossilva`} target={`_blank`}>{'Github'}</a> | <a href={`https://www.linkedin.com/in/robson-dos-santos-59025230/`} target={`_blank`}>{'Linkedin'}</a> 
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/WEQbe2jBg40/1600x900)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    flexGrow: 1,
    padding: theme.spacing(10, 10),
    overflowY: 'scroll'
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  imgWatson: {
    marginBottom: 50
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function App() {
  const classes = useStyles();

  const [list, setList] = useState([]);
  const [comentario, setComentario] = useState('');  
  const [load, setLoad] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    if(comentario){
      
      setLoad(true);

      api.post('/watson/synthesize', {message:comentario})
          .then(response => {
            setList([response.data, ...list]);
            setLoad(false);
          })
      
      //setList([...list, {message:comentario}])
    }

    setComentario('');
  }

  function deleteAudio(id){
    if(id){
      setLoad(true);
      api.delete(`/comentarios/${id}`).then(response => {
        var newList = list.filter(
          function(value) { 
            return value.id !== id;
          }
        );
        setList(newList);
        setLoad(false);
      });
    }      
  }

  function getComentarios(){
    setLoad(true);
    api.get('/comentarios').then(response => {
      setList(response.data)
      setLoad(false);
    })
  }

  useEffect(() => {
    getComentarios();
  },[])

  return (
    <>
      <Grid container component="main" className={classes.root}>

        <CssBaseline />      

        <Grid item xs={12} sm={5} md={4} component={Paper} elevation={6} square 
        style={{backgroundColor:'#E2EFF7'}}>
          <div className={classes.paper}>
            
            <img src={img} alt="Watson" width={150} className={classes.imgWatson}/>

            <form className={classes.form} noValidate onSubmit={(e) => (handleSubmit(e))}>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="comentario"
                label="Comentário"
                name="comentario"
                autoComplete="comentario"
                autoFocus
                multiline
                value={comentario}
                onChange={(e)=> setComentario(e.target.value) }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Cadastrar
              </Button>

              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>

        <Grid item xs={12} sm={7} md={8} className={classes.image}>
          <ListComentarios list={list} deleteAudio={deleteAudio}/>
        </Grid>

      </Grid>

      <Backdrop className={classes.backdrop} open={load}>
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  );
}
