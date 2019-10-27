import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemText, Chip, Button, TextField, ListItemIcon } from "@material-ui/core";
import { Ctx } from "../../Store";
import NightMode from "../Nightmode";

export default function Dashboard() {
  //hooks
  const classes = useStyles();

  //Store Ctx
  const { allChats, sendChatAction, user } = useContext(Ctx);
  //   console.log(allChats);
  const topics = Object.keys(allChats);

  //Local state
  const [activeTopic, changeActiveTopic] = useState(topics[0]); //init state to [0]th topic
  const [textValue, changeTextValue] = useState("");

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5">Chat App</Typography>
        <Typography component="p">{activeTopic}</Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map(topic => (
                <ListItem key={topic} button onClick={e => changeActiveTopic(e.target.innerText)}>
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            <List>
              {allChats[activeTopic].map((chat, id) => (
                <div className={classes.flex} key={id}>
                  <Chip label={chat.from} />
                  <Typography variant="h6">{chat.msg}</Typography>
                </div>
              ))}
            </List>
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            id="standard-name"
            label="Message"
            className={classes.chatBox}
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              sendChatAction({ from: user, msg: textValue, topic: activeTopic });
              changeTextValue("");
            }}
          >
            send
          </Button>
        </div>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  chatBox: {
    width: "82%"
  },
  button: {
    width: "15%"
  }
}));
