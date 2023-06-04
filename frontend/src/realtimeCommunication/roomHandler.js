import store from "../store/store";
import { setOpenRoom } from "../store/actions/roomActions";
import * as socketConnections from './socketConnection';

export const createNewRoom=()=>{
    store.dispatch(setOpenRoom(true,true));
    socketConnections.createNewRoom();
}