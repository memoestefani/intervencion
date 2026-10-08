/**
 * app.js -- Lógica Client-Side Soberana y Resiliente (Swiss Precision)
 * Protocolo de Admisión, Folios Deterministas #T-XXXX, Web3Forms y Chips Hápticos
 * Mapeo 1:1 con backend en Rust (IntakePayload struct)
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
  function updateWhatsAppDeeplink(folio, plant, equipment, symptom, isEnglish) {
    const waBtn = document.getElementById('btnWhatsAppDirect');
    const heroWaBtn = document.querySelector('.btn-hero-wa');
    const baseWaUrl = "https://wa.me/526181062487"; // David Estefani - WhatsApp Operativo

    const text = isEnglish
      ? `Hello David, plant service request.\n` +
        `Folio: ${folio || 'PENDING'}\n` +
        `Plant: ${plant || 'Not specified'}\n` +
        `System: ${equipment || 'Not specified'}\n` +
        `Symptom: ${symptom || 'Unplanned line downtime'}`
      : `Hola David, solicitud de intervención técnica en planta.\n` +
        `Folio: ${folio || 'PENDIENTE'}\n` +
        `Planta: ${plant || 'No especificada'}\n` +
        `Equipo: ${equipment || 'No especificado'}\n` +
        `Síntoma: ${symptom || 'Falla en línea de producción'}`;

    const finalUrl = `${baseWaUrl}?text=${encodeURIComponent(text)}`;
    if (waBtn) waBtn.href = finalUrl;
    if (heroWaBtn) heroWaBtn.href = finalUrl;
  }

  // 3. Inicialización del DOM
  document.addEventListener('DOMContentLoaded', () => {
    const isEnglish = document.documentElement.lang === 'en';
    const intakeForm = document.getElementById('intakeForm');
    const ackCard = document.getElementById('ackCard');
    const ackFolioDisplay = document.getElementById('ackFolioDisplay');
    const plantInput = document.getElementById('fieldPlant');
    const equipmentInput = document.getElementById('fieldEquipment');
    const symptomInput = document.getElementById('fieldSymptom');
    const submitBtn = document.getElementById('btnSubmitIntake');
    const machineDiagBox = document.getElementById('machineDiagBox');
    const machineDiagTitle = document.getElementById('machineDiagTitle');
    const machineDiagText = document.getElementById('machineDiagText');
    const machineSpecCard = document.getElementById('machineSpecCard');
    const machineSpecTitle = document.getElementById('machineSpecTitle');
    const machineSpecBadge = document.getElementById('machineSpecBadge');
    const machineSpecSummary = document.getElementById('machineSpecSummary');
    const machineSpecPoints = document.getElementById('machineSpecPoints');
    const btnMachineSpecAction = document.getElementById('btnMachineSpecAction');

    // Perfiles técnicos de inspección para la Ficha Reactiva
    const machineProfiles = {
      "Sidel": {
        badge: isEnglish ? "High-Pressure Blowing (40 bar)" : "Soplado Alta Presión (40 bar)",
        points: isEnglish ? [
          "Static & dynamic pressure decay checks on 40-bar blowing manifold",
          "Rotary distributor carousel seal & micro-leak telemetry",
          "B&R / Siemens servo axis synchronization jitter diagnosis"
        ] : [
          "Verificación estática y dinámica de presurización a 40 bar en manifold de soplado",
          "Detección de micro-fugas en carrusel y juntas rotativas de distribución",
          "Desincronización y jitter en lazo de servomotores B&R / Siemens"
        ]
      },
      "Dieffenbacher": {
        badge: isEnglish ? "Continuous Press Hydraulics" : "Hidráulica de Prensa Continua",
        points: isEnglish ? [
          "Thermal frame alignment & expansion delta verification",
          "Closed-loop proportional valve p/Q curve calibration",
          "Return line oil aeration, varnish buildup & cavitation audit"
        ] : [
          "Alineación térmica y desbalance de presiones en marcos de prensado",
          "Calibración de lazo cerrado p/Q en servoválvulas proporcionales",
          "Saturación de retorno electrohidráulico, aireación y barniz térmico"
        ]
      },
      "Rexroth": {
        badge: isEnglish ? "Electro-Hydraulic Servo Systems" : "Sistemas Electrohidráulicos",
        points: isEnglish ? [
          "NG6/NG10 proportional spool response & deadband tuning",
          "Axial piston pump swashplate displacement & ripple check",
          "ISO 4406 fluid contamination & filter element differential pressure"
        ] : [
          "Respuesta dinámica de corredera y compensación de banda muerta en servoválvulas",
          "Cavitación y pulsación de caudal en bombas de pistones axiales",
          "Análisis de contaminación de fluido ISO 4406 y saturación de filtros"
        ]
      },
      "Siemens": {
        badge: isEnglish ? "Industrial Automation & Safety" : "Automatización y Redes",
        points: isEnglish ? [
          "Profinet packet jitter & cyclic bus topology fault isolation",
          "Safety-integrated F-CPU interlock & emergency stop sequence audit",
          "Sinamics S120 drive diagnostic buffer & encoder error readout"
        ] : [
          "Aislamiento de fallos intermitentes en topología de bus Profinet",
          "Auditoría de enclavamientos de seguridad F-CPU y cadenas de paro de emergencia",
          "Lectura profunda del búfer de fallos en variadores Sinamics S120 y encoders"
        ]
      },
      "Festo": {
        badge: isEnglish ? "Precision Servo-Pneumatics" : "Neumática Proporcional",
        points: isEnglish ? [
          "MPPE / VPPM proportional pressure regulator calibration",
          "Valve manifold bus interface & air starvation troubleshooting",
          "Cylinder seal blow-by & dynamic backpressure profiling"
        ] : [
          "Calibración de reguladores de presión proporcionales MPPE / VPPM",
          "Diagnóstico de caída de caudal y estrangulamiento en terminales de válvulas",
          "Desgaste dinámico de sellos de actuador y contrapresiones parásitas"
        ]
      }
    };

    // Generar un folio base para la sesión
    const sessionFolio = generateTechnicalFolio();
    const hiddenFolioInput = document.getElementById('fieldFolioHidden');
    if (hiddenFolioInput) hiddenFolioInput.value = sessionFolio;

    // Actualizar deeplink dinámicamente cuando el usuario teclee
    function syncInputsToWhatsApp() {
      const p = plantInput ? plantInput.value.trim() : '';
      const eq = equipmentInput ? equipmentInput.value.trim() : '';
      const s = symptomInput ? symptomInput.value.trim() : '';
      updateWhatsAppDeeplink(sessionFolio, p, eq, s, isEnglish);
    }

    if (plantInput) plantInput.addEventListener('input', syncInputsToWhatsApp);
    if (equipmentInput) equipmentInput.addEventListener('input', syncInputsToWhatsApp);
    if (symptomInput) symptomInput.addEventListener('input', syncInputsToWhatsApp);

    // Configuración inicial de WhatsApp
    syncInputsToWhatsApp();

    // 4. Lógica de Chips Interactivos de Maquinaria y Ficha Reactiva
    const brandChips = document.querySelectorAll('.brand-chip');
    brandChips.forEach(chip => {
      chip.addEventListener('click', () => {
        brandChips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');

        const machineName = chip.getAttribute('data-machine') || '';
        const diagInfo = chip.getAttribute('data-diag') || '';

        if (equipmentInput && machineName) {
          equipmentInput.value = machineName;
          syncInputsToWhatsApp();
        }

        // Determinar perfil técnico para la Ficha Reactiva
        let profileKey = "Sidel";
        if (machineName.includes("Dieffenbacher")) profileKey = "Dieffenbacher";
        else if (machineName.includes("Rexroth")) profileKey = "Rexroth";
        else if (machineName.includes("Siemens")) profileKey = "Siemens";
        else if (machineName.includes("Festo")) profileKey = "Festo";

        const profile = machineProfiles[profileKey];

        if (machineSpecCard) {
          if (machineSpecTitle) machineSpecTitle.textContent = machineName;
          if (machineSpecBadge && profile) machineSpecBadge.textContent = profile.badge;
          if (machineSpecSummary) machineSpecSummary.textContent = diagInfo;

          if (machineSpecPoints && profile) {
            machineSpecPoints.innerHTML = profile.points.map(pt => `<li>${pt}</li>`).join('');
          }

          machineSpecCard.classList.add('visible');
        }

        // Soporte retrocompatible
        if (machineDiagBox && machineDiagText && diagInfo) {
          if (machineDiagTitle) {
            machineDiagTitle.textContent = isEnglish
              ? `Diagnostic Scope for: ${machineName}`
              : `Alcance de Diagnóstico para: ${machineName}`;
          }
          machineDiagText.textContent = diagInfo;
          machineDiagBox.classList.add('visible');
        }
      });
    });

    // Acción directa desde la Ficha Reactiva
    if (btnMachineSpecAction) {
      btnMachineSpecAction.addEventListener('click', () => {
        if (symptomInput) {
          symptomInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          symptomInput.focus();
        }
      });
    }

    // 5. Manejo de Envío Asíncrono con Web3Forms y Honeypot Anti-Bot
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
          alert(isEnglish 
            ? "Please complete all fields to evaluate technical feasibility." 
            : "Por favor completa los tres campos para evaluar la viabilidad técnica.");
          return;
        }

        // Estado visual de carga
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>${isEnglish ? "Processing Folio..." : "Procesando Folio..."}</span>`;
        }

        const formData = new FormData(intakeForm);
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
            submitBtn.innerHTML = `<span>${isEnglish ? "Submit Technical Scope" : "Registrar Solicitud Técnica"}</span>`;
          }
        }
      });
    }
  });
})();
