import { motion } from "framer-motion";

const celebrations = [
  {
    title: "Diwali Celebration",
    emoji: "🪔",
    desc: "Festival of lights celebrated with joy and togetherness",
    gradient: "from-amber-500/80 to-orange-600/80",
    img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",
  },
  {
    title: "Holi Celebration",
    emoji: "🎨",
    desc: "Colors of unity and happiness spread across campus",
    gradient: "from-pink-500/80 to-purple-600/80",
    img: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop",
  },
  {
    title: "Saraswati Puja",
    emoji: "📿",
    desc: "Seeking blessings of Goddess Saraswati for wisdom",
    gradient: "from-yellow-400/80 to-amber-500/80",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
  },
  {
    title: "Independence Day",
    emoji: "🇮🇳",
    desc: "Honouring our nation with pride and patriotic spirit",
    gradient: "from-green-500/80 to-emerald-600/80",
    img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
  },
];

const CelebrationGallery = () => {
  return (
    <section id="celebrations" className="py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-widest">Our Culture</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-2">
            School <span className="gradient-text">Celebrations</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            We celebrate every festival with enthusiasm, teaching students the values of unity, culture, and togetherness.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {celebrations.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative rounded-2xl overflow-hidden group cursor-default aspect-[3/4]"
            >
              <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient}`} />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <span className="text-4xl mb-2">{c.emoji}</span>
                <h3 className="font-heading font-bold text-xl">{c.title}</h3>
                <p className="text-sm text-white/80 mt-1">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebrationGallery;
