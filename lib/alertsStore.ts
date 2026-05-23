export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  currentPrice: number;
  targetPrice: number;
  email: string;
  createdAt: number;
}

const KEY = "trailiq.alerts";

function read(): PriceAlert[] {
  if (typeof window === "undefined") return [];
  try {
    const s = localStorage.getItem(KEY);
    return s ? (JSON.parse(s) as PriceAlert[]) : [];
  } catch {
    return [];
  }
}

function write(alerts: PriceAlert[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(alerts));
  } catch {}
}

export function getAlerts(): PriceAlert[] {
  return read();
}

export function saveAlert(
  data: Omit<PriceAlert, "id" | "createdAt">,
): PriceAlert {
  const existing = read().filter((a) => a.productId !== data.productId);
  const alert: PriceAlert = {
    ...data,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    createdAt: Date.now(),
  };
  write([...existing, alert]);
  return alert;
}

export function deleteAlert(id: string) {
  write(read().filter((a) => a.id !== id));
}

export function getAlertCount(): number {
  return read().length;
}

export function hasAlertForProduct(productId: string): boolean {
  return read().some((a) => a.productId === productId);
}
