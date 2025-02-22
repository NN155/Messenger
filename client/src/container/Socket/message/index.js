import messageService from '../../../services/messageService';

class MessageSocket {
    constructor(socket) {
        this.socket = socket;
        this.socket.on('message', (data) => {
            this.message(data);
        });
    }
    message(data) {
        switch (data.action) {
            case "create":
                this._create(data.payload);
                break;
        }
    }

    _create(data) {
        messageService.unshiftMessage({ chatId: data.chatId, message: data });
    }
}

export default MessageSocket;