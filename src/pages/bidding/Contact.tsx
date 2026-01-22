import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-[#F8F9FE] min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h1 className="text-6xl font-black text-slate-900 mb-6">Get in <span className="text-[#5D3FD3]">Touch</span></h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Have questions about our auction process? Our team is here to help you 24/7.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-12 rounded-[50px] shadow-sm border border-slate-50">
                <form className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest px-2">Full Name</label>
                            <input type="text" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-[#5D3FD3] focus:ring-0 transition-all font-bold" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest px-2">Email Address</label>
                            <input type="email" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-[#5D3FD3] focus:ring-0 transition-all font-bold" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700 uppercase tracking-widest px-2">Message</label>
                        <textarea rows={6} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-[#5D3FD3] focus:ring-0 transition-all font-bold" placeholder="How can we help you?"></textarea>
                    </div>
                    <button className="px-12 py-5 bg-[#5D3FD3] text-white font-black rounded-3xl shadow-xl shadow-purple-200 hover:scale-105 transition-all flex items-center gap-3">
                        Send Message
                        <Send size={20} />
                    </button>
                </form>
            </div>

            <div className="space-y-6">
                {[
                    { title: 'Call Us', info: '+91 8800 123 456', icon: <Phone />, color: 'bg-blue-50 text-blue-600' },
                    { title: 'Email Us', info: 'support@carifybids.com', icon: <Mail />, color: 'bg-purple-50 text-purple-600' },
                    { title: 'Visit Office', info: 'DLF Cyber City, Gurgaon, India', icon: <MapPin />, color: 'bg-orange-50 text-orange-600' }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-50 flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</p>
                            <p className="text-lg font-black text-slate-900">{item.info}</p>
                        </div>
                    </div>
                ))}
                
                <div className="bg-slate-900 p-10 rounded-[40px] text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <h3 className="text-2xl font-black">Join as a Dealer</h3>
                        <p className="text-slate-400 font-medium">Start your journey with India's most trusted auction platform.</p>
                        <button className="px-8 py-3 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all">Register Now</button>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-10 scale-150">
                        <Send size={100} />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
