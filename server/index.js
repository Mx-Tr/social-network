const express = require('express');
const { sequelize } = require('./models');
const routes = require('./routes');

const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(
	cors({
		origin: 'http://localhost:5173', // Vite-дев-сервер
		credentials: true, // нужны ли куки? если нет — убери
	})
);


app.use(express.json());
app.use('/api', routes);

sequelize
	.authenticate()
	.then(() => console.log('Соединение с БД установлено'))
	.catch((err) => console.error('Ошибка подключения к БД:', err));

sequelize
	.sync()
	.then(() => console.log('Модели синхронизированы'))
	.catch((err) => console.error('Ошибка синхронизации:', err));

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`);
});

