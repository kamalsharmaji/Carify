import React from 'react';
import { Check, Shield, Zap, Star } from 'lucide-react';

const Membership = () => {
  const plans = [
    {
      name: 'Starter',
      price: '₹4,999',
      duration: 'per year',
      features: ['Access to 5 Auctions/mo', 'Basic Vehicle Reports', 'Email Support', 'Standard Bidding Limit'],
      color: 'bg-blue-50',
      buttonColor: 'bg-blue-600',
      icon: <Zap className="text-blue-600" />
    },
    {
      name: 'Pro Dealer',
      price: '₹14,999',
      duration: 'per year',
      features: ['Unlimited Auctions', 'Detailed Condition Reports', '24/7 Priority Support', 'High Bidding Limit', 'Early Access to VIP Lots'],
      color: 'bg-[#5D3FD3]/5',
      buttonColor: 'bg-[#5D3FD3]',
      featured: true,
      icon: <Star className="text-[#5D3FD3]" />
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      duration: 'Contact Us',
      features: ['Multi-user Access', 'API Integration', 'Dedicated Account Manager', 'Bulk Purchase Discounts', 'Custom Logistics Solutions'],
      color: 'bg-slate-900 text-white',
      buttonColor: 'bg-white text-slate-900',
      icon: <Shield className="text-white" />
    }
  ];

  return (
    <div className="bg-[#F8F9FE] min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-slate-900 mb-4">Choose Your <span className="text-[#5D3FD3]">Membership</span></h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Join the most exclusive dealer network in India and start growing your business with CarifyBids.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative p-10 rounded-[40px] border border-slate-100 shadow-sm transition-all hover:shadow-2xl ${plan.color} ${plan.featured ? 'scale-105 z-10 border-[#5D3FD3]/20' : ''}`}>
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F15A24] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="w-12 h-12 rounded-2xl bg-white/50 flex items-center justify-center mb-6 shadow-sm">
                {plan.icon}
              </div>
              <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-slate-400 text-sm font-bold">{plan.duration}</span>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-bold text-sm">
                    <Check size={18} className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-2xl font-black transition-all ${plan.buttonColor} hover:scale-105`}>
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Membership;
