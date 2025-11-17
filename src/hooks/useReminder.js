import { useEffect, useState } from "react";
import { useTasks } from "../Context/TasksContext";
import { getDeadlineTimestamp } from "../utils/dateHelpers";

const CHECK_INTERVAL = 30 * 1000;
const SNOOZE_DURATION = 5 * 60 * 1000;

export function useReminder() {
  const { tasks } = useTasks();
  const [alertTask, setAlertTask] = useState(null);
  const [snoozedMap, setSnoozedMap] = useState({});

  useEffect(() => {
    const activeIds = new Set(tasks.filter((task) => !task.completed).map((task) => task.id));
    setSnoozedMap((prev) => {
      let changed = false;
      const next = {};
      Object.entries(prev).forEach(([id, time]) => {
        if (activeIds.has(id)) {
          next[id] = time;
        } else {
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [tasks]);

  useEffect(() => {
    const checkReminders = () => {
      const now = Date.now();
      const dueTasks = tasks
        .filter((task) => !task.completed && task.deadline)
        .map((task) => ({
          ...task,
          dueTime: getDeadlineTimestamp(task.deadline),
        }))
        .filter((task) => typeof task.dueTime === "number")
        .sort((a, b) => a.dueTime - b.dueTime);

      const candidate = dueTasks.find((task) => {
        if (task.dueTime > now) return false;
        const snoozedAt = snoozedMap[task.id];
        return !(snoozedAt && now - snoozedAt < SNOOZE_DURATION);
      });

      setAlertTask((current) => {
        if (candidate) {
          return current?.id === candidate.id ? current : candidate;
        }
        return null;
      });
    };

    checkReminders();
    const interval = setInterval(checkReminders, CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [tasks, snoozedMap]);

  const dismissAlert = () => {
    setAlertTask((current) => {
      if (current) {
        setSnoozedMap((prev) => ({ ...prev, [current.id]: Date.now() }));
      }
      return null;
    });
  };

  return {
    alertTask,
    isAlert: Boolean(alertTask),
    dismissAlert,
  };
}
