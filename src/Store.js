import React, { createContext, useReducer } from "react";
import io from "socket.io-client";

export const Ctx = createContext();

function reducer(state, action) {
  //destructure action.payload
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        //pull topic , and use it as a key of object
        [topic]: [
          //bring old message {} here
          ...state[topic],
          {
            from: from,
            msg: msg
          }
        ]
      };
    default:
      return state;
  }
}

const initState = {
  general: [{ from: "dommy", msg: "piss off m8" }, { from: "ann", msg: "will dooo" }, { from: "dommy", msg: "good !" }],
  topic2: [{ from: "nasa", msg: "nanaanaasa" }, { from: "ann", msg: "wwwwwooow" }, { from: "nasa", msg: "rip !" }]
};

//init outside store scope because we dont want it to re-render every time store updates
let socket;

//generate random Id for user connected
const user = "user" + Math.random().toFixed(2) * 100;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

export default function Store(props) {
  const [allChats, dispatch] = useReducer(reducer, initState);

  if (!socket) {
    //start if not started already
    socket = io(":3210");
    socket.on("chat message", function(msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  return <Ctx.Provider value={{ allChats, sendChatAction, user }}>{props.children}</Ctx.Provider>;
}
