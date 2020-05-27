import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import Forward from '@material-ui/icons/Forward';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: 'rgba(255,255,255,0.80)',
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  inline: {
    display: 'inline',
  },
  title: {
    color: '#333'
  }
}));

export default function ListComentarios({list, deleteAudio}) {
  
  const classes = useStyles();

  function playAudio(audio){
    var url = `${process.env.REACT_APP_URL_BACKEND}/audio/${audio}`;
    audio = new Audio(url);
    audio.play();
    //audio.addEventListener('ended', hideButton);
  }

  return (
    <>
      <Typography variant="h5" className={classes.title}>Comentários</Typography>
      <List className={classes.list}>
        
        { list.map((item) =>
          <div key={item.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Forward color="disabled" />
              </ListItemAvatar>

              <ListItemText
                primary={item.message}
              />

              <ListItemSecondaryAction>
                <IconButton style={{color:'#DE4E4D'}} edge="end" aria-label="comments" onClick={() => playAudio(item.audio)}>
                  <MicIcon />
                </IconButton>

                <IconButton edge="end" aria-label="comments" onClick={() => deleteAudio(item.id)}>
                  <DeleteIcon />
                </IconButton>
                

              </ListItemSecondaryAction>

            </ListItem>        
            <Divider variant="inset" component="li" />
          </div>
        )}

      </List>
    </>
  );
}