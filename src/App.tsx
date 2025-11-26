import { Header, Footer } from '@/components/layout';
import { Hero, About, Skills, Projects, Contact } from '@/components/sections';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white">
      <Header />

      <main className="flex-1 pt-16">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
