import { Habit } from "habit/domain/entities/Habit";
import { action, makeObservable } from "mobx";
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum NotificationType {
  MotivationalReminder = 1,
  HabitReminder = 2,
  GeneralMotivation = 3
}

function getNotificationMessage(type: NotificationType, habit?: Habit): string {
  switch (type) {
    case NotificationType.MotivationalReminder: {
      const messages = [
        'Recuerda que cada hábito te acerca a tu mejor versión.',
        'Un hábito es bueno, ¡Imagínate dos!',
        'Hoy es un buen día para avanzar un paso más.',
        'Tu constancia es más poderosa que tu motivación.',
        'Pequeños hábitos, grandes resultados.',
        'Hazlo por ti. Hazlo hoy.',
        'Cada acción cuenta. ¡Sigue adelante!',
        'No necesitas hacerlo perfecto, solo hacerlo.',
        'Tu futuro te agradecerá lo que hagas hoy.',
        'La disciplina es el puente entre metas y logros.',
        'Un día más, un hábito más. ¡Tú puedes!',
        'Los hábitos construyen tu identidad. ¿Quién quieres ser?',
        'No esperes a estar motivado. Empieza y la motivación llegará.',
        'Cada hábito es una semilla. Riégala hoy.',
        'Hazlo aunque no tengas ganas. Eso es compromiso.',
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }

    case NotificationType.HabitReminder: {
      const messages = [
        (habit: Habit) => `¿Ya cumpliste con "${habit.name}" hoy?`,
        (habit: Habit) => `No olvides tu hábito: "${habit.name}". ¡Hazlo ahora!`,
        (habit: Habit) => `Tu hábito "${habit.name}" te espera. ¿Lo hiciste ya?`,
        (habit: Habit) => `Un paso más con "${habit.name}". ¡Tú puedes!`,
        (habit: Habit) => `Hazlo por ti: "${habit.name}" es parte de tu progreso.`,
        (habit: Habit) => `¿Qué tal va "${habit.name}" hoy? ¡No lo dejes pasar!`,
        (habit: Habit) => `Tu compromiso con "${habit.name}" te define. ¿Lo cumpliste?`,
        (habit: Habit) => `Recuerda: "${habit.name}" es parte de tu mejor versión.`,
        (habit: Habit) => `Activa tu rutina con "${habit.name}". ¡Vamos!`,
        (habit: Habit) => `¿Ya hiciste "${habit.name}" hoy? ¡Marca el progreso!`,
      ];
      if (habit) {
        const randomFn = messages[Math.floor(Math.random() * messages.length)];
        return randomFn(habit);
      } else {
        return '¿Ya cumpliste tus hábitos hoy?';
      }
    }

    case NotificationType.GeneralMotivation: {
      const messages = [
        '¿Ya cumpliste tus hábitos hoy?',
        'Tus hábitos te esperan. ¡Activa tu rutina!',
        'No dejes pasar el día sin avanzar en tus hábitos.',
        'Cada hábito cuenta. ¿Ya los hiciste hoy?',
        'Tu constancia es clave. ¿Ya cumpliste tus hábitos?',
        'Hoy es otro paso en tu camino. ¿Ya hiciste tus hábitos?',
        'Los hábitos construyen tu futuro. ¿Ya los cumpliste?',
        'Hazlo por ti. Hazlo hoy. ¿Ya cumpliste tus hábitos?',
        'Tu rutina te fortalece. ¿Ya la activaste hoy?',
        'Marca el día con acción. ¿Ya hiciste tus hábitos?',
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }

    default:
      return '';
  }
}


class NotificationStore {
  reminderHours = [8, 10, 14, 17, 21];
  hoursSelected = 4;
  enabled = true;

  constructor() {
    makeObservable(this, {
      scheduleTypedReminders: action.bound,
      cancelAll: action.bound,
      setReminderHours: action.bound,
      setHoursSelected: action.bound,
      toggle: action.bound,
      syncHabitReminders: action.bound,
    });
  }

  scheduleTypedReminders(habits: Habit[]) {
    this.cancelAll();
    try {
      this.reminderHours.forEach(hour => {
        const date = new Date();
        date.setHours(hour, 31, 0, 0);
        if (date < new Date()) date.setDate(date.getDate() + 1);

        if (habits.length > 0) {
          const pendingHabit = habits.find(h => !h.completed);
          const randomType = Math.random() < 0.5 ? NotificationType.MotivationalReminder : NotificationType.HabitReminder;

          if (randomType === NotificationType.HabitReminder && pendingHabit) {
            // Tipo 2: Recordatorio de hábito no cumplido
            PushNotification.localNotificationSchedule({
              channelId: 'habits-channel',
              title: 'Recordatorio de hábito',
              message: getNotificationMessage(NotificationType.HabitReminder, pendingHabit),
              date,
              allowWhileIdle: true,
              repeatType: 'day',
            });
          } else {
            // Tipo 1: Motivación general
            PushNotification.localNotificationSchedule({
              channelId: 'habits-channel',
              title: 'Motivación diaria',
              message: getNotificationMessage(NotificationType.MotivationalReminder),
              date,
              allowWhileIdle: true,
              repeatType: 'day',
            });
          }
        } else {
          // Tipo 3: Motivación si no hay hábitos activos
          console.log("No hay ");
          PushNotification.localNotificationSchedule({
            channelId: 'habits-channel',
            title: '¡Empieza hoy!',
            message: getNotificationMessage(NotificationType.GeneralMotivation),
            date,
            allowWhileIdle: true,
            repeatType: 'day',
          });
        }
      });

      console.log("Recordatorios creados");
    } catch (error) {
      console.error("Error creting alarms & reminders", error);
    }

  }

  syncHabitReminders(habits: Habit[]) {
    console.log(this.enabled);
    if (!this.enabled) return;
    this.scheduleTypedReminders(habits);
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  setReminderHours(hours: number[]) {
    this.reminderHours = hours;
  }

  setHoursSelected(hoursCount: number) {
    this.hoursSelected = hoursCount;
  }

  getSelectedHours(): number[] {
    return this.reminderHours;
  }

  getHoursCount(): number {
    return this.reminderHours.length;
  }

  async toggle(enabled: boolean) {
    console.log("Valor de actual de enabled: ", this.enabled);
    this.enabled = enabled;
    await AsyncStorage.setItem("notiEnabled", enabled ? "true" : "false");
    console.log("Nuevo valor de enabled: ", enabled);

    if (!enabled) this.cancelAll();

  }

  async loadSettings() {
    let value = await AsyncStorage.getItem("notiEnabled");
    this.enabled = value !== "false" ? true : false; // default: true
    console.log("valor de enabled: ", this.enabled);

    let stored = await AsyncStorage.getItem("reminderHours");
    if (stored == null) {
      await AsyncStorage.setItem("reminderHours", JSON.stringify(this.reminderHours));
      stored = await AsyncStorage.getItem("reminderHours");
    }
    console.log("Horas almacenadas");
    console.log(stored);
    this.reminderHours = stored ? JSON.parse(stored) : [];
  }

}

export const notificationStore = new NotificationStore();
