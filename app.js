/**
 * app.js -- Lógica Client-Side Resiliente del Portal Público
 * Protocolo de Admisión, Generación de Folio #T-XXXX, Web3Forms y Acuse Háptico
 * Preparado para mapeo 1:1 con backend en Rust (IntakePayload struct)
 */

(function () {
  'use strict';

  // 1. Generador Determinista de Folios Técnicos (#T-AAMMDD-XXXX)
  function generateTechnicalFolio() {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const randHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    return `#T-${yy}${mm}${dd}-${randHex}`;
  }

  // 2. Construcción de Enlace Profundo (Deeplink) a WhatsApp
  function updateWhatsAppDeeplink(folio, plant, equipment, symptom) {
    const waBtn = document.getElementById('btnWhatsAppDirect');
    if (!waBtn) return;

    const baseWaUrl = "https://wa.me/526181062487"; // David Estefani - WhatsApp Operativo
    const defaultText = `Hola, solicitud técnica de planta.\n` +
      `Folio: ${folio || 'PENDIENTE'}\n` +
      `Planta: ${plant || 'No especificada'}\n` +
      `Equipo: ${equipment || 'No especificado'}\n` +
      `Síntoma: ${symptom || 'Falla en línea de producción'}`;

    waBtn.href = `${baseWaUrl}?text=${encodeURIComponent(defaultText)}`;
  }

  // 3. Inicialización del DOM
  document.addEventListener('DOMContentLoaded', () => {
    const intakeForm = document.getElementById('intakeForm');
    const ackCard = document.getElementById('ackCard');
    const ackFolioDisplay = document.getElementById('ackFolioDisplay');
    const plantInput = document.getElementById('fieldPlant');
    const equipmentInput = document.getElementById('fieldEquipment');
    const symptomInput = document.getElementById('fieldSymptom');
    const submitBtn = document.getElementById('btnSubmitIntake');

    // Generar un folio base para la sesión
    const sessionFolio = generateTechnicalFolio();
    const hiddenFolioInput = document.getElementById('fieldFolioHidden');
    if (hiddenFolioInput) hiddenFolioInput.value = sessionFolio;

    // Actualizar deeplink dinámicamente cuando el usuario teclee
    function syncInputsToWhatsApp() {
      const p = plantInput ? plantInput.value.trim() : '';
      const eq = equipmentInput ? equipmentInput.value.trim() : '';
      const s = symptomInput ? symptomInput.value.trim() : '';
      updateWhatsAppDeeplink(sessionFolio, p, eq, s);
    }

    if (plantInput) plantInput.addEventListener('input', syncInputsToWhatsApp);
    if (equipmentInput) equipmentInput.addEventListener('input', syncInputsToWhatsApp);
    if (symptomInput) symptomInput.addEventListener('input', syncInputsToWhatsApp);

    // Configuración inicial de WhatsApp
    syncInputsToWhatsApp();

    // 4. Manejo de Envío Asíncrono con Web3Forms y Honeypot Anti-Bot
    if (intakeForm) {
      intakeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Verificación de trampa honeypot
        const botCheck = intakeForm.querySelector('input[name="botcheck"]');
        if (botCheck && botCheck.checked) {
          console.warn("Detección de bot por honeypot.");
          return;
        }

        const plantVal = plantInput ? plantInput.value.trim() : '';
        const eqVal = equipmentInput ? equipmentInput.value.trim() : '';
        const symVal = symptomInput ? symptomInput.value.trim() : '';

        if (!plantVal || !eqVal || !symVal) {
          alert("Por favor completa los tres campos para evaluar la viabilidad técnica.");
          return;
        }

        // Estado visual de carga
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Procesando Folio...</span>`;
        }

        const formData = new FormData(intakeForm);
        // Inyectar datos estructurados (mapeables 1:1 a Rust IntakePayload struct)
        const timestamp_utc = Math.floor(Date.now() / 1000);
        const urgentStopEl = document.getElementById('fieldUrgentStop');
        const urgent_line_stop = urgentStopEl ? urgentStopEl.checked : false;

        formData.set('folio', sessionFolio);
        formData.set('timestamp_utc', timestamp_utc.toString());
        formData.set('plant_location', plantVal);
        formData.set('machine_model', eqVal);
        formData.set('observed_symptom', symVal);
        formData.set('urgent_line_stop', urgent_line_stop.toString());
        formData.set('subject', `[INTERVENCIÓN TÉCNICA] Solicitud ${sessionFolio} - ${plantVal}`);
        formData.set('from_name', 'Mesa de Entrada Técnica (Industrial)');

        try {
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          const result = await response.json();

          if (response.ok && result.success) {
            // Render del Acuse de Infraestructura Inmediato (Cero Abandono)
            intakeForm.style.display = 'none';
            if (ackCard) {
              if (ackFolioDisplay) ackFolioDisplay.textContent = sessionFolio;
              ackCard.classList.add('visible');
              ackCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          } else {
            throw new Error(result.message || "Error al procesar formulario.");
          }
        } catch (err) {
          console.warn("Fallo de red al enviar a Web3Forms, aplicando fallback directo:", err);
          // Fallback a prueba de fallos: Mostrar acuse en pantalla y permitir envío por WhatsApp
          intakeForm.style.display = 'none';
          if (ackCard) {
            if (ackFolioDisplay) ackFolioDisplay.textContent = sessionFolio;
            ackCard.classList.add('visible');
            ackCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Registrar Solicitud Técnica</span>`;
          }
        }
      });
    }
  });
})();
