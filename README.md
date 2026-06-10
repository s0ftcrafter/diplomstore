# Nike Catalog — React + DummyJSON

Интернет-магазин на React с каталогом товаров из [DummyJSON API](https://dummyjson.com/docs/products).  
Проект выполнен как учебное веб-приложение с пагинацией, фильтрацией, корзиной и детальной страницей товара.

## Демо-функции

- Каталог товаров с API (`limit=12`, `skip`, `sortBy`, `order`)
- Пагинация через `react-paginate` (12 товаров на страницу)
- Фильтрация: по цене, мужские / женские / новинки
- Страница товара с галереей **Swiper** (`images[]`)
- Корзина с общей суммой
- Обработка ошибок и состояния загрузки
- Маршруты: `/home`, `/contacts`, `/about`, `/cart`, `/products/:id`

## Стек

| Технология | Назначение |
|------------|------------|
| React 19 + TypeScript | UI |
| Vite | Сборка |
| React Router | Маршрутизация |
| Zustand | Состояние (каталог, корзина) |
| Axios | HTTP-запросы |
| react-paginate | Пагинация |
| Swiper | Слайдер изображений |
| SCSS (CSS Modules) | Стили |

## API

Базовый URL: `https://dummyjson.com`

```
GET /products?limit=12&skip=0&sortBy=price&order=asc
GET /products/category/mens-shirts?limit=12&skip=0
GET /products/{id}
```

## Быстрый старт

```bash
# Клонировать репозиторий
git clone https://github.com/<username>/<repo>.git
cd <repo>

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
```

Откройте адрес из терминала (обычно `http://localhost:5173/home`).

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер с HMR |
| `npm run build` | Production-сборка в `dist/` |
| `npm run preview` | Просмотр production-сборки локально |
| `npm run lint` | Проверка ESLint |

## Структура проекта

```
src/
  api/              # Axios client и запросы к API
  components/       # UI-компоненты
  pages/            # Страницы приложения
  router/           # Константы маршрутов
  store/            # Zustand stores
  styles/           # Глобальные SCSS
  types/            # TypeScript типы
  utils/            # Утилиты (цена, скидка)
public/
  nike-logo.png     # Логотип и favicon
```

## Маршруты

| URL | Страница |
|-----|----------|
| `/` | редирект на `/home` |
| `/home` | Каталог товаров |
| `/products/:id` | Карточка товара |
| `/cart` | Корзина |
| `/contacts` | Контакты |
| `/about` | О нас |

## Деплой на Netlify

В проекте есть `netlify.toml` и `public/_redirects` — они нужны, чтобы React Router работал на хостинге (все URL отдают `index.html`).

### Через GitHub

1. Загрузите проект на GitHub
2. Зайдите на [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**
3. Подключите репозиторий — Netlify подхватит настройки из `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Нажмите **Deploy**

Сайт будет доступен по адресу `https://<имя>.netlify.app/home`

### Через Netlify CLI

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## Лицензия

MIT
