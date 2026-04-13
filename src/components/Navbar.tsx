import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Celebrations", href: "/#celebrations" },
  { label: "Fees", href: "/fees" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <p className="font-heading font-bold text-sm leading-tight">DMP Holy Mission</p>
            <p className="text-xs text-muted-foreground">School</p>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) =>
            l.href.startsWith("/") && !l.href.startsWith("/#") ? (
              <Link key={l.label} to={l.href}>
                <Button variant="ghost" size="sm">{l.label}</Button>
              </Link>
            ) : (
              <a key={l.label} href={l.href} onClick={() => handleNavClick(l.href)}>
                <Button variant="ghost" size="sm">{l.label}</Button>
              </a>
            )
          )}
          <Link to="/admin">
            <Button size="sm" className="ml-2 gradient-bg text-primary-foreground">Admin</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((l) =>
                l.href.startsWith("/") && !l.href.startsWith("/#") ? (
                  <Link key={l.label} to={l.href} onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">{l.label}</Button>
                  </Link>
                ) : (
                  <a key={l.label} href={l.href} onClick={() => handleNavClick(l.href)}>
                    <Button variant="ghost" className="w-full justify-start">{l.label}</Button>
                  </a>
                )
              )}
              <Link to="/admin" onClick={() => setMobileOpen(false)}>
                <Button className="w-full gradient-bg text-primary-foreground">Admin</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
