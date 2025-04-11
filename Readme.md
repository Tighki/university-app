<div align="center">
  
# 🎓 UniLight - Университетское приложение

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=2196F3&center=true&vCenter=true&width=435&lines=Умное+приложение+для+учебы;Удобный+доступ+к+расписанию;Цифровая+библиотека;Безопасность+и+производительность" alt="Typing SVG" />

<p align="center">
<a href="https://reactnative.dev/" target="_blank">
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native"/>
</a>
<a href="https://expo.dev/" target="_blank">
<img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/>
</a>
<a href="https://www.javascript.com/" target="_blank">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
</a>
<a href="https://reactnavigation.org/" target="_blank">
<img src="https://img.shields.io/badge/React_Navigation-6B52AE?style=for-the-badge&logo=react&logoColor=white" alt="React Navigation"/>
</a>
<a href="https://github.com/expo/vector-icons" target="_blank">
<img src="https://img.shields.io/badge/Expo_Icons-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo Icons"/>
</a>
</p>

<img src="https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake.svg" alt="snake" style="max-width: 100%;"/>

</div>

## 📱 О проекте

**UniLight** - это современное мобильное приложение для студентов и преподавателей, разработанное с использованием React Native и Expo. Приложение предоставляет удобный доступ к университетским сервисам: расписанию занятий, учебным материалам, уведомлениям и многому другому.

<div align="center">

```text
UniLight = Университет + Light (легкость использования)
```

</div>

## ✨ Ключевые возможности

<div align="center">

<table>
<tr>
<td align="center">
<img width="64" src="https://img.icons8.com/color/96/000000/calendar.png"/>
<br/>Расписание занятий
</td>
<td align="center">
<img width="64" src="https://img.icons8.com/color/96/000000/book.png"/>
<br/>Электронная библиотека
</td>
<td align="center">
<img width="64" src="https://img.icons8.com/color/96/000000/chat.png"/>
<br/>Уведомления и чаты
</td>
<td align="center">
<img width="64" src="https://img.icons8.com/color/96/000000/graduation-cap.png"/>
<br/>Учебные материалы
</td>
</tr>
<tr>
<td align="center">
<img width="64" src="https://img.icons8.com/color/96/000000/exam.png"/>
<br/>Экзамены и тесты
</td>
<td align="center">
<img width="64" src="https://img.icons8.com/color/96/000000/classroom.png"/>
<br/>Аудитории
</td>
<td align="center">
<img width="64" src="https://img.icons8.com/color/96/000000/settings.png"/>
<br/>Настройки профиля
</td>
<td align="center">
<img width="64" src="https://img.icons8.com/color/96/000000/notification.png"/>
<br/>Push-уведомления
</td>
</tr>
</table>

</div>

## 🚀 Быстрый старт

<details open>
<summary>📥 Системные требования</summary>

* Node.js 14.0 или выше
* npm 6.0 или выше
* Expo CLI
* Android Studio или Xcode (для эмуляторов)
* Или мобильное устройство с установленным приложением Expo Go

</details>

<details open>
<summary>📲 Установка и запуск</summary>

```bash
# 1. Клонируем репозиторий
git clone https://github.com/YourUsername/unilight.git

# 2. Переходим в директорию проекта
cd unilight

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

</details>

<details>
<summary>🧰 Структура проекта</summary>

```
unilight/
├── assets/              # Изображения, шрифты и другие статические ресурсы
├── src/                 # Исходный код приложения
│   ├── components/      # Многоразовые компоненты
│   ├── navigation/      # Навигационная структура (react-navigation)
│   ├── screens/         # Экраны приложения
│   ├── services/        # API и другие сервисы
│   └── utils/           # Вспомогательные функции
├── .gitignore          # Игнорируемые Git-файлы
├── App.js              # Корневой компонент приложения
├── app.json            # Конфигурация Expo
├── babel.config.js     # Конфигурация Babel
├── index.js            # Точка входа
├── package.json        # Зависимости и скрипты NPM
└── README.md           # Документация проекта
```

</details>

## 🛠️ Технический стек

* **Frontend**: React Native, JavaScript
* **UI/UX**: React Native компоненты, Expo Vector Icons
* **Навигация**: React Navigation (Bottom Tabs, Stack)
* **Сборка и развертывание**: Expo
* **Анимации**: React Native Reanimated
* **Безопасность**: React Native Safe Area Context

## 🔄 Обновления и планы

- [x] Основная структура приложения
- [x] Настройка навигации
- [ ] Разработка экрана авторизации
- [ ] Интеграция с API университета
- [ ] Реализация уведомлений
- [ ] Оптимизация для tablets
- [ ] Темная тема

## 👨‍💻 Разработка и вклад

Мы приветствуем вклад в развитие проекта! Если вы хотите внести свой вклад:

1. Форкните репозиторий
2. Создайте ветку для ваших изменений
3. Внесите изменения и сделайте коммит
4. Отправьте пул-реквест

## 📞 Связь с нами

<div align="center">

[![Email](https://img.shields.io/badge/Email-Поддержка-blue?style=for-the-badge&logo=mail.ru)](mailto:tighki@mail.ru)
[![Telegram](https://img.shields.io/badge/Telegram-Чат_разработчиков-blue?style=for-the-badge&logo=telegram)](https://t.me/TighkiCult)

<img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical" alt="Random Quote"/>

</div>

---

<div align="center">
  
### 🌟 Не забудьте поставить звездочку проекту!

<img src="https://raw.githubusercontent.com/BrunnerLivio/brunnerlivio/master/images/marquee.svg" alt=""/>

![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FYourUsername%2Funilight&label=Посетители&labelColor=%23697689&countColor=%232ccce4)

</div> 