import { business, services } from "./data.js";

const form = document.querySelector("#quote-form");
const serviceSelect = document.querySelector("#quote-service");
const errorMessage = document.querySelector("#quote-error");

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.hidden = true;
}

function renderServiceOptions() {
  for (const service of services) {
    const option = document.createElement("option");
    option.value = service.name;
    option.textContent = service.name;
    serviceSelect.append(option);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  clearError();

  const phone = business.whatsapp.replace(/\D/g, "");
  if (!/^[1-9]\d{7,14}$/.test(phone)) {
    showError("El WhatsApp comercial aún no está configurado. Añade el número con código de país en js/data.js.");
    return;
  }

  const formData = new FormData(form);
  const name = formData.get("name").trim();
  const service = formData.get("service");
  const details = formData.get("details").trim();
  const message = [
    `Hola, soy ${name}. Quisiera solicitar una cotización.`,
    `Servicio: ${service}`,
    `Detalles: ${details}`,
  ].join("\n");

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

if (form && serviceSelect && errorMessage) {
  renderServiceOptions();
  serviceSelect.addEventListener("change", clearError);
  form.addEventListener("input", clearError);
  form.addEventListener("submit", handleSubmit);
}
