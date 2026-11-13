import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ArrowUpRight, Dumbbell, Menu, X } from "lucide-react";
import "./Header.css";

const navigation = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROGRAMS", href: "/programs" },
  { label: "FACILITY", href: "/facility" },
  { label: "COACHES", href: "/trainers" },
  { label: "MEMBERSHIP", href: "/membership" },
  { label: "CONTACT", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">
            <Dumbbell size={22} />
          </span>

          <span className="brand-copy">
            <span className="brand-name">
              SOUIFER<span>.</span>
            </span>
            <span className="brand-tagline">ATHLETIC PERFORMANCE</span>
          </span>
        </Link>

        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/JoinUs" className="button button-primary header-join">
            JOIN THE CLUB
            <ArrowUpRight size={17} />
          </Link>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
