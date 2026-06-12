// Menú móvil
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
const pageSections = Array.from(document.querySelectorAll("[data-section]"));
const quoteForm = document.querySelector(".quote-form");
const whatsappNumber = "529991902572";

function setActiveSection(targetId) {
  const targetSection = document.querySelector(targetId);

  if (!targetSection) {
    return;
  }

  pageSections.forEach((section) => {
    const isTargetSection = section === targetSection;
    section.classList.toggle("is-hidden", !isTargetSection);
    section.classList.toggle("is-active", isTargetSection);
  });

  targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("show");
  });
});

// Smooth scrolling para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);
    if (!target || !target.matches("[data-section]")) {
      return;
    }

    e.preventDefault();
    setActiveSection(targetId);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const initialSectionId = window.location.hash || "#inicio";
  setActiveSection(initialSectionId);
});

// Enviar cotización por WhatsApp
if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const nombre = (formData.get("nombre") || "").toString().trim();
    const contacto = (formData.get("contacto") || "").toString().trim();
    const evento = (formData.get("evento") || "").toString().trim();
    const fecha = (formData.get("fecha") || "").toString().trim();
    const invitados = (formData.get("invitados") || "").toString().trim();
    const servicio = (formData.get("servicio") || "").toString().trim();
    const mensaje = (formData.get("mensaje") || "").toString().trim();

    const whatsappMessage = [
      "Hola Banquetes Camila, quisiera solicitar una cotización:",
      "",
      `Nombre: ${nombre || "No especificado"}`,
      `Contacto: ${contacto || "No especificado"}`,
      `Tipo de evento: ${evento || "No especificado"}`,
      `Fecha del evento: ${fecha || "No especificada"}`,
      `Número de invitados: ${invitados || "No especificado"}`,
      `Servicio solicitado: ${servicio || "No especificado"}`,
      `Detalles adicionales: ${mensaje || "Sin detalles adicionales"}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
