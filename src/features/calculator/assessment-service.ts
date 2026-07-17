export interface ApplianceSpec {
  id: string;
  name: string;
  defaultPower: number; // Watts
  defaultHours: number; // Hours
  category: "lighting" | "comfort" | "appliances" | "office" | "other";
}

export interface SelectedAppliance {
  id: string;
  name: string;
  power: number;
  quantity: number;
  hours: number;
}

export interface SizingResult {
  dailyWh: number;
  dailyKwh: number;
  peakLoadW: number;
  recommendedInverterKva: number;
  recommendedBatteryKwh: number;
  recommendedSolarW: number;
  category: "small" | "medium" | "large" | "commercial";
}

export const APPLIANCE_CATALOG: ApplianceSpec[] = [
  { id: "lighting", name: "LED Bulbs", defaultPower: 15, defaultHours: 10, category: "lighting" },
  {
    id: "fan",
    name: "Standing / Ceiling Fan",
    defaultPower: 80,
    defaultHours: 12,
    category: "comfort",
  },
  {
    id: "tv",
    name: "Television (LED)",
    defaultPower: 150,
    defaultHours: 6,
    category: "appliances",
  },
  {
    id: "decoder",
    name: "DSTV / Cable Decoder",
    defaultPower: 25,
    defaultHours: 6,
    category: "appliances",
  },
  {
    id: "refrigerator",
    name: "Refrigerator / Fridge",
    defaultPower: 300,
    defaultHours: 24,
    category: "appliances",
  },
  {
    id: "freezer",
    name: "Chest Freezer",
    defaultPower: 400,
    defaultHours: 24,
    category: "appliances",
  },
  {
    id: "ac",
    name: "Air Conditioner (1.5 HP)",
    defaultPower: 1200,
    defaultHours: 6,
    category: "comfort",
  },
  { id: "laptop", name: "Laptop Computer", defaultPower: 60, defaultHours: 8, category: "office" },
  {
    id: "desktop",
    name: "Desktop Computer & Monitor",
    defaultPower: 200,
    defaultHours: 8,
    category: "office",
  },
  {
    id: "printer",
    name: "Office Printer / Scanner",
    defaultPower: 400,
    defaultHours: 1,
    category: "office",
  },
  {
    id: "router",
    name: "WiFi Router / Modem",
    defaultPower: 15,
    defaultHours: 24,
    category: "office",
  },
  { id: "pump", name: "Water Pump", defaultPower: 1000, defaultHours: 1, category: "other" },
  {
    id: "microwave",
    name: "Microwave Oven",
    defaultPower: 1200,
    defaultHours: 0.5,
    category: "appliances",
  },
  {
    id: "kettle",
    name: "Electric Kettle",
    defaultPower: 2000,
    defaultHours: 0.5,
    category: "appliances",
  },
  {
    id: "iron",
    name: "Pressing Iron",
    defaultPower: 1500,
    defaultHours: 1,
    category: "appliances",
  },
  {
    id: "washing_machine",
    name: "Washing Machine",
    defaultPower: 800,
    defaultHours: 2,
    category: "appliances",
  },
  { id: "pos", name: "POS Machine", defaultPower: 10, defaultHours: 12, category: "office" },
  { id: "cctv", name: "CCTV Cameras & DVR", defaultPower: 50, defaultHours: 24, category: "other" },
  { id: "server", name: "Office Server", defaultPower: 400, defaultHours: 24, category: "office" },
];

export function calculateSizing(
  selected: SelectedAppliance[],
  phcnAvailability: number = 8,
): SizingResult {
  const activeAppliances = selected.filter((app) => app.quantity > 0);

  // 1. Daily Wh & kWh
  const dailyWh = activeAppliances.reduce(
    (sum, app) => sum + app.power * app.quantity * app.hours,
    0,
  );
  const dailyKwh = Math.round((dailyWh / 1000) * 100) / 100;

  // 2. Peak active load (W)
  const peakLoadW = activeAppliances.reduce((sum, app) => sum + app.power * app.quantity, 0);

  // 3. Recommended Inverter Size (kVa)
  // Peak active load + 25% safety buffer / 800 (assuming 0.8 Power Factor)
  const requiredWatts = peakLoadW * 1.25;
  const calculatedInverter = requiredWatts / 800;

  let recommendedInverterKva = 1.5;
  if (calculatedInverter > 10.0) {
    recommendedInverterKva = Math.ceil(calculatedInverter);
  } else if (calculatedInverter > 8.0) {
    recommendedInverterKva = 10.0;
  } else if (calculatedInverter > 5.0) {
    recommendedInverterKva = 8.0;
  } else if (calculatedInverter > 3.0) {
    recommendedInverterKva = 5.0;
  } else if (calculatedInverter > 1.5) {
    recommendedInverterKva = 3.0;
  }

  // 4. Battery storage sizing (kWh)
  // Outage duration (hours) = 24 - phcnAvailability (minimum 4 hours buffer)
  const outageHours = Math.max(4, 24 - phcnAvailability);
  // Energy required during outage = Daily Wh * (outage hours / 24)
  const energyDuringOutageWh = dailyWh * (outageHours / 24);
  // Add 25% depth of discharge buffer
  const recommendedBatteryKwh = Math.round(((energyDuringOutageWh * 1.25) / 1000) * 10) / 10;

  // 5. Recommended Solar capacity (W)
  // Recommended solar capacity should recharge the battery in 4.5 peak sun hours + 20% system losses
  const recommendedSolarW =
    energyDuringOutageWh > 0 ? Math.round(((energyDuringOutageWh * 1.2) / 4.5 / 10) * 10) : 0;

  // 6. Sizing Category
  let category: "small" | "medium" | "large" | "commercial" = "small";
  if (recommendedInverterKva > 10.0 || peakLoadW > 8000) {
    category = "commercial";
  } else if (recommendedInverterKva > 5.0) {
    category = "large";
  } else if (recommendedInverterKva > 1.5) {
    category = "medium";
  }

  return {
    dailyWh,
    dailyKwh,
    peakLoadW,
    recommendedInverterKva,
    recommendedBatteryKwh,
    recommendedSolarW,
    category,
  };
}
