import React, { useRef, useState } from "react";
import "./Jobs.css";
import arrow from "../../../public/imge/img-jobs/arrow-square-left.svg";
import { FiSearch } from "react-icons/fi";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";
import arrowup from "../../../public/imge/img-about/Arrow Up Icon.svg";
import Checkbox from "../../../public/imge/img-jobs/Checkbox.svg";
import arrowdowen from "../../../public/imge/img-jobs/Arrow Down Icon.svg";
import logo from "../../../public/imge/16 [Converted].svg";
import loction from "../../../public/imge//img-jobs/Location Icon.svg";
import jobtype from "../../../public/imge/img-jobs/Job Type Icon.svg";
import arrowright from "../../../public//imge/img-jobs/arrow-right.svg";
import arroww from "../../../public/imge/img-jobs/Arrow Container.svg";
import arroww2 from "../../../public/imge/img-jobs/Arrow Container (1).svg";
import share from "../../../public/imge/img-jobs/share.svg";
import currencydollar from "../../../public/imge/img-jobs/currency-dollar.svg";
import save from "../../../public/imge/img-jobs/save.svg";
import Footer from "../footer/Footer";
import { Link, Links, NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { img } from "framer-motion/client";
import { set } from "react-hook-form";

function Jobs() {
  const [showAll, setShowAll] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [jobsData, setjobsData] = useState({
    data: [],
    last_page: 0,
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [term, setTerm] = useState(searchParams.get("search") || "");
  const [countryData, setCountryData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("By country");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [checked, setChecked] = useState({
    withLicense: "",
    withoutLicense: "",
    hospital: false,
    medicalCenter: false,
    clinic: false,
    telemedicine: false,
    pharmaceutical: false,
    supplyChain: false,
    insurance: false,
    tpa: false,
    provider: false,
  });

  // { salry}
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  // { salry}

  const [prfessionalLicense, setProfessionalLicense] = useState();
  const [domin, setDomin] = useState([]);
  const [role_categories, setRoleCategories] = useState([]);
  const [seniority_levels, setSeniority_levels] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [employment_types, setemployment_types] = useState([]);

  const searchQuery = searchParams.get("search") || "";
  const countryQuery = searchParams.get("country") || "";

  const professionalLicenseQuery =
    searchParams.get("professional_license") || "";
  const dominQuery = searchParams.get("domain") || "";
  const roleCategoriesQuery = searchParams.get("role_categories[]") || "";
  const seniorityLevelsQuery = searchParams.get("seniority_levels[]") || "";
  const experiencesQuery = searchParams.get("experiences") || "";
  const availabilitiesQuery = searchParams.get("availabilities") || "";
  const categoriesQuery = searchParams.get("categories[]") || "";
  const employmentTypesQuery = searchParams.get("employment_types[]") || "";

  const dropdownStyle =
    "flex items-center gap-2.5 bg-white text-gray-400 px-5 py-3 rounded-full cursor-pointer hover:bg-gray-50 transition min-w-[220px]";

  async function fetchdatajobs(
    page = 1,
    search = "",
    country = "",
    professional = "",
    dom = "",
    role = "",
    senior = "",
    exp = "",
    avail = "",
    employ = "",
    categories = "",
  ) {
    try {
      const url = `https://joocare.nami-tec.com/api/user/jobs?pagination=on&limit_per_page=10&page=${page}&search=${search}${country ? `&country=${country}` : ""}&professional_license=${professional}&domain=${dom}&role_categories=${role}&seniority_levels=${senior}&experiences=${exp}&availabilities=${avail}&employment_types=${employ}&categories=${categories}`;

      const response = await fetch(url, {
        headers: { Accept: "application/json", "Accept-Language": "en" },
      });
      const data = await response.json();
      if (data) setjobsData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchdatajobs(
      currentPage,
      searchQuery,
      countryQuery,
      professionalLicenseQuery,
      dominQuery,
      roleCategoriesQuery,
      seniorityLevelsQuery,
      experiencesQuery,
      availabilitiesQuery,
      employmentTypesQuery,
      categoriesQuery,
    );
  }, [ currentPage,
    searchQuery,
    countryQuery,
    professionalLicenseQuery,
    dominQuery,
    roleCategoriesQuery,
    seniorityLevelsQuery,
    experiencesQuery,
    categoriesQuery,
    availabilitiesQuery,
    employmentTypesQuery,]);

  const handleApplyFilter = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setCurrentPage(1);

      const params = {
        search: term,
        country: selectedCountryId,
        professional_license: prfessionalLicense,
      };
 
      // salry
      if (minSalary) params.min_salary = minSalary;
    if (maxSalary) params.max_salary = maxSalary;
      // salry


      if (domin.length) params["domain[]"] = domin.join(",");
      if (role_categories.length)params["role_categories[]"] = role_categories.join(",");
      if (seniority_levels.length)params["seniority_levels[]"] = seniority_levels.join(",");
      if (experiences.length) params["experiences"] = experiences;
      if (categories.length) params["categories[]"] = categories.join(",");
      if (availabilities.length)params["availabilities"] = availabilities.join(",");
      if (employment_types.length)params["employment_types[]"] = employment_types.join(",");

      setSearchParams(params);
    }
  };

  
const handleReset = () => {
  setChecked({});
  setTerm("");
  setSelectedCountryId("");
  setSelectedCountry("By country"); 
  setProfessionalLicense("");
  setCategories([]);
  setSeniority_levels([]); 
  setRoleCategories([]);   
  setDomin([]);
  setExperiences([]);
  setAvailabilities([]);
  setemployment_types([]);
  setMinSalary("");
  setMaxSalary("");
  setSearchParams({});
  setCurrentPage(1);

   document.querySelectorAll('input[type="radio"]').forEach((r) => r.checked = false);
};

  async function fetchdatacountry() {
    try {
      const response = await fetch(
        "https://joocare.nami-tec.com/api/countries?pagination=on&limit_per_page=10&page=1",
        {
          headers: { "Accept-Language": "en" },
        },
      );
      const data = await response.json();
      setCountryData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const [searchData, setSearchData] = useState(null);

  async function fetchdatasearch() {
    try {
      const response = await fetch(
        "https://joocare.nami-tec.com/api/searches?pagination=on&limit_per_page=10&page=1",
      );
      const data = await response.json();
      setSearchData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchdatasearch();
  }, []);

  useEffect(() => {
    fetchdatacountry();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setCurrentPage(1);
      setSearchParams({ search: term, country: selectedCountryId });
    }
  };

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleCheck = (key) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

// {api jobs left}
const [fetchDataleft, setfetchdataleft] = useState(null);
const [availabilitiess, setavailabilitiess] = useState(null);
const [categoriess, setcategoriess] = useState(null);
const [domains, setdomains] = useState(null);
const [experiencess, setexperiencess] = useState(null);
const [rolecategories, setrolecategories] = useState(null);
const [senioritylevels, setsenioritylevels] = useState(null);
const [employertypes, setemployertypes] = useState(null);
 
 async function fetchdataleft(url ,setter) {
   try {
     const response = await fetch(url);
     const data = await response.json();
setter(data)
   } catch (error) {
     console.error("Error:", error);
   }
 }

 useEffect(() => {
     const baseurl = 'https://joocare.nami-tec.com/api'
     fetchdataleft(`${baseurl}/availabilities?pagination=on&limit_per_page=10&page=1`,setavailabilitiess)
     fetchdataleft(`${baseurl}/categories?pagination=on&limit_per_page=10&page=1`,setcategoriess)
     fetchdataleft(`${baseurl}/domains?pagination=on&limit_per_page=10&page=1`,setdomains)
     fetchdataleft(`${baseurl}/experiences?pagination=on&limit_per_page=10&page=1`,setexperiencess)
     fetchdataleft(`${baseurl}/role-categories?pagination=on&limit_per_page=10&page=1`,setrolecategories)
     fetchdataleft(`${baseurl}/seniority-levels?pagination=on&limit_per_page=10&page=1`,setsenioritylevels)
     fetchdataleft(`${baseurl}/employment-types?pagination=on&limit_per_page=10&page=1`,setemployertypes)
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="section-jobs pt-19 bg-gray-50">
          <div className="parent">
            <div className="topp h-[200px] py-[40px] text-white bg-[#00694B]">
              <div className="container px-4 md:px-10 lg:px-20 xl:px-30 mx-auto flex items-center justify-between">
                <h1 className="text-[18px] font-[600]">jobs</h1>
                <div className="flex items-center text-[18px] font-[600]">
                  <Link to="/" className="cursor-pointer">
                    home
                  </Link>
                  <img src={arrow} alt="" className="text-white" />
                  <p>jobs</p>
                </div>
              </div>
            </div>

            <div className="container px-4 md:px-10 lg:px-20 xl:px-30 mx-auto">
              <div className="top-search py-[16px] rounded-[16px] bg-white shadow-sm mx-auto -mt-[70px] relative z-10">
                <div className="search-bar w-full max-w-[1000px] mx-auto px-4">
                  <div className="bg-[#F1F3F5] rounded-xl xl:rounded-[100px] p-2 flex flex-col xl:flex-row items-center gap-2 shadow-inner">
                    <div className="flex-grow flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-gray-100 focus-within:border-green-600 transition-all w-full">
                      <FiSearch
                        className="text-gray-400 cursor-pointer hover:text-green-600"
                        onClick={handleSearch}
                      />
                      <input
                        type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        onKeyDown={handleSearch}
                        placeholder="Enter Skills, Designations or Company Names"
                        className="text-gray-700 bg-transparent placeholder:text-gray-400 focus:outline-none text-sm font-medium w-full"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full xl:w-auto">
                      <div
                        className={`relative flex items-center gap-2.5 bg-white text-gray-400 px-5 py-3 rounded-full cursor-pointer hover:bg-gray-50 transition min-w-full xl:min-w-[140px] xl:max-w-[180px]`}
                      >
                        <select
                          className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full"
                          onChange={(e) => {
                            const text =
                              e.target.options[e.target.selectedIndex].text;
                            setSelectedCountry(text);
                            setSelectedCountryId(e.target.value);
                          }}
                          defaultValue=""
                        >
                          <option value="">By country</option>
                          {countryData?.data?.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name?.en || country.name}
                            </option>
                          ))}
                        </select>
                        <span className="text-sm flex-1 pr-1 truncate">
                          {selectedCountry}
                        </span>
                        <MdKeyboardArrowDown
                          className="text-gray-500 ml-auto shrink-0"
                          size={18}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSearch}
                      className="bg-[#00694B] text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-black transition-colors cursor-pointer min-w-full xl:min-w-[120px]"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Popular Searches */}
                <div className="px-4 xl:px-[24px]">
                  <div className="container mx-auto py-5 flex flex-col xl:flex-row items-start gap-5">
                    <h2 className="text-[18px] font-bold text-[#1A1A1A] pt-2 whitespace-nowrap">
                      Popular Searches
                    </h2>
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap gap-x-[12px] gap-y-3 items-center">
                        {searchData?.data?.slice(0, 4).map((job, index) => (
                          <Link to="/jobdetails" key={index}>
                            <NavLink
                              to={`/jobs?search=${encodeURIComponent(job.word)}`}
                              className="flex items-center gap-2 px-[12px] py-[8px] border border-[#E5E7EB] rounded-full hover:bg-gray-50 cursor-pointer transition"
                            >
                              <FiSearch className="text-gray-400" />
                              <span className="text-[14px] font-medium text-[#00694B]">
                                {job?.word}
                              </span>
                            </NavLink>
                          </Link>
                        ))}
                      </div>
                      <div
                        className={`grid transition-all duration-500 ease-in-out ${showAll ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"}`}
                      >
                        <div className="overflow-hidden">
                          <div className="flex flex-wrap gap-x-3 gap-y-3 items-center ">
                            {searchData?.data?.slice(4).map((job, index) => (
                              <Link
                                to={`/jobs?search=${encodeURIComponent(job.word)}`}
                                key={index}
                              >
                                <div className="flex items-center gap-2 px-[12px] py-[8px] border border-[#E5E7EB] rounded-full hover:bg-gray-50 cursor-pointer transition">
                                  <FiSearch className="text-gray-400" />
                                  <span className="text-[14px] font-medium text-[#00694B]">
                                    {job?.word}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 xl:ml-4 cursor-pointer shrink-0 pt-1">
                      <div className="flex items-center gap-1 p-2 rounded-full transition duration-500 hover:bg-[#00694B] group">
                        <button
                          onClick={() => setShowAll(!showAll)}
                          className="text-[14px] font-bold text-[#00694B] group-hover:text-white cursor-pointer transition-all"
                        >
                          {showAll ? "Show Less" : "Show More"}
                        </button>
                        <BsArrowUpRightCircle
                          className={`size-[16px] text-[#00694B] group-hover:text-white cursor-pointer transition-transform duration-500 ${showAll ? "rotate-45" : "rotate-0"}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="details flex flex-col xl:flex-row items-start mb-[20px] justify-center gap-[24px] p-4 md:p-[24px] bg-white shadow-md rounded-[16px] mt-[24px]">
                {/* details-left */}
                <div className="details-left bg-white border-[1px] border-[#0D0D0D14] w-full xl:w-[350px] 2xl:w-[375px] rounded-[16px] shadow-sm xl:sticky xl:top-5">
                  {/* Professional License */}
                  <div className="item-1 my-[16px] mx-[16px]">
                    <div
                      onClick={() => toggleSection("professional")}
                      className="title flex items-center justify-between border-b-[1px] border-[#0D0D0D14] pb-[11px] cursor-pointer"
                    >
                      <p className="text-[14px] font-[600]">Professional License</p>
                      <img src={openSections.professional ? arrowup : arrowdowen} alt="" />
                    </div>
                    <div className={`grid transition-all duration-500 ease-in-out ${openSections.professional ? "grid-rows-[1fr] mt-[16px]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden space-y-[16px]">
                        {[{ id: "with_medical_license", label: "With Medical License", value: "with_medical_license" }, { id: "without_medical_license", label: "Without Medical License", value: "without_medical_license" }].map((item) => (
                          <label key={item.id} className="flex items-center gap-[10px] cursor-pointer">
                            <input type="radio" name="professional" checked={prfessionalLicense === item.value} onChange={() => setProfessionalLicense(item.value)} className="w-5 h-5 accent-[#00694B] cursor-pointer" />
                            <span className="text-[14px]">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Role Categories */}
                  <div className="item-3 my-[16px] mx-[16px]">
                    <div onClick={() => toggleSection("roleCategories")} className="title flex items-center justify-between border-b-[1px] border-[#0D0D0D14] pb-[11px] cursor-pointer">
                      <p className="text-[14px] font-[600]">Role Categories</p>
                      <img src={openSections.roleCategories ? arrowup : arrowdowen} alt="" />
                    </div>
                    <div className={`grid transition-all duration-500 ease-in-out ${openSections.roleCategories ? "grid-rows-[1fr] mt-[16px]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden space-y-[16px] max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {rolecategories?.data?.map((item) => (
                          <label key={item.id} className="flex items-center gap-[10px] cursor-pointer">
                            <input type="checkbox" checked={checked[item.id] || false} onChange={() => {
                              setRoleCategories(prev => prev.includes(item.value) ? prev.filter(i => i !== item.value) : [...prev, item.value]);
                              setChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                            }} className="w-5 h-5 accent-[#00694B] cursor-pointer rounded" />
                            <span className="text-[14px]">{item.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Seniority Level */}
                  <div className="item-seniority my-[16px] mx-[16px]">
                    <div onClick={() => toggleSection("seniority")} className="title flex items-center justify-between border-b-[1px] border-[#0D0D0D14] pb-[11px] cursor-pointer">
                      <p className="text-[14px] font-[600]">Seniority Level</p>
                      <img src={openSections.seniority ? arrowup : arrowdowen} alt="" />
                    </div>
                    <div className={`grid transition-all duration-500 ease-in-out ${openSections.seniority ? "grid-rows-[1fr] mt-[16px]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden space-y-[16px]">
                        {senioritylevels?.data?.map((item) => (
                          <label key={item.id} className="flex items-center gap-[10px] cursor-pointer">
                            <input type="checkbox" checked={!!checked[item.id]} onChange={() => {
                              setSeniority_levels(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]);
                              setChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                            }} className="w-5 h-5 accent-[#00694B] cursor-pointer rounded" />
                            <span className="text-[14px]">{item.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Domain */}
                  <div className="item-3 my-[16px] mx-[16px]">
                    <div onClick={() => toggleSection("Domain")} className="title flex items-center justify-between border-b-[1px] border-[#0D0D0D14] pb-[11px] cursor-pointer">
                      <p className="text-[14px] font-[600]">Domain</p>
                      <img src={openSections.Domain ? arrowup : arrowdowen} alt="" />
                    </div>
                    <div className={`grid transition-all duration-500 ease-in-out ${openSections.Domain ? "grid-rows-[1fr] mt-[16px]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden space-y-[16px]">
                        {domains?.data?.map((item) => (
                          <label key={item.id} className="flex items-center gap-[10px] cursor-pointer">
                            <input type="checkbox" checked={checked[item.id] || false} onChange={() => {
                              setDomin(prev => prev.includes(item.value) ? prev.filter(i => i !== item.value) : [...prev, item.value]);
                              setChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                            }} className="w-5 h-5 accent-[#00694B] cursor-pointer rounded" />
                            <span className="text-[14px]">{item.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="item-3 my-[16px] mx-[16px]">
                    <div onClick={() => toggleSection("ExperienceLevel")} className="title flex items-center justify-between border-b-[1px] border-[#0D0D0D14] pb-[11px] cursor-pointer">
                      <p className="text-[14px] font-[600]">Experience</p>
                      <img src={openSections.ExperienceLevel ? arrowup : arrowdowen} alt="" />
                    </div>
                    <div className={`grid transition-all duration-500 ease-in-out ${openSections.ExperienceLevel ? "grid-rows-[1fr] mt-[16px]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden space-y-[16px]">
                        {experiencess?.data?.map((item) => (
                          <label key={item.id} className="flex items-center gap-[10px] cursor-pointer">
                            <input type="checkbox" checked={checked[item.id] || false} onChange={() => {
                              setExperiences(prev => prev.includes(item.value) ? prev.filter(i => i !== item.value) : [...prev, item.value]);
                              setChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                            }} className="w-5 h-5 accent-[#00694B] cursor-pointer rounded" />
                            <span className="text-[14px]">{item.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="item-3 my-[16px] mx-[16px]">
                    <div onClick={() => toggleSection("Availability")} className="title flex items-center justify-between border-b-[1px] border-[#0D0D0D14] pb-[11px] cursor-pointer">
                      <p className="text-[14px] font-[600]">Availability</p>
                      <img src={openSections.Availability ? arrowup : arrowdowen} alt="" />
                    </div>
                    <div className={`grid transition-all duration-500 ease-in-out ${openSections.Availability ? "grid-rows-[1fr] mt-[16px]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden space-y-[16px]">
                        {availabilitiess?.data?.map((item) => (
                          <label key={item.id} className="flex items-center gap-[10px] cursor-pointer">
                            <input type="checkbox" checked={!!checked[item.id]} onChange={() => {
                              setAvailabilities(prev => prev.includes(item.value) ? prev.filter(i => i !== item.value) : [...prev, item.value]);
                              setChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                            }} className="w-5 h-5 accent-[#00694B] cursor-pointer rounded" />
                            <span className="text-[14px]">{item.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="item-4 my-[16px] mx-[16px]">
                    <div onClick={() => toggleSection("Category")} className="title flex items-center justify-between border-b-[1px] border-[#0D0D0D14] pb-[11px] cursor-pointer">
                      <p className="text-[14px] font-[600]">Category</p>
                      <img src={openSections.Category ? arrowup : arrowdowen} alt="" />
                    </div>
                    <div className={`grid transition-all duration-500 ease-in-out ${openSections.Category ? "grid-rows-[1fr] mt-[16px]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden space-y-[16px]">
                        {categoriess?.data?.map((item) => (
                          <label key={item.id} className="flex items-center gap-[10px] cursor-pointer">
                            <input type="checkbox" checked={!!checked[item.id]} onChange={() => {
                              setCategories(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]);
                              setChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                            }} className="w-5 h-5 accent-[#00694B] cursor-pointer rounded" />
                            <span className="text-[14px]">{item.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Employment type */}
                  <div className="item-3 my-[16px] mx-[16px]">
                    <div onClick={() => toggleSection("EmployerType")} className="title flex items-center justify-between border-b-[1px] border-[#0D0D0D14] pb-[11px] cursor-pointer">
                      <p className="text-[14px] font-[600]">Employment type</p>
                      <img src={openSections.EmployerType ? arrowup : arrowdowen} alt="" />
                    </div>
                    <div className={`grid transition-all duration-500 ease-in-out ${openSections.EmployerType ? "grid-rows-[1fr] mt-[16px]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden space-y-[16px]">
                        {employertypes?.data?.map((item) => (
                          <label key={item.id} className="flex items-center gap-[10px] cursor-pointer">
                            <input type="checkbox" checked={checked[item.id] || false} onChange={() => {
                              setemployment_types(prev => prev.includes(item.value) ? prev.filter(i => i !== item.value) : [...prev, item.value]);
                              setChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                            }} className="w-5 h-5 accent-[#00694B] cursor-pointer rounded" />
                            <span className="text-[14px]">{item.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="item-8 my-[16px] mx-[16px]">
                    <div onClick={() => toggleSection("salary")} className="title flex items-center justify-between border-b-[1px] border-[#0D0D0D59] pb-[11px] cursor-pointer">
                      <p className="text-[14px] font-[600]">Salary Range</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-[500]">Salary Type</span>
                        <img src={openSections.salary ? arrowup : arrowdowen} alt="" />
                      </div>
                    </div>
                    <div className={`grid transition-all duration-500 ease-in-out ${openSections.salary ? "grid-rows-[1fr] mt-[12px]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <div className="min-max flex flex-col sm:flex-row items-center justify-between w-full gap-[8px]">
                          <div className="min w-full">
                            <label className="font-[600] text-[14px] mb-[4px]">min</label>
                            <input type="number" className="h-[42px] bg-[#0D0D0D0D] rounded-[12px] border-[1px] border-[#0D0D0D14] py-[12px] px-[16px] w-full" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} placeholder="100" />
                          </div>
                          <div className="max w-full">
                            <label className="font-[600] text-[14px] mb-[4px]">max</label>
                            <input type="number" className="h-[42px] bg-[#0D0D0D0D] rounded-[12px] border-[1px] border-[#0D0D0D14] py-[12px] px-[16px] w-full" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} placeholder="500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-[12px] my-[16px] mx-[16px]">
                    <button onClick={handleApplyFilter} className="flex-1 rounded-[999px] bg-[#047857] text-white py-[16px] px-[32px] hover:bg-black transition duration-500 cursor-pointer font-[600] w-full">Apply Filters</button>
                    <button onClick={handleReset} className="rounded-[999px] border border-gray-200 bg-white text-[#0D0D0D] py-[16px] px-[24px] hover:bg-gray-100 transition duration-500 cursor-pointer font-[600] w-full">Reset</button>
                  </div>
                </div>

                {/* details-right */}
                <div className="details-right flex-1 flex flex-col mb-[141px] gap-[24px] w-full">
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 gap-[24px]">
                    {jobsData?.data?.map((job) => (
                      <div key={job.id} className="card border-[2px] hover:border-[#047857] duration-500 cursor-pointer bg-white rounded-[16px] border-[1px] border-[#0D0D0D14] shadow-lg p-[16px] flex flex-col h-full">
                        <div className="title flex justify-between items-start mb-[16px]">
                          <div className="flex gap-[14px] flex-1 min-w-0">
                            <img src={job.company?.image} alt="logo" className="w-[48px] h-[48px] rounded-full object-cover shrink-0" />
                            <div className="min-w-0 flex-1">
                              <h3 className="font-[600] truncate text-[16px]">{job.title || job.job_title?.title}</h3>
                              <p className="text-gray-500 text-[14px] truncate">{job.company?.name}</p>
                              <p className="text-[#F59E0B] text-[12px]">{job.created_at}</p>
                            </div>
                          </div>
                        </div>
                        <div className="info flex flex-wrap items-center gap-[12px] text-[13px] mb-[16px]">
                          <div className="flex items-center gap-1 shrink-0">
                            <img src={loction} alt="" className="w-4 h-4" />
                            <span className="truncate max-w-[120px]">{job.city?.name}, {job.country?.name}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <img src={jobtype} alt="" className="w-4 h-4" />
                            <span className="truncate max-w-[120px]">{job.specialty?.title}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 font-bold text-[#047857]">
                            <img src={currencydollar} alt="" className="w-4 h-4" />
                            <span>{Number(job.min_salary) > 0 || Number(job.max_salary) > 0 ? `${job.min_salary}$ - ${job.max_salary}$` : "Not specified"}</span>
                          </div>
                        </div>
                        <div className="tags flex flex-wrap gap-[6px] mb-[16px]">
                          {job.experience?.title && <span className="rounded-[999px] py-[4px] px-[12px] bg-[#0D0D0D0D] text-[11px] font-medium">{job.experience.title}</span>}
                          {job.employment_type?.title && <span className="rounded-[999px] py-[4px] px-[12px] bg-[#0D0D0D0D] text-[11px] font-medium">{job.employment_type.title}</span>}
                          {job.category?.title && <span className="rounded-[999px] py-[4px] px-[12px] bg-[#0D0D0D0D] text-[11px] font-medium">{job.category.title}</span>}
                        </div>
                        <p className="text-gray-600 text-[14px] mb-[16px] line-clamp-2 break-words flex-grow" dangerouslySetInnerHTML={{ __html: job.description }} />
                        <div className="border-t border-[#0D0D0D14] pt-[16px] flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                          <div className="flex gap-[8px] w-full sm:w-auto">
                            <NavLink to={'/Savedjobs'}>
                             <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 rounded-[999px] py-[8px] px-[16px] bg-[#0D0D0D0D] border border-[#0D0D0D14] text-[13px] font-semibold">
                              <img src={save} alt="" className="w-4 h-4" /> Save
                            </button>

                            </NavLink>
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 rounded-[999px] py-[8px] px-[16px] bg-[#0D0D0D0D] border border-[#0D0D0D14] text-[13px] font-semibold">
                              <img src={share} alt="" className="w-4 h-4" /> Share
                            </button>
                          </div>
                          <NavLink to={`/job/${job.id}`} className="w-full sm:w-auto bg-[#047857] text-white rounded-[999px] flex items-center justify-center gap-2 py-[8px] px-[20px] hover:bg-black transition text-[14px] font-bold">
                            View <img src={arrowright} alt="" className="brightness-0 invert w-3 h-3" />
                          </NavLink>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Pagination */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-40 cursor-pointer hover:bg-gray-50 transition">
                      <MdKeyboardArrowLeft size={20} className="text-gray-500" />
                    </button>
                    <div className="flex flex-wrap gap-2">
                      {[...Array(jobsData?.last_page || 0)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                          <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-[500] transition-all cursor-pointer ${currentPage === pageNum ? "bg-[#00694B] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, jobsData?.last_page || 1))} disabled={currentPage === jobsData?.last_page} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-40 cursor-pointer hover:bg-gray-50 transition">
                      <MdKeyboardArrowRight size={20} className="text-gray-500" />
                    </button>
                    <p className="text-gray-500 text-[14px] w-full text-center md:w-auto">Show {jobsData?.from || 0} - {jobsData?.to || 0} from {jobsData?.total || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </motion.div>
    </>
  );
}

export default Jobs;
