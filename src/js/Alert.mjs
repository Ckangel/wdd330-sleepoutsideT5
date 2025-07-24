export default class Alert {
  constructor() {
    this.alerts = [];
    this.init();
  }

  async init() {
    try {
      const response = await fetch("./alerts.json");
      this.alerts = await response.json();
      this.renderAlerts();
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  }

  renderAlerts() {
    if (this.alerts.length === 0) return;

    const alertSection = document.createElement("section");
    alertSection.className = "alert-list";

    this.alerts.forEach((alert) => {
      const alertElement = document.createElement("p");
      alertElement.textContent = alert.message;
      alertElement.style.backgroundColor = alert.background;
      alertElement.style.color = alert.color;
      alertElement.style.padding = "10px";
      alertElement.style.margin = "5px 0";
      alertElement.style.borderRadius = "4px";
      alertSection.appendChild(alertElement);
    });

    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.prepend(alertSection);
    }
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-alert";
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => alertElement.remove());
    alertElement.appendChild(closeBtn);
  }
}
