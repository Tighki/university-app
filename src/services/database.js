import { schedule as mockSchedule } from '../data/schedule';

// Имитация хранилища данных
const mockStorage = {
  users: [
    { id: 1, username: 'student', password: 'password123', full_name: 'Дизенко Марк', group_number: '555ис', course: 4, is_admin: 0 },
    { id: 2, username: 'admin', password: 'admin123', full_name: 'Администратор', group_number: 'Администрация', course: 0, is_admin: 1 }
  ],
  schedule: [], // Будет заполнено из mockSchedule
  grades: [],
  notes: []
};

// Добавляем словари для перевода дней недели и типов занятий
const dayTranslations = {
  // Русские в английские
  'пн': 'mon', 'вт': 'tue', 'ср': 'wed', 'чт': 'thu', 'пт': 'fri', 'сб': 'sat', 'вс': 'sun',
  // Английские в английские (для обратной совместимости)
  'mon': 'mon', 'tue': 'tue', 'wed': 'wed', 'thu': 'thu', 'fri': 'fri', 'sat': 'sat', 'sun': 'sun'
};

const dayReverseTranslations = {
  'mon': 'пн', 'tue': 'вт', 'wed': 'ср', 'thu': 'чт', 'fri': 'пт', 'sat': 'сб', 'sun': 'вс'
};

const typeTranslations = {
  // Русские в английские
  'лекция': 'lecture', 'практика': 'practice', 'лабораторная': 'lab',
  // Английские в английские (для обратной совместимости)
  'lecture': 'lecture', 'practice': 'practice', 'lab': 'lab'
};

const typeReverseTranslations = {
  'lecture': 'лекция', 'practice': 'практика', 'lab': 'лабораторная'
};

// Преобразуем mockSchedule в формат для нашего хранилища
Object.keys(mockSchedule).forEach(day => {
  mockSchedule[day].forEach((lesson, index) => {
    mockStorage.schedule.push({
      id: 100 + index, // Уникальные ID для каждого занятия
      user_id: 1, // ID студента
      day,
      subject: lesson.subject,
      teacher: lesson.teacher,
      room: lesson.room,
      type: lesson.type,
      start_time: lesson.startTime,
      end_time: lesson.endTime
    });
  });
});

// Генерируем случайные оценки для предметов
const subjects = [...new Set(mockStorage.schedule.map(item => item.subject))];
subjects.forEach((subject, index) => {
  const grade = Math.floor(Math.random() * 2) + 4; // 4 или 5
  const attendance = `${Math.floor(Math.random() * 11) + 90}%`; // 90-100%
  const status = grade === 5 ? 'Отл.' : 'Хор.';
  
  mockStorage.grades.push({
    id: index + 1,
    user_id: 1,
    subject,
    grade,
    attendance,
    status
  });
});

// Фиктивный объект db для совместимости с остальным кодом
const db = {
  transaction: (callback) => {
    return new Promise((resolve, reject) => {
      // Создаем фиктивный объект транзакции
      const tx = {
        executeSql: (query, params, successCallback, errorCallback) => {
          console.log(`SQL: ${query.substring(0, 50)}${query.length > 50 ? '...' : ''}`);
          
          try {
            let result = { rows: { length: 0, item: (index) => null }, insertId: null, rowsAffected: 0 };
            
            // Имитация выполнения SELECT запросов
            if (query.toLowerCase().startsWith('select')) {
              let rows = [];
              
              // Имитация запросов к users
              if (query.includes('FROM users')) {
                if (params && params.length > 0) {
                  if (query.includes('WHERE username = ?')) {
                    rows = mockStorage.users.filter(user => user.username === params[0]);
                  } else if (query.includes('WHERE id = ?')) {
                    rows = mockStorage.users.filter(user => user.id === params[0]);
                  } else if (query.includes('WHERE username = ? AND password = ?')) {
                    rows = mockStorage.users.filter(user => user.username === params[0] && user.password === params[1]);
                  }
                } else {
                  rows = [...mockStorage.users];
                }
              }
              
              // Имитация запросов к schedule
              else if (query.includes('FROM schedule')) {
                if (params && params.length > 0 && query.includes('WHERE user_id = ?')) {
                  rows = mockStorage.schedule.filter(item => item.user_id === params[0]);
                } else {
                  rows = [...mockStorage.schedule];
                }
                
                // Обработка случая DISTINCT subject
                if (query.includes('DISTINCT subject')) {
                  const distinctSubjects = [...new Set(rows.map(row => row.subject))];
                  rows = distinctSubjects.map(subject => ({ subject }));
                }
              }
              
              // Имитация запросов к grades
              else if (query.includes('FROM grades')) {
                if (params && params.length > 0 && query.includes('WHERE user_id = ?')) {
                  rows = mockStorage.grades.filter(item => item.user_id === params[0]);
                } else {
                  rows = [...mockStorage.grades];
                }
              }
              
              // Имитация запросов к notes
              else if (query.includes('FROM notes')) {
                if (params && params.length > 0 && query.includes('WHERE user_id = ?')) {
                  rows = mockStorage.notes.filter(item => item.user_id === params[0]);
                } else {
                  rows = [...mockStorage.notes];
                }
              }
              
              // Создаем объект результата для SELECT запросов
              result = {
                rows: {
                  length: rows.length,
                  item: (index) => rows[index] || null,
                  _array: rows
                },
                insertId: null,
                rowsAffected: 0
              };
            }
            
            // Имитация выполнения INSERT запросов
            else if (query.toLowerCase().startsWith('insert')) {
              let insertId = Math.floor(Math.random() * 1000) + 100; // случайный ID для вставки

              // Определим таблицу для вставки
              if (query.includes('INTO notes')) {
                const note = {
                  id: insertId,
                  user_id: params[0],
                  title: params[1],
                  content: params[2],
                  created_at: params[3]
                };
                mockStorage.notes.push(note);
              } else if (query.includes('INTO users')) {
                const user = {
                  id: insertId,
                  username: params[0],
                  password: params[1],
                  full_name: params[2],
                  group_number: params[3],
                  course: params[4],
                  is_admin: params[5]
                };
                mockStorage.users.push(user);
              } else if (query.includes('INTO schedule')) {
                const scheduleItem = {
                  id: insertId,
                  user_id: params[0],
                  day: params[1],
                  subject: params[2],
                  teacher: params[3],
                  room: params[4],
                  type: params[5],
                  start_time: params[6],
                  end_time: params[7]
                };
                mockStorage.schedule.push(scheduleItem);
              } else if (query.includes('INTO grades')) {
                const grade = {
                  id: insertId,
                  user_id: params[0],
                  subject: params[1],
                  grade: params[2],
                  attendance: params[3],
                  status: params[4]
                };
                mockStorage.grades.push(grade);
              }
                            
              result = {
                insertId: insertId,
                rowsAffected: 1
              };
            }
            
            // Имитация выполнения UPDATE запросов
            else if (query.toLowerCase().startsWith('update')) {
              let rowsAffected = 0;
              
              if (query.includes('UPDATE users')) {
                const userId = params[params.length - 1];
                const userIndex = mockStorage.users.findIndex(u => u.id === userId);
                
                if (userIndex !== -1) {
                  // Обновляем пользователя в зависимости от запроса
                  if (query.includes('SET full_name =')) {
                    mockStorage.users[userIndex].full_name = params[0];
                    mockStorage.users[userIndex].group_number = params[1];
                    mockStorage.users[userIndex].course = params[2];
                  }
                  rowsAffected = 1;
                }
              } else if (query.includes('UPDATE schedule')) {
                const lessonId = params[params.length - 1];
                const scheduleIndex = mockStorage.schedule.findIndex(s => s.id === lessonId);
                
                if (scheduleIndex !== -1) {
                  mockStorage.schedule[scheduleIndex].subject = params[0];
                  mockStorage.schedule[scheduleIndex].teacher = params[1];
                  mockStorage.schedule[scheduleIndex].room = params[2];
                  mockStorage.schedule[scheduleIndex].type = params[3];
                  mockStorage.schedule[scheduleIndex].start_time = params[4];
                  mockStorage.schedule[scheduleIndex].end_time = params[5];
                  rowsAffected = 1;
                }
              } else if (query.includes('UPDATE grades')) {
                const gradeId = params[params.length - 1];
                const gradeIndex = mockStorage.grades.findIndex(g => g.id === gradeId);
                
                if (gradeIndex !== -1) {
                  mockStorage.grades[gradeIndex].grade = params[0];
                  mockStorage.grades[gradeIndex].attendance = params[1];
                  mockStorage.grades[gradeIndex].status = params[2];
                  rowsAffected = 1;
                }
              } else if (query.includes('UPDATE notes')) {
                const noteId = params[params.length - 1];
                const noteIndex = mockStorage.notes.findIndex(n => n.id === noteId);
                
                if (noteIndex !== -1) {
                  mockStorage.notes[noteIndex].title = params[0];
                  mockStorage.notes[noteIndex].content = params[1];
                  rowsAffected = 1;
                }
              }
              
              result = {
                rowsAffected: rowsAffected
              };
            }
            
            // Имитация выполнения DELETE запросов
            else if (query.toLowerCase().startsWith('delete')) {
              let rowsAffected = 0;
              
              if (query.includes('FROM users')) {
                const userId = params[0];
                const initialLength = mockStorage.users.length;
                mockStorage.users = mockStorage.users.filter(u => u.id !== userId);
                rowsAffected = initialLength - mockStorage.users.length;
              } else if (query.includes('FROM schedule')) {
                const lessonId = params[0];
                const initialLength = mockStorage.schedule.length;
                mockStorage.schedule = mockStorage.schedule.filter(s => s.id !== lessonId);
                rowsAffected = initialLength - mockStorage.schedule.length;
              } else if (query.includes('FROM grades')) {
                const gradeId = params[0];
                const initialLength = mockStorage.grades.length;
                mockStorage.grades = mockStorage.grades.filter(g => g.id !== gradeId);
                rowsAffected = initialLength - mockStorage.grades.length;
              } else if (query.includes('FROM notes')) {
                const noteId = params[0];
                const initialLength = mockStorage.notes.length;
                mockStorage.notes = mockStorage.notes.filter(n => n.id !== noteId);
                rowsAffected = initialLength - mockStorage.notes.length;
              }
              
              result = {
                rowsAffected: rowsAffected
              };
            }
            
            // Имитация выполнения CREATE TABLE запросов
            else if (query.toLowerCase().startsWith('create')) {
              result = {
                rowsAffected: 0
              };
            }
            
            // Вызываем колбэк с успешным результатом
            if (successCallback) {
              successCallback(tx, result);
            }
          } catch (error) {
            console.error("Ошибка выполнения запроса:", error);
            if (errorCallback) {
              errorCallback(tx, error);
            }
          }
        }
      };
      
      // Вызываем переданный колбэк с фиктивным tx
      callback(tx);
      resolve();
    });
  }
};

// Инициализация базы данных
export const initDatabase = () => {
  console.log("Инициализация базы данных (mock-система)");
  return Promise.resolve();
};

// Вставка тестового пользователя и данных (уже есть в mockStorage, просто возвращаем успех)
export const insertInitialData = () => {
  console.log("Данные уже предзагружены (mock-система)");
  return Promise.resolve();
};

// API для работы с пользователями
export const usersAPI = {
  // Регистрация нового пользователя
  register: (userData) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO users (username, password, full_name, group_number, course, is_admin) VALUES (?, ?, ?, ?, ?, ?)',
          [userData.username, userData.password, userData.fullName, userData.groupNumber, userData.course, 0],
          (_, result) => {
            resolve(result.insertId);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Аутентификация пользователя
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE username = ? AND password = ?',
          [username, password],
          (_, { rows }) => {
            if (rows.length > 0) {
              resolve(rows.item(0));
            } else {
              reject(new Error('Неверное имя пользователя или пароль'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Получение данных пользователя по ID
  getUserById: (userId) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE id = ?',
          [userId],
          (_, { rows }) => {
            if (rows.length > 0) {
              resolve(rows.item(0));
            } else {
              reject(new Error('Пользователь не найден'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Получение всех пользователей (для админ-панели)
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users',
          [],
          (_, { rows }) => {
            const users = [];
            for (let i = 0; i < rows.length; i++) {
              users.push(rows.item(i));
            }
            resolve(users);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Обновление данных пользователя
  updateUser: (userId, userData) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE users SET full_name = ?, group_number = ?, course = ? WHERE id = ?',
          [userData.fullName, userData.groupNumber, userData.course, userId],
          (_, result) => {
            resolve(result.rowsAffected > 0);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Удаление пользователя
  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM users WHERE id = ?',
          [userId],
          (_, result) => {
            resolve(result.rowsAffected > 0);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
};

// API для работы с расписанием
export const scheduleAPI = {
  // Получение расписания для пользователя
  getScheduleForUser: (userId) => {
    return new Promise((resolve, reject) => {
      try {
        // Сначала выведем в консоль для отладки
        console.log(`Загрузка расписания для пользователя ID: ${userId}`);
        console.log(`Всего занятий в системе: ${mockStorage.schedule.length}`);
        
        // Фильтруем занятия по ID пользователя
        const userLessons = mockStorage.schedule.filter(lesson => lesson.user_id === parseInt(userId));
        console.log(`Найдено занятий для пользователя: ${userLessons.length}`);
        
        const schedule = {};
        // Инициализируем дни недели пустыми массивами - используем русские сокращения
        ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].forEach(day => {
          schedule[day] = [];
        });
        
        // Заполняем расписание
        userLessons.forEach(item => {
          // Преобразуем день недели в русский формат
          const rusDay = dayReverseTranslations[item.day] || item.day;
          
          // Преобразуем тип занятия в русский формат
          const rusType = typeReverseTranslations[item.type] || item.type;
          
          if (schedule[rusDay]) {
            schedule[rusDay].push({
              id: item.id.toString(),
              subject: item.subject,
              teacher: item.teacher,
              room: item.room,
              type: rusType,
              startTime: item.start_time,
              endTime: item.end_time
            });
          }
        });
        
        console.log(`Расписание успешно сформировано для пользователя ID: ${userId}`);
        resolve(schedule);
      } catch (error) {
        console.error(`Ошибка при загрузке расписания: ${error.message}`);
        reject(error);
      }
    });
  },
  
  // Добавление занятия в расписание
  addLesson: (lesson) => {
    return new Promise((resolve, reject) => {
      try {
        // Преобразуем русские обозначения в английские для хранения
        const engDay = dayTranslations[lesson.day] || lesson.day;
        const engType = typeTranslations[lesson.type] || lesson.type;
        
        const lessonId = mockStorage.schedule.length + 100;
        
        // Добавляем занятие в mockStorage
        mockStorage.schedule.push({
          id: lessonId,
          user_id: parseInt(lesson.userId),
          day: engDay,
          subject: lesson.subject,
          teacher: lesson.teacher,
          room: lesson.room,
          type: engType,
          start_time: lesson.startTime,
          end_time: lesson.endTime
        });
        
        console.log(`Занятие успешно добавлено, ID: ${lessonId}`);
        resolve(lessonId);
      } catch (error) {
        console.error(`Ошибка при добавлении занятия: ${error.message}`);
        reject(error);
      }
    });
  },
  
  // Обновление занятия
  updateLesson: (lessonId, lesson) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE schedule SET subject = ?, teacher = ?, room = ?, type = ?, start_time = ?, end_time = ? WHERE id = ?',
          [lesson.subject, lesson.teacher, lesson.room, lesson.type, lesson.startTime, lesson.endTime, lessonId],
          (_, result) => {
            resolve(result.rowsAffected > 0);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Удаление занятия
  deleteLesson: (lessonId) => {
    return new Promise((resolve, reject) => {
      try {
        const initialLength = mockStorage.schedule.length;
        mockStorage.schedule = mockStorage.schedule.filter(lesson => lesson.id !== lessonId);
        
        const success = initialLength > mockStorage.schedule.length;
        if (success) {
          console.log(`Занятие успешно удалено, ID: ${lessonId}`);
          resolve(true);
        } else {
          console.log(`Занятие с ID ${lessonId} не найдено`);
          resolve(false);
        }
      } catch (error) {
        console.error(`Ошибка при удалении занятия: ${error.message}`);
        reject(error);
      }
    });
  }
};

// API для работы с оценками
export const gradesAPI = {
  // Получение оценок для пользователя
  getGradesForUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM grades WHERE user_id = ?',
          [userId],
          (_, { rows }) => {
            const grades = {
              average: 0,
              subjects: []
            };
            
            let totalGrade = 0;
            
            for (let i = 0; i < rows.length; i++) {
              const item = rows.item(i);
              totalGrade += item.grade;
              
              grades.subjects.push({
                id: item.id.toString(),
                name: item.subject,
                grade: item.grade,
                attendance: item.attendance,
                status: item.status
              });
            }
            
            if (rows.length > 0) {
              grades.average = (totalGrade / rows.length).toFixed(1);
            }
            
            resolve(grades);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Добавление оценки
  addGrade: (grade) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO grades (user_id, subject, grade, attendance, status) VALUES (?, ?, ?, ?, ?)',
          [grade.userId, grade.subject, grade.grade, grade.attendance, grade.status],
          (_, result) => {
            resolve(result.insertId);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Обновление оценки
  updateGrade: (gradeId, grade) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE grades SET grade = ?, attendance = ?, status = ? WHERE id = ?',
          [grade.grade, grade.attendance, grade.status, gradeId],
          (_, result) => {
            resolve(result.rowsAffected > 0);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Удаление оценки
  deleteGrade: (gradeId) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM grades WHERE id = ?',
          [gradeId],
          (_, result) => {
            resolve(result.rowsAffected > 0);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
};

// API для работы с заметками
export const notesAPI = {
  // Получение заметок для пользователя
  getNotesForUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC',
          [userId],
          (_, { rows }) => {
            const notes = [];
            for (let i = 0; i < rows.length; i++) {
              notes.push(rows.item(i));
            }
            resolve(notes);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Добавление заметки
  addNote: (note) => {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO notes (user_id, title, content, created_at) VALUES (?, ?, ?, ?)',
          [note.userId, note.title, note.content, now],
          (_, result) => {
            resolve(result.insertId);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Обновление заметки
  updateNote: (noteId, note) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE notes SET title = ?, content = ? WHERE id = ?',
          [note.title, note.content, noteId],
          (_, result) => {
            resolve(result.rowsAffected > 0);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  
  // Удаление заметки
  deleteNote: (noteId) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM notes WHERE id = ?',
          [noteId],
          (_, result) => {
            resolve(result.rowsAffected > 0);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
};

export default {
  initDatabase,
  insertInitialData,
  usersAPI,
  scheduleAPI,
  gradesAPI,
  notesAPI
}; 