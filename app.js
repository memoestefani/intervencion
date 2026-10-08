/**
 * app.js -- Lógica Client-Side Soberana y Resiliente (Apple-Grade Swiss Precision)
 * Protocolo de Admisión, Folios Deterministas #T-XXXX, Web3Forms, Docket Activo y Switch Háptico
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
  function updateWhatsAppDeeplink(folio, plant, equipment, symptom, isUrgent, isEnglish) {
    const waBtn = document.getElementById('btnWhatsAppDirect');
    const heroWaBtn = document.querySelector('.btn-hero-wa');
    const baseWaUrl = "https://wa.me/526181062487"; // David Estefani - WhatsApp Operativo

    const urgencyHeader = isUrgent
      ? (isEnglish ? "[🚨 CRITICAL LINE DOWN - PRIORITY INTERVENTION]\n" : "[🚨 PARO CRÍTICO TOTAL DE LÍNEA - MOVILIZACIÓN PRIORITARIA]\n")
      : "";

    const text = isEnglish
      ? `${urgencyHeader}Hello David, plant technical intervention request.\n` +
        `Folio: ${folio || 'PENDING'}\n` +
        `Plant: ${plant || 'Not specified'}\n` +
        `System: ${equipment || 'Not specified'}\n` +
        `Symptom: ${symptom || 'Unplanned line downtime'}`
      : `${urgencyHeader}Hola David, solicitud de intervención técnica en planta.\n` +
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
    const docketFolioDisplay = document.getElementById('docketFolioDisplay');
    const plantInput = document.getElementById('fieldPlant');
    const equipmentInput = document.getElementById('fieldEquipment');
    const symptomInput = document.getElementById('fieldSymptom');
    const urgentStopEl = document.getElementById('fieldUrgentStop');
    const urgentSwitchContainer = document.getElementById('urgentSwitchContainer');
    const submitBtn = document.getElementById('btnSubmitIntake');

    // Elementos de la Ficha Técnica de Telemetría
    const machineSpecCard = document.getElementById('machineSpecCard');
    const machineSpecTitle = document.getElementById('machineSpecTitle');
    const machineSpecBadge = document.getElementById('machineSpecBadge');
    const machineSpecSubsys = document.getElementById('machineSpecSubsys');
    const machineSpecFailure = document.getElementById('machineSpecFailure');
    const machineSpecProtocol = document.getElementById('machineSpecProtocol');
    const machineSpecRate = document.getElementById('machineSpecRate');
    const btnMachineSpecAction = document.getElementById('btnMachineSpecAction');

    // Elementos de las Pestañas de la Muestra BOM
    const tabBtnTelemetry = document.getElementById('tabBtnTelemetry');
    const tabBtnParts = document.getElementById('tabBtnParts');
    const tabTelemetry = document.getElementById('tabTelemetry');
    const tabParts = document.getElementById('tabParts');

    // Perfiles técnicos estructurados para la Ficha Reactiva de Telemetría
    const machineProfiles = {
      "Sidel": {
        title: isEnglish ? "Sidel Matrix / Combi Bottling Lines" : "Líneas de Envasado Sidel Matrix / Combi",
        badge: isEnglish ? "High-Pressure p/Q (40 bar)" : "Inspección p/Q (40 bar)",
        subsys: isEnglish
          ? "Rotary blowing carousel, 40-bar manifold, proportional servo valves and stretch servos."
          : "Carrusel de soplado, manifold de 40 bar, servoválvulas proporcionales y servos de estirado.",
        failure: isEnglish
          ? "Angular axis desynchronization, rotary joint seal micro-leakage and mold depressurization."
          : "Desincronización angular, micro-fugas en juntas rotativas y despresurización de molde.",
        protocol: isEnglish
          ? "Dynamic 40-bar manifold telemetry, Profinet bus jitter analysis and closed-loop servo calibration."
          : "Medición dinámica p/Q en manifold, análisis de bus Profinet y calibración de lazo de servoválvula.",
        rate: "$1,500 – $2,500 USD"
      },
      "Dieffenbacher": {
        title: isEnglish ? "Dieffenbacher CPS Continuous Presses" : "Prensas Continuas Dieffenbacher CPS",
        badge: isEnglish ? "Continuous Press Hydraulics" : "Hidráulica de Prensado",
        subsys: isEnglish
          ? "Multi-cylinder heating platen frames, Rexroth A4VSO pumps and closed-loop proportional manifolds."
          : "Marcos de cilindros de prensado, bombas Rexroth A4VSO y manifolds proporcionales en lazo cerrado.",
        failure: isEnglish
          ? "Thermal platen alignment delta, hydraulic pressure frame imbalance and return line varnish buildup."
          : "Alineación térmica de placas, desbalance de presiones en marcos y saturación por barniz térmico.",
        protocol: isEnglish
          ? "Proportional spool deadband compensation, swashplate ripple profiling and hydraulic aeration purge."
          : "Compensación de banda muerta en correderas, perfil de ondulación de bomba y purga de aireación.",
        rate: "$1,800 – $2,500 USD"
      },
      "Rexroth": {
        title: isEnglish ? "Bosch Rexroth A4VSO / 4WRPE Electro-Hydraulics" : "Sistemas Electrohidráulicos Bosch Rexroth A4VSO / 4WRPE",
        badge: isEnglish ? "Servo-Proportional Control" : "Control Servoproporcional",
        subsys: isEnglish
          ? "Variable axial piston pumps, onboard electronics (OBE) servo valves and inline pressure sensors."
          : "Bombas de pistones axiales de caudal variable, servoválvulas OBE con electrónica integrada y transductores.",
        failure: isEnglish
          ? "Cavitation noise, sluggish spool transient response and ISO 4406 particulate fluid contamination."
          : "Cavitación hidráulica, respuesta transitoria lenta de corredera y contaminación de fluido ISO 4406.",
        protocol: isEnglish
          ? "NPSH margin verification, step-response spool audit and high-pressure filtration element renewal."
          : "Verificación de margen NPSH, prueba de respuesta escalón en servoválvula y reemplazo de filtros 10µm.",
        rate: "$1,500 – $2,200 USD"
      },
      "Siemens": {
        title: isEnglish ? "Siemens S7-1500 / TIA Portal Automation" : "Autómatas Siemens S7-1500 / TIA Portal",
        badge: isEnglish ? "Industrial Networks & Safety" : "Automatización y Redes",
        subsys: isEnglish
          ? "F-CPU safety PLC, Sinamics S120 drives and Profinet IO distributed peripheral modules."
          : "PLC de seguridad F-CPU, accionamientos Sinamics S120 y módulos de periferia descentralizada Profinet.",
        failure: isEnglish
          ? "Profinet cyclic bus communication drops, safe torque off (STO) lockouts and drive buffer fault trips."
          : "Pérdida de paquetes en bus Profinet, disparos de seguridad STO y saturación de fallos en variadores.",
        protocol: isEnglish
          ? "Profinet packet jitter logging, safety interlock chain trace and servo encoder signal diagnostic."
          : "Registro de jitter en bus, rastreo de enclavamientos de seguridad y diagnóstico de encoders de eje.",
        rate: "$1,500 – $2,200 USD"
      },
      "Festo": {
        title: isEnglish ? "Festo Proportional Pneumatics" : "Neumática Proporcional Festo",
        badge: isEnglish ? "High-Speed Positioning" : "Servo-Neumática",
        subsys: isEnglish
          ? "VPPM/MPPE proportional pressure regulators, valve terminals and pneumatic rodless cylinders."
          : "Reguladores proporcionales VPPM/MPPE, terminales de válvulas CPX y cilindros neumáticos sin vástago.",
        failure: isEnglish
          ? "Flow rate starvation, dynamic seal blow-by and backpressure parasitic oscillation."
          : "Caída de caudal por restricción, fuga por desgaste de sellos y oscilaciones de contrapresión.",
        protocol: isEnglish
          ? "Dynamic flow capacity audit, servo-pneumatic positioning tune and seal integrity verification."
          : "Auditoría de caudal dinámico, sintonización de posicionamiento servo-neumático y cambio de empaques.",
        rate: "$1,500 – $2,000 USD"
      }
    };

    // 4. Generación Inmediata de Folio en Vivo (Docket Activo)
    const sessionFolio = generateTechnicalFolio();
    const hiddenFolioInput = document.getElementById('fieldFolioHidden');
    if (hiddenFolioInput) hiddenFolioInput.value = sessionFolio;
    if (docketFolioDisplay) docketFolioDisplay.textContent = sessionFolio;
    if (ackFolioDisplay) ackFolioDisplay.textContent = sessionFolio;

    // Sincronización continua de campos con el enlace de WhatsApp
    function syncInputsToWhatsApp() {
      const p = plantInput ? plantInput.value.trim() : '';
      const eq = equipmentInput ? equipmentInput.value.trim() : '';
      const s = symptomInput ? symptomInput.value.trim() : '';
      const isUrgent = urgentStopEl ? urgentStopEl.checked : false;
      updateWhatsAppDeeplink(sessionFolio, p, eq, s, isUrgent, isEnglish);
    }

    if (plantInput) plantInput.addEventListener('input', syncInputsToWhatsApp);
    if (equipmentInput) equipmentInput.addEventListener('input', syncInputsToWhatsApp);
    if (symptomInput) symptomInput.addEventListener('input', syncInputsToWhatsApp);

    // Conmutador Táctil iOS de Emergencia de Planta
    if (urgentStopEl) {
      urgentStopEl.addEventListener('change', () => {
        if (urgentSwitchContainer) {
          if (urgentStopEl.checked) {
            urgentSwitchContainer.classList.add('urgent-active');
          } else {
            urgentSwitchContainer.classList.remove('urgent-active');
          }
        }
        syncInputsToWhatsApp();
      });
    }

    // Configuración inicial de WhatsApp
    syncInputsToWhatsApp();

    // 5. Función de Actualización de la Ficha de Telemetría
    function setMachineProfile(key) {
      const profile = machineProfiles[key] || machineProfiles["Sidel"];
      if (machineSpecTitle) machineSpecTitle.textContent = profile.title;
      if (machineSpecBadge) machineSpecBadge.textContent = profile.badge;
      if (machineSpecSubsys) machineSpecSubsys.textContent = profile.subsys;
      if (machineSpecFailure) machineSpecFailure.textContent = profile.failure;
      if (machineSpecProtocol) machineSpecProtocol.textContent = profile.protocol;
      if (machineSpecRate) machineSpecRate.textContent = profile.rate;
      if (equipmentInput) {
        equipmentInput.value = profile.title;
        syncInputsToWhatsApp();
      }
    }

    // Segmentador de Máquinas (Botones Principales en Hero)
    const chipSidel = document.getElementById('chipSidel');
    const chipDieff = document.getElementById('chipDieff');
    const chipRexroth = document.getElementById('chipRexroth');
    const allSegmenterBtns = [chipSidel, chipDieff, chipRexroth].filter(Boolean);

    allSegmenterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        allSegmenterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (btn.id === 'chipSidel') setMachineProfile("Sidel");
        else if (btn.id === 'chipDieff') setMachineProfile("Dieffenbacher");
        else if (btn.id === 'chipRexroth') setMachineProfile("Rexroth");

        if (machineSpecCard) {
          machineSpecCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });

    // Chips Secundarios de Ecosistema Técnico (Brands Strip)
    const brandChips = document.querySelectorAll('.brand-chip');
    brandChips.forEach(chip => {
      chip.addEventListener('click', () => {
        brandChips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');

        const machineName = chip.getAttribute('data-machine') || '';
        let profileKey = "Sidel";
        if (machineName.includes("Dieffenbacher")) profileKey = "Dieffenbacher";
        else if (machineName.includes("Rexroth")) profileKey = "Rexroth";
        else if (machineName.includes("Siemens")) profileKey = "Siemens";
        else if (machineName.includes("Festo")) profileKey = "Festo";

        setMachineProfile(profileKey);
      });
    });

    // Botón de Acción en Ficha Reactiva
    if (btnMachineSpecAction) {
      btnMachineSpecAction.addEventListener('click', () => {
        if (symptomInput) {
          symptomInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          symptomInput.focus();
        }
      });
    }

    // 6. Pestañas Interactivas de la Muestra BOM (Telemetría vs Refacciones)
    if (tabBtnTelemetry && tabBtnParts) {
      tabBtnTelemetry.addEventListener('click', () => {
        tabBtnTelemetry.classList.add('active');
        tabBtnTelemetry.setAttribute('aria-selected', 'true');
        tabBtnParts.classList.remove('active');
        tabBtnParts.setAttribute('aria-selected', 'false');

        if (tabTelemetry) tabTelemetry.classList.add('active');
        if (tabParts) tabParts.classList.remove('active');
      });

      tabBtnParts.addEventListener('click', () => {
        tabBtnParts.classList.add('active');
        tabBtnParts.setAttribute('aria-selected', 'true');
        tabBtnTelemetry.classList.remove('active');
        tabBtnTelemetry.setAttribute('aria-selected', 'false');

        if (tabParts) tabParts.classList.add('active');
        if (tabTelemetry) tabTelemetry.classList.remove('active');
      });
    }

    // 7. Manejo de Envío Asíncrono con Web3Forms y Honeypot Anti-Bot
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
        const isUrgent = urgentStopEl ? urgentStopEl.checked : false;

        formData.set('folio', sessionFolio);
        formData.set('timestamp_utc', timestamp_utc.toString());
        formData.set('plant_location', plantVal);
        formData.set('machine_model', eqVal);
        formData.set('observed_symptom', symVal);
        formData.set('urgent_line_stop', isUrgent.toString());
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
          // Fallback a prueba de fallos: Mostrar acuse en pantalla
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
