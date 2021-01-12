export interface IContext {
  description: string;
  avatar: {
    image: string;
  };
  search: {
    type: string;
    config: {
      type: string;
      placeholder: string;
      value: string;
    };
  };
}

export const context: IContext = {
  description: 'Пожалуйста, выберите чат, чтобы начать обмен сообщениями',
  avatar: {
    image: '',
  },
  search: {
    type: 'search',
    config: {
      type: 'text',
      placeholder: 'Поиск',
      value: '',
    },
  },
};
