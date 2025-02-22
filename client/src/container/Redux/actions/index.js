import { addUser } from "../slices/users";
import { pushMessage, unshiftMessage, setMessage } from "../slices/messages";

class UserActions {
    static addUser = addUser;
}

class MessageActions {
    static pushMessage = pushMessage;
    static unshiftMessage = unshiftMessage;
    static setMessage = setMessage;
}

class Actions {
    static User = UserActions;
    static Message = MessageActions;
}

export default Actions;