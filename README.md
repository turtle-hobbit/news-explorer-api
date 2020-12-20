# news-explorer-api  
## Удалённый сервер для дипломного проекта по поиску новостных статей, реализована авторизация
---
### Проект размещен на следующих адресах
  + http://api.news.students.nomoreparties.space/
  + http://www.api.news.students.nomoreparties.space/
  + https://api.news.students.nomoreparties.space/
  + https://www.api.news.students.nomoreparties.space/

<b>Публичный IP-адрес:</b> 84.201.169.61  
---
### Использование проекта с целью разработки
#### Установка
1. Скопируйте репозиторий с проектом на свой компьютер
2. Используя npm, установите зависимости командой:  
```
npm install
```

#### Запуск проекта 
1. Запустите сервер MongoDB командой:
```
mongod
```
1. Воспользуйтесь командами:  
```
npm run dev // запускает сервер на localhost:3000 с хот релоудом
npm run start // запускает сервер на localhost:3000
```
2. Чтобы увидеть результат работы, используйте Postman (или любой другой HTTP-клиент). Приложение обрабатывает следующие запросы:  
  + <b>GET</b>:  
http://localhost:3000/users/me - <em>возвращает объект с данными о текущем пользователе;</em>  
http://localhost:3000/articles - <em>возвращает объект с сохранёнными статьями пользователя;</em>  
  + <b>POST</b>:  
http://localhost:3000/signup (в теле запроса укажите поля name, email, password) - <em>создает пользователя;</em>
http://localhost:3000/signin (в теле запроса укажите поля email, password) - <em>возвращает JWT, если пользователь существует;</em>   
http://localhost:3000/articles (в теле запроса укажите поля keyword, title, text, date, source, link, image) - <em>создает статью;</em>  
  + <b>DELETE</b>:  
http://localhost:3000/articles/[article_id] - <em>удаляет статью по [article_id];</em>   
