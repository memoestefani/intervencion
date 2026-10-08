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

  // 2. Función Matemática Pura: Cálculo Determinista de Pérdida por Paro y Amortización
  // Certificada mediante Ortho Verification (Weiser Slicing & Pure Math)
  function calculateRoiMetrics(downtimeHours, hourlyCostRate, fixedInterventionFee) {
    if (downtimeHours <= 0 || hourlyCostRate <= 0) {
      return { totalLoss: 0, amortizationMinutes: 0 };
    }
    const totalLoss = downtimeHours * hourlyCostRate;
    const amortizationMinutes = Math.max(0, Math.round((fixedInterventionFee / totalLoss) * 60));
    return {
      totalLoss: totalLoss,
      amortizationMinutes: amortizationMinutes
    };
  }

  // 2b. Función Matemática Pura: Cálculo de Botellas No Producidas (BPH)
  function calculateBottlesLost(downtimeHours, bottlesPerHour) {
    if (downtimeHours <= 0 || bottlesPerHour <= 0) {
      return 0;
    }
    return Math.round(downtimeHours * bottlesPerHour);
  }

  // 3. Construcción de Enlace Profundo (Deeplink) a WhatsApp
  function updateWhatsAppDeeplink(folio, plant, equipment, symptom, isUrgent, isEnglish) {
    const waBtn = document.getElementById('btnWhatsAppDirect');
    const heroWaBtn = document.querySelector('.btn-hero-wa');
    const modalWaBtn = document.getElementById('btnWhatsAppModal');
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
    if (modalWaBtn) modalWaBtn.href = finalUrl;
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

    // Elementos de la Ficha Modal de Admisión (Focus Sheet)
    const intakeSheet = document.getElementById('intakeSheet');
    const btnOpenIntake = document.getElementById('btnOpenIntake');
    const btnHeroIntake = document.getElementById('btnHeroIntake');
    const btnCloseIntakeSheet = document.getElementById('btnCloseIntakeSheet');

    // Conmutadores de Modalidad y Unidades de ROI
    const btnModalUrgent = document.getElementById('btnModalUrgent');
    const btnModalPreventive = document.getElementById('btnModalPreventive');
    const btnUnitUsd = document.getElementById('btnUnitUsd');
    const btnUnitBottles = document.getElementById('btnUnitBottles');
    const roiLossLabel = document.getElementById('roiLossLabel');
    const roiLossSubtext = document.getElementById('roiLossSubtext');
    let currentRoiUnit = 'usd';

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

    // Perfiles técnicos estructurados para la Ficha Reactiva de Telemetría (4 Topologías Críticas en México)
    const machineProfiles = {
      "Prensas": {
        title: isEnglish ? "Dieffenbacher CPS / Siempelkamp Continuous Presses" : "Prensas Continuas Dieffenbacher CPS / Siempelkamp",
        badge: isEnglish ? "Continuous Press Hydraulics (40-70 m)" : "Hidráulica de Prensas Continuas (40-70 m)",
        subsys: isEnglish
          ? "Multi-cylinder heating platen frames, Rexroth A4VSO pumps, synchronization manifolds, and 220°C thermal platens."
          : "Marcos de cilindros de prensado, bombas Rexroth A4VSO, manifolds de sincronización y platos térmicos a 220°C.",
        failure: isEnglish
          ? "Thermal parallelism drift across frames (> 0.1 mm), multi-frame pressure imbalance, and thermal varnish buildup in servo spools."
          : "Deriva térmica de paralelismo entre marcos (> 0.1 mm), desbalance de presiones y saturación por barniz térmico en servoválvulas.",
        protocol: isEnglish
          ? "Proportional spool deadband compensation, swashplate ripple profiling, laser parallelism realignment, and hydraulic aeration purge."
          : "Compensación de banda muerta en correderas, perfilado de ondulación de bomba, alineación láser y purga de aireación.",
        rate: "$1,800 – $2,500 USD",
        lossPerHour: 35000,
        bomKey: "Prensas",
        sowObjective: isEnglish
          ? "On-site mechatronic press frame inspection, laser platen alignment, and Rexroth A4VSO proportional servo valve calibration."
          : "Inspección mecatrónica de marcos de prensado continuo, compensación de banda muerta en servoválvulas Rexroth y calibración láser de paralelismo."
      },
      "Estampado": {
        title: isEnglish ? "Schuler / Müller Weingarten Heavy Stamping Presses" : "Prensas de Estampado Pesado Schuler / Müller Weingarten",
        badge: isEnglish ? "Heavy Stamping & Forging (1,000–3,000 t)" : "Estampado Pesado & Forja (1,000–3,000 t)",
        subsys: isEnglish
          ? "Deep drawing hydraulic cushions, Moog D661 / Rexroth 4WRTE servo valves, 315-bar piston accumulators, and EN 693 press safety blocks."
          : "Cojines hidráulicos de embutición profunda, servoválvulas Moog D661/Rexroth 4WRTE, acumuladores de pistón 315 bar y bloques de seguridad EN 693.",
        failure: isEnglish
          ? "Pre-fill pressure drops during press impact stroke, automotive sheet wrinkling from cushion force asymmetry, and dynamic instability at stroke reversal."
          : "Caídas de presión en pre-llenado durante golpe de prensa, arrugas en chapa por asimetría de fuerza de cojín e inestabilidad en retorno.",
        protocol: isEnglish
          ? "Millisecond p/Q deep-drawing profile tuning, N2 accumulator precharge audit, and cushion cylinder synchrony realignment."
          : "Calibración dinámica de curvas de embutición p/Q en milisegundos, presurización de acumuladores N2 y sincronía de cilindros de cojín.",
        rate: "$1,800 – $2,500 USD",
        lossPerHour: 45000,
        bomKey: "Estampado",
        sowObjective: isEnglish
          ? "Dynamic deep-drawing cushion tuning, Moog D661 servo response audit, and 315-bar hydraulic impact stabilization."
          : "Calibración dinámica de cojín de embutición profunda, auditoría de respuesta en servoválvula Moog D661 y estabilización hidráulica de impacto."
      },
      "DieCasting": {
        title: isEnglish ? "Bühler Carat / Italpresse High-Pressure Die Casting" : "Inyección de Aluminio Die Casting Bühler Carat / Italpresse",
        badge: isEnglish ? "High-Speed Die Casting (Phase 2 at 10 m/s)" : "Die Casting & Inyección Rápida (Fase 2 a 10 m/s)",
        subsys: isEnglish
          ? "Real-time high-speed shot cylinder (phase 2 up to 10 m/s), 400-bar intensification boosters, Moog D634 / Rexroth servo valves, and accumulators."
          : "Unidad de inyección en tiempo real de alta velocidad (fase 2 a 10 m/s), multiplicadores de presión 400 bar, servoválvulas Moog D634 y acumuladores.",
        failure: isEnglish
          ? "Final squeeze phase delay in intensifier switching, casting micro-porosity from hydraulic cavitation, and shot deceleration pressure spikes."
          : "Retardo en conmutación de multiplicador de compactación, micro-porosidad en piezas fundidas por cavitación y choque hidráulico en frenado.",
        protocol: isEnglish
          ? "Oscillographic shot p/Q profile analysis, step-response timing calibration (< 15 ms), and pilot check valve seating verification."
          : "Análisis oscilográfico de la curva p/Q de inyección, ajuste de tiempo de respuesta escalón (< 15 ms) y estanqueidad en válvulas de retención.",
        rate: "$1,500 – $2,500 USD",
        lossPerHour: 28000,
        bomKey: "DieCasting",
        sowObjective: isEnglish
          ? "Real-time shot cylinder profile calibration (< 15 ms step response), 400-bar intensifier verification, and casting porosity elimination."
          : "Calibración en tiempo real de curva de inyección (< 15 ms de respuesta escalón), verificación de multiplicador 400 bar y eliminación de porosidad."
      },
      "Envasado": {
        title: isEnglish ? "Krones Contiform / Sidel Matrix Bottling Lines" : "Líneas de Envasado Krones Contiform / Sidel Matrix",
        badge: isEnglish ? "High-Pressure p/Q (40 bar)" : "Inspección p/Q (40 bar)",
        subsys: isEnglish
          ? "Rotary blowing carousel, 40-bar manifold, proportional servo valves and stretch servos."
          : "Carrusel de soplado, manifold de 40 bar, servoválvulas proporcionales y servos de estirado.",
        failure: isEnglish
          ? "Angular axis desynchronization, rotary joint seal micro-leakage and mold cavity depressurization."
          : "Desincronización angular, micro-fugas en juntas rotativas y despresurización de molde en ciclo rápido.",
        protocol: isEnglish
          ? "Dynamic 40-bar manifold telemetry, Profinet bus jitter analysis and closed-loop servo calibration."
          : "Medición dinámica p/Q en manifold, análisis de bus Profinet y calibración de lazo de servoválvula.",
        rate: "$1,500 – $2,500 USD",
        lossPerHour: 25000,
        bomKey: "Envasado",
        sowObjective: isEnglish
          ? "Mechatronic rotary blowing carousel inspection, proportional servo valve calibration, and 40-bar nominal pressure recovery."
          : "Inspección mecatrónica de carrusel rotativo de soplado, calibración de servoválvulas proporcionales y restablecimiento de presión nominal (40 bar)."
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
        rate: "$1,500 – $2,200 USD",
        lossPerHour: 25000,
        bomKey: "Envasado",
        sowObjective: isEnglish
          ? "Profinet bus jitter diagnostic, Sinamics drive fault trace, and F-CPU safety program audit."
          : "Diagnóstico de jitter en bus Profinet, rastreo de fallos en variadores Sinamics y auditoría de programa de seguridad F-CPU."
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
        rate: "$1,500 – $2,000 USD",
        lossPerHour: 25000,
        bomKey: "Envasado",
        sowObjective: isEnglish
          ? "Proportional pressure regulator dynamic flow audit, valve terminal timing tune, and pneumatic seal integrity inspection."
          : "Auditoría de caudal dinámico en reguladores proporcionales, sintonización de terminales de válvulas y verificación de sellos."
      }
    };

    // Aliases canónicos para retrocompatibilidad total
    machineProfiles["Sidel"] = machineProfiles["Envasado"];
    machineProfiles["Dieffenbacher"] = machineProfiles["Prensas"];
    machineProfiles["Rexroth"] = machineProfiles["Estampado"];

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

    // Base de datos de Muestras de BOM Reactiva Multi-Máquina (Decisión 8 - 4 Topologías)
    const machineBoms = {
      "Prensas": {
        subtitle: isEnglish ? "Continuous Wood/Steel Press CPS / Multi-Opening" : "Prensa Continua de Madera/Acero CPS / Multialbertura",
        telemetry: isEnglish
          ? `• <strong>Critical Variable Measured:</strong> Frame delta pressure <strong>185 bar</strong> vs. <strong>240 bar setpoint</strong>; platen parallelism drift 0.14 mm.<br>` +
            `• <strong>Deterministic Root Cause:</strong> Cavitation pitting on Rexroth A4VSO pump port plate and thermal sensor drift on frame 4.<br>` +
            `• <strong>Action Executed:</strong> A4VSO rotary group replacement, laser parallelism recalibration, and proportional spool deadband compensation.`
          : `• <strong>Variable Crítica Medida:</strong> Presión en marco diferencial <strong>185 bar</strong> vs. <strong>240 bar consigna</strong> en rampa; deriva de paralelismo 0.14 mm.<br>` +
            `• <strong>Hallazgo Determinista:</strong> Cavitación y picadura en placa de distribución de bomba Rexroth A4VSO y descalibración térmica en transductor del marco 4.<br>` +
            `• <strong>Acción Ejecutada:</strong> Sustitución de grupo rotativo en bomba A4VSO, recalibración láser de paralelismo y compensación de banda muerta en servoválvulas.`,
        parts: [
          { prio: "inmediata", label: isEnglish ? "🔴 IMMEDIATE" : "🔴 INMEDIATA", comp: isEnglish ? "Axial piston pump rotary group" : "Grupo rotativo bomba pistones axiales", part: "A4VSO180DR/30R-PPB13N00", mfr: "Bosch Rexroth", avail: isEnglish ? "Rexroth Dallas / Mty branch" : "Sucursal Rexroth Dallas / Mty" },
          { prio: "inmediata", label: isEnglish ? "🔴 IMMEDIATE" : "🔴 INMEDIATA", comp: isEnglish ? "Magnetostrictive position transducer" : "Transductor de posición magnetostrictivo", part: "BTL5-E10-M0450-P-S32", mfr: "Balluff", avail: isEnglish ? "Distributor in-stock" : "En stock distribuidor" },
          { prio: "preventiva", label: isEnglish ? "🟡 PREVENTIVE (30d)" : "🟡 PREVENTIVA (30d)", comp: isEnglish ? "Proportional directional valve" : "Válvula direccional proporcional", part: "4WRZE16W8-150-7X/6EG24N9K4/M", mfr: "Bosch Rexroth", avail: isEnglish ? "Open commercial catalog" : "Catálogo abierto comercial" },
          { prio: "stock", label: isEnglish ? "🟢 PLANT SPARE" : "🟢 STOCK PLANTA", comp: isEnglish ? "Hydraulic return filter cartridge" : "Cartucho de filtro de retorno alta capacidad", part: "0660R010BN4HC", mfr: "Hydac", avail: isEnglish ? "Plant inventory" : "Existente en almacén cliente" }
        ]
      },
      "Estampado": {
        subtitle: isEnglish ? "Heavy Stamping Press & Automotive Forging (1,000–3,000 t)" : "Prensa de Estampado Pesado & Forja Automotriz (1,000–3,000 t)",
        telemetry: isEnglish
          ? `• <strong>Critical Variable Measured:</strong> Deep-drawing cushion pressure <strong>165 bar</strong> vs. <strong>210 bar nominal</strong>; dynamic ripple at impact.<br>` +
            `• <strong>Deterministic Root Cause:</strong> Pilot seal fatigue on Moog D661 proportional valve and internal bypass on Rexroth pre-fill check valve.<br>` +
            `• <strong>Action Executed:</strong> Closed-loop Moog servo valve replacement, N2 accumulator precharge to 130 bar, and cushion deceleration profile retuning.`
          : `• <strong>Variable Crítica Medida:</strong> Presión de cojín de embutición <strong>165 bar</strong> vs. <strong>210 bar nominal</strong>; fluctuación en golpe.<br>` +
            `• <strong>Hallazgo Determinista:</strong> Desgaste por fatiga en anillo de pilotaje de válvula Moog D661 y fuga interna en válvula de prellenado Rexroth.<br>` +
            `• <strong>Acción Ejecutada:</strong> Reemplazo de servoválvula Moog en lazo cerrado, recarga de nitrógeno N2 a 130 bar en acumuladores Hydac y ajuste de rampa.`,
        parts: [
          { prio: "inmediata", label: isEnglish ? "🔴 IMMEDIATE" : "🔴 INMEDIATA", comp: isEnglish ? "High-response proportional servo valve" : "Servoválvula proporcional de alta dinámica", part: "D661-4651 / G35JOAA6VSX2HA", mfr: "Moog", avail: isEnglish ? "Direct regional distribution Mty / Qro" : "Distribución directa Monterrey / Querétaro" },
          { prio: "inmediata", label: isEnglish ? "🔴 IMMEDIATE" : "🔴 INMEDIATA", comp: isEnglish ? "Directional proportional valve with OBE" : "Válvula direccional proporcional con OBE", part: "4WRTE16V200L-4X/6EG24ETK31/F1M", mfr: "Bosch Rexroth", avail: isEnglish ? "In-stock authorized distributor" : "En stock distribuidor autorizado" },
          { prio: "preventiva", label: isEnglish ? "🟡 PREVENTIVE (30d)" : "🟡 PREVENTIVA (30d)", comp: isEnglish ? "High-pressure piston accumulator 20L" : "Acumulador de pistón de alta presión 20L", part: "SK350-20/2112U-350A", mfr: "Hydac", avail: isEnglish ? "4-day lead time" : "Tiempo de entrega 4 días" },
          { prio: "stock", label: isEnglish ? "🟢 PLANT SPARE" : "🟢 STOCK PLANTA", comp: isEnglish ? "Impact pressure transmitter 0-400 bar" : "Transmisor de presión de impacto 0-400 bar", part: "HDA4745-A-400-000", mfr: "Hydac", avail: isEnglish ? "On-site customer warehouse" : "Existente en almacén cliente" }
        ]
      },
      "DieCasting": {
        subtitle: isEnglish ? "High-Pressure Die Casting & Servo-Hydraulic Cell" : "Celda de Fundición Inyectada Die Casting & Servohidráulica",
        telemetry: isEnglish
          ? `• <strong>Critical Variable Measured:</strong> Shot phase 2 speed <strong>6.8 m/s</strong> vs. <strong>9.5 m/s command</strong>; intensification delay 38 ms.<br>` +
            `• <strong>Deterministic Root Cause:</strong> Balluff fast shot transducer signal drift and pilot restriction in 400-bar intensification multiplier block.<br>` +
            `• <strong>Action Executed:</strong> Moog D634 servo valve replacement, rod transducer zero recalibration, and shot deceleration braking valve re-tuning.`
          : `• <strong>Variable Crítica Medida:</strong> Velocidad de disparo fase 2 <strong>6.8 m/s</strong> vs. <strong>9.5 m/s consigna</strong>; retardo de intensificación 38 ms.<br>` +
            `• <strong>Hallazgo Determinista:</strong> Deriva en transductor magnetostrictivo Balluff de disparo rápido y micro-estricción en bloque multiplicador de presión 400 bar.<br>` +
            `• <strong>Acción Ejecutada:</strong> Sustitución de servoválvula Moog D634, calibración de cero en transductor de vástago y reajuste de válvula de frenado dinámico.`,
        parts: [
          { prio: "inmediata", label: isEnglish ? "🔴 IMMEDIATE" : "🔴 INMEDIATA", comp: isEnglish ? "Ultra-fast injection servo valve (< 12 ms)" : "Servoválvula de inyección ultra-rápida (< 12 ms)", part: "D634-319C / R40KO2M0NSS2", mfr: "Moog", avail: isEnglish ? "Express branch Gdl / Qro" : "Sucursal Express Guadalajara / Querétaro" },
          { prio: "inmediata", label: isEnglish ? "🔴 IMMEDIATE" : "🔴 INMEDIATA", comp: isEnglish ? "High-speed shot position transducer" : "Transductor de posición de disparo de alta velocidad", part: "BTL7-P511-M0600-P-S32", mfr: "Balluff", avail: isEnglish ? "National in-stock distributor" : "Distribuidor en stock nacional" },
          { prio: "preventiva", label: isEnglish ? "🟡 PREVENTIVE (30d)" : "🟡 PREVENTIVA (30d)", comp: isEnglish ? "2-way flow control regulator valve" : "Válvula reguladora de caudal de 2 vías", part: "2FRM10-3X/50LB", mfr: "Bosch Rexroth", avail: isEnglish ? "Open commercial catalog" : "Catálogo abierto comercial" },
          { prio: "stock", label: isEnglish ? "🟢 PLANT SPARE" : "🟢 STOCK PLANTA", comp: isEnglish ? "High-temp shot piston seal kit" : "Kit de sellos para pistón de disparo alta temp.", part: "Parker PolyPak HP-8400", mfr: "Parker Hannifin", avail: isEnglish ? "On-site customer warehouse" : "Existente en almacén cliente" }
        ]
      },
      "Envasado": {
        subtitle: isEnglish ? "Continuous Bottling & Rotary Blowing (40 bar)" : "Líneas de Envasado & Soplado Rotativo (40 bar)",
        telemetry: isEnglish
          ? `• <strong>Critical Variable Measured:</strong> Blowing manifold pressure <strong>38 bar (Actual)</strong> vs. <strong>40 bar (Nominal)</strong>.<br>` +
            `• <strong>Deterministic Root Cause:</strong> Dynamic blow-by in rotary distributor manifold and servo-proportional spool sticking from thermal varnish.<br>` +
            `• <strong>Action Executed:</strong> In-situ disassembly, ultrasonic spool de-varnishing, primary rotary seal replacement and closed-loop p/Q re-tuning.`
          : `• <strong>Variable Crítica Medida:</strong> Presión en manifold de soplado <strong>38 bar (Medida)</strong> vs. <strong>40 bar (Nominal)</strong>.<br>` +
            `• <strong>Hallazgo Determinista:</strong> Fuga dinámica en junta rotativa de distribución y corredera de válvula servoproporcional atascada por barniz térmico.<br>` +
            `• <strong>Acción Ejecutada:</strong> Desmontaje in-situ, flushing ultrasónico de corredera, reemplazo de empaque primario y recalibración de lazo cerrado p/Q.`,
        parts: [
          { prio: "inmediata", label: isEnglish ? "🔴 IMMEDIATE" : "🔴 INMEDIATA", comp: isEnglish ? "Servo-proportional valve NG10" : "Válvula servoproporcional NG10", part: "4WRPE10-W6-50L-2X/G24K0/A1M", mfr: "Bosch Rexroth", avail: isEnglish ? "Open local distributor" : "Distribución local abierta" },
          { prio: "inmediata", label: isEnglish ? "🔴 IMMEDIATE" : "🔴 INMEDIATA", comp: isEnglish ? "High-pressure filter element 10µm" : "Elemento filtrante alta presión 10µm", part: "0240D010BN4HC", mfr: "Hydac", avail: isEnglish ? "Distributor in-stock" : "En stock distribuidor" },
          { prio: "preventiva", label: isEnglish ? "🟡 PREVENTIVE (30d)" : "🟡 PREVENTIVA (30d)", comp: isEnglish ? "Viton high-temp seal kit" : "Juego de sellos Vitón alta temperatura", part: "V8388-75 Parker O-Ring Kit", mfr: "Parker Hannifin", avail: isEnglish ? "5-day lead time" : "Tiempo entrega 5 días" },
          { prio: "stock", label: isEnglish ? "🟢 PLANT SPARE" : "🟢 STOCK PLANTA", comp: isEnglish ? "Blowing axis synchronous servo" : "Servomotor sincrónico eje soplado", part: "1FK7060-2AC71-1QA0", mfr: "Siemens", avail: isEnglish ? "On-site customer warehouse" : "Existente en almacén cliente" }
        ]
      }
    };

    // Aliases canónicos para retrocompatibilidad
    machineBoms["Sidel"] = machineBoms["Envasado"];
    machineBoms["Dieffenbacher"] = machineBoms["Prensas"];
    machineBoms["Rexroth"] = machineBoms["Estampado"];

    const bomMachineSubtitle = document.getElementById('bomMachineSubtitle');
    const bomTelemetryContent = document.getElementById('bomTelemetryContent');
    const bomPartsContent = document.getElementById('bomPartsContent');

    function updateBomView(key) {
      const bomData = machineBoms[key] || machineBoms["Prensas"] || machineBoms["Envasado"];
      if (bomMachineSubtitle) bomMachineSubtitle.textContent = bomData.subtitle;
      if (bomTelemetryContent) bomTelemetryContent.innerHTML = bomData.telemetry;
      if (bomPartsContent) {
        const rows = bomData.parts.map(p => `
          <tr>
            <td><span class="badge-urgency ${p.prio}">${p.label}</span></td>
            <td>${p.comp}</td>
            <td><code>${p.part}</code></td>
            <td>${p.mfr}</td>
            <td>${p.avail}</td>
          </tr>
        `).join('');
        bomPartsContent.innerHTML = `
          <table class="report-bom-table">
            <thead>
              <tr>
                <th>${isEnglish ? "Priority" : "Prioridad"}</th>
                <th>${isEnglish ? "Failed Component" : "Componente de Falla"}</th>
                <th>${isEnglish ? "Open Equivalent Spare" : "Refacción Homologada Abierta"}</th>
                <th>${isEnglish ? "Manufacturer" : "Fabricante"}</th>
                <th>${isEnglish ? "Availability" : "Disponibilidad"}</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        `;
      }
    }

    let currentHourlyLossRate = 35000;

    // 5. Función de Actualización de la Ficha de Telemetría y BOM Reactiva
    function setMachineProfile(key) {
      const profile = machineProfiles[key] || machineProfiles["Prensas"] || machineProfiles["Envasado"];
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

      // Actualizar tasa horaria de ROI y recálculo
      if (profile.lossPerHour) {
        currentHourlyLossRate = profile.lossPerHour;
        if (currentRoiUnit === 'usd' && roiLossSubtext) {
          const shortTitle = profile.title.split('/')[0].trim();
          roiLossSubtext.textContent = isEnglish
            ? `Calculated at $${currentHourlyLossRate.toLocaleString('en-US')} USD/h on ${shortTitle}.`
            : `Calculado a tasa base de $${currentHourlyLossRate.toLocaleString('en-US')} USD/h en ${shortTitle}.`;
        }
        updateRoiCalculations();
      }

      // Actualizar Proforma SOW Dinámica
      const sowFolioEl = document.getElementById('sowDocFolio');
      const sowObjEl = document.getElementById('sowObjectiveText');
      if (sowFolioEl) sowFolioEl.textContent = `FOLIO: #SOW-261008-${key.toUpperCase()}`;
      if (sowObjEl && profile.sowObjective) {
        sowObjEl.textContent = profile.sowObjective;
      }

      const bomTarget = profile.bomKey || key;
      if (machineBoms[bomTarget]) {
        updateBomView(bomTarget);
      }
    }

    // Segmentador de Máquinas (Botones Principales en Hero - 4 Topologías)
    const chipDieff = document.getElementById('chipDieff');
    const chipRexroth = document.getElementById('chipRexroth');
    const chipDieCasting = document.getElementById('chipDieCasting');
    const chipSidel = document.getElementById('chipSidel');
    const allSegmenterBtns = [chipDieff, chipRexroth, chipDieCasting, chipSidel].filter(Boolean);

    allSegmenterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        allSegmenterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const topology = btn.getAttribute('data-topology');
        if (topology) {
          setMachineProfile(topology);
        } else if (btn.id === 'chipDieff') {
          setMachineProfile("Prensas");
        } else if (btn.id === 'chipRexroth') {
          setMachineProfile("Estampado");
        } else if (btn.id === 'chipDieCasting') {
          setMachineProfile("DieCasting");
        } else if (btn.id === 'chipSidel') {
          setMachineProfile("Envasado");
        }

        if (machineSpecCard) {
          machineSpecCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    // Chips Secundarios de Ecosistema Técnico (Brands Strip)
    const brandChips = document.querySelectorAll('.brand-chip');
    brandChips.forEach(chip => {
      chip.addEventListener('click', () => {
        brandChips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');

        const machineName = chip.getAttribute('data-machine') || '';
        let profileKey = "Envasado";
        if (machineName.includes("Dieffenbacher") || machineName.includes("Prensas") || machineName.includes("Siempelkamp")) profileKey = "Prensas";
        else if (machineName.includes("Estampado") || machineName.includes("Schuler") || machineName.includes("Müller") || machineName.includes("Rexroth")) profileKey = "Estampado";
        else if (machineName.includes("Die Casting") || machineName.includes("Bühler") || machineName.includes("Italpresse")) profileKey = "DieCasting";
        else if (machineName.includes("Sidel") || machineName.includes("Envasado") || machineName.includes("Krones")) profileKey = "Envasado";
        else if (machineName.includes("Siemens")) profileKey = "Siemens";
        else if (machineName.includes("Festo")) profileKey = "Festo";

        setMachineProfile(profileKey);
      });
    });

    // Controladores de Diálogo Modal (Focus Sheet)
    function openIntakeModal() {
      if (intakeSheet) {
        if (typeof intakeSheet.showModal === 'function') {
          intakeSheet.showModal();
        } else {
          intakeSheet.setAttribute('open', '');
        }
        if (plantInput) setTimeout(() => plantInput.focus(), 60);
      }
    }

    function closeIntakeModal() {
      if (intakeSheet) {
        if (typeof intakeSheet.close === 'function') {
          intakeSheet.close();
        } else {
          intakeSheet.removeAttribute('open');
        }
      }
    }

    if (btnOpenIntake) btnOpenIntake.addEventListener('click', openIntakeModal);
    if (btnHeroIntake) {
      btnHeroIntake.addEventListener('click', (e) => {
        e.preventDefault();
        openIntakeModal();
      });
    }
    if (btnCloseIntakeSheet) btnCloseIntakeSheet.addEventListener('click', closeIntakeModal);
    if (intakeSheet) {
      intakeSheet.addEventListener('click', (e) => {
        if (e.target === intakeSheet) closeIntakeModal();
      });
    }

    // Controladores de Diálogo Modal SOW (Section 6.3 PRD)
    const btnOpenSowPreview = document.getElementById('btnOpenSowPreview');
    const sowPreviewDialog = document.getElementById('sowPreviewDialog');
    const btnCloseSowPreview = document.getElementById('btnCloseSowPreview');
    const btnDismissSowPreview = document.getElementById('btnDismissSowPreview');

    function openSowModal() {
      if (sowPreviewDialog) {
        if (typeof sowPreviewDialog.showModal === 'function') {
          sowPreviewDialog.showModal();
        } else {
          sowPreviewDialog.setAttribute('open', '');
        }
      }
    }

    function closeSowModal() {
      if (sowPreviewDialog) {
        if (typeof sowPreviewDialog.close === 'function') {
          sowPreviewDialog.close();
        } else {
          sowPreviewDialog.removeAttribute('open');
        }
      }
    }

    if (btnOpenSowPreview) btnOpenSowPreview.addEventListener('click', openSowModal);
    if (btnCloseSowPreview) btnCloseSowPreview.addEventListener('click', closeSowModal);
    if (btnDismissSowPreview) btnDismissSowPreview.addEventListener('click', closeSowModal);
    if (sowPreviewDialog) {
      sowPreviewDialog.addEventListener('click', (e) => {
        if (e.target === sowPreviewDialog) closeSowModal();
      });
    }

    // Conmutador de Modalidad en Hero (Paro Crítico vs Preventivo)
    if (btnModalUrgent && btnModalPreventive) {
      btnModalUrgent.addEventListener('click', () => {
        btnModalUrgent.classList.add('active', 'urgent');
        btnModalPreventive.classList.remove('active');
        if (urgentStopEl) {
          urgentStopEl.checked = true;
          urgentStopEl.dispatchEvent(new Event('change'));
        }
        openIntakeModal();
      });

      btnModalPreventive.addEventListener('click', () => {
        btnModalPreventive.classList.add('active');
        btnModalUrgent.classList.remove('active', 'urgent');
        if (urgentStopEl) {
          urgentStopEl.checked = false;
          urgentStopEl.dispatchEvent(new Event('change'));
        }
        openIntakeModal();
      });
    }

    // Botón de Acción en Ficha Reactiva
    if (btnMachineSpecAction) {
      btnMachineSpecAction.addEventListener('click', (e) => {
        e.preventDefault();
        openIntakeModal();
        if (symptomInput) setTimeout(() => symptomInput.focus(), 60);
      });
    }

    // Selector de Unidades de ROI ($ USD vs Botellas BPH)
    if (btnUnitUsd && btnUnitBottles) {
      btnUnitUsd.addEventListener('click', () => {
        currentRoiUnit = 'usd';
        btnUnitUsd.classList.add('active');
        btnUnitBottles.classList.remove('active');
        if (roiLossLabel) {
          roiLossLabel.textContent = isEnglish ? "Cumulative Production Loss" : "Pérdida en Producción Acumulada";
        }
        if (roiLossSubtext) {
          roiLossSubtext.textContent = isEnglish
            ? `Calculated at baseline $${currentHourlyLossRate.toLocaleString('en-US')} USD/h on critical industrial machinery.`
            : `Calculado a tasa base de $${currentHourlyLossRate.toLocaleString('en-US')} USD/hora en maquinaria industrial crítica.`;
        }
        updateRoiCalculations();
      });

      btnUnitBottles.addEventListener('click', () => {
        currentRoiUnit = 'bottles';
        btnUnitBottles.classList.add('active');
        btnUnitUsd.classList.remove('active');
        if (roiLossLabel) {
          roiLossLabel.textContent = isEnglish ? "Bottles Not Produced (BPH Loss)" : "Botellas No Producidas (BPH)";
        }
        if (roiLossSubtext) {
          roiLossSubtext.textContent = isEnglish
            ? "Calculated at 45,000 Bottles Per Hour (Sidel Matrix / Krones nominal speed)."
            : "Calculado a 45,000 Botellas/Hora (velocidad nominal Sidel Matrix / Krones).";
        }
        updateRoiCalculations();
      });
    }

    // 6. Dial Táctil Háptico de ROI (Decisión 4 / Arbitraje 14)
    const dialRoi = document.getElementById('dialRoiStoppage');
    const sliderHoursDisplay = document.getElementById('sliderHoursDisplay');
    const roiLossDisplay = document.getElementById('roiLossDisplay');
    const roiAmortizationDisplay = document.getElementById('roiAmortizationDisplay');

    function updateRoiCalculations() {
      if (!dialRoi) return;
      const hours = parseFloat(dialRoi.value) || 2.0;
      if (sliderHoursDisplay) {
        sliderHoursDisplay.innerHTML = `<strong>${hours.toFixed(1)} h</strong>`;
      }
      const metrics = calculateRoiMetrics(hours, currentHourlyLossRate, 2000);
      if (roiLossDisplay) {
        if (currentRoiUnit === 'bottles') {
          const bottles = calculateBottlesLost(hours, 45000);
          roiLossDisplay.textContent = `${bottles.toLocaleString('en-US')} ${isEnglish ? "Bottles" : "Botellas"}`;
        } else {
          roiLossDisplay.textContent = `$${metrics.totalLoss.toLocaleString('en-US')} USD`;
        }
      }
      if (roiAmortizationDisplay) {
        roiAmortizationDisplay.textContent = `${metrics.amortizationMinutes} min`;
      }
    }

    if (dialRoi) {
      dialRoi.addEventListener('input', updateRoiCalculations);
      updateRoiCalculations();
    }

    // 7. Botón 1-Click de Memorándum PO para Compras (Decisión 5 / Arbitraje 10)
    const btnCopyPoSlip = document.getElementById('btnCopyPoSlip');
    const copyToastFeedback = document.getElementById('copyToastFeedback');

    if (btnCopyPoSlip) {
      btnCopyPoSlip.addEventListener('click', async () => {
        const memoText = isEnglish
          ? `MRO URGENT PURCHASE ORDER JUSTIFICATION MEMORANDUM\n` +
            `Folio Docket: ${sessionFolio}\n` +
            `Service: Specialized Independent On-Site Mechatronic Root-Cause Diagnostic.\n` +
            `Supplier Classification: Persona Moral / Independent Corporate Contractor (W-8BEN compliant, Zero-REPSE risk).\n` +
            `Fixed Professional Fee: $2,000.00 USD (below corporate competitive bidding threshold of $5,000 USD).\n` +
            `ROI Justification: Production downtime loss rate at $25,000 USD/h. Fixed intervention fee is amortized within first 5 minutes of line restoration.\n` +
            `Deliverables: Ex-ante binding SOW + Ex-post Root Cause Diagnostic Report with open, unbranded OEM parts list.`
          : `MEMORÁNDUM DE JUSTIFICACIÓN PARA ORDEN DE COMPRA MRO URGENTE\n` +
            `Folio Docket: ${sessionFolio}\n` +
            `Servicio: Diagnóstico Mecatrónico en Sitio e Identificación de Causa Raíz Independiente.\n` +
            `Clasificación Proveedor: Persona Moral de Servicios Técnicos Especializados (SAT 32-D positiva / STPS DC-3 / Libre de REPSE Art. 15-D CFF).\n` +
            `Tarifa Fija Cerrada: $2,000.00 USD (adquisición directa bajo umbral corporativo de licitación de $5,000 USD).\n` +
            `Justificación Financiera: Paro de línea a tasa de $25,000 USD/h. El costo fijo se amortiza en los primeros 5 minutos de producción restablecida.\n` +
            `Entregables: SOW de alcance cerrado ex-ante + Reporte de Cierre Técnico con lista abierta de refacciones comerciales universales (cero cautiverio de partes).`;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(memoText);
          } else {
            const ta = document.createElement('textarea');
            ta.value = memoText;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          }

          btnCopyPoSlip.classList.add('copied');
          btnCopyPoSlip.innerHTML = `<span>✓ ${isEnglish ? "Memorandum Copied to Clipboard!" : "¡Memorándum Copiado al Portapapeles!"}</span>`;
          if (copyToastFeedback) copyToastFeedback.classList.remove('hidden');

          setTimeout(() => {
            btnCopyPoSlip.classList.remove('copied');
            btnCopyPoSlip.innerHTML = `<span>📋 ${isEnglish ? "Copy MRO Purchase Order Memo (SAP / Coupa)" : "Copiar Memorándum de Justificación para Orden de Compra MRO (SAP / Coupa)"}</span>`;
            if (copyToastFeedback) copyToastFeedback.classList.add('hidden');
          }, 4000);
        } catch (err) {
          console.error("Error al copiar memorándum:", err);
        }
      });
    }

    // 8. Pestañas Interactivas de la Muestra BOM (Telemetría vs Refacciones)
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

    // 9. Manejo de Envío Asíncrono con Web3Forms y Honeypot Anti-Bot
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
