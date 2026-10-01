import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Tool from "./components/Tool";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="app" id="top">
      <div className="ambient" aria-hidden="true">
        <div className="ambient__violet" />
        <div className="ambient__blue" />
        <div className="ambient__grid" />
      </div>

      <Header />

      <main className="main">
        <div className="container stack">
          <Hero />
          <Tool />
          <Pricing />
        </div>
      </main>

      <Footer />
    </div>
  );
}
