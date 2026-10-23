import React, { useState, useRef } from "react";
import {
  IoPencil,
  IoImageOutline,
  IoClose,
  IoEyeOutline,
  IoEyeOffOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import { getInitials } from "../../../common/helpers/helpers";

export default function ProfilePage() {
  document.title = "Profil Pengguna - Sistem Informasi Keuangan UIKA";

  const { user } = useAuth();
  const userName = user?.nama || "Siddik Super Admin";
  const userEmail = user?.email || "rsiddik369@gmail.com";
  const defaultInitials = getInitials(userName);

  // Profile photo state
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Change Password Modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast("Ukuran foto maksimal 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomPhoto(event.target.result as string);
          showToast("Foto profil berhasil diperbarui");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHapusFoto = () => {
    setCustomPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    showToast("Foto profil dikembalikan ke inisial nama");
  };

  const handleSimpanPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordError("Kata sandi saat ini wajib diisi");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPasswordError("Kata sandi baru minimal 6 karakter");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi kata sandi baru tidak cocok");
      return;
    }

    setPasswordError("");
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showToast("Kata sandi berhasil diperbarui!");
  };

  return (
    <div className="w-full animate-fade-in pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2 border border-gray-700 animate-slide-in">
          <IoCheckmarkCircle className="text-emerald-400 text-lg flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Grid matching Gambar 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Verifikasi Email & Keamanan Akun (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Verifikasi Email */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 border-t-[3px] border-t-[#00a8e8] p-5 sm:p-6 transition-all hover:shadow">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Verifikasi Email
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
              Jika ingin mengubah alamat email, silakan menghubungi admin Perguruan Tinggi.
            </p>

            <div className="max-w-xl">
              <label className="block text-xs font-semibold text-blue-700 mb-1.5">
                Email Pribadi<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                readOnly
                disabled
                value={userEmail}
                className="w-full px-3.5 py-2 bg-[#f0f2f5] border border-gray-300 rounded text-sm text-gray-700 select-all cursor-not-allowed font-sans"
              />
              <p className="text-xs font-medium text-emerald-600 mt-1.5 flex items-center gap-1">
                Email sudah diverifikasi
              </p>
            </div>
          </div>

          {/* Card 2: Keamanan Akun */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 border-t-[3px] border-t-[#00a8e8] p-5 sm:p-6 transition-all hover:shadow">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Keamanan Akun
            </h2>

            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-sm font-semibold text-blue-600">
                Kata Sandi
              </span>
              <button
                type="button"
                onClick={() => {
                  setPasswordError("");
                  setShowPasswordModal(true);
                }}
                className="px-3.5 py-1.5 bg-[#e69500] hover:bg-amber-600 active:scale-95 text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <IoPencil size={13} />
                <span>Ganti</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Disarankan untuk mengganti kata sandi secara berkala untuk menjaga keamanan akun anda
            </p>

            <hr className="border-t border-gray-100" />
          </div>
        </div>

        {/* Kolom Kanan: Foto Profil (Col 4) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 border-t-[3px] border-t-[#00a8e8] p-5 sm:p-6 transition-all hover:shadow flex flex-col items-center">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 text-center w-full">
              Foto Profil
            </h2>

            {/* Kotak Foto Profil / Inisial Gelap Sesuai Gambar 2 */}
            <div className="w-full max-w-[280px] h-52 sm:h-56 bg-[#2e3330] rounded-md flex items-center justify-center shadow-inner overflow-hidden mb-5">
              {customPhoto ? (
                <img
                  src={customPhoto}
                  alt="Foto Profil"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-6xl sm:text-7xl font-black text-white tracking-widest select-none font-sans">
                  {defaultInitials}
                </span>
              )}
            </div>

            {/* Tombol Aksi Foto */}
            <div className="flex items-center justify-center gap-2.5 w-full">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#3b5998] hover:bg-blue-800 active:scale-95 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <IoImageOutline size={15} />
                <span>Ganti Foto</span>
              </button>

              <button
                type="button"
                onClick={handleHapusFoto}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <IoClose size={15} />
                <span>Hapus Foto</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ganti Kata Sandi */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-200">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-base">
                Ganti Kata Sandi
              </h3>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <IoClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSimpanPassword} className="p-6 space-y-4">
              {passwordError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                  {passwordError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kata Sandi Saat Ini<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan kata sandi saat ini"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPw ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kata Sandi Baru<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPw ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPw ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Konfirmasi Kata Sandi Baru<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPw ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPw ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition-colors shadow-sm cursor-pointer"
                >
                  Simpan Kata Sandi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
