"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  Lock,
  BarChart3,
  ShoppingBag,
  Settings,
  Users,
  Check,
  Trash2,
  Plus,
  Save,
  LogOut,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useSiteData, type TemplateRow, type PortfolioRow } from "./ClientApp";
import type { SiteSettingsData } from "@/db/defaults";

interface AdminPanelProps {
  onClose: () => void;
}

type Tab = "dashboard" | "orders" | "templates" | "portfolio" | "settings";

interface OrderRow {
  id: number;
  externalId: string;
  templateId: string;
  templateName: string;
  email: string;
  txHash: string;
  amount: number;
  status: string;
  createdAt: string | null;
  completedAt: string | null;
}

interface VisitorStats {
  total: number;
  today: number;
  week: number;
  month: number;
  recentVisitors: { id: number; page: string; device: string | null; referrer: string | null; createdAt: string | null }[];
}

interface OrderStats {
  total: number;
  pending: number;
  completed: number;
  rejected: number;
  revenue: number;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const { settings: initialSettings, refreshData } = useSiteData();
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // Data states
  const [settingsData, setSettingsData] = useState<SiteSettingsData>(initialSettings);
  const [ordersData, setOrdersData] = useState<OrderRow[]>([]);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setLoggedIn(true);
        setStoredPassword(password);
        setError("");
      } else {
        setError("Wrong password");
      }
    } catch {
      setError("Connection error");
    }
  };

  const loadDashboardData = useCallback(async () => {
    if (!storedPassword) return;
    try {
      const [vRes, oRes] = await Promise.all([
        fetch(`/api/visitors?password=${encodeURIComponent(storedPassword)}`),
        fetch("/api/orders?stats=true"),
      ]);
      if (vRes.ok) setVisitorStats(await vRes.json());
      if (oRes.ok) setOrderStats(await oRes.json());
    } catch {
      // ignore
    }
  }, [storedPassword]);

  const loadOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) setOrdersData(await res.json());
    } catch {
      // ignore
    }
  }, []);

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) setSettingsData(await res.json());
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      loadDashboardData();
      loadOrders();
      loadSettings();
    }
  }, [loggedIn, loadDashboardData, loadOrders, loadSettings]);

  const updateSettings = (partial: Partial<SiteSettingsData>) => {
    setSettingsData((prev) => ({ ...prev, ...partial }));
  };

  const saveSettings = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...settingsData, password: storedPassword }),
      });
      if (res.ok) {
        setSaveMsg("✅ Settings saved to database!");
        await refreshData();
        setTimeout(() => setSaveMsg(""), 3000);
      } else {
        setSaveMsg("❌ Failed to save");
      }
    } catch {
      setSaveMsg("❌ Connection error");
    }
    setSaving(false);
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: storedPassword, id: orderId, status }),
    });
    loadOrders();
    loadDashboardData();
  };

  if (!loggedIn) {
    return (
      <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-sm border border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Lock size={20} /> Admin Login
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white mb-4 focus:border-blue-500 focus:outline-none"
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "Dashboard", icon: <BarChart3 size={18} /> },
    { key: "orders", label: "Orders", icon: <ShoppingBag size={18} /> },
    { key: "templates", label: "Templates", icon: <Eye size={18} /> },
    { key: "portfolio", label: "Portfolio", icon: <Users size={18} /> },
    { key: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex">
      {/* Sidebar */}
      <div className="w-56 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h2 className="font-bold text-lg">Admin Panel</h2>
          <p className="text-xs text-emerald-400 mt-1">💾 Database Connected</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-slate-800">
          <button
            onClick={() => {
              setLoggedIn(false);
              onClose();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-900/30"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
          <h2 className="text-lg font-bold capitalize">{activeTab}</h2>
          <div className="flex items-center gap-2">
            {saveMsg && <span className="text-sm">{saveMsg}</span>}
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "dashboard" && (
            <DashboardTab
              visitorStats={visitorStats}
              orderStats={orderStats}
              onRefresh={loadDashboardData}
            />
          )}
          {activeTab === "orders" && (
            <OrdersTab
              orders={ordersData}
              onUpdateStatus={updateOrderStatus}
              onRefresh={loadOrders}
            />
          )}
          {activeTab === "settings" && (
            <SettingsTab
              data={settingsData}
              updateSettings={updateSettings}
              onSave={saveSettings}
              saving={saving}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
            />
          )}
          {activeTab === "templates" && (
            <TemplatesTab password={storedPassword} onRefresh={refreshData} />
          )}
          {activeTab === "portfolio" && (
            <PortfolioTab password={storedPassword} onRefresh={refreshData} />
          )}
        </div>
      </div>
    </div>
  );
}

// Dashboard Tab
function DashboardTab({
  visitorStats,
  orderStats,
  onRefresh,
}: {
  visitorStats: VisitorStats | null;
  orderStats: OrderStats | null;
  onRefresh: () => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Overview</h3>
        <button onClick={onRefresh} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Visitors" value={visitorStats?.total ?? 0} color="blue" />
        <StatCard label="Today" value={visitorStats?.today ?? 0} color="emerald" />
        <StatCard label="This Week" value={visitorStats?.week ?? 0} color="purple" />
        <StatCard label="This Month" value={visitorStats?.month ?? 0} color="amber" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Orders" value={orderStats?.total ?? 0} color="blue" />
        <StatCard label="Pending" value={orderStats?.pending ?? 0} color="amber" />
        <StatCard label="Completed" value={orderStats?.completed ?? 0} color="emerald" />
        <StatCard label="Revenue" value={`$${orderStats?.revenue ?? 0}`} color="purple" />
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  const colors: Record<string, string> = {
    blue: "text-blue-400 bg-blue-600/10",
    emerald: "text-emerald-400 bg-emerald-600/10",
    purple: "text-purple-400 bg-purple-600/10",
    amber: "text-amber-400 bg-amber-600/10",
  };
  return (
    <div className={`p-4 rounded-xl border border-slate-800 ${colors[color] || colors.blue}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}

// Orders Tab
function OrdersTab({
  orders,
  onUpdateStatus,
  onRefresh,
}: {
  orders: OrderRow[];
  onUpdateStatus: (id: number, status: string) => void;
  onRefresh: () => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Orders ({orders.length})</h3>
        <button onClick={onRefresh} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
          <RefreshCw size={18} />
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-slate-400 text-center py-12">No orders yet</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold">{order.templateName}</h4>
                  <p className="text-sm text-slate-400">{order.email}</p>
                  <p className="text-xs text-slate-500 mt-1">TX: {order.txHash}</p>
                  <p className="text-xs text-slate-500">
                    {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold">${order.amount}</span>
                  <div className="mt-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-emerald-900/50 text-emerald-400"
                          : order.status === "rejected"
                          ? "bg-red-900/50 text-red-400"
                          : "bg-amber-900/50 text-amber-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              {order.status === "pending" && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onUpdateStatus(order.id, "completed")}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg flex items-center gap-1"
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button
                    onClick={() => onUpdateStatus(order.id, "rejected")}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg flex items-center gap-1"
                  >
                    <X size={14} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Settings Tab
function SettingsTab({
  data,
  updateSettings,
  onSave,
  saving,
  expandedSections,
  toggleSection,
}: {
  data: SiteSettingsData;
  updateSettings: (partial: Partial<SiteSettingsData>) => void;
  onSave: () => void;
  saving: boolean;
  expandedSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
}) {
  const sections = [
    {
      key: "hero",
      title: "🦸 Hero Section",
      content: (
        <div className="space-y-3">
          <Field label="Greeting" value={data.heroGreeting} onChange={(v) => updateSettings({ heroGreeting: v })} />
          <Field label="Name" value={data.heroName} onChange={(v) => updateSettings({ heroName: v })} />
          <Field label="Title" value={data.heroTitle} onChange={(v) => updateSettings({ heroTitle: v })} />
          <Field label="Description" value={data.heroDescription} onChange={(v) => updateSettings({ heroDescription: v })} textarea />
          <Field label="Profile Image URL" value={data.profileImage} onChange={(v) => updateSettings({ profileImage: v })} />
          <Field label="Background Image URL" value={data.heroBackground} onChange={(v) => updateSettings({ heroBackground: v })} />
        </div>
      ),
    },
    {
      key: "social",
      title: "🔗 Social Links",
      content: (
        <div className="space-y-3">
          <Field label="GitHub URL" value={data.githubUrl} onChange={(v) => updateSettings({ githubUrl: v })} />
          <Field label="Telegram URL" value={data.telegramUrl} onChange={(v) => updateSettings({ telegramUrl: v })} />
          <Field label="Instagram URL" value={data.instagramUrl} onChange={(v) => updateSettings({ instagramUrl: v })} />
          <Field label="LinkedIn URL" value={data.linkedinUrl} onChange={(v) => updateSettings({ linkedinUrl: v })} />
        </div>
      ),
    },
    {
      key: "contact",
      title: "📧 Contact Info",
      content: (
        <div className="space-y-3">
          <Field label="Email" value={data.email} onChange={(v) => updateSettings({ email: v })} />
          <Field label="Phone" value={data.phone} onChange={(v) => updateSettings({ phone: v })} />
          <Field label="Location" value={data.location} onChange={(v) => updateSettings({ location: v })} />
        </div>
      ),
    },
    {
      key: "about",
      title: "ℹ️ About Section",
      content: (
        <div className="space-y-3">
          <Field label="About Title" value={data.aboutTitle} onChange={(v) => updateSettings({ aboutTitle: v })} />
          <Field label="Paragraph 1" value={data.aboutParagraph1} onChange={(v) => updateSettings({ aboutParagraph1: v })} textarea />
          <Field label="Paragraph 2" value={data.aboutParagraph2} onChange={(v) => updateSettings({ aboutParagraph2: v })} textarea />
          <Field label="Years Experience" value={data.yearsExperience} onChange={(v) => updateSettings({ yearsExperience: v })} />
          <Field label="Templates Sold" value={data.templatesSold} onChange={(v) => updateSettings({ templatesSold: v })} />
          <Field label="Happy Clients" value={data.happyClients} onChange={(v) => updateSettings({ happyClients: v })} />
        </div>
      ),
    },
    {
      key: "payment",
      title: "💰 Payment",
      content: (
        <div className="space-y-3">
          <Field label="USDT Wallet Address" value={data.walletAddress} onChange={(v) => updateSettings({ walletAddress: v })} />
        </div>
      ),
    },
    {
      key: "security",
      title: "🔒 Security",
      content: (
        <div className="space-y-3">
          <Field label="Admin Password" value={data.adminPassword} onChange={(v) => updateSettings({ adminPassword: v })} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold">Site Settings</h3>
          <p className="text-xs text-emerald-400 mt-1">
            ✅ Changes are saved to the database and visible to everyone
          </p>
        </div>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white rounded-lg flex items-center gap-2 text-sm font-medium"
        >
          <Save size={16} /> {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      <div className="space-y-2">
        {sections.map((section) => (
          <div key={section.key} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-700/50 transition-colors"
            >
              <span className="font-medium">{section.title}</span>
              {expandedSections[section.key] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {expandedSections[section.key] && (
              <div className="px-4 pb-4">{section.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="text-xs text-slate-400 mb-1 block">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
        />
      )}
    </div>
  );
}

// Templates Tab
function TemplatesTab({ password, onRefresh }: { password: string; onRefresh: () => Promise<void> }) {
  const { templates } = useSiteData();
  const [editing, setEditing] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", image: "", category: "", price: 0, previewUrl: "#", features: "" });

  const handleAdd = async () => {
    await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        ...form,
        features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
      }),
    });
    setAdding(false);
    setForm({ name: "", description: "", image: "", category: "", price: 0, previewUrl: "#", features: "" });
    await onRefresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this template?")) return;
    await fetch("/api/templates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, id }),
    });
    await onRefresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Templates ({templates.length})</h3>
        <button
          onClick={() => setAdding(!adding)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm"
        >
          <Plus size={16} /> Add Template
        </button>
      </div>

      {adding && (
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6 space-y-3">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" />
          <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" />
          <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" rows={2} />
          <input placeholder="Features (comma separated)" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" />
          <div className="flex gap-2">
            <button onClick={handleAdd} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm">Save</button>
            <button onClick={() => setAdding(false)} className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {templates.map((t) => (
          <div key={t.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-4">
            <img src={t.image} alt={t.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold truncate">{t.name}</h4>
              <p className="text-sm text-slate-400">{t.category} · ${t.price}</p>
            </div>
            <button
              onClick={() => handleDelete(t.id)}
              className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Portfolio Tab
function PortfolioTab({ password, onRefresh }: { password: string; onRefresh: () => Promise<void> }) {
  const { portfolio } = useSiteData();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: "", category: "", link: "#" });

  const handleAdd = async () => {
    await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, ...form }),
    });
    setAdding(false);
    setForm({ title: "", description: "", image: "", category: "", link: "#" });
    await onRefresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    await fetch("/api/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, id }),
    });
    await onRefresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Portfolio ({portfolio.length})</h3>
        <button
          onClick={() => setAdding(!adding)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      {adding && (
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6 space-y-3">
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" />
          <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" />
          <input placeholder="Link" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm" rows={2} />
          <div className="flex gap-2">
            <button onClick={handleAdd} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm">Save</button>
            <button onClick={() => setAdding(false)} className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {portfolio.map((p) => (
          <div key={p.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-4">
            <img src={p.image} alt={p.title} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold truncate">{p.title}</h4>
              <p className="text-sm text-slate-400">{p.category}</p>
            </div>
            <button
              onClick={() => handleDelete(p.id)}
              className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

