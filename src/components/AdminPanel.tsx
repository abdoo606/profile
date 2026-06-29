"use client";

import { useState, useEffect } from "react";
import { X, Users, ShoppingBag, Eye, DollarSign, Trash2, Plus, Save, Lock, ChevronDown, ChevronUp } from "lucide-react";

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"settings" | "templates" | "portfolio" | "orders" | "visitors">("settings");
  const [settings, setSettings] = useState<Record<string, unknown>>({});
  const [templates, setTemplates] = useState<unknown[]>([]);
  const [portfolio, setPortfolio] = useState<unknown[]>([]);
  const [orders, setOrders] = useState<unknown[]>([]);
  const [visitorStats, setVisitorStats] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);

  const checkLogin = () => {
    const stored = localStorage.getItem("portfolio_admin_auth");
    if (stored === "true") setLoggedIn(true);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    fetchData();
  }, [loggedIn, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const sRes = await fetch("/api/settings");
      if (sRes.ok) setSettings(await sRes.json());

      if (activeTab === "templates") {
        const tRes = await fetch("/api/templates");
        if (tRes.ok) setTemplates(await tRes.json());
      }
      if (activeTab === "portfolio") {
        const pRes = await fetch("/api/portfolio");
        if (pRes.ok) setPortfolio(await pRes.json());
      }
      if (activeTab === "orders") {
        const oRes = await fetch("/api/orders");
        if (oRes.ok) setOrders(await oRes.json());
      }
      if (activeTab === "visitors") {
        const storedPass = localStorage.getItem("portfolio_admin_pass") || "";
        const vRes = await fetch(`/api/visitors?password=${encodeURIComponent(storedPass)}`);
        if (vRes.ok) setVisitorStats(await vRes.json());
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    const sRes = await fetch("/api/settings");
    if (sRes.ok) {
      const s = await sRes.json();
      if (password === s.adminPassword) {
        localStorage.setItem("portfolio_admin_auth", "true");
        localStorage.setItem("portfolio_admin_pass", password);
        setLoggedIn(true);
      } else {
        alert("Wrong password!");
      }
    }
  };

  const saveSettings = async (data: Record<string, unknown>) => {
    const storedPass = localStorage.getItem("portfolio_admin_pass") || "";
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: storedPass, ...data }),
    });
  };

  if (!loggedIn) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-slate-900 rounded-2xl max-w-md w-full p-8 border border-slate-700" onClick={(e) => e.stopPropagation()}>
          <div className="text-center mb-6">
            <Lock size={48} className="mx-auto text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
            <p className="text-slate-400 mt-2">Enter your password to access the admin panel.</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button onClick={handleLogin} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            Login
          </button>
          <button onClick={onClose} className="w-full mt-3 py-2 text-slate-400 hover:text-white text-sm">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-slate-700 flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
          <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b border-slate-800 overflow-x-auto">
          {[
            { key: "settings" as const, label: "Settings", icon: Lock },
            { key: "templates" as const, label: "Templates", icon: ShoppingBag },
            { key: "portfolio" as const, label: "Portfolio", icon: Eye },
            { key: "orders" as const, label: "Orders", icon: DollarSign },
            { key: "visitors" as const, label: "Visitors", icon: Users },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key ? "text-blue-400 border-b-2 border-blue-400 bg-slate-800/50" : "text-slate-400 hover:text-white"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center text-slate-400 py-10">Loading...</div>
          ) : activeTab === "settings" ? (
            <SettingsTab settings={settings} onSave={saveSettings} />
          ) : activeTab === "templates" ? (
            <TemplatesTab items={templates} password={localStorage.getItem("portfolio_admin_pass") || ""} onRefresh={fetchData} />
          ) : activeTab === "portfolio" ? (
            <PortfolioTab items={portfolio} password={localStorage.getItem("portfolio_admin_pass") || ""} onRefresh={fetchData} />
          ) : activeTab === "orders" ? (
            <OrdersTab items={orders} password={localStorage.getItem("portfolio_admin_pass") || ""} onRefresh={fetchData} />
          ) : (
            <VisitorsTab stats={visitorStats} />
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ settings, onSave }: { settings: Record<string, unknown>; onSave: (d: Record<string, unknown>) => Promise<void> }) {
  const [form, setForm] = useState<Record<string, unknown>>(settings);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ hero: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const toggle = (key: string) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

  const update = (key: string, value: unknown) => setForm((p) => ({ ...p, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const sections = [
    {
      key: "hero",
      title: "🦸 Hero Section",
      fields: [
        { label: "Greeting", key: "heroGreeting", textarea: false },
        { label: "Name", key: "heroName", textarea: false },
        { label: "Title", key: "heroTitle", textarea: false },
        { label: "Description", key: "heroDescription", textarea: true },
        { label: "Profile Image URL", key: "profileImage", textarea: false },
        { label: "Hero Background URL", key: "heroBackground", textarea: false },
      ],
    },
    {
      key: "social",
      title: "🔗 Social Links",
      fields: [
        { label: "GitHub URL", key: "githubUrl", textarea: false },
        { label: "Telegram URL", key: "telegramUrl", textarea: false },
        { label: "Instagram URL", key: "instagramUrl", textarea: false },
        { label: "LinkedIn URL", key: "linkedinUrl", textarea: false },
      ],
    },
    {
      key: "contact",
      title: "📧 Contact Info",
      fields: [
        { label: "Email", key: "email", textarea: false },
        { label: "Phone", key: "phone", textarea: false },
        { label: "Location", key: "location", textarea: false },
      ],
    },
    {
      key: "about",
      title: "ℹ️ About Section",
      fields: [
        { label: "About Title", key: "aboutTitle", textarea: false },
        { label: "Paragraph 1", key: "aboutParagraph1", textarea: true },
        { label: "Paragraph 2", key: "aboutParagraph2", textarea: true },
        { label: "Years Experience", key: "yearsExperience", textarea: false },
        { label: "Templates Sold", key: "templatesSold", textarea: false },
        { label: "Happy Clients", key: "happyClients", textarea: false },
      ],
    },
    {
      key: "payment",
      title: "💰 Payment",
      fields: [
        { label: "Wallet Address (TRC20)", key: "walletAddress", textarea: false },
      ],
    },
    {
      key: "security",
      title: "🔒 Security",
      fields: [
        { label: "Admin Password", key: "adminPassword", textarea: false },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Site Settings</h3>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <p className="text-xs text-slate-500 mb-4">✅ Changes are saved to the database and visible to everyone</p>

      {sections.map((section) => (
        <div key={section.key} className="border border-slate-800 rounded-lg overflow-hidden">
          <button
            onClick={() => toggle(section.key)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 hover:bg-slate-800 text-left"
          >
            <span className="font-medium text-white">{section.title}</span>
            {expanded[section.key] ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>
          {expanded[section.key] && (
            <div className="p-4 space-y-3">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm text-slate-400 mb-1">{field.label}</label>
                  {field.textarea ? (
                    <textarea
                      value={String(form[field.key] ?? "")}
                      onChange={(e) => update(field.key, e.target.value)}
                      rows={3}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(form[field.key] ?? "")}
                      onChange={(e) => update(field.key, e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TemplatesTab({ items, password, onRefresh }: { items: unknown[]; password: string; onRefresh: () => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", image: "", category: "", price: "", previewUrl: "", features: "" });

  const handleAdd = async () => {
    await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        name: form.name,
        description: form.description,
        image: form.image,
        category: form.category,
        price: Number(form.price),
        previewUrl: form.previewUrl || "#",
        features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
      }),
    });
    setShowAdd(false);
    setForm({ name: "", description: "", image: "", category: "", price: "", previewUrl: "", features: "" });
    onRefresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this template?")) return;
    await fetch("/api/templates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, id }),
    });
    onRefresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Templates ({items.length})</h3>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm">
          <Plus size={16} /> Add Template
        </button>
      </div>

      {showAdd && (
        <div className="bg-slate-800 p-4 rounded-lg mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white" />
            <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white" />
            <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white" />
            <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white" />
            <input placeholder="Preview URL" value={form.previewUrl} onChange={(e) => setForm({ ...form, previewUrl: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white col-span-2" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white col-span-2" rows={2} />
            <input placeholder="Features (comma separated)" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white col-span-2" />
          </div>
          <button onClick={handleAdd} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Add Template</button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => {
          const it = item as Record<string, unknown>;
          return (
            <div key={it.id as number} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <img src={it.image as string} alt="" className="w-12 h-12 rounded object-cover" />
                <div>
                  <div className="font-medium text-white text-sm">{it.name as string}</div>
                  <div className="text-xs text-slate-400">{it.category as string} - ${it.price as number}</div>
                </div>
              </div>
              <button onClick={() => handleDelete(it.id as number)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded">
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PortfolioTab({ items, password, onRefresh }: { items: unknown[]; password: string; onRefresh: () => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: "", category: "", link: "" });

  const handleAdd = async () => {
    await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, ...form }),
    });
    setShowAdd(false);
    setForm({ title: "", description: "", image: "", category: "", link: "" });
    onRefresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this portfolio item?")) return;
    await fetch("/api/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, id }),
    });
    onRefresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Portfolio ({items.length})</h3>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm">
          <Plus size={16} /> Add Item
        </button>
      </div>

      {showAdd && (
        <div className="bg-slate-800 p-4 rounded-lg mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white" />
            <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white" />
            <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white col-span-2" />
            <input placeholder="Link" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white col-span-2" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white col-span-2" rows={2} />
          </div>
          <button onClick={handleAdd} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Add Item</button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => {
          const it = item as Record<string, unknown>;
          return (
            <div key={it.id as number} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <img src={it.image as string} alt="" className="w-12 h-12 rounded object-cover" />
                <div>
                  <div className="font-medium text-white text-sm">{it.title as string}</div>
                  <div className="text-xs text-slate-400">{it.category as string}</div>
                </div>
              </div>
              <button onClick={() => handleDelete(it.id as number)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded">
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrdersTab({ items, password, onRefresh }: { items: unknown[]; password: string; onRefresh: () => void }) {
  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, id, status }),
    });
    onRefresh();
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Orders ({items.length})</h3>
      <div className="space-y-2">
        {items.map((item) => {
          const it = item as Record<string, unknown>;
          return (
            <div key={it.id as number} className="p-4 bg-slate-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-white text-sm">{it.templateName as string}</div>
                <div className="text-xs font-bold px-2 py-1 rounded bg-slate-700 text-white">${it.amount as number}</div>
              </div>
              <div className="text-xs text-slate-400 mb-2">Email: {it.email as string}</div>
              <div className="text-xs text-slate-500 mb-3">TX: {(it.txHash as string).slice(0, 20)}...</div>
              <div className="flex gap-2">
                <button onClick={() => updateStatus(it.id as number, "completed")} className="px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded text-xs hover:bg-emerald-600/30">Complete</button>
                <button onClick={() => updateStatus(it.id as number, "rejected")} className="px-3 py-1 bg-red-600/20 text-red-400 rounded text-xs hover:bg-red-600/30">Reject</button>
                <span className={`px-2 py-1 rounded text-xs ${(it.status as string) === "completed" ? "bg-emerald-600 text-white" : (it.status as string) === "rejected" ? "bg-red-600 text-white" : "bg-amber-600 text-white"}`}>{it.status as string}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VisitorsTab({ stats }: { stats: Record<string, unknown> }) {
  const recent = (stats.recentVisitors as Record<string, unknown>[]) || [];
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Visitor Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: stats.total },
          { label: "Today", value: stats.today },
          { label: "This Week", value: stats.week },
          { label: "This Month", value: stats.month },
        ].map((s) => (
          <div key={s.label} className="p-4 bg-slate-800 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-400">{String(s.value ?? 0)}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      <h4 className="font-medium text-white mb-2">Recent Visitors</h4>
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {recent.map((v: Record<string, unknown>, i: number) => (
          <div key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded text-xs">
            <span className="text-slate-300">{v.page as string}</span>
            <span className="text-slate-500">{v.device as string}</span>
            <span className="text-slate-500">{v.createdAt ? new Date(v.createdAt as string).toLocaleDateString() : ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
