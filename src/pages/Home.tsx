import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Featured from '../components/Featured';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent selection:text-background">
      <Navbar />
      <main>
        <Hero />
        <Featured />
        <Portfolio />
        <Services />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
