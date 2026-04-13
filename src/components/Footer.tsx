import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-bold">DMP Holy Mission School</p>
                <p className="text-xs text-background/60">Established 2005</p>
              </div>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Empowering students for a brighter tomorrow. Where knowledge meets excellence.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="/#home" className="hover:text-background transition-colors">Home</a></li>
              <li><a href="/#about" className="hover:text-background transition-colors">About</a></li>
              <li><a href="/#celebrations" className="hover:text-background transition-colors">Celebrations</a></li>
              <li><a href="/fees" className="hover:text-background transition-colors">Fee Payment</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-background/60">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Rosera, Samastipur, Bihar, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@dmpholymission.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-6 text-center text-xs text-background/40">
          © {new Date().getFullYear()} DMP Holy Mission School. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
