import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Users, FileCheck, CheckCircle, XCircle, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

// Demo data
const demoReceipts = [
  { id: 1, student: "Aarav Kumar", class: "5A", amount: 1500, date: "2026-04-10", status: "pending", file: "receipt_001.jpg" },
  { id: 2, student: "Priya Sharma", class: "8B", amount: 1000, date: "2026-04-08", status: "pending", file: "receipt_002.pdf" },
  { id: 3, student: "Rahul Singh", class: "3C", amount: 500, date: "2026-04-05", status: "approved", file: "receipt_003.jpg" },
];

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [receipts, setReceipts] = useState(demoReceipts);

  const handleLogin = () => {
    if (email === "admin@school.com" && password === "admin123") {
      setLoggedIn(true);
      toast.success("Welcome, Admin!");
    } else {
      toast.error("Invalid credentials. Try admin@school.com / admin123");
    }
  };

  const handleApprove = (id: number) => {
    setReceipts((r) => r.map((x) => (x.id === id ? { ...x, status: "approved" } : x)));
    toast.success("Receipt approved & fees deducted!");
  };

  const handleReject = (id: number) => {
    setReceipts((r) => r.map((x) => (x.id === id ? { ...x, status: "rejected" } : x)));
    toast.error("Receipt rejected.");
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="w-[380px] glass">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-3">
                  <LogIn className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="font-heading text-xl">Admin Login</CardTitle>
                <p className="text-sm text-muted-foreground">DMP Holy Mission School</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
                <Button className="w-full gradient-bg text-primary-foreground" onClick={handleLogin}>
                  Sign In
                </Button>
                <p className="text-xs text-center text-muted-foreground">Demo: admin@school.com / admin123</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const pending = receipts.filter((r) => r.status === "pending");
  const approved = receipts.filter((r) => r.status === "approved");

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-heading text-3xl font-bold">Admin <span className="gradient-text">Dashboard</span></h1>
            <p className="text-muted-foreground mt-1">Manage student payments and receipts</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Students", value: "1500+", icon: Users },
              { label: "Pending Receipts", value: pending.length, icon: FileCheck },
              { label: "Approved", value: approved.length, icon: CheckCircle },
              { label: "Total Collected", value: "₹7.5L", icon: IndianRupee },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass">
                  <CardContent className="pt-6 text-center">
                    <s.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-heading font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Receipts table */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-heading">Payment Receipts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 font-medium text-muted-foreground">Student</th>
                      <th className="pb-3 font-medium text-muted-foreground">Class</th>
                      <th className="pb-3 font-medium text-muted-foreground">Amount</th>
                      <th className="pb-3 font-medium text-muted-foreground">Date</th>
                      <th className="pb-3 font-medium text-muted-foreground">Status</th>
                      <th className="pb-3 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipts.map((r) => (
                      <tr key={r.id} className="border-b border-border/50">
                        <td className="py-3 font-medium">{r.student}</td>
                        <td className="py-3">{r.class}</td>
                        <td className="py-3">₹{r.amount}</td>
                        <td className="py-3">{r.date}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            r.status === "approved" ? "bg-green-100 text-green-700"
                            : r.status === "rejected" ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="py-3">
                          {r.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" className="text-green-600 h-8" onClick={() => handleApprove(r.id)}>
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-600 h-8" onClick={() => handleReject(r.id)}>
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
