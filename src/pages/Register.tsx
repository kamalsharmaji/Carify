import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User, Phone, Lock, ChevronRight,   Car, ShieldCheck, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

// To make this work, you need to:
// 1. Create an account at https://www.emailjs.com/
// 2. Add a Service and a Template
// 3. Get your Public Key, Service ID, and Template ID
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; 
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Enter valid mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Select a role"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "Customer"
    }
  });

  const sendVerificationEmail = async (data: any) => {
    try {
      // In a real app, this would be a link to your hosted site like:
      // https://your-app.com/verify?email=${data.email}
      const verificationLink = window.location.origin + "/login"; 

      const templateParams = {
        to_name: data.name,
        to_email: data.email,
        message: `Please verify your email for Carify ERP by clicking this link: ${verificationLink}`,
      };

      // Only attempt to send if keys are provided, otherwise just simulate
      if (EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
        toast.success(`Real verification email sent to ${data.email}`);
      } else {
        console.log("EmailJS keys not set. Simulating email send to:", data.email);
        toast.success(`(Simulation) Verification link sent to ${data.email}`);
      }
      
      setStep(2);
    } catch (error) {
      console.error("Email error:", error);
      toast.error("Failed to send verification email. Using simulation mode.");
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegisterForm)[] = [];
    if (step === 1) fieldsToValidate = ["name", "email", "phone"];
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (step === 1) {
        setIsLoading(true);
        sendVerificationEmail(getValues());
      } else {
        setStep(step + 1);
      }
    }
  };

  const handleVerifyEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Email verified successfully!");
      setStep(3);
    }, 1000);
  };

  const onSubmit = (data: RegisterForm) => {
    setIsLoading(true);
    setTimeout(() => {
      // Get existing users or empty array
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      
      // Check if user already exists
      if (existingUsers.find((u: any) => u.email === data.email)) {
        toast.error("User with this email already exists", {
          style: {
            borderRadius: '16px',
            background: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fee2e2',
            fontWeight: 'bold'
          },
        });
        setIsLoading(false);
        return;
      }

      // Add new user with verification flag
      const newUser = {
        ...data,
        id: Date.now(),
        isVerified: true,
        permissions: ["USER_VIEW", "FLEET_VIEW"] 
      };
      
      localStorage.setItem("registeredUsers", JSON.stringify([...existingUsers, newUser]));
      
      toast.success("Registration complete! You can now login.", {
        style: {
          borderRadius: '16px',
          background: '#333',
          color: '#fff',
          fontWeight: 'bold'
        },
      });
      navigate("/login");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 md:p-6 font-['Inter'] selection:bg-red-100 selection:text-red-600">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-400/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] md:rounded-[40px] shadow-2xl shadow-slate-200/60 overflow-hidden relative z-10 border border-white">
        
        <div className="hidden lg:flex flex-col justify-between p-12 bg-[#0f172a] text-white relative overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            >
              <source src="https://cdn.pixabay.com/video/2021/09/10/88075-603173774_large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0f172a]/70 to-red-900/30"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="h-11 w-11 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                <Car size={24} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter">CARIFY <span className="text-red-500">ERP</span></span>
            </div>
            
            <h1 className="text-5xl font-black leading-[1.1] mb-6 tracking-tight">
              Start Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 text-6xl">Journey.</span>
            </h1>
            <p className="text-slate-400 text-base max-w-sm font-medium leading-relaxed">
              Join thousands of businesses managing their fleet with Carify's intelligent ERP solution.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-[24px] border border-white/10 backdrop-blur-xl max-w-fit shadow-2xl">
              <div className="h-10 w-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Security First</p>
                <p className="text-[13px] font-bold">Data Privacy Guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2 mb-10 justify-center">
              <div className="h-10 w-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/10">
                <Car size={22} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter">CARIFY <span className="text-red-500">ERP</span></span>
            </div>

            <div className="mb-10">
               <div className="flex flex-col items-center gap-2 mb-4
                sm:flex-row sm:items-center sm:justify-between">
  
  <h2 className="text-3xl font-black text-slate-900 tracking-tight text-center sm:text-left">
    Register
  </h2>

  <span className="text-[11px] font-black text-red-500 uppercase 
                   bg-red-50 px-3 py-1 rounded-full border border-red-100">
    Step {step}/3
  </span>
</div>

            <p className="text-slate-500 text-[14px] font-medium">Create your account in three simple steps</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {step === 1 && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
                        <input
                          {...register("name")}
                          placeholder="Enter Your Name..."
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/40 transition-all font-semibold text-[14px] text-slate-700 placeholder:text-slate-300"
                        />
                      </div>
                      {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
                        <input
                          {...register("email")}
                          placeholder="Enter Your Email..."
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/40 transition-all font-semibold text-[14px] text-slate-700 placeholder:text-slate-300"
                        />
                      </div>
                      {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
                        <input
                          {...register("phone")}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/40 transition-all font-semibold text-[14px] text-slate-700 placeholder:text-slate-300"
                        />
                      </div>
                      {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone.message}</p>}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div className="text-center space-y-6 py-4 animate-in">
                    <div className="h-20 w-20 bg-red-50 text-red-500 rounded-[28px] flex items-center justify-center mx-auto animate-bounce border border-red-100 shadow-lg shadow-red-500/5">
                      <Mail size={36} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">Check Your Email</h3>
                      <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                        We've sent a verification link to <br />
                        <span className="text-red-500 font-bold">{getValues("email")}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleVerifyEmail}
                      disabled={isLoading}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-black text-[15px] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      {isLoading ? "Verifying..." : "Verify Email Now"}
                    </button>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Simulation: Click above to verify</p>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5 animate-in">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Set Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
                        <input
                          type="password"
                          {...register("password")}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/40 transition-all font-semibold text-[14px] text-slate-700 placeholder:text-slate-300"
                        />
                      </div>
                      {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Account Role</label>
                      <div className="relative">
                        <select
                          {...register("role")}
                          className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/40 transition-all font-semibold text-[14px] text-slate-700 appearance-none cursor-pointer"
                        >
                          <option value="Admin">Admin</option>
                          <option value="HR Manager">HR Manager</option>
                          <option value="Fleet Manager">Fleet Manager</option>
                          <option value="Inspector">Inspector</option>
                          <option value="Customer">Customer</option>
                          <option value="Vendor">Vendor</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronRight size={18} className="rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {step === 1 && (
                   <button
                   type="button"
                   onClick={nextStep}
                   disabled={isLoading}
                   className="flex-1 bg-red-500 hover:bg-slate-800 text-white py-4 rounded-2xl font-black text-[15px] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group disabled:opacity-70 active:scale-[0.98]"
                 >
                   {isLoading ? (
                     <div className="w-5 h-5 border-[3px] border-white/20 border-t-white rounded-full animate-spin"></div>
                   ) : (
                     <>
                       Send Verification
                       <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                     </>
                   )}
                 </button>
                )}
                
                {step === 3 && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-black text-[15px] transition-all shadow-xl shadow-red-100 flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    {isLoading ? "Creating Account..." : "Complete Registration"}
                    {!isLoading && <CheckCircle2 size={18} />}
                  </button>
                )}
              </div>
            </form>

            <div className="mt-10 pt-8 text-center border-t border-slate-50">
              <p className="text-slate-400 text-[13px] font-medium">
                Already have an account? <button onClick={() => navigate("/login")} className="text-red-500 font-black hover:text-red-600 transition-colors ml-1">Sign In</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
