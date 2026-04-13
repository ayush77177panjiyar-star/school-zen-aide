import { motion } from "framer-motion";
import { Award, BookOpen, Heart, Target } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Quality Education", desc: "Modern learning methods and comprehensive curriculum" },
  { icon: Award, title: "Experienced Faculty", desc: "Dedicated teachers with years of expertise" },
  { icon: Heart, title: "Values & Discipline", desc: "Building character alongside academics" },
  { icon: Target, title: "Holistic Growth", desc: "Sports, arts, and extracurricular activities" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-widest">About Us</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-2">
            About <span className="gradient-text">Our School</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              DMP Holy Mission School is a prestigious institution established in 2005, dedicated to nurturing young minds with quality education, discipline, and values. Under the leadership of <strong className="text-foreground">Principal Sambu Singh</strong>, the school provides excellent faculty, modern learning methods, and a holistic environment for students' growth.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Located in the heart of Rosera, Samastipur (Bihar), our school has been a beacon of knowledge and excellence for nearly two decades, shaping the future leaders of tomorrow.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-2xl glass">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-semibold">Principal Sambu Singh</p>
                <p className="text-sm text-muted-foreground">Leading with vision since 2005</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-2xl p-6 text-center cursor-default"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
