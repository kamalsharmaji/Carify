import { Briefcase, MapPin, Clock, ArrowUpRight } from 'lucide-react';

const Careers = () => {
  const jobs = [
    { title: "Senior Software Engineer", dept: "Technology", location: "Gurgaon", type: "Full-time" },
    { title: "Auction Operations Manager", dept: "Operations", location: "Mumbai", type: "Full-time" },
    { title: "Business Development Executive", dept: "Sales", location: "Bangalore", type: "Full-time" },
    { title: "UI/UX Designer", dept: "Design", location: "Remote", type: "Contract" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#5D3FD3] py-32 px-4 text-center">
        <h1 className="text-6xl font-black text-white mb-6 leading-tight">Build the Future of <br /> Vehicle Auctions</h1>
        <p className="text-purple-100 text-xl max-w-2xl mx-auto font-medium">Join our mission to revolutionize how vehicles are bought and sold across India.</p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-20">
            {[
                { label: 'Team Members', value: '200+' },
                { label: 'Cities', value: '15+' },
                { label: 'Growth', value: '300%' },
                { label: 'Positions', value: '12' }
            ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-xs font-bold text-purple-200 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
            ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-32">
        <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-black text-slate-900">Open Positions</h2>
            <p className="text-[#5D3FD3] font-black">Showing all {jobs.length} roles</p>
        </div>

        <div className="space-y-6">
            {jobs.map((job, i) => (
                <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-50 rounded-[40px] border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-500">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-900">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-400">
                            <span className="flex items-center gap-1"><Briefcase size={16} /> {job.dept}</span>
                            <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                            <span className="flex items-center gap-1"><Clock size={16} /> {job.type}</span>
                        </div>
                    </div>
                    <button className="mt-6 md:mt-0 p-5 bg-white rounded-2xl group-hover:bg-[#5D3FD3] group-hover:text-white transition-all shadow-sm">
                        <ArrowUpRight size={24} />
                    </button>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Careers;
