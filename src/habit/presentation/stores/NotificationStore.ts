import { Habit } from "habit/domain/entities/Habit";
import { action, makeObservable } from "mobx";
import PushNotification from "react-native-push-notification";
import { habitStore } from "./HabitStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum NotificationType {
  MotivationalReminder = 1,
  HabitReminder = 2,
  GeneralMotivation = 3
}

function getNotificationMessage(type: NotificationType, habit?: Habit): string {
  switch (type) {
    case NotificationType.MotivationalReminder:
      return 'Recuerda que cada hábito te acerca a tu mejor versión.';
    case NotificationType.HabitReminder:
      return habit ? `¿Ya cumpliste con "${habit.name}" hoy?` : '¿Ya cumpliste tus hábitos hoy?';
    case NotificationType.GeneralMotivation:
      return '¡Tú puedes! Hoy es un gran día para empezar.';
    default:
      return '';
  }
}

class NotificationStore {
  reminderHours = [8, 9, 11, 12, 15, 18, 20];
  enabled = true;

  constructor() {
    makeObservable(this, {
      scheduleTypedReminders: action.bound,
      cancelAll: action.bound,
      setReminderHours: action.bound,
      toggle: action.bound,
      syncHabitReminders: action.bound,
    });
  }

  scheduleTypedReminders(habits: Habit[]) {
    this.cancelAll();

    this.reminderHours.forEach(hour => {
      const date = new Date();
      date.setHours(hour, 0, 0, 0);
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

  async toggle(enabled: boolean) {
    console.log("Valor de actual de enabled: ", this.enabled);
    this.enabled = enabled;
    await AsyncStorage.setItem("notiEnabled", enabled ? "true" : "false");
    console.log("Nuevo valor de enabled: ", enabled);

    if (!enabled) this.cancelAll();

  }
  async loadSettings() {
    const value = await AsyncStorage.getItem("notiEnabled");
    console.log("Valor de value: ", value);
    this.enabled = value !== "false" ? true : false; // default: true
    console.log("valor de enabled: ", this.enabled);
  }

}

export const notificationStore = new NotificationStore();
