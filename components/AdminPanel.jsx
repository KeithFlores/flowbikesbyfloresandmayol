"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Unlock, Upload, Trash2, List, PlusCircle, Loader2, X } from 'lucide-react';

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('add');
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [bikes, setBikes] = useState([]);
  const [showGatekeeper, setShowGatekeeper] = useState(false);

 
  useEffect(() => {
    const session = localStorage.getItem('flow_admin_session');
    if (session === 'active') {
      setIsAdmin(true);
      fetchBikes();
    }
  }, []);

  const fetchBikes = async () => {
    const { data } = await supabase.from('bikes').select('*').order('created_at', { ascending: false });
    if (data) setBikes(data);
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (password === 'FLOW_DAVAO_2026') {
      setIsAdmin(true);
      setShowGatekeeper(false);
      localStorage.setItem('flow_admin_session', 'active');
      fetchBikes();
    } else {
      alert('INCORRECT ACCESS KEY');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('flow_admin_session');
    setIsAdmin(false);
    window.location.reload();
  };

  const handleDelete = async (id, imageUrl) => {
    if (!confirm("Permanently delete?")) return;
    await supabase.from('bikes').delete().eq('id', id);
    if (imageUrl) {
      const fileName = imageUrl.split('/').pop();
      await supabase.storage.from('bike-images').remove([fileName]);
    }
    fetchBikes();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const form = e.target;
    const file = form.image.files[0];

    try {
      const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
      await supabase.storage.from('bike-images').upload(fileName, file);
      const { data: { publicUrl } } = supabase.storage.from('bike-images').getPublicUrl(fileName);

      await supabase.from('bikes').insert([{
        name: form.bikeName.value,
        price: form.price.value,
        frame: form.frame.value,
        weight: form.weight.value,
        type: form.type.value,
        image_url: publicUrl
      }]);

      alert('MARKETPLACE SYNCHRONIZED');
      form.reset();
      fetchBikes();
      setActiveTab('manage');
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

 
  if (!isAdmin && !showGatekeeper) {
    return (
      <button 
        onClick={() => setShowGatekeeper(true)}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-yellow-400 transition-all z-50"
      >
        <Lock size={14} />
      </button>
    );
  }

  
  if (!isAdmin && showGatekeeper) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
        <div className="w-full max-w-sm glass-card p-10 rounded-[3rem] border border-white/10 relative text-center">
          <button onClick={() => setShowGatekeeper(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white">
            <X size={20} />
          </button>
          <Unlock size={32} className="text-yellow-400 mx-auto mb-6" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-white">System Authentication</h2>
          <form onSubmit={handleLogin}>
            <input 
              autoFocus
              type="password" 
              placeholder="ENTER SECRET KEY" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-center text-xs tracking-[0.3em] font-bold text-white mb-4 outline-none focus:border-yellow-400/50 transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 transition-all">
              Initialize
            </button>
          </form>
        </div>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto mb-20 p-8 glass-card rounded-[3rem] border border-yellow-400/20 bg-black/60 relative overflow-hidden">
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-8">
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('add')} className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'add' ? 'bg-yellow-400 text-black' : 'bg-white/5 text-gray-400'}`}>
            <PlusCircle size={14} /> Add
          </button>
          <button onClick={() => setActiveTab('manage')} className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'manage' ? 'bg-yellow-400 text-black' : 'bg-white/5 text-gray-400'}`}>
            <List size={14} /> Manage ({bikes.length})
          </button>
        </div>
        <button onClick={handleLogout} className="text-[9px] font-black uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-colors flex items-center gap-2">
          Secure Exit <X size={12}/>
        </button>
      </div>

      {activeTab === 'add' ? (
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
          <input name="bikeName" placeholder="BIKE NAME" required className="admin-input" />
          <input name="price" placeholder="PRICE" required className="admin-input" />
          <input name="frame" placeholder="FRAME MATERIAL" required className="admin-input" />
          <input name="weight" placeholder="WEIGHT" required className="admin-input" />
          <select name="type" className="admin-input col-span-full">
            <option value="ROAD">ROAD</option>
            <option value="MTB">MTB</option>
            <option value="GRAVEL">GRAVEL</option>
          </select>
          <div className="col-span-full border-2 border-dashed border-white/5 rounded-2xl p-6 text-center">
             <input type="file" name="image" accept="image/*" required className="text-[10px] text-gray-500" />
          </div>
          <button type="submit" disabled={uploading} className="col-span-full bg-yellow-400 text-black py-5 rounded-2xl font-black uppercase tracking-widest flex justify-center gap-4">
            {uploading ? <Loader2 className="animate-spin" /> : <Upload size={18} />}
            Deploy to Marketplace
          </button>
        </form>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {bikes.map(bike => (
            <div key={bike.id} className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <img src={bike.image_url} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="text-xs font-black uppercase">{bike.name}</p>
                  <p className="text-[10px] text-yellow-400 font-bold">{bike.price}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(bike.id, bike.image_url)} className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}