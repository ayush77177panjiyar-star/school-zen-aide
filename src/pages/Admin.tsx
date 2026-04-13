import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LogIn,
  Users,
  Trash2,
  PlusCircle,
  IndianRupee,
  Search
} from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const API = "http://localhost:5000/api";

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    className: "",
    section: "",
    parentName: ""
  });

  const [payAmount, setPayAmount] = useState({});

  // 🔐 LOGIN
  const handleLogin = () => {
    if (email === "admin@school.com" && password === "admin123") {
      setLoggedIn(true);
      toast.success("Welcome Admin");
      fetchStudents();
    } else {
      toast.error("Invalid Credentials");
    }
  };

  // 📥 FETCH STUDENTS
  const fetchStudents = async () => {
    const res = await axios.get(`${API}/students`);
    setStudents(res.data);
  };

  // ➕ ADD STUDENT
  const addStudent = async () => {
    await axios.post(`${API}/students/add`, form);
    toast.success("Student Added");
    fetchStudents();
  };

  // ❌ DELETE STUDENT
  const deleteStudent = async (id: string) => {
    await axios.delete(`${API}/students/${id}`);
    toast.success("Student Deleted");
    fetchStudents();
  };

  // 💰 PAY FEES
  const payFees = async (id: string) => {
    const amount = payAmount[id];
    if (!amount) return toast.error("Enter amount");

    const res = await axios.post(`${API}/students/pay/${id}`, { amount });

    toast.success(`Remaining Due: ₹${res.data.remainingDue}`);
    fetchStudents();
  };

  // 🔍 SEARCH
  const searchStudent = async () => {
    const res = await axios.get(`${API}/students/search?name=${search}`);
    setStudents(res.data);
  };

  // ⚠️ DEFAULTERS
  const fetchDefaulters = async () => {
    const res = await axios.get(`${API}/students/defaulters`);
    setStudents(res.data);
  };

  useEffect(() => {
    if (loggedIn) fetchStudents();
  }, [loggedIn]);

  // 🔐 LOGIN UI
  if (!loggedIn) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 flex justify-center items-center">
          <Card className="w-[350px] glass">
            <CardHeader className="text-center">
              <LogIn className="mx-auto mb-2" />
              <CardTitle>Admin Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              <Button className="w-full" onClick={handleLogin}>Login</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 🧠 DASHBOARD
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 px-6">

        {/* HEADER */}
        <motion.h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </motion.h1>

        {/* ADD STUDENT */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Student</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-3">
            <Input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Class" onChange={(e) => setForm({ ...form, className: e.target.value })} />
            <Input placeholder="Section" onChange={(e) => setForm({ ...form, section: e.target.value })} />
            <Input placeholder="Parent" onChange={(e) => setForm({ ...form, parentName: e.target.value })} />
            <Button onClick={addStudent} className="md:col-span-4">
              <PlusCircle className="mr-2" /> Add Student
            </Button>
          </CardContent>
        </Card>

        {/* SEARCH + FILTER */}
        <div className="flex gap-3 mb-6">
          <Input placeholder="Search student..." onChange={(e) => setSearch(e.target.value)} />
          <Button onClick={searchStudent}>
            <Search className="mr-2" /> Search
          </Button>
          <Button variant="outline" onClick={fetchStudents}>All</Button>
          <Button variant="destructive" onClick={fetchDefaulters}>Defaulters</Button>
        </div>

        {/* STUDENT TABLE */}
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Due</th>
                  <th>Pay</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s: any) => (
                  <tr key={s._id} className="border-b">
                    <td>{s.name}</td>
                    <td>{s.className}-{s.section}</td>
                    <td className="text-red-600">₹{s.totalDue}</td>

                    <td>
                      <Input
                        placeholder="₹"
                        onChange={(e) =>
                          setPayAmount({ ...payAmount, [s._id]: Number(e.target.value) })
                        }
                      />
                    </td>

                    <td className="flex gap-2">
                      <Button size="sm" onClick={() => payFees(s._id)}>
                        <IndianRupee size={16} />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteStudent(s._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Admin;
