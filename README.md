# 🎓 UniLight - Университетское приложение

![Мобильное приложение для студентов, расписание занятий, оценки и задания, удобный интерфейс](https://readme-typing-svg.herokuapp.com?color=%234A80F0&center=true&vCenter=true&width=600&lines=Мобильное+приложение+для+студентов;Расписание+занятий;Оценки+и+задания;Удобный+интерфейс)

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React Navigation](https://img.shields.io/badge/React_Navigation-6B52AE?style=for-the-badge&logo=react&logoColor=white)](https://reactnavigation.org/)

## 📱 О проекте

**UniLight** - это современное мобильное приложение для студентов и преподавателей, разработанное с использованием React Native и Expo. Приложение предоставляет удобный доступ к университетским сервисам: расписанию занятий, учебным материалам, уведомлениям и многому другому.

```text
UniLight = Университет + Light (легкость использования)
```

## ✨ Ключевые возможности

| ![Расписание занятий](https://img.icons8.com/color/96/000000/calendar.png) Расписание занятий | ![Электронная библиотека](https://img.icons8.com/color/96/000000/book.png) Электронная библиотека | ![Уведомления и чаты](https://img.icons8.com/color/96/000000/chat.png) Уведомления и чаты | ![Учебные материалы](https://img.icons8.com/color/96/000000/graduation-cap.png) Учебные материалы |
|-----------------------------------------------------------------------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| ![Экзамены и тесты](https://img.icons8.com/color/96/000000/exam.png) Экзамены и тесты | ![Аудитории](https://img.icons8.com/color/96/000000/classroom.png) Аудитории | ![Настройки профиля](https://img.icons8.com/color/96/000000/settings.png) Настройки профиля | ![Push-уведомления](https://img.icons8.com/fluency/96/000000/appointment-reminders.png) Push-уведомления |

## 🆕 Последние обновления

- **Управление расписанием** - Администраторы теперь могут добавлять, удалять и редактировать расписание для студентов
- **Улучшенный интерфейс** - Переработаны формы и стили для более удобного использования
- **Оптимизация производительности** - Ускорена загрузка данных и отзывчивость приложения

## 📸 Скриншоты приложения

![Расписание занятий](https://github.com/Tighki/university-app/raw/main/assets/screenshots/Расписание%20занятий.jpg)
![Панель администратора](https://github.com/Tighki/university-app/raw/main/assets/screenshots/Панель%20администратора.jpg)
![Экран входа](https://github.com/Tighki/university-app/raw/main/assets/screenshots/Экран%20входа.jpg)

## 🚀 Быстрый старт

### 📥 Системные требования

- Node.js 14.0 или выше
- npm 6.0 или выше
- Expo CLI
- Android Studio или Xcode (для эмуляторов)
- Или мобильное устройство с установленным приложением Expo Go

### 📲 Установка и запуск

```bash
# 1. Клонируем репозиторий
git clone https://github.com/Tighki/university-app.git

# 2. Переходим в директорию проекта
cd university-app

# 3. Устанавливаем зависимости
npm install

# 4. Устанавливаем Expo CLI (если не установлен)
npm install -g expo-cli

# 5. Запускаем проект
npm start
# или
npx expo start
```

Для запуска на устройстве:

- Установите приложение Expo Go на ваше устройство
- Отсканируйте QR-код из терминала с помощью камеры (iOS) или приложения Expo Go (Android)

Для запуска на эмуляторе:

- После запуска `npm start`, нажмите `a` для запуска на Android-эмуляторе
- Или нажмите `i` для запуска на iOS-симуляторе

### 🧰 Структура проекта

```text
university-app/
├── assets/              # Изображения, шрифты и другие статические ресурсы
├── src/                 # Исходный код приложения
│   ├── components/      # Многоразовые компоненты
│   ├── data/            # Моковые данные
│   ├── navigation/      # Навигационная структура (react-navigation)
│   ├── screens/         # Экраны приложения
│   │   ├── admin/       # Административные экраны
│   │   ├── auth/        # Экраны авторизации
│   │   └── student/     # Экраны для студентов
│   ├── services/        # API и другие сервисы
│   └── theme/           # Стили и темы
├── .gitignore          # Игнорируемые Git-файлы
├── App.js              # Корневой компонент приложения
├── app.json            # Конфигурация Expo
├── index.js            # Точка входа
├── package.json        # Зависимости и скрипты NPM
└── README.md           # Документация проекта
```

## 🛠️ Технический стек

- **Frontend**: React Native, JavaScript
- **UI/UX**: React Native компоненты, Expo Vector Icons
- **Навигация**: React Navigation (Bottom Tabs, Stack)
- **Сборка и развертывание**: Expo
- **Анимации**: React Native Reanimated
- **Безопасность**: React Native Safe Area Context

## 📋 Планы на будущее

- Добавление личного кабинета преподавателя
- Интеграция с API университета
- Реализация уведомлений о начале занятий
- Темная тема
- Возможность загрузки и просмотра учебных материалов
- Мультиязычность

## 👨‍💻 Разработка и вклад

Мы приветствуем вклад в развитие проекта! Если вы хотите внести свой вклад:

1. Форкните репозиторий
2. Создайте ветку для ваших изменений
3. Внесите изменения и сделайте коммит
4. Отправьте пул-реквест

## 📞 Связь с нами

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tighki@mail.ru)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/TighkiCult)

---

### 🌟 Не забудьте поставить звездочку проекту

![Visitor counter](https://visitor-badge.glitch.me/badge?page_id=tighki.university-app)
