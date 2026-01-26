"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/components/cart-context";

export type OrderStatus = "PROCESSING" | "SHIPPED" | "DELIVERED";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  placedAt: string;
  status: OrderStatus;
}

interface OrdersContextValue {
  orders: Order[];
  placeOrder: (items: CartItem[]) => Order;
  updateStatus: (id: string, status: OrderStatus) => void;
  clearAll: () => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

function calcTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("raks_orders");
      if (raw) setOrders(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("raks_orders", JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const placeOrder = (items: CartItem[]) => {
    const order: Order = {
      id: String(Date.now()),
      items,
      total: calcTotal(items),
      placedAt: new Date().toISOString(),
      status: "PROCESSING",
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const clearAll = () => setOrders([]);

  const value = useMemo(
    () => ({ orders, placeOrder, updateStatus, clearAll }),
    [orders]
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
