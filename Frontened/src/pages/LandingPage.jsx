import Header from '../features/landing/Header.jsx';
import Hero from '../features/landing/Hero.jsx';
import Features from '../features/landing/Features.jsx';
import Footer from '../components/Footer.jsx';

function LandingPage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Features />
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;
