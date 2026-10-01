import Logo from "./Logo";

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__brand" aria-label="CutoutAI home">
          <Logo />
        </a>
        <nav className="header__nav" aria-label="Main">
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#login" className="nav-link">Login</a>
          <a href="#upload-stage" className="btn btn--primary btn--sm">Get Started</a>
        </nav>
      </div>
    </header>
  );
}
