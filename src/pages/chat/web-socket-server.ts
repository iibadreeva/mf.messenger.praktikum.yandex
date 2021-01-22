import Messege, {
  IChat,
  IInfo,
} from '../../components/messenger/messege/index';
import { Chat } from './chat';
import { ObjectType } from '../../types';
import { padleft } from '../../utils/actions';
import { ChatApi } from './chat-api';

interface IUsers {
  display_name?: string;
  first_name?: string;
  second_name?: string;
  id: number;
}

export default class WebSocketServer {
  chatId: number;
  url: string;
  public instance!: WebSocket;
  data: IChat[];
  users: IUsers[] = [];

  constructor(userId: number, chatId: number, tokenChat: string) {
    this.chatId = chatId;
    this.data = [];
    this.url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${tokenChat}`;
  }

  onOpen(): void {
    this.instance = new WebSocket(this.url);
    this.instance.addEventListener('open', () => {
      this.instance.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        })
      );
    });
  }

  onPing() {
    this.instance.send(
      JSON.stringify({
        content: '',
      })
    );
  }

  onSend(value: string) {
    this.instance.send(
      JSON.stringify({
        content: value,
        type: 'message',
      })
    );
  }

  onMessage(chat: Chat, myId: number, chatId: number): void {
    new ChatApi()
      .requestChatUser(chatId)
      .then((res) => JSON.parse(res.data))
      .then((data) => {
        this.users = data;
      });

    this.instance.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.type !== 'error') {
        if (data.length > 0 && this.chatId) {
          const newData: IChat[] = this.filterDate(data, myId);
          this.data = newData;

          if (newData) {
            chat.setProps({
              messege: new Messege({ currentChat: newData }).render(),
            });
          }
        } else if (Object.keys(data).length === 0) {
          chat.setProps({
            messege: new Messege({ currentChat: [] }).render(),
          });
        } else if (data.id && chat.idChat === chatId) {
          this.filterChat(data, myId);
          if (this.data.length > 0) {
            const last = this.data.length - 1;
            if (this.data[last].date === data.date) {
              this.data[last].info.push(data);
            } else {
              const item = {
                date: data.date,
                info: [data],
              };
              this.data.push(item);
            }
          } else {
            const item = {
              date: data.date,
              info: [data],
            };
            this.data.push(item);
          }

          chat.setProps({
            messege: new Messege({ currentChat: this.data }).render(),
          });
        }

        chat.handlerSendMessege();
        chat.scrollDown();
      }
    });
  }

  filterDate(data: ObjectType, myId: number): IChat[] {
    const newData = [].concat(
      data.map((a: ObjectType) => Object.assign({}, a))
    );
    newData.forEach((item: IInfo) => {
      this.filterChat(item, myId);
    });

    newData.sort(function (a: ObjectType, b: ObjectType) {
      a = new Date(a.time);
      b = new Date(b.time);
      return a < b ? -1 : a > b ? 1 : 0;
    });

    const group = newData.reduce((obj: ObjectType, item: ObjectType) => {
      obj[item.date] = obj[item.date] || [];
      obj[item.date].date = item.date;
      if (obj[item.date].info) {
        obj[item.date].info.push(item);
      } else {
        obj[item.date].info = [];
        obj[item.date].info.push(item);
      }

      return obj;
    }, {});

    return Object.keys(group).map((item) => group[item]);
  }

  filterChat(item: IInfo, myId: number) {
    if (item.user_id === myId || item.userId === myId) {
      item.isMy = true;
    } else if (this.users.length > 0) {
      this.users.forEach((user) => {
        if (item.user_id === user.id || item.userId === user.id) {
          item.user_name = user.display_name
            ? user.display_name
            : `${user.first_name} ${user.second_name}`;
        }
      });
    }
    item.date = item.time.slice(0, 10);
    const dayNow: Date = new Date();
    const mounth = padleft('00', dayNow.getMonth() + 1, true);
    const today = `${dayNow.getFullYear()}-${mounth}-${padleft(
      '00',
      dayNow.getDate(),
      true
    )}`;
    const yesterday = `${dayNow.getFullYear()}-${mounth}-${padleft(
      '00',
      dayNow.getDate() - 1,
      true
    )}`;
    if (item.date === today) {
      item.date = 'Сегодня';
    }
    if (item.date === yesterday) {
      item.date = 'Вчера';
    }
    item.timeOnly = item.time.slice(11, 16);
  }

  setClose() {
    this.instance.close();
  }

  onClose(chat: Chat) {
    this.instance.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        chat.idChat = undefined;
        chat.setProps({
          description:
            'Пожалуйста, выберите чат, чтобы начать обмен сообщениями',
        });
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
  }
}
