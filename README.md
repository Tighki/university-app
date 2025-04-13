# UniLight - Мобильное приложение для университета

<div align="center">

![Version](https://img.shields.io/badge/Версия-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/Лицензия-MIT-green?style=for-the-badge)
![Platform](https://img.shields.io/badge/Платформа-iOS%20%7C%20Android-lightgrey?style=for-the-badge)
  
</div>

## 📱 О проекте

UniLight - это мобильное приложение для студентов и преподавателей, разработанное для упрощения учебного процесса и улучшения коммуникации внутри учебного заведения. Приложение предоставляет удобный интерфейс для доступа к расписанию занятий, управления учебными мероприятиями, создания заметок и прочих функций, необходимых для комфортной учебы.

## ✨ Основные возможности

- **Расписание занятий** — просмотр расписания с удобной навигацией по дням недели и учебным группам
- **Календарь мероприятий** — отслеживание важных университетских событий с возможностью фильтрации
- **Заметки** — создание и хранение учебных заметок с возможностью прикрепления к конкретным предметам
- **Личный профиль** — управление личной информацией, настройка уведомлений и персонализация
- **Административная панель** — для сотрудников университета с возможностью управления данными

## 📸 Скриншоты

<div align="center">
  <img src="./assets/screenshots/Экран входа.jpg" width="250" alt="Экран входа" style="margin-right: 10px"/>
  <img src="./assets/screenshots/Расписание занятий.jpg" width="250" alt="Расписание занятий" style="margin-right: 10px"/> 
  <img src="./assets/screenshots/Панель администратора.jpg" width="250" alt="Панель администратора"/>
</div>

## 🚀 Технический стек

<div align="center">

### Frontend
  
![React Native](https://img.shields.io/badge/React_Native-0.76.7-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-52.0.0-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Navigation](https://img.shields.io/badge/React_Navigation-6.x-6B52AE?style=for-the-badge&logo=react&logoColor=white)
  
### Анимации и стили
  
![React Native Reanimated](https://img.shields.io/badge/Reanimated-3.16.1-FF5252?style=for-the-badge&logo=react&logoColor=white)
![Expo Vector Icons](https://img.shields.io/badge/Vector_Icons-14.0.2-6B52AE?style=for-the-badge&logo=expo&logoColor=white)
  
### Хранение данных
  
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-2.1.2-0069FF?style=for-the-badge&logo=react&logoColor=white)
![Expo Secure Store](https://img.shields.io/badge/Secure_Store-14.0.1-000020?style=for-the-badge&logo=expo&logoColor=white)

</div>

## 💻 Установка и запуск

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

# Запуск в веб-браузере
npm run web
```

### Требования

<div align="center">
  
![Node.js](https://img.shields.io/badge/Node.js-16.x_или_выше-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-8.x_или_выше-CB3837?style=flat-square&logo=npm&logoColor=white)
![Expo CLI](https://img.shields.io/badge/Expo_CLI-Последняя_версия-000020?style=flat-square&logo=expo&logoColor=white)
![Android](https://img.shields.io/badge/Android_Studio-Для_Android-3DDC84?style=flat-square&logo=android-studio&logoColor=white)
![iOS](https://img.shields.io/badge/Xcode-Для_iOS-1575F9?style=flat-square&logo=xcode&logoColor=white)
  
</div>

## 🏗️ Структура проекта

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

## 🔧 Основные компоненты приложения

<div align="center">
  <table>
    <tr>
      <td align="center"><img src="https://img.shields.io/badge/🔐-333333?style=for-the-badge"/><br/>Аутентификация</td>
      <td align="center"><img src="https://img.shields.io/badge/🧭-333333?style=for-the-badge"/><br/>Навигация</td>
      <td align="center"><img src="https://img.shields.io/badge/📅-333333?style=for-the-badge"/><br/>Расписание</td>
    </tr>
    <tr>
      <td align="center"><img src="https://img.shields.io/badge/🔔-333333?style=for-the-badge"/><br/>Уведомления</td>
      <td align="center"><img src="https://img.shields.io/badge/💾-333333?style=for-the-badge"/><br/>Хранилище</td>
      <td align="center"><img src="https://img.shields.io/badge/📊-333333?style=for-the-badge"/><br/>Администрирование</td>
    </tr>
  </table>
</div>

## 🔜 Планы по развитию

- [ ] Интеграция с университетской системой управления обучением
- [ ] Мессенджер для общения между студентами и преподавателями
- [ ] Онлайн-доступ к учебным материалам и записям лекций
- [ ] Расширенная система уведомлений с push-оповещениями
- [ ] Электронные зачетные книжки и ведомости
- [ ] Поддержка офлайн-режима работы с полной синхронизацией

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие проекта! Если вы хотите внести свой вклад:

1. Форкните репозиторий
2. Создайте ветку для вашей функции (`git checkout -b feature/amazing-feature`)
3. Закоммитьте ваши изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в ваш форк (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📝 Лицензия

<div align="center">
  
![MIT License](https://img.shields.io/badge/Лицензия-MIT-yellow?style=for-the-badge)
  
</div>

Проект распространяется под лицензией MIT. Смотрите файл LICENSE для получения дополнительной информации.

## 👨‍💻 Авторы и контакты

<div align="center">
  
[![GitHub](https://img.shields.io/badge/GitHub-Tighki-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tighki)
[![Telegram](https://img.shields.io/badge/Telegram-TighkiCult-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/TighkiCult)
[![Email](https://img.shields.io/badge/Email-tighki@mail.ru-005FF9?style=for-the-badge&logo=mail.ru&logoColor=white)](mailto:tighki@mail.ru)

</div>

---

<div align="center">
  
**UniLight — сделаем учебу проще и удобнее! 📚✨**

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Tighki.university-app)
  
</div>
