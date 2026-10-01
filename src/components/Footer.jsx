import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo small />
        <p>AI-powered background removal with edge-aware precision. Clean transparent cutouts in seconds.</p>
        <nav aria-label="Footer">
          <a href="#privacy" className="nav-link">Privacy</a>
          <a href="#terms" className="nav-link">Terms</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
        <small>© {new Date().getFullYear()} CutoutAI Inc. All rights reserved.</small>
      </div>
    </footer>
  );
}
