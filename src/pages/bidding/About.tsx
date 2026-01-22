
const About = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=2000" 
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            alt="Office"
        />
        <div className="relative text-center space-y-6 px-4">
            <h1 className="text-7xl font-black text-slate-900 leading-tight">Revolutionizing <br /> <span className="text-[#5D3FD3]">Vehicle Auctions</span></h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">CarifyBids is built on a foundation of technology, transparency, and trust, connecting verified dealers with premium inventory.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-32 grid md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900">Our Mission</h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Our mission is to democratize the vehicle auction industry by providing a secure, high-performance platform where every dealer, regardless of size, has equal access to quality inventory.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                    <p className="text-4xl font-black text-[#5D3FD3]">2022</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Founded</p>
                </div>
                <div className="space-y-2">
                    <p className="text-4xl font-black text-[#F15A24]">500+</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Team Members</p>
                </div>
            </div>
        </div>
        <div className="relative">
            <div className="absolute -inset-4 bg-[#5D3FD3]/5 rounded-[60px] -rotate-3" />
            <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                className="relative w-full rounded-[50px] shadow-2xl"
                alt="Team"
            />
        </div>
      </section>
    </div>
  );
};

export default About;
