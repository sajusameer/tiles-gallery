export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-[#d4af37] mt-0">
      <div className="mt-10">
        <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-6">

        {/* Logo */}
        <div>
          <h2 className="text-xl font-bold text-[#d4af37]">
            TilesGallery
          </h2>
          <p className="mt-2 text-sm">
            Premium tiles for modern living spaces.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-[#d4af37] mb-2">Social</h3>
          <ul className="space-y-1">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#d4af37] mb-2">Contact Us</h3>
          <p>Email: info@tiles.com</p>
          <p>Phone: +880123456789</p>
        </div>
      </div>
      </div>

      <p className="text-center text-sm pb-4">
        © 2026 Tiles Gallery. All rights reserved.
      </p>
    </footer>
  );
}