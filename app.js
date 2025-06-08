let reminderInterval = null;

const textReminder = "لا حول ولا قوة إلا بالله";

const startBtn = document.getElementById("startReminder");
const stopBtn = document.getElementById("stopReminder");
const intervalSelect = document.getElementById("interval");

function notifyMe() {
  if (!("Notification" in window)) {
    alert("هذا المتصفح لا يدعم الإشعارات.");
    return;
  }

  if (Notification.permission === "granted") {
    new Notification("🌸 تذكر الله", {
      body: textReminder,
      icon: "icon128.png"
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("🌸 تذكر الله", {
          body: textReminder,
          icon: "icon128.png"
        });
      } else {
        alert("يرجى السماح بالإشعارات لتفعيل التذكير.");
      }
    });
  } else {
    alert("يرجى السماح بالإشعارات في إعدادات المتصفح.");
  }
}

function startReminder() {
  const minutes = parseInt(intervalSelect.value);
  notifyMe(); // notification immédiate au lancement

  if (reminderInterval) clearInterval(reminderInterval);

  reminderInterval = setInterval(() => {
    notifyMe();
  }, minutes * 60 * 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopReminder() {
  if (reminderInterval) {
    clearInterval(reminderInterval);
    reminderInterval = null;
  }
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener("click", startReminder);
stopBtn.addEventListener("click", stopReminder);
