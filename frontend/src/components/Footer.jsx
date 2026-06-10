
const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-4 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} TouchCare Mobile. All rights reserved.</p>

      </div>
    </footer>
  );
};

export default Footer;
