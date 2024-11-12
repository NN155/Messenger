import { addUser } from "../slices/users";
import { addMessage } from "../slices/messages";

class UserActions {
    static addUser = addUser;
}

class MessageActions {
    static addMessage = addMessage;
}

class Actions {
    static User = UserActions;
    static Message = MessageActions;
}

export default Actions;