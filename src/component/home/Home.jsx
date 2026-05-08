import React, { useEffect, useRef } from "react";
import "./Home.css";
import { FiSearch } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
// //////////////////////////////////////
import { motion } from "framer-motion";
import { FaSearch, FaStar } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { LuRocket } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import frame from "../../../public/imge/Frame.png";
import { CiSearch } from "react-icons/ci";
import img1 from "../../../public/imge/image (1).png";
import img2 from "../../../public/imge/image (2).png";
import img3 from "../../../public/imge/image (3).png";
import img4 from "../../../public/imge/image (4).png";
import img5 from "../../../public/imge/image (5).png";
import img6 from "../../../public/imge/image (6).png";
import img7 from "../../../public/imge/image (7).png";
import img8 from "../../../public/imge/image (8).png";
import img9 from "../../../public/imge/image (9).png";
import img10 from "../../../public/imge/image (10).png";
import img11 from "../../../public/imge/image (11).png";
import img12 from "../../../public/imge/image (12).png";
import img13 from "../../../public/imge/image (13).png";
import img15 from "../../../public/imge/image (15).png";
import img16 from "../../../public/imge/image (16).png";
import img17 from "../../../public/imge/image (17).png";
import logo from "../../../public/imge/16 [Converted].svg";
import rate from "../../../public/imge/rate.svg";
import frame2 from "../../../public/imge/Frame 2147227945.svg";
import frame3 from "../../../public/imge/Frame 2147227945 (1).svg";
import star2 from "../../../public/imge/2.svg";
import explor from "../../../public/imge/explore.svg";
import { CiTimer } from "react-icons/ci";
import { CiWarning } from "react-icons/ci";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HiPlus, HiMinus } from "react-icons/hi";
import top from "../../../public/imge/top.png";
import cont2 from "../../../public/imge/Container (1).png";
import robothand from "../../../public/imge/robot(3).png";
import Footer from "../footer/Footer";
import { Link, Links, NavLink, useSearchParams } from "react-router-dom";
 
function Home() {

const [searchdata, setsearchdata] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const suggestionsRef = useRef(null);
  const swiperRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("search") || "");
  const [selectedCountry, setSelectedCountry] = useState("By country");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("By Domain");
  const [selectedDomainId, setSelectedDomainId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("By Category");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

 

  const dropdownStyle = "flex items-center gap-2.5 bg-white text-gray-400 px-5 py-3 rounded-full cursor-pointer hover:bg-gray-50 transition min-w-[140px]";

   const FaqItem = ({ item }) => (
    <div className="bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[16px] mb-4">
      <button
        onClick={() => setOpenIndex(openIndex === item.id ? null : item.id)}
        className="w-full flex items-center justify-between p-4 cursor-pointer"
      >
        <p className="text-[18px] md:text-[21px] font-[600] text-left text-[#0D0D0D]">
          {item.question}
        </p>
        <motion.div
          animate={{ rotate: openIndex === item.id ? 180 : 0 }}
          className="shrink-0 ml-4 w-[32px] h-[32px] rounded-full bg-black flex items-center justify-center"
        >
          {openIndex === item.id ? <HiMinus className="text-white" /> : <HiPlus className="text-white" />}
        </motion.div>
      </button>
      <AnimatePresence>
        {openIndex === item.id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-[16px] text-[#0D0D0DA6]">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // --- 3. API Functions ---
  async function fetchdatasearch(searchStr = "") {
    try {
      const res = await fetch(`https://admin.joocare.com/api/searches?pagination=on&limit_per_page=10&page=1&lang=ar&search=${searchStr}`);
      const dataa = await res.json();
      setsearchdata(dataa);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }


    const [searchData, setSearchData] = useState(null);
  
  async function fetchdatasearch() {
    try {
      const response = await fetch(
        "https://admin.joocare.com/api/searches?pagination=on&limit_per_page=10&page=1",
       {
          headers: { "Accept-Language": "en" },
        },);
      const data = await response.json();
      setSearchData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchdatasearch();
  }, []);


  async function fetchdatahome() {
    try {
      const response = await fetch("https://admin.joocare.com/api/home", {
        headers: { "Accept-Language": "en" },
      });
      const data = await response.json();
      setHomeData(data);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  }

  useEffect(() => {
    fetchdatahome();
    fetchdatasearch();
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
     
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchdatasearch(term);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [term]);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setSearchParams({ search: term, country: selectedCountryId, domain: selectedDomainId, category: selectedCategoryId });
      setShowSuggestions(false);
    }
    
         }   // {faqitem}
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="section-home mt-50 pb-20">
          <div className="container  mx-auto  px-30  ">
            <div className="content text-center ">

              <h1 className=" w-[780px]  mx-auto">
                {homeData?.data.home_section?.title}

                <span> Powered by AI</span>
              </h1>
              <p className="mt-6 w-[780px] mx-auto">
                {homeData?.data.home_section?.description}
              </p>
            </div>
            <div className="search-bar p-5 mt-20 relative">
      <div className="bg-[#F1F3F5] rounded-[100px] p-2 flex items-center gap-2 shadow-inner">
        
        {/* input*/}
        <div className="flex-grow flex items-center gap-3 bg-white px-5 py-3 rounded-full relative" ref={suggestionsRef}>
          <FiSearch className="text-gray-400 cursor-pointer" onClick={handleSearch} />
          <input
            type="text"
            value={term}
            onChange={(e) => {
                setTerm(e.target.value);
                setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleSearch}
            placeholder="Enter Skills, Designations or Company Names"
            className="w-full text-gray-700 bg-transparent focus:outline-none text-sm font-medium"
          />

           
        </div>

        <div className="flex items-center gap-2">
          {/* By Country */}
          <div className={`relative ${dropdownStyle}`}>
            <select
              className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full"
              onChange={(e) => {
                setSelectedCountry(e.target.options[e.target.selectedIndex].text);
                setSelectedCountryId(e.target.value);
              }}
            >
              <option value="">By country</option>
              {homeData?.data?.home_section?.countries?.map((c) => (
                <option key={c.id} value={c.id}>{c.name.en}</option>
              ))}
            </select>
            <span className="text-sm flex-1 pr-1 truncate">{selectedCountry}</span>
            <MdKeyboardArrowDown className="text-gray-500" size={18} />
          </div>

          {/* By Domain */}
          <div className={`relative ${dropdownStyle}`}>
            <select
              className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full"
              onChange={(e) => {
                setSelectedDomain(e.target.options[e.target.selectedIndex].text);
                setSelectedDomainId(e.target.value);
              }}
            >
              <option value="">By Domain</option>
              {homeData?.data?.home_section?.domains?.map((d) => (
                <option key={d.id} value={d.id}>{d.title.en}</option>
              ))}
            </select>
            <span className="text-sm flex-1 pr-1 truncate">{selectedDomain}</span>
            <MdKeyboardArrowDown className="text-gray-500" size={18} />
          </div>

          {/* By Category */}
          <div className={`relative ${dropdownStyle}`}>
            <select
              className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full"
              onChange={(e) => {
                setSelectedCategory(e.target.options[e.target.selectedIndex].text);
                setSelectedCategoryId(e.target.value);
              }}
            >
              <option value="">By Category</option>
              {homeData?.data?.home_section?.categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.title.en}</option>
              ))}
            </select>
            <span className="text-sm flex-1 pr-1 truncate">{selectedCategory}</span>
            <MdKeyboardArrowDown className="text-gray-500" size={18} />
          </div>
        </div>

        <Link
          to={`/jobs?search=${(term)}&country=${selectedCountryId}&domain=${selectedDomainId}&category=${selectedCategoryId}`}
          className="bg-[#00694B] text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-black transition-colors text-center"
        >
          Find Jobs
        </Link>
      </div>
    </div>  
              <div className="px-[24px]">
                             <div className="container mx-auto py-5 flex items-start gap-5">
                               <h2 className="text-[18px] font-bold text-[#1A1A1A] pt-2 whitespace-nowrap">
                                 Popular Searches
                               </h2>
                               <div className="flex-1">
                                 <div className="flex flex-wrap gap-x-[12px] gap-y-3 items-center">
                                   {searchData?.data?.slice(0, 4).map((job, index) => (
                                     <Link to="/jobdetails" key={index}>
                                       <NavLink
                                         to={`/jobs?search=${(job.word)}`} 
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
                               <div className="flex items-center gap-2 ml-4 cursor-pointer shrink-0  pt-1">
                                 <div className="flex items-center gap-1 p-2 rounded-full transition duration-500 hover:bg-[#00694B] group">
                                   <button
                                     onClick={() => setShowAll(!showAll)}
                                     className="text-[14px] font-bold text-[#00694B] group-hover:text-white cursor-pointer transition-all"
                                   >
                                     {showAll ? "Show Less" : "Show More"}
                                   </button>
                                   <BsArrowUpRightCircle
                                     className={`size-[16px] text-[#00694B] group-hover:text-white  cursor-pointer transition-transform duration-500 ${showAll ? "rotate-45" : "rotate-0"}`}
                                   />
                                 </div>
                               </div>
                             </div>
                           </div>
          </div>
        </div>
        <div className="section-about pt-32 pb-20  ">
          <div className="container mx-auto px-30">
            <div className="content">
              <div className="title-1 flex items-center justify-center mx-auto gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                <img src={star2} alt="" />
                <p className="text-[#1C2628] text-[16px] font-[400]">
                  How It Works
                </p>
              </div>
              <div className="title-2  text-center pt-5 ">
                <h1>
                  A Structured, AI-Driven Hiring <br></br> Process in 3 Clear
                  Steps
                </h1>
              </div>
              <div className="container-small flex justify-center  gap-12">
                <div className="item1 flex flex-col items-center justify-center gap-[16px]  mt-16">
                  <div className="icon-box p-4 bg-[#00694B] rounded-full text-[#fff] text-3xl">
                    <TbTargetArrow className="   rotate-[180deg]  w-[28px]" />
                  </div>

                  <div className="title   text-center ">
                    <h2 className="p-[12px] text-[#0D0D0D] text-2xl font-bold">
                      Precision Profiling
                    </h2>
                    <p className="text-[16px] text-[#0D0D0DA6] ">
                      {
                        homeData?.data?.how_it_works_section?.steps[0]
                          ?.description
                      }
                    </p>
                  </div>
                </div>

                <div className="item2 flex flex-col items-center justify-center text-center gap-[16px]  mt-16">
                  <div className="icon-box p-4 bg-[#00694B] rounded-full text-[#fff] text-3xl">
                    <HiOutlineSparkles className="  rotate-[180deg]   w-[28px]" />
                  </div>

                  <div className="title">
                    <h2 className="p-[12px] text-[#0D0D0D] text-2xl font-bold">
                      Intelligent Matching
                    </h2>
                    <p className="text-[16px] text-[#0D0D0DA6] ">
                      {
                        homeData?.data?.how_it_works_section?.steps[1]
                          ?.description
                      }
                    </p>
                  </div>
                </div>

                <div className="item3 flex flex-col items-center text-center justify-center gap-[16px] mt-16">
                  <div className="icon-box p-4 bg-[#00694B] rounded-full text-[#fff] text-3xl">
                    <LuRocket className="w-[28px]" />
                  </div>

                  <div className="title">
                    <h2 className="p-[12px] text-[#0D0D0D] text-2 xl font-bold">
                      Verified Placement
                    </h2>
                    <p className="text-[16px] text-[#0D0D0DA6] leading-relaxed">
                      {
                        homeData?.data?.how_it_works_section?.steps[2]
                          ?.description
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame  ">
            <div className="content pt-32 pb-20 ">
              <div className="title-1 flex justify-center items-center gap-2 border border-[#2E90A61A] mx-auto w-fit bg-[#12121205] px-4 py-1 rounded-full">
                <img src={star2} alt="" />
                <p className="text-[#1C2628] font-medium text-sm">
                  Why Joocare?
                </p>
              </div>
              <div className="title-2 text-center pt-5 mb-16"></div>

              <div className="whycontainer relative flex  md:flex-row m w-full  overflow-hidden   ">
                <div className="w-full md:w-1/2 bg-[#E6EAED] p-8 md:p-20 flex justify-end items-center  ">
                  <div className="max-w-[560px] w-full ">
                    <div className=" mb-8">
                      <span className="text-[#00694B ] font-bold text-sm flex items-center gap-2 border border-[#2E90A61A]  w-fit bg-[#00694B]/5 rounded-full px-4 py-2">
                        <FaStar size={12} className="text-[#00694B]" /> The
                        Legacy Model
                      </span>
                    </div>

                    <h2 className="text-[21px] font-bold text-[#0D0D0D] mb-[24px] leading-tight    ">
                      {homeData?.data?.why_joocare?.legacy_model_title}
                    </h2>

                    <p className="text-[gray] mb-[100px] font-[400] ">
                      {homeData?.data?.why_joocare?.legacy_model_description}
                    </p>

                    <div className="space-y-10 ">
                      <div className="flex ">
                        <div className="w-[48px] h-[48px] p-[10px] bg-[#00694B] rounded-full flex items-center justify-center text-white text-[20px] shadow-2xl">
                          <img
                            src={
                              homeData?.data?.why_joocare?.legacy_models?.[0]
                                ?.icon
                            }
                            alt=""
                          />
                        </div>
                        <div>
                          <h4 className="text-[21px] font-bold text-[#0D0D0D] font-[600] ml-[24px] mb-2 leading-tight">
                            {
                              homeData?.data?.why_joocare?.legacy_models?.[0]
                                ?.title
                            }
                          </h4>
                          <p className="text-sm text-[#0D0D0D]/60 font-[400]  leading-relaxed ml-[24px]">
                            {
                              homeData?.data?.why_joocare?.legacy_models?.[0]
                                ?.description
                            }
                          </p>
                        </div>
                      </div>

                      <div className="flex ">
                        <div className="w-[48px] h-[48px] p-[10px] bg-[#00694B] rounded-full flex items-center justify-center text-white text-[20px] shadow-2xl">
                          <img
                            src={
                              homeData?.data?.why_joocare?.legacy_models?.[1]
                                ?.icon
                            }
                            alt=""
                          />
                        </div>
                        <div>
                          <h4 className="text-[21px] font-bold text-[#0D0D0D] font-[600] ml-[24px] mb-2 leading-tight">
                            {
                              homeData?.data?.why_joocare?.legacy_models?.[1]
                                ?.title
                            }
                          </h4>
                          <p className="text-sm text-[#0D0D0D]/60 font-[400]  leading-relaxed ml-[24px]">
                            {
                              homeData?.data?.why_joocare?.legacy_models?.[1]
                                ?.description
                            }
                          </p>
                        </div>
                      </div>

                      <div className="flex  ">
                        <div className="w-[48px] h-[48px] p-[10px]  bg-[#00694B] rounded-full flex items-center justify-center text-white text-[20px] shadow-2xl">
                          <img
                            src={
                              homeData?.data?.why_joocare?.legacy_models?.[2]
                                ?.icon
                            }
                            alt=""
                          />
                        </div>
                        <div>
                          <h4 className="text-[21px] font-bold text-[#0D0D0D] font-[600] ml-[24px] mb-2 leading-tight">
                            {
                              homeData?.data?.why_joocare?.legacy_models?.[2]
                                ?.title
                            }
                          </h4>
                          <p className="text-sm text-[#0D0D0D]/60 font-[400]  leading-relaxed ml-[24px]">
                            {
                              homeData?.data?.why_joocare?.legacy_models?.[2]
                                ?.description
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 bg-[#00694B] p-10 md:p-20 flex justify-start items-center text-white relative  ">
                  <div className=" ml-15">
                    <div className="mb-6">
                      <span className="text-white font-medium text-sm flex items-center gap-2 border border-white/20 w-fit bg-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                        <FaStar size={10} className="text-white" /> The Joocare
                        Model
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold mb-6 leading-tight">
                      {homeData?.data?.why_joocare?.joocare_model_title}
                    </h2>
                    <p className="text-white/80 text-base mb-12 leading-relaxed max-w-[550px]">
                      {homeData?.data?.why_joocare?.joocare_model_description}
                    </p>

                    <div className="relative space-y-10 ">
                      <div className="absolute left-[24px] top-4 bottom-4 w-[1px] bg-white/30 "></div>

                      <div className="relative flex items-start gap-8 z-10">
                        <div className="flex items-center justify-center  w-[48px] h-[48px] rounded-full bg-[#1DA31E4D] border border-[#1DA31E4D] text-white font-bold shrink-0 shadow-lg">
                          1
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">
                            {
                              homeData?.data?.why_joocare?.joocare_models?.[0]
                                ?.title
                            }
                          </h4>
                          <p className="text-sm text-white/70 leading-relaxed max-w-md">
                            {
                              homeData?.data?.why_joocare?.joocare_models?.[0]
                                ?.description
                            }
                          </p>
                        </div>
                      </div>

                      <div className="relative flex items-start gap-8 z-10">
                        <div className="flex items-center justify-center w-[48px] h-[48px] rounded-full bg-[#1DA31E4D] border border-[#1DA31E4D] text-white font-bold shrink-0 shadow-lg">
                          2
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">
                            {
                              homeData?.data?.why_joocare?.joocare_models?.[1]
                                ?.title
                            }
                          </h4>
                          <p className="text-sm text-white/70 leading-relaxed max-w-md">
                            {
                              homeData?.data?.why_joocare?.joocare_models?.[1]
                                ?.description
                            }
                          </p>
                        </div>
                      </div>

                      <div className="relative flex items-start gap-8 z-10">
                        <div className="flex items-center justify-center w-[48px] h-[48px] rounded-full bg-[#1DA31E4D] border border-[#1DA31E4D] text-white font-bold shrink-0 shadow-lg">
                          3
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">
                            {
                              homeData?.data?.why_joocare?.joocare_models?.[2]
                                ?.title
                            }
                          </h4>
                          <p className="text-sm text-white/70 leading-relaxed max-w-md">
                            {
                              homeData?.data?.why_joocare?.joocare_models?.[2]
                                ?.description
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute  top-80 left-[50%]  -translate-x-1/2 -translate-y-1/2  ">
                  <img
                    src={robothand}
                    alt="robothand"
                    className="robothand h-[40px]  translate-x-10"
                  />
                </div>

                <div className="absolute z-10 top-80 left-[50%] -translate-x-1/2 -translate-y-1/2">
                  <img
                    src={cont2}
                    alt="con2"
                    className="cont2 h-[100px] translate-x-5 "
                  />
                </div>
                <div className="top absolute  top-1/2 left-[50%] -translate-x-15 -translate-y-1/2">
                  <img
                    src={top}
                    alt="top"
                    className="  translate-x-8 w-auto max-w-none"
                  />
                </div>
                <div className="frame absolute  top-80 left-[49.5%]  -translate-x-30 -translate-y-1/2">
                  <img src={frame} alt="frame" className=" w-[150px]  " />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="TopEmployers  pb-20">
          <div className="container mx-auto px-30 ">
            <div className="content ">
              <div className="title-1 flex items-center justify-center mx-auto gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                <img src={star2} alt="" />
                <p className="text-[#1C2628] text-[16px] font-[400]">
                  Top Employers
                </p>
              </div>
              <div className="title-2  text-center mt-[16px] mb-[24px] ">
                <h1 className="">{homeData?.data?.top_employers?.title}</h1>
              </div>
              <div className="logos">
                <div className="grid  grid-cols-2 lg:grid-cols-8 gap-6   mb-[80px]">
                  {homeData?.data?.top_employers?.top_employers?.map(
                    (employer) => (
                      <img
                        key={employer.id}
                        className="pl-[12px] pb-[12px]   h-[60px] object-contain"
                        src={employer.image}
                        alt={`Employer ${employer.id}`}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Proven bg-[#F8FAFA] py-20">
          <div className="container mx-auto px-30">
            <div className="content flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="details max-w-[500px]">
                <div className="title-1 flex items-center  gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                  <FaStar className="text-[#00694B] text-[16px]" />
                  <p className="text-[#1C2628] text-[16px] font-[400]">
                    Proven Hiring Impact
                  </p>
                </div>

                <h1 className="text-[40px] font-bold text-[#1C2628] leading-[1.2] mb-6">
                  {homeData?.data?.proven_hiring_impact?.title}
                </h1>

                <p className="text-[#667085] text-[18px] leading-relaxed mb-10">
                  {homeData?.data?.proven_hiring_impact?.description}
                </p>

                <button className="flex items-center gap-3 bg-[#00694B] hover:bg-black transition-all duration-300 cursor-pointer px-8 py-4 rounded-full text-white font-semibold">
                  <img src={explor} alt="" className="w-5" />
                  <span>let's get started</span>
                </button>
              </div>

              <div className="cards grid grid-cols-2 gap-[16px] w-full ">
                {/* Card 1 */}
                <div className="bg-[#EBEEF0] border border-[#DDE2E5] rounded-[16px] p-8 flex flex-col   items-center justify-center ">
                  <h2 className="text-[32px] font-extrabold text-[#1C2628] mb-2">
                    <span className="text-[#00694B]">+</span>500,000
                  </h2>
                  <p className="text-[#667085] text-[14px] font-medium whitespace-nowrap">
                    Verified Healthcare Professionals
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-[#EBEEF0] border border-[#DDE2E5] rounded-[16px] p-8 flex flex-col   items-center justify-center ">
                  <h2 className="text-[32px] font-extrabold text-[#1C2628] mb-2">
                    <span className="text-[#00694B]">+</span>100
                  </h2>
                  <p className="text-[#667085] text-[14px] font-medium whitespace-nowrap">
                    Active Job opportunities
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-[#EBEEF0] border border-[#DDE2E5] rounded-[16px] p-8 flex flex-col   items-center justify-center ">
                  <h2 className="text-[32px] font-extrabold text-[#1C2628] mb-2">
                    <span className="text-[#00694B]">+</span>500
                  </h2>
                  <p className="text-[#667085] text-[14px] font-medium whitespace-nowrap">
                    Healthcare Specializations Covered
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-[#EBEEF0] border border-[#DDE2E5] rounded-[16px] p-8 flex flex-col   items-center justify-center ">
                  <h2 className="text-[32px] font-extrabold text-[#1C2628] mb-2">
                    98<span className="text-[#00694B]">%</span>
                  </h2>
                  <p className="text-[#667085] text-[14px] font-medium whitespace-nowrap">
                    Hiring Success Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="recent mt-[80px] mb-[80px]">
          <div className="container mx-auto px-30">
            <div className="content">
              <div className="title flex justify-between items-center">
                <div className="title-left">
                  <div className="title-1 flex items-center gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                    <img src={star2} alt="" />
                    <p className="text-[#1C2628] text-[16px] font-[400]">
                      Recent Jobs
                    </p>
                  </div>
                  <h1 className="font-[600] text-[28px] mb-[21px] w-[433px]">
                    {homeData?.data?.recent_jobs?.title}
                  </h1>
                </div>
                <div className="right">
                  <div className="flex items-center gap-2 ml-4 cursor-pointer shrink-0">
                    <div className="flex items-center gap-1 p-2 rounded-full transition duration-500 hover:bg-[#00694B] hover:text-white">
                      <NavLink
                        to={"jobs"}
                        className="font-bold text-gray-[#0D0D0DA6] text-[16px] font-[400]"
                      >
                        Explore More
                      </NavLink>

                      <BsArrowUpRightCircle className="text-gray-[#0D0D0DA6] size-[28px]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="register mb-[80px]">
                <div className="content flex">
                  <div className="contanier grid grid-cols-4 gap-[16px]">
                    {homeData?.data?.recent_jobs?.jobs?.map((job) => (
                      <Link to={`job/${job.id}`}>
                        <div
                        key={job.id}
                        className="flex bg-[#e0dddd1f] border-[2px] border-transparent mb-[16px] hover:shadow-2xl duration-500 hover:border-green-700 hover:cursor-pointer p-[16px] rounded-[16px]">
                        <div className="logo  flex-shrink-0">
                          <img
                            src={job.company?.image || logo}
                            alt={job.company?.name}
                            className="w-[48px] h-[48px] rounded-full object-cover"
                          />
                        </div>
                        <div className="details ml-[8px] overflow-hidden">
                          <h2 className="text-[18px] font-[600] line-clamp-1">
                            {job.title || job.job_title?.title}
                          </h2>
                          <p className="font-[600] text-[14px]">
                            {job.company?.name}{" "}
                            <span className="text-[gray] font-[400] text-[13px]">
                              {job.city?.name}, {job.country?.name}
                            </span>
                          </p>

                          <div className="flex items-center gap-[4px] mt-[8px] flex-wrap">
                            <span className="bg-[#0D0D0D0D] text-[gray] py-[4px] px-[8px] rounded-[8px] text-[12px]">
                              {job.employment_type?.title}
                            </span>
                            <p className="bg-[#0D0D0D0D] text-[gray] py-[4px] px-[6px] rounded-[8px] text-[12px]">
                              {job.current_status?.created_at}
                            </p>
                          </div>
                        </div>
                      </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Professionals mt-[80px] mb-[80px] bg-[#00694B0A]">
          <div className="container mx-auto px-30">
            <div className="title flex justify-between items-center pt-[132px] mb-[50px]">
              <div className="title-left">
                <div className="title-1 flex items-center  gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                  <img src={star2} alt="" />
                  <p className="text-[#1C2628] text-[16px] font-[400]">
                    What Professionals Say
                  </p>
                </div>
                <h1 className="font-[600] text-[28px] w-[526px] mb-[21px]">
                  {homeData?.data?.rates?.title}
                </h1>
              </div>
              <div className="right ">
                <div className="flex gap-[8px]  ">
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="w-[48px] h-[48px] text-[24px] text-2xl cursor-pointer rounded-full border border-[#0D0D0DA6]  hover:bg-gray-100 transition"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="w-[48px] h-[48px] text-[24px] text-2xl cursor-pointer rounded-full border border-[#0D0D0DA6]  hover:bg-gray-100 transition"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={1}
              spaceBetween={30}
              breakpoints={{
                1024: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
              }}
            >
              {homeData?.data?.rates?.rates?.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="bg-white p-6 rounded-tl-[30px] rounded-br-[30px] shadow-sm border border-gray-100 mb-[132px]">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="text-[21px] font-semibold text-[#1C2628]">
                        {testimonial.name}
                      </h2>
                      <div className="flex gap-1 text-lg">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={
                              i < Number(testimonial.rate)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-[14px] text-gray-400 mb-4">
                      {testimonial.date}
                    </p>
                    <p className="text-[#4D4D4D] text-[16px] leading-relaxed">
                      {testimonial.comment}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="faq mb-[165px]">
          <div className="container  px-30">
            <div>
              <div className="title-1 flex items-center justify-center mx-auto gap-2  border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                <img src={star2} alt="" />
                <p className="text-[#1C2628] text-[16px] font-[400]">FAQ</p>
              </div>
              <div className="title-2 font-[600] text-center text-[28px] mt-[16px] mb-[32px]">
                <h1>{homeData?.data?.faq?.title}</h1>
              </div>
            </div>
            <div className="subscribe flex gap-[16px]">
              <div className="grid md:grid-cols-2  gap-[16px]">
                <div className="flex flex-col  gap-[16px]">
                  {homeData?.data?.faqs?.faqs
                    ?.filter((_, index) => index % 2 === 0)
                    .map((item) => (
                      <FaqItem
                        key={item.id}
                        item={item}
                        openIndex={openIndex}
                        setOpenIndex={setOpenIndex}
                      />
                    ))}
                </div>

                <div className="flex flex-col gap-[16px]">
                  {homeData?.data?.faqs?.faqs
                    ?.filter((_, index) => index % 2 !== 0)
                    .map((item) => (
                      <FaqItem
                        key={item.id}
                        item={item}
                        openIndex={openIndex}
                        setOpenIndex={setOpenIndex}
                        
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
 



}

export default Home;
