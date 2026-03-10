import { motion } from "framer-motion";
import { Phone, Calendar, MapPin } from "lucide-react";
import CurvedLoop from "@/components/CurvedLoop";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-tight mb-6 leading-tight"
              data-testid="heading-page-title"
            >
              Let's{" "}
              <span className="text-foreground">Connect</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Ready to transform your business with AI? We're here to help you achieve your automation goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-16 -mx-4"
              style={{ height: '150px' }}
            >
              <CurvedLoop
                marqueeText="24/7 Support • <1hr Response • 100% Custom • "
                speed={2}
                curveAmount={100}
                direction="left"
                interactive={true}
                className="curved-loop-text"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Demo Number */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black dark:bg-white rounded-2xl mb-6">
              <Phone className="w-8 h-8 text-white dark:text-black" />
            </div>

            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-4">
              Don't just email us. Test us.
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              Experience the speed and natural voice of the Unkommon AI Receptionist firsthand. Call the number below to interact with our demo agent. Try to book an appointment, ask about pricing, or stump it with complex questions.
            </p>

            <a href="tel:+12036809629" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-5xl md:text-6xl font-light text-foreground mb-3 hover:text-blue-500 transition-colors cursor-pointer"
              >
                +1 (203) 680-9629
              </motion.div>
            </a>

            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Live Demo Agent • Active 24/7
            </p>
          </motion.div>
        </div>
      </section>

      {/* Book a Call - Cal.com Embed */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white dark:text-black" />
              </div>
              <h2 className="text-4xl font-light text-foreground tracking-tight">
                Book a Call
              </h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Pick a time that works for you — 30 minutes, no pressure. We'll map out how AI can work for your business.
            </p>

            <div style={{ overflow: 'hidden', height: '680px', background: '#000' }}>
              <iframe
                src="https://cal.com/mehdi-salhi-8tv8tj/30min?embed=true&theme=dark&hideEventTypeDetails=false&layout=month_view"
                // @ts-ignore
                allowTransparency="true"
                style={{ width: '100%', height: '900px', border: 'none', background: '#000', colorScheme: 'dark' }}
                title="Book a 30-minute call with Unkommon"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black dark:bg-white rounded-2xl mb-6">
              <MapPin className="w-8 h-8 text-white dark:text-black" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-10">
              Locations
            </h2>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-xl text-foreground font-medium mb-1">New York City</div>
                <div className="text-sm text-muted-foreground">NYC, NY</div>
              </div>
              <div>
                <div className="text-xl text-foreground font-medium mb-1">Stamford</div>
                <div className="text-sm text-muted-foreground">Stamford, CT</div>
              </div>
              <div>
                <div className="text-xl text-foreground font-medium mb-1">New Jersey</div>
                <div className="text-sm text-muted-foreground">NJ</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
