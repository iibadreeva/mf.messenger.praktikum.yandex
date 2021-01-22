[![github](https://img.shields.io/badge/github-%23100000.svg?&style=for-the-badge&logo=github&logoColor=white)](https://github.com/iibadreeva)
[![html](https://img.shields.io/badge/html-%23239120.svg?&style=for-the-badge&logo=html5&logoColor=white)](https://www.w3.org/html/)
[![css](https://img.shields.io/badge/css-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/css/)
[![javascript](https://img.shields.io/badge/javascript-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://learn.javascript.ru/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://www.typescriptlang.org/)
[![webpack](https://img.shields.io/badge/webpack-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://webpack.js.org/)
[![ESLint](https://img.shields.io/badge/ESLint-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://eslint.org/)
[![Docker](https://img.shields.io/badge/Docker-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://www.docker.com/)
[![heroku](https://img.shields.io/badge/heroku-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://help.heroku.com/)
[![websocket](https://img.shields.io/badge/websocket-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://ru.wikipedia.org/wiki/WebSocket)
[![яндекс](https://img.shields.io/badge/яндекс-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://praktikum.yandex.ru/profile/middle-frontend/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/31a244ad-39e0-458e-887f-1ba2d2a1969a/deploy-status)](https://messenger-ya.netlify.app)

## Описание
- Статику раздает `express` на `nodejs`;
- Защита от DOS атак`express-rate-limit`;
- Верстка `HTML`, `CSS`, `БЭМ`;
- Проэкт написан с использование `SCSS` `TYPESCRIPT`
- Реализация `fetch`;
- Тесты написаны на `Jest`;
- Настроен `webpack`
- Настроена Docker-сборка
- Размещена в Heroku проект с Docker-сборкой.
- Настроен `ESLint`
- Настроен `precommit`
- Настроен `stylelint`
- Реализован обмен сообщениями через `websocket`;

# Актуальная версия с heroku
- [herolu](https://boiling-depths-84255.herokuapp.com/)

# Стара версия с netlify
- [netlify](https://messenger-ya.netlify.app/)


# Примеры с express
- «[404](http://localhost:9000/404)»,
- «[500](http://localhost:9000/500)»,
- «[авторизация](http://localhost:9000/login)»,
- «[регистрация](http://localhost:9000/registration)»,
- «[список чатов](http://localhost:9000/chat)»,
- «[настройки пользователя](http://localhost:9000/profile)»,
- «[настройки пользователя - Изменить данные](http://localhost:9000/change)»,
- «[настройки пользователя - Изменить пароль](http://localhost:9000/password)»,

# Скачать пакеты
```sh
npm i
```

# Запуск локального сервера
```sh
npm run div
```

# Собрать проэкт
```sh
npm run build
```

# Запуск теста
```sh
npm run test
```

# Линтинг кода в директории src
```sh
npm run lint
```

# Линтинг стилей в директории src
```sh
npm run lint:style
```

# Линтинг и автоматическое исправление кода в директории src
```sh
npm run lint:fix
```

### Messenger
![Main](https://github.com/iibadreeva/mf.messenger.praktikum.yandex/blob/static/ui/messenger.jpg?raw=true)

### Прототипы продукта
- Все прототипы добавлены в папку ui
- [Все прототипы нарисованы в фигме] (https://www.figma.com/file/U231IzddXYdWHF7iligDza/Messenger?node-id=0%3A1)

Деплой Docker-сборкой приложения на heroku
 ```sh
#Залогиниться в реестре
heroku container:login

# пуш докер-образа из репозитория
heroku container:push web

# релиз версии
heroku container:release web

# открыть приложение
heroku open

# посмотреть логи
heroku logs

# перезапустить сервис
heroku restart

# релизы
heroku releases
 ```
 
 