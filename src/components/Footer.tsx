const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6 px-4 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Dukungan</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>Pusat Bantuan</li>
            <li>AirCover</li>
            <li>Anti-diskriminasi</li>
            <li>Dukungan disabilitas</li>
            <li>Opsi pembatalan</li>
            <li>Laporkan masalah lingkungan</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Menjadi Tuan Rumah
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>Jadikan tempat Anda Airbnb</li>
            <li>Jadikan pengalaman Anda Airbnb</li>
            <li>AirCover untuk Tuan Rumah</li>
            <li>Sumber informasi menerima tamu</li>
            <li>Forum komunitas</li>
            <li>Menerima tamu dengan bijak</li>
            <li>Ikuti kelas Menerima Tamu secara gratis</li>
            <li>Buka rekan tuan rumah</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Airbnb</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>Update Mei 2025</li>
            <li>Ruang Berita</li>
            <li>Karier</li>
            <li>Investor</li>
            <li>Penginaan darurat totalbali.com</li>
          </ul>
        </div>
      </div>
      <div className="mt-6 text-xs text-gray-500">
        © 2025 TotalVila, Inc. • Privasi • Ketentuan • Peta Situs
      </div>
      <div className="mt-2 flex space-x-4 text-gray-500">
        <a href="#" className="hover:text-gray-700">
          <span>🌐</span>
        </a>
        <a href="#" className="hover:text-gray-700">
          <span>🇮🇩</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
