import { useState, useEffect } from 'react';
import { X, Save, LogOut, Plus, Trash2, Check, Clock, XCircle, Users, DollarSign, ShoppingBag, Eye, Monitor, Smartphone, Settings, FileText, Palette, ChevronDown, ChevronUp, RotateCcw, Briefcase } from 'lucide-react';
import { getSiteData, saveSiteData, resetSiteData, loginAdmin, isAdminLoggedIn, logoutAdmin, generateId, updateOrderStatus, getVisitorStats, getOrderStats } from '../data/store';
import type { SiteData, Template, SiteSettings, PortfolioItem } from '../data/store';
import { useLanguage } from '../context/LanguageContext';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(isAdminLoggedIn());
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [data, setData] = useState<SiteData>(getSiteData());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [saved, setSaved] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      setData(getSiteData());
      setIsLoggedIn(isAdminLoggedIn());
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setIsLoggedIn(true);
      setLoginError('');
      setPassword('');
    } else {
      setLoginError(t('admin.wrong'));
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsLoggedIn(false);
    onClose();
  };

  const handleSave = () => {
    saveSiteData(data);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      window.location.reload();
    }, 1500);
  };

  const handleReset = () => {
    if (confirm('Reset all data to default? This cannot be undone.')) {
      resetSiteData();
      setData(getSiteData());
      window.location.reload();
    }
  };

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setData({ ...data, settings: { ...data.settings, ...updates } });
  };

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const visitorStats = getVisitorStats();
  const orderStats = getOrderStats();

  if (!isOpen) return null;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Eye size={16} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={16} /> },
    { id: 'hero', label: 'Hero', icon: <FileText size={16} /> },
    { id: 'about', label: 'About', icon: <FileText size={16} /> },
    { id: 'portfolio', label: 'My Work', icon: <Briefcase size={16} /> },
    { id: 'templates', label: 'Templates', icon: <Palette size={16} /> },
    { id: 'skills', label: 'Skills', icon: <FileText size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
    { id: 'analytics', label: 'Analytics', icon: <Users size={16} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-3xl bg-slate-900 h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">⚙️ Admin Panel</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>

        {!isLoggedIn ? (
          <div className="p-8 flex items-center justify-center min-h-[60vh]">
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
              <div className="text-center">
                <div className="text-5xl mb-4">🔐</div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('admin.login')}</h3>
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder={t('admin.password')}
                  autoFocus
                />
                {loginError && <p className="text-red-400 text-sm mt-2">{loginError}</p>}
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg">
                {t('admin.enter')}
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-slate-800 px-2 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
                    activeTab === tab.id ? 'text-blue-400 border-blue-400' : 'text-slate-400 border-transparent hover:text-white'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon={<Users className="text-blue-400" />} label="Total Visitors" value={visitorStats.total} />
                    <StatCard icon={<Eye className="text-emerald-400" />} label="Today" value={visitorStats.today} />
                    <StatCard icon={<ShoppingBag className="text-purple-400" />} label="Pending Orders" value={orderStats.pending} />
                    <StatCard icon={<DollarSign className="text-amber-400" />} label="Revenue" value={`$${orderStats.revenue}`} />
                  </div>
                  
                  <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Device Stats</h3>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <Monitor className="text-blue-400" size={20} />
                        <span className="text-slate-400">Desktop:</span>
                        <span className="text-white font-bold">{visitorStats.byDevice.desktop}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="text-emerald-400" size={20} />
                        <span className="text-slate-400">Mobile:</span>
                        <span className="text-white font-bold">{visitorStats.byDevice.mobile}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <StatCard icon={<Clock className="text-amber-400" />} label="Pending" value={orderStats.pending} />
                    <StatCard icon={<Check className="text-emerald-400" />} label="Completed" value={orderStats.completed} />
                    <StatCard icon={<DollarSign className="text-blue-400" />} label="Revenue" value={`$${orderStats.revenue}`} />
                  </div>

                  {data.orders.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">No orders yet</div>
                  ) : (
                    <div className="space-y-4">
                      {data.orders.map((order) => (
                        <div key={order.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-white">{order.templateName}</h4>
                              <p className="text-sm text-slate-400">{order.email}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-emerald-400 font-bold">${order.amount} USDT</span>
                              <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 mb-3 font-mono break-all bg-slate-900 p-2 rounded">
                            TX: {order.txHash}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              order.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                              order.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {order.status.toUpperCase()}
                            </span>
                            {order.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => { updateOrderStatus(order.id, 'completed'); setData(getSiteData()); }}
                                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded flex items-center gap-1"
                                >
                                  <Check size={12} /> Approve
                                </button>
                                <button
                                  onClick={() => { updateOrderStatus(order.id, 'rejected'); setData(getSiteData()); }}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded flex items-center gap-1"
                                >
                                  <XCircle size={12} /> Reject
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* HERO SECTION */}
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">Hero Section</h3>
                  <InputField label="Greeting Text" value={data.settings.heroGreeting} onChange={(v) => updateSettings({ heroGreeting: v })} />
                  <InputField label="Your Name" value={data.settings.heroName} onChange={(v) => updateSettings({ heroName: v })} />
                  <InputField label="Title / Job" value={data.settings.heroTitle} onChange={(v) => updateSettings({ heroTitle: v })} />
                  <TextAreaField label="Description" value={data.settings.heroDescription} onChange={(v) => updateSettings({ heroDescription: v })} />
                  
                  <h4 className="text-md font-bold text-white mt-6 pt-4 border-t border-slate-700">Profile Image</h4>
                  
                  {/* Profile Image with Position Control */}
                  <div className="bg-slate-800 p-4 rounded-lg space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-slate-700 flex-shrink-0 relative">
                        <img 
                          src={data.settings.profileImage || '/images/profile.jpg'} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                          style={{ objectPosition: `${data.settings.profileImageX ?? 50}% ${data.settings.profileImageY ?? 50}%` }}
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200'; }}
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <input
                          value={data.settings.profileImage}
                          onChange={(e) => updateSettings({ profileImage: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                          placeholder="Image URL"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Horizontal Position (X): {data.settings.profileImageX ?? 50}%</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={data.settings.profileImageX ?? 50}
                              onChange={(e) => updateSettings({ profileImageX: Number(e.target.value) })}
                              className="w-full accent-blue-500"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                              <span>Left</span>
                              <span>Right</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Vertical Position (Y): {data.settings.profileImageY ?? 50}%</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={data.settings.profileImageY ?? 50}
                              onChange={(e) => updateSettings({ profileImageY: Number(e.target.value) })}
                              className="w-full accent-blue-500"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                              <span>Top</span>
                              <span>Bottom</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-md font-bold text-white mt-6 pt-4 border-t border-slate-700">Background Image</h4>
                  
                  {/* Background Image with Position Control */}
                  <div className="bg-slate-800 p-4 rounded-lg space-y-4">
                    <div className="w-full h-40 rounded-lg overflow-hidden border border-slate-700 relative">
                      <img 
                        src={data.settings.heroBackground || 'https://via.placeholder.com/1920x1080'} 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-60"
                        style={{ objectPosition: `${data.settings.heroBackgroundX ?? 50}% ${data.settings.heroBackgroundY ?? 50}%` }}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1920x1080'; }}
                      />
                    </div>
                    <input
                      value={data.settings.heroBackground}
                      onChange={(e) => updateSettings({ heroBackground: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                      placeholder="Background Image URL"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Horizontal (X): {data.settings.heroBackgroundX ?? 50}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={data.settings.heroBackgroundX ?? 50}
                          onChange={(e) => updateSettings({ heroBackgroundX: Number(e.target.value) })}
                          className="w-full accent-blue-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Left</span>
                          <span>Right</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Vertical (Y): {data.settings.heroBackgroundY ?? 50}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={data.settings.heroBackgroundY ?? 50}
                          onChange={(e) => updateSettings({ heroBackgroundY: Number(e.target.value) })}
                          className="w-full accent-blue-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Top</span>
                          <span>Bottom</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-md font-bold text-white mt-6 pt-4 border-t border-slate-700">Social Links</h4>
                  <InputField label="GitHub URL" value={data.settings.githubUrl} onChange={(v) => updateSettings({ githubUrl: v })} />
                  <InputField label="Telegram URL" value={data.settings.telegramUrl} onChange={(v) => updateSettings({ telegramUrl: v })} placeholder="https://t.me/username" />
                  <InputField label="Instagram URL" value={data.settings.instagramUrl} onChange={(v) => updateSettings({ instagramUrl: v })} />
                  <InputField label="LinkedIn URL" value={data.settings.linkedinUrl} onChange={(v) => updateSettings({ linkedinUrl: v })} />
                  <InputField label="Twitter URL" value={data.settings.twitterUrl} onChange={(v) => updateSettings({ twitterUrl: v })} />
                </div>
              )}

              {/* ABOUT SECTION */}
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">About Section</h3>
                  <InputField label="Section Title" value={data.settings.aboutTitle} onChange={(v) => updateSettings({ aboutTitle: v })} />
                  <TextAreaField label="Paragraph 1" value={data.settings.aboutParagraph1} onChange={(v) => updateSettings({ aboutParagraph1: v })} />
                  <TextAreaField label="Paragraph 2" value={data.settings.aboutParagraph2} onChange={(v) => updateSettings({ aboutParagraph2: v })} />
                  
                  <h4 className="text-md font-bold text-white mt-6 pt-4 border-t border-slate-700">Statistics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <InputField label="Years Experience" value={data.settings.yearsExperience} onChange={(v) => updateSettings({ yearsExperience: v })} />
                    <InputField label="Templates Sold" value={data.settings.templatesSold} onChange={(v) => updateSettings({ templatesSold: v })} />
                    <InputField label="Happy Clients" value={data.settings.happyClients} onChange={(v) => updateSettings({ happyClients: v })} />
                  </div>

                  <h4 className="text-md font-bold text-white mt-6 pt-4 border-t border-slate-700">Services</h4>
                  {data.settings.services.map((service, i) => (
                    <div key={i} className="bg-slate-800 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <button onClick={() => toggleSection(`service-${i}`)} className="flex items-center gap-2 text-white font-medium">
                          {expandedSections[`service-${i}`] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          {service.title || 'Service'}
                        </button>
                        <button onClick={() => {
                          const newServices = data.settings.services.filter((_, idx) => idx !== i);
                          updateSettings({ services: newServices });
                        }} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                      </div>
                      {expandedSections[`service-${i}`] && (
                        <div className="space-y-2 pt-2">
                          <input value={service.title} onChange={(e) => {
                            const newServices = [...data.settings.services];
                            newServices[i] = { ...newServices[i], title: e.target.value };
                            updateSettings({ services: newServices });
                          }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Title" />
                          <textarea value={service.description} onChange={(e) => {
                            const newServices = [...data.settings.services];
                            newServices[i] = { ...newServices[i], description: e.target.value };
                            updateSettings({ services: newServices });
                          }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm min-h-[60px]" placeholder="Description" />
                          <select value={service.iconType} onChange={(e) => {
                            const newServices = [...data.settings.services];
                            newServices[i] = { ...newServices[i], iconType: e.target.value };
                            updateSettings({ services: newServices });
                          }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm">
                            <option value="layout">Layout</option>
                            <option value="code">Code</option>
                            <option value="database">Database</option>
                            <option value="smartphone">Smartphone</option>
                          </select>
                        </div>
                      )}
                    </div>
                  ))}
                  <button onClick={() => updateSettings({ services: [...data.settings.services, { title: '', description: '', iconType: 'code' }] })} className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                    <Plus size={14} /> Add Service
                  </button>
                </div>
              )}

              {/* PORTFOLIO / MY WORK */}
              {activeTab === 'portfolio' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">My Work / Portfolio ({data.portfolio?.length || 0})</h3>
                  <p className="text-slate-400 text-sm mb-4">Add your projects and work here. Each item will appear as a card with category filter.</p>
                  
                  {(data.portfolio || []).map((item, i) => (
                    <div key={item.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <div className="flex justify-between items-center mb-3">
                        <button onClick={() => toggleSection(`portfolio-${i}`)} className="flex items-center gap-2 text-white font-medium">
                          {expandedSections[`portfolio-${i}`] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          {item.title || 'New Project'}
                        </button>
                        <button onClick={() => {
                          const newPortfolio = (data.portfolio || []).filter((_, idx) => idx !== i);
                          setData({ ...data, portfolio: newPortfolio });
                        }} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                      </div>
                      {expandedSections[`portfolio-${i}`] && (
                        <div className="space-y-3 pt-2">
                          <div className="flex gap-4">
                            <div className="w-28 h-28 rounded-lg overflow-hidden border border-slate-700 flex-shrink-0">
                              <img src={item.image || 'https://via.placeholder.com/200'} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <input value={item.title} onChange={(e) => {
                                const newPortfolio = [...(data.portfolio || [])];
                                newPortfolio[i] = { ...newPortfolio[i], title: e.target.value };
                                setData({ ...data, portfolio: newPortfolio });
                              }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Project Title" />
                              <input value={item.category} onChange={(e) => {
                                const newPortfolio = [...(data.portfolio || [])];
                                newPortfolio[i] = { ...newPortfolio[i], category: e.target.value };
                                setData({ ...data, portfolio: newPortfolio });
                              }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Category (e.g., UI/UX Design, Web Development)" />
                            </div>
                          </div>
                          <textarea value={item.description} onChange={(e) => {
                            const newPortfolio = [...(data.portfolio || [])];
                            newPortfolio[i] = { ...newPortfolio[i], description: e.target.value };
                            setData({ ...data, portfolio: newPortfolio });
                          }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm min-h-[80px]" placeholder="Project Description" />
                          <input value={item.image} onChange={(e) => {
                            const newPortfolio = [...(data.portfolio || [])];
                            newPortfolio[i] = { ...newPortfolio[i], image: e.target.value };
                            setData({ ...data, portfolio: newPortfolio });
                          }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Image URL" />
                          <input value={item.link} onChange={(e) => {
                            const newPortfolio = [...(data.portfolio || [])];
                            newPortfolio[i] = { ...newPortfolio[i], link: e.target.value };
                            setData({ ...data, portfolio: newPortfolio });
                          }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Project Link (URL)" />
                        </div>
                      )}
                    </div>
                  ))}
                  <button onClick={() => {
                    const newItem: PortfolioItem = {
                      id: generateId(), title: '', description: '', image: '', category: '', link: ''
                    };
                    setData({ ...data, portfolio: [...(data.portfolio || []), newItem] });
                  }} className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-2">
                    <Plus size={18} /> Add New Project
                  </button>
                </div>
              )}

              {/* TEMPLATES */}
              {activeTab === 'templates' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">Templates for Sale ({data.templates.length})</h3>
                  {data.templates.map((template, i) => (
                    <div key={template.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <div className="flex justify-between items-center mb-3">
                        <button onClick={() => toggleSection(`template-${i}`)} className="flex items-center gap-2 text-white font-medium">
                          {expandedSections[`template-${i}`] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          {template.name} - ${template.price}
                        </button>
                        <button onClick={() => {
                          const newTemplates = data.templates.filter((_, idx) => idx !== i);
                          setData({ ...data, templates: newTemplates });
                        }} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                      </div>
                      {expandedSections[`template-${i}`] && (
                        <div className="space-y-3 pt-2">
                          <div className="flex gap-4">
                            <img src={template.image} alt={template.name} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-1 space-y-2">
                              <input value={template.name} onChange={(e) => {
                                const newTemplates = [...data.templates];
                                newTemplates[i] = { ...newTemplates[i], name: e.target.value };
                                setData({ ...data, templates: newTemplates });
                              }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Name" />
                              <div className="flex gap-2">
                                <input type="number" value={template.price} onChange={(e) => {
                                  const newTemplates = [...data.templates];
                                  newTemplates[i] = { ...newTemplates[i], price: Number(e.target.value) };
                                  setData({ ...data, templates: newTemplates });
                                }} className="w-24 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Price" />
                                <input value={template.category} onChange={(e) => {
                                  const newTemplates = [...data.templates];
                                  newTemplates[i] = { ...newTemplates[i], category: e.target.value };
                                  setData({ ...data, templates: newTemplates });
                                }} className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Category" />
                              </div>
                            </div>
                          </div>
                          <textarea value={template.description} onChange={(e) => {
                            const newTemplates = [...data.templates];
                            newTemplates[i] = { ...newTemplates[i], description: e.target.value };
                            setData({ ...data, templates: newTemplates });
                          }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm min-h-[60px]" placeholder="Description" />
                          <input value={template.image} onChange={(e) => {
                            const newTemplates = [...data.templates];
                            newTemplates[i] = { ...newTemplates[i], image: e.target.value };
                            setData({ ...data, templates: newTemplates });
                          }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Image URL" />
                          <input value={template.previewUrl} onChange={(e) => {
                            const newTemplates = [...data.templates];
                            newTemplates[i] = { ...newTemplates[i], previewUrl: e.target.value };
                            setData({ ...data, templates: newTemplates });
                          }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Preview URL" />
                        </div>
                      )}
                    </div>
                  ))}
                  <button onClick={() => {
                    const newTemplate: Template = {
                      id: generateId(), name: 'New Template', description: 'Description', image: 'https://via.placeholder.com/400x300',
                      category: 'Business', price: 49, previewUrl: '#', features: []
                    };
                    setData({ ...data, templates: [...data.templates, newTemplate] });
                  }} className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2">
                    <Plus size={18} /> Add New Template
                  </button>
                </div>
              )}

              {/* SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">Skills Categories</h3>
                  {data.settings.skills.map((category, i) => (
                    <div key={i} className="bg-slate-800 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <button onClick={() => toggleSection(`skill-${i}`)} className="flex items-center gap-2 text-white font-medium">
                          {expandedSections[`skill-${i}`] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          {category.title || 'Category'}
                        </button>
                        <button onClick={() => {
                          const newSkills = data.settings.skills.filter((_, idx) => idx !== i);
                          updateSettings({ skills: newSkills });
                        }} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                      </div>
                      {expandedSections[`skill-${i}`] && (
                        <div className="space-y-2 pt-2">
                          <input value={category.title} onChange={(e) => {
                            const newSkills = [...data.settings.skills];
                            newSkills[i] = { ...newSkills[i], title: e.target.value };
                            updateSettings({ skills: newSkills });
                          }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Category Title" />
                          <input value={category.items.join(', ')} onChange={(e) => {
                            const newSkills = [...data.settings.skills];
                            newSkills[i] = { ...newSkills[i], items: e.target.value.split(',').map(s => s.trim()).filter(Boolean) };
                            updateSettings({ skills: newSkills });
                          }} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm" placeholder="Skills (comma separated)" />
                        </div>
                      )}
                    </div>
                  ))}
                  <button onClick={() => updateSettings({ skills: [...data.settings.skills, { title: '', items: [] }] })} className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                    <Plus size={14} /> Add Category
                  </button>
                </div>
              )}

              {/* SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">Contact & Settings</h3>
                  <InputField label="Email" value={data.settings.email} onChange={(v) => updateSettings({ email: v })} />
                  <InputField label="Location" value={data.settings.location} onChange={(v) => updateSettings({ location: v })} />
                  
                  <h4 className="text-md font-bold text-white mt-6 pt-4 border-t border-slate-700">Payment Settings</h4>
                  <InputField label="USDT Wallet (TRC20)" value={data.settings.walletAddress} onChange={(v) => updateSettings({ walletAddress: v })} />
                  
                  <h4 className="text-md font-bold text-white mt-6 pt-4 border-t border-slate-700">Security</h4>
                  <InputField label="Admin Password" value={data.settings.adminPassword} onChange={(v) => updateSettings({ adminPassword: v })} type="password" />
                  
                  <div className="mt-6 pt-4 border-t border-slate-700">
                    <button onClick={handleReset} className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg flex items-center gap-2">
                      <RotateCcw size={16} /> Reset All Data to Default
                    </button>
                  </div>
                </div>
              )}

              {/* ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <StatCard icon={<Users className="text-blue-400" />} label="Today" value={visitorStats.today} />
                    <StatCard icon={<Users className="text-emerald-400" />} label="This Week" value={visitorStats.week} />
                    <StatCard icon={<Users className="text-purple-400" />} label="This Month" value={visitorStats.month} />
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Visitors ({visitorStats.total})</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {visitorStats.recentVisitors.map((v) => (
                        <div key={v.id} className="flex items-center justify-between text-sm py-2 border-b border-slate-700">
                          <span className="text-slate-400">{new Date(v.timestamp).toLocaleString()}</span>
                          <span className="text-white">{v.page}</span>
                          <span className={`px-2 py-0.5 rounded text-xs ${v.device === 'Mobile' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {v.device}
                          </span>
                        </div>
                      ))}
                      {visitorStats.recentVisitors.length === 0 && <p className="text-slate-500 text-sm">No visitors yet</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 p-4 flex items-center gap-3">
              <button onClick={handleSave} className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${saved ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
                <Save size={18} />
                {saved ? '✓ Saved!' : 'Save Changes'}
              </button>
              <button onClick={handleLogout} className="p-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg">
                <LogOut size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
    <div className="flex items-center gap-2 mb-2">{icon}<span className="text-slate-400 text-sm">{label}</span></div>
    <div className="text-2xl font-bold text-white">{value}</div>
  </div>
);

const InputField = ({ label, value, onChange, type = 'text', placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
  </div>
);

const TextAreaField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
    <textarea value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 min-h-[100px]" />
  </div>
);

export default AdminPanel;
