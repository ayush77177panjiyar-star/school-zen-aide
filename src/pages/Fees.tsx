import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Upload, CheckCircle, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MONTHLY_FEE = 500;

const Fees = () => {
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [pendingMonths, setPendingMonths] = useState(3);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [looked, setLooked] = useState(false);

  const totalDues = pendingMonths * MONTHLY_FEE;

  const handleLookup = () => {
    if (!studentName || !studentClass || !section || !fatherName) {
      toast.error("Please fill all fields");
      return;
    }
    setLooked(true);
    toast.success(`Found records for ${studentName}`);
  };

  const handlePay = () => {
    setShowPayment(false);
    setPendingMonths(0);
    setShowSuccess(true);
    toast.success("Payment successful! ₹" + totalDues + " paid.");
  };

  const handleUpload = () => {
    if (!receiptFile) {
      toast.error("Please select a file");
      return;
    }
    setShowUpload(false);
    toast.success("Receipt uploaded! Amount will be deducted after verification within 24 hours.");
    setReceiptFile(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium text-secondary uppercase tracking-widest">Fee Management</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mt-2">
              Fee <span className="gradient-text">Payment</span>
            </h1>
            <p className="text-muted-foreground mt-3">Monthly fee: ₹{MONTHLY_FEE}/month</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="font-heading text-xl">Student Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                <Input placeholder="Father / Parent Name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                  <Select value={studentClass} onValueChange={setStudentClass}>
                    <SelectTrigger><SelectValue placeholder="Class" /></SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>Class {i + 1}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={section} onValueChange={setSection}>
                    <SelectTrigger><SelectValue placeholder="Section" /></SelectTrigger>
                    <SelectContent>
                      {["A", "B", "C", "D"].map((s) => (
                        <SelectItem key={s} value={s}>Section {s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full gradient-bg text-primary-foreground" onClick={handleLookup}>
                  Check Fee Status
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {looked && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
              <Card className="glass border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Months</p>
                      <p className="text-2xl font-heading font-bold">{pendingMonths}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Dues</p>
                      <p className="text-2xl font-heading font-bold text-destructive flex items-center gap-1">
                        <IndianRupee className="w-5 h-5" />{totalDues}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="gradient-bg text-primary-foreground gap-2" onClick={() => setShowPayment(true)} disabled={pendingMonths === 0}>
                      <CreditCard className="w-4 h-4" /> Pay Online
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={() => setShowUpload(true)} disabled={pendingMonths === 0}>
                      <Upload className="w-4 h-4" /> Upload Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Simulated Razorpay modal */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Razorpay Payment (Demo)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-xl bg-muted text-center">
              <p className="text-sm text-muted-foreground">Amount to pay</p>
              <p className="text-3xl font-heading font-bold flex items-center justify-center gap-1">
                <IndianRupee className="w-6 h-6" />{totalDues}
              </p>
            </div>
            <Input placeholder="Card Number" defaultValue="4111 1111 1111 1111" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="MM/YY" defaultValue="12/28" />
              <Input placeholder="CVV" defaultValue="123" type="password" />
            </div>
            <Button className="w-full gradient-bg text-primary-foreground" onClick={handlePay}>
              Pay ₹{totalDues}
            </Button>
            <p className="text-xs text-center text-muted-foreground">This is a simulated payment. No real money is charged.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload receipt */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Upload Payment Receipt</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
              <input type="file" accept="image/*,.pdf" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} className="text-sm" />
            </div>
            {receiptFile && <p className="text-sm text-muted-foreground">Selected: {receiptFile.name}</p>}
            <Button className="w-full gradient-bg text-primary-foreground" onClick={handleUpload}>
              Submit Receipt
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Your payment receipt will be verified within 24 hours. Amount will be deducted after approval.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="py-8">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h3 className="font-heading text-xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground">All dues have been cleared. Thank you!</p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Fees;
