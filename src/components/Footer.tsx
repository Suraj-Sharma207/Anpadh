export default function Footer() {
  return (
    <footer id="reach-us" className="border-t border-white/10 py-16 px-6 mt-12 w-full flex flex-col items-center justify-center">
      <div className="text-4xl mb-8" style={{ fontFamily: "'Kalam', cursive" }}>
        अनपढ़<sup className="text-sm ml-0.5">®</sup>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm text-muted-foreground">
        {['Terms & Conditions', 'Privacy Policy', 'Shipping & Returns', 'Contact', 'FAQ'].map((link) => (
          <a key={link} href="#" className="hover:text-foreground transition-colors duration-300">
            {link}
          </a>
        ))}
      </div>
      <p className="text-sm text-muted-foreground/60 text-center uppercase tracking-widest text-[10px]">
        © 2026 अनपढ़. All rights reserved.
      </p>
    </footer>
  );
}
