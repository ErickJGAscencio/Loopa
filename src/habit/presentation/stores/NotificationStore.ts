import { action, makeObservable } from "mobx";
import PushNotification from "react-native-push-notification";

class NotificationStore {
  reminderHours = [8, 12, 16, 20];
  enabled = true;

  constructor() {
    makeObservable(this, {
      scheduleDailyReminders: action.bound,
      cancelAll: action.bound,
      setReminderHours: action.bound,
      toggle: action.bound,
    });
  }

  scheduleDailyReminders(habitName: string) {
    this.cancelAll();

    this.reminderHours.forEach(hour => {
      const date = new Date();
      date.setHours(hour, 0, 0, 0);
      if (date < new Date()) date.setDate(date.getDate() + 1);

      PushNotification.localNotificationSchedule({
        channelId: 'habits-channel',
        title: 'Recordatorio de hábito',
        message: `¿Ya cumpliste con "${habitName}"?`,
        date,
        allowWhileIdle: true,
        repeatType: 'day',
      });
    });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
  
  setReminderHours(hours: number[]) {
    this.reminderHours = hours;
    // Podrías reprogramar aquí si ya hay hábitos activos
  }

  toggle(enabled: boolean) {
    this.enabled = enabled;
    console.log(this.enabled); 
    if (!enabled) this.cancelAll();
  }
}

export const notificationStore = new NotificationStore();