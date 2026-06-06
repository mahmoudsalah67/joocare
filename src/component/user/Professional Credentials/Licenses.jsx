import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FiPlusCircle, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import UserSidebar from '../layout/UserSidebar';
import { option } from 'framer-motion/client';

function Licenses() {
 const location = useLocation();
  const [licenses, setLicenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  //  editingItem - لو فيه قيمة يبقى Edit Modal، لو null يبقى Add Modal
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    number: '',
    country_id: '',
     image: null
  });

  const token = localStorage.getItem("user_token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchcountry = async () => {
    try {
      const res = await axios.get('https://joocare.nami-tec.com/api/countries');
      setCountries(res.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchcountry(); }, []);

  const fetchLicenses = async () => {
    try {
      const res = await axios.get('https://joocare.nami-tec.com/api/user/user-licenses', { headers });
      setLicenses(res.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchLicenses(); }, []);

  //  فتح Add Modal
  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ title: '' ,number: '', country_id: '', image: null });
    setPreviewImage(null);
    setIsModalOpen(true);
  };

  //  فتح Edit Modal وتحميل بيانات العنصر
  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
       title:item.title || '',
      number: item.number || '',
      country_id: item.country_id || '',
      image: null // الصورة الجديدة لو اختار يغيرها
    });
    setPreviewImage(item.image || null); //  عرض الصورة الموجودة
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setPreviewImage(null);
    setFormData({ title: '' ,number: '', country_id: '', image: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setFormData({ ...formData, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  //  Submit - بيشتغل لـ Add و Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imagePath = editingItem?.image || "";  

      // لو اختار صورة جديدة ارفعها
      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append("image", formData.image);
        const uploadRes = await axios.post(
          "https://joocare.nami-tec.com/api/images",
          imageFormData,
          { headers: { ...headers, "Content-Type": "multipart/form-data" } }
        );
        imagePath = uploadRes.data?.data?.image;
        if (!imagePath) { alert("فشل رفع الصورة."); return; }
      }

      const payload = {
        title: formData.title,
        number: formData.number,
        country_id: formData.country_id,
        image: imagePath
      };

      if (editingItem) {
        //  Edit - POST /certifications/{id} مع _method=PUT
        payload._method = "PUT";
        await axios.post(
          `https://joocare.nami-tec.com/api/user/user-licenses/${editingItem.id}`,
          payload,
          { headers: { ...headers, "Content-Type": "application/json" } }
        );
        alert("تم تحديث المؤهل بنجاح!");
      } else {
        //  Add - POST /certifications
        await axios.post(
          'https://joocare.nami-tec.com/api/user/user-licenses',
          payload,
          { headers: { ...headers, "Content-Type": "application/json" } }
        );
        alert("تم إضافة المؤهل بنجاح!");
      }

      closeModal();
      fetchLicenses();
    } catch (error) {
      console.error("خطأ:", error.response?.data);
      alert(error.response?.data?.message || "حدث خطأ أثناء الحفظ");
    }
  };

  //  Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certification?")) return;
    try {
      await axios.delete(
        `https://joocare.nami-tec.com/api/user/user-licenses/${id}`,
        { headers }
      );
      fetchLicenses();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete.");
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-28 pb-16">
      <div className="bg-[#0D0D0D0D] border-b border-gray-200/80 py-5 mt-[-50px] mb-8">
        <div className="max-w-[1320px] mx-auto px-6 flex justify-between items-center text-sm font-medium">
          <span className="text-[#0D0D0D] font-bold text-base">Jobs</span>
          <div className="flex items-center gap-2">
            <Link to={'/'} className='text-[16px] font-[600]'>Home</Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-semibold">Jobs</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <UserSidebar />

        <main className="lg:col-span-9 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Tabs */}
            <div className="bg-white p-1.5 rounded-full border border-gray-200/60 flex items-center shadow-sm">
              <Link to="/ProfessionalCredentials"
                className={`px-6 py-2 rounded-full text-sm font-bold transition duration-200 ${
                  location.pathname === '/ProfessionalCredentials' ? 'bg-[#00694B] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >Qualifications</Link>
              <Link to="/ProfessionalCredentials/Certificates"
                className={`px-6 py-2 rounded-full text-sm font-bold transition duration-200 ${
                  location.pathname === '/ProfessionalCredentials/Certificates' ? 'bg-[#00694B] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >Certificates</Link>
              <Link to="/ProfessionalCredentials/Licenses"
                className={`px-6 py-2 rounded-full text-sm font-bold transition duration-200 ${
                  location.pathname === '/ProfessionalCredentials/Licenses' ? 'bg-[#00694B] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >Licenses</Link>
            </div>

            <button onClick={openAddModal} className="flex items-center gap-2 px-5 py-3 bg-[#1A252C] text-white text-xs font-bold rounded-full hover:bg-black transition">
              <FiPlusCircle size={15} /> Add Licenses
            </button>
          </div>

          {/* القائمة */}
          
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-2">
              {licenses.map((license) => (
                <div key={license.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between">
                  <div className="w-full h-[150px] rounded-xl overflow-hidden border border-gray-200/70 bg-gray-50 relative group shadow-inner mb-4">
                    <img src={license.image} alt="License Document" className="w-full h-full object-cover grayscale-[20%] group-hover:scale-103 transition duration-300" />
                    <div className="absolute inset-0 bg-blue-500/5 mix-blend-multiply"></div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-extrabold text-[#0D0D0D] text-[15px] tracking-tight">{license.title}</h4>
                      <span className="text-gray-400 font-medium text-xs">{license.number}</span>
                    </div>

                    <div className="flex items-center gap-0.5">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"><FiEdit2 size={14} /></button>
                      <button className="p-1.5 text-red-400 hover:text-red-500 rounded-lg"><FiTrash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </main>
      </div>

      {/*  Modal - Add & Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] w-full max-w-[560px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              {/*  العنوان بيتغير حسب Add أو Edit */}
              <h2 className="text-[22px] font-bold text-[#0D0D0D]">
                {editingItem ? "Edit License" : "Add Licenses"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition">
                <FiX size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* License Title */}
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-semibold text-[#0D0D0D]">License Title</label>
                <input
                  type="text"
                  value={formData.title}
                  placeholder="ex:License Title"
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full h-[50px] px-5 bg-[#F4F4F4] border border-[#E9E9E9] rounded-full text-[14px] outline-none focus:border-[#00694B] transition placeholder:text-gray-400"
                  required
                />
              </div>

              {/* License Number */}
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-semibold text-[#0D0D0D]">License Number</label>
                <input
                  type="text"
                  value={formData.number}
                  placeholder="ex: Ain Shams University - Faculty of Medicine"
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full h-[50px] px-5 bg-[#F4F4F4] border border-[#E9E9E9] rounded-full text-[14px] outline-none focus:border-[#00694B] transition placeholder:text-gray-400"
                  required
                />
              </div>
              {/* Country */}
             {/* Country */}
                           <div className="flex flex-col gap-1">
                             <label className="text-[14px] font-semibold text-[#0D0D0D]">Country</label>
                             <div className="relative">
                               <select
                                 value={formData.country_id}
                                 onChange={(e) => setFormData({ ...formData, country_id: e.target.value })}
                                 className="w-full h-[50px] px-5 bg-[#F4F4F4] border border-[#E9E9E9] rounded-full text-[14px] outline-none focus:border-[#00694B] transition appearance-none text-gray-500 cursor-pointer"
                               >
                                 <option value="">ex: Egypt</option>
                                 {countries && countries.map((c) => (
                                   <option key={c.id} value={c.id}>{c.name}</option>
                                 ))}
                               </select>
                               <MdKeyboardArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px] pointer-events-none" />
                             </div>
                           </div>

             

              {/* Upload Image */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-[#0D0D0D]">Upload Image</label>
                <label
                  htmlFor="qual-image"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="flex flex-col items-center justify-center border-[1.5px] border-dashed border-gray-200 rounded-[16px] bg-[#F9FAFB] cursor-pointer hover:border-[#00694B] transition min-h-[120px] overflow-hidden"
                >
                  {previewImage ? (
                    <div className="relative w-full h-[140px]">
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-[14px]" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-[14px]">
                        <p className="text-white text-xs font-semibold">Click to change image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 gap-2">
                      <HiOutlineDocumentAdd size={32} className="text-[#00694B]" />
                      <p className="text-[13px] text-gray-500">
                        Drag & Drop your Image or{" "}
                        <span className="text-[#00694B] font-semibold">Browse</span>
                      </p>
                    </div>
                  )}
                  <input type="file" id="qual-image" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>

               

              {/*  زرار بيتغير حسب Add أو Edit */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#00694B] hover:bg-[#00523A] text-white font-bold rounded-full text-[16px] transition mt-2"
              >
                {editingItem ? "Save Changes" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Licenses;