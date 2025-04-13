# <div align="center">🎓 UniLight - Мобильное приложение для университета</div>

<div align="center">
  
[![Version](https://img.shields.io/badge/Версия-1.0.0-blue?style=for-the-badge&logo=semver&logoColor=white)](https://github.com/Tighki/university-app)
[![License](https://img.shields.io/badge/Лицензия-MIT-green?style=for-the-badge&logo=license&logoColor=white)](https://github.com/Tighki/university-app/LICENSE)
[![Platform](https://img.shields.io/badge/Платформа-iOS%20%7C%20Android-lightgrey?style=for-the-badge&logo=react-native&logoColor=white)](https://github.com/Tighki/university-app)
  
<img src="https://i.imgur.com/LzOt80v.gif" width="800" alt="Демо"/>
  
</div>

<p align="center">
  <b>UniLight</b> - современное мобильное приложение для студентов и преподавателей, разработанное для упрощения учебного процесса и улучшения коммуникации внутри учебного заведения. Приложение предоставляет удобный интерфейс для доступа к расписанию занятий, управления учебными мероприятиями, создания заметок и других полезных функций.
</p>

<details>
<summary><b>✨ Основные возможности</b></summary>
<br>

- **Расписание занятий** — просмотр расписания с удобной навигацией по дням недели и учебным группам
- **Календарь мероприятий** — отслеживание важных университетских событий с возможностью фильтрации
- **Заметки** — создание и хранение учебных заметок с возможностью прикрепления к конкретным предметам
- **Личный профиль** — управление личной информацией, настройка уведомлений и персонализация
- **Административная панель** — для сотрудников университета с возможностью управления данными

</details>

## 📸 Скриншоты

<div align="center">
  <img src="./assets/screenshots/Экран входа.jpg" width="250" alt="Экран входа" style="margin-right: 15px"/>
  <img src="./assets/screenshots/Расписание занятий.jpg" width="250" alt="Расписание занятий" style="margin: 0 15px"/> 
  <img src="./assets/screenshots/Панель администратора.jpg" width="250" alt="Панель администратора" style="margin-left: 15px"/>
</div>

## 🛠️ Технический стек

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/React_Native-0.76.7-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Expo-52.0.0-000020?style=for-the-badge&logo=expo&logoColor=white"/>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/React_Navigation-6.x-6B52AE?style=for-the-badge&logo=react&logoColor=white"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Reanimated-3.16.1-FF5252?style=for-the-badge&logo=react&logoColor=white"/>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Vector_Icons-14.0.2-6B52AE?style=for-the-badge&logo=expo&logoColor=white"/>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Secure_Store-14.0.1-000020?style=for-the-badge&logo=expo&logoColor=white"/>
    </td>
  </tr>
</table>

</div>

## 💻 Установка и запуск

<div align="center">
  
<img src="https://user-images.githubusercontent.com/74038190/212750155-3ceddfbd-19d3-40a3-87af-8d329c8323c4.gif" width="500">
  
</div>

```bash
# Клонирование репозитория
git clone https://github.com/Tighki/university-app.git
cd university-app

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Запуск на Android
npm run android

# Запуск на iOS
npm run ios
```

<details>
<summary><b>📋 Требования для разработки</b></summary>
<br>
<div align="center">
  
![Node.js](https://img.shields.io/badge/Node.js-16.x_или_выше-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-8.x_или_выше-CB3837?style=flat-square&logo=npm&logoColor=white)
![Expo CLI](https://img.shields.io/badge/Expo_CLI-Последняя_версия-000020?style=flat-square&logo=expo&logoColor=white)
![Android](https://img.shields.io/badge/Android_Studio-Для_Android-3DDC84?style=flat-square&logo=android-studio&logoColor=white)
![iOS](https://img.shields.io/badge/Xcode-Для_iOS-1575F9?style=flat-square&logo=xcode&logoColor=white)
  
</div>
</details>

<details>
<summary><b>🏗️ Структура проекта</b></summary>
<br>

```
university-app/
├── assets/             # Изображения и медиа файлы
│   └── screenshots/    # Скриншоты приложения
├── src/
│   ├── components/     # Переиспользуемые компоненты
│   ├── data/           # Файлы с данными
│   ├── navigation/     # Настройка навигации
│   ├── screens/        # Основные экраны приложения
│   │   ├── admin/      # Экраны для администраторов
│   │   └── auth/       # Экраны аутентификации
│   ├── services/       # Сервисы для работы с данными
│   └── theme/          # Темы и стили
├── App.js              # Основной файл приложения
├── app.json            # Конфигурация Expo
└── package.json        # Зависимости проекта
```
</details>

## 🔧 Основные компоненты приложения

<div align="center">
  <table>
    <tr>
      <td align="center"><img src="https://img.shields.io/badge/🔐-Аутентификация-5C5C5C?style=for-the-badge"/></td>
      <td align="center"><img src="https://img.shields.io/badge/🧭-Навигация-5C5C5C?style=for-the-badge"/></td>
      <td align="center"><img src="https://img.shields.io/badge/📅-Расписание-5C5C5C?style=for-the-badge"/></td>
    </tr>
    <tr>
      <td align="center"><img src="https://img.shields.io/badge/🔔-Уведомления-5C5C5C?style=for-the-badge"/></td>
      <td align="center"><img src="https://img.shields.io/badge/💾-Хранилище-5C5C5C?style=for-the-badge"/></td>
      <td align="center"><img src="https://img.shields.io/badge/📊-Администрирование-5C5C5C?style=for-the-badge"/></td>
    </tr>
  </table>
</div>

## 🔜 Дорожная карта развития

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/216120981-b9507c36-0e04-4469-8e27-c99271b45ba5.png" width="500" alt="Дорожная карта">
</div>

- [ ] Интеграция с университетской системой управления обучением
- [ ] Мессенджер для общения между студентами и преподавателями
- [ ] Онлайн-доступ к учебным материалам и записям лекций
- [ ] Расширенная система уведомлений с push-оповещениями
- [ ] Электронные зачетные книжки и ведомости
- [ ] Поддержка офлайн-режима работы с полной синхронизацией

## 👨‍💻 Автор проекта

<div align="center">
  
[![GitHub](https://img.shields.io/badge/GitHub-Tighki-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tighki)
[![Telegram](https://img.shields.io/badge/Telegram-TighkiCult-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/TighkiCult)
[![Email](https://img.shields.io/badge/Email-tighki@mail.ru-005FF9?style=for-the-badge&logo=mail.ru&logoColor=white)](mailto:tighki@mail.ru)

<img src="https://github.com/Tighki/Tighki/blob/output/github-contribution-grid-snake-dark.svg" alt="Github Snake" width="100%">
  
</div>

## 🤝 Вклад в проект

<div align="center">
  <a href="https://github.com/Tighki/university-app/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=Tighki/university-app" alt="Контрибьюторы" />
  </a>
</div>

<p align="center">
  Мы приветствуем вклад в развитие проекта! Если вы хотите внести свой вклад, ознакомьтесь с нашими <a href="https://github.com/Tighki/university-app/blob/main/CONTRIBUTING.md">рекомендациями для контрибьюторов</a>.
</p>

## 📝 Лицензия

<div align="center">
  
[![MIT License](https://img.shields.io/badge/Лицензия-MIT-yellow?style=for-the-badge)](https://github.com/Tighki/university-app/LICENSE)
  
</div>

<p align="center">
  Проект распространяется под лицензией MIT. Смотрите файл LICENSE для получения дополнительной информации.
</p>

---

<div align="center">
  
**UniLight — сделаем учебу проще и удобнее! 📚✨**
  
<a href="https://github.com/Tighki/university-app">
  <img src="https://komarev.com/ghpvc/?username=Tighki&repo=university-app&style=for-the-badge&color=blueviolet" alt="Счетчик просмотров" />
</a>
  
</div>
