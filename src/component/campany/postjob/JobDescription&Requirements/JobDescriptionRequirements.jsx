import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";  

import {   
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "../../../../components/ui/combobox";
import { Controller, useForm } from "react-hook-form";

function JobDescriptionRequirements() {
 const [skills, setSkills] = useState([]);
const [description, setDescription] = useState("");
const [currentStep, setCurrentStep] = useState(2);

const navigate = useNavigate();

const {
  register,
  handleSubmit,
  control,
  watch,  
  formState: { errors },
} = useForm({
  mode: "onChange",
  reValidateMode: "onChange",
  defaultValues: {
    description: "We are looking for a qualified doctor with strong experience  We are looking for a qualified doctor with strong experience  We are looking for a qualified doctor with strong experience.We are looking for a qualified doctor with strong experience  We are looking for a qualified doctor with strong experience  We are looking for a qualified doctor with strong experience.We are looking for a qualified doctor with strong experience  We are looking for a qualified doctor with strong experience  We are looking for a qualified doctor with strong experience.We are looking for a qualified doctor with strong experience  We are looking for a qualified doctor with strong experience  We are looking for a qualified doctor with strong experience",
    skills: [],
  }
});

async function fetchSkills() {
  try {
    const response = await fetch("https://joocare.nami-tec.com/api/skills?pagination=on&limit_per_page=10&page=1");
    const data = await response.json();
    
    if (data && data.data) {
      setSkills(data);
    }
  } catch (error) {
    console.error("Error fetching skills:", error);
  }
}

useEffect(() => {
  fetchSkills();
}, []);

const onSubmit = (data) => {
  const token = localStorage.getItem('company_token');
  const jobId = localStorage.getItem('current_job_id') || "44";
  const formData = new FormData();
  
  formData.append("description", description);

  if (Array.isArray(data.skills)) {  
    data.skills.forEach((id) => {
      formData.append("skills[]", id);
    });
  }

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Accept-Language': 'en',
      'Content-Type': 'multipart/form-data' 
    }
  };

  axios
    .post(`https://joocare.nami-tec.com/api/company/jobs-step-two/${jobId}`, formData, config)
    .then((res) => {
        toast.success("Account setup successful", {
          position: "top-right",
          style: { background: "#E6F4EA", color: "#1E8E3E", borderRadius: "10px" },
        });
        navigate(`/JobPreview/${jobId}`);
    })
    .catch((err) => {
      console.error(err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      }
    });
};

  return (
    <>
      <div className="bg-[#F8F9FA] min-h-screen py-[40px] px-[20px] font-sans">
        
        {/* Main Card */}
        <div className="max-w-[1000px] mx-auto bg-white rounded-[24px] border border-[#F0F0F0] p-[40px] shadow-sm relative">
          
          {/* Top Header Section with Progress and Save as draft */}
          <div className="flex items-start justify-between mb-[80px] w-full bg-white gap-6">
            
            <div className="flex items-center justify-between relative flex-1  bg-white">
              {/* Base Gray Line */}
              <div
                className="absolute top-[16px] left-[20px] right-[20px] h-[5px] bg-[#EAEAEA] rounded-full z-0"
                style={{ transform: "translateY(-50%)" }}
              ></div>

              {/* Active Green Line */}
              <div
                className="absolute top-[16px] h-[5px] bg-[#00694B] rounded-full z-0 transition-all duration-500 ease-in-out"
                style={{
                  transform: "translateY(-50%)",
                  width:
                    currentStep === 1
                      ? "0%"
                      : currentStep === 2
                        ? "50%"
                        : "100%",
                }}
              ></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold border-[4px] border-white transition-colors duration-300 shadow-sm
                    ${currentStep >= 1 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  1
                </div>
                <p
                  className={`text-[13px] mt-4 absolute top-8 whitespace-nowrap tracking-wide transition-all duration-300 
                    ${currentStep >= 1 ? "font-semibold text-[#111111]" : "font-medium text-[#B0B0B0]"}`}
                >
                  Basic Details
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold border-[4px] border-white transition-colors duration-300 shadow-sm
                    ${currentStep >= 2 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  2
                </div>
                <p
                  className={`text-[13px] mt-4 absolute top-8 whitespace-nowrap tracking-wide transition-all duration-300 
                    ${currentStep >= 2 ? "font-semibold text-[#111111]" : "font-medium text-[#B0B0B0]"}`}
                >
                  Requirements & Content
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold border-[4px] border-white transition-colors duration-300 shadow-sm
                    ${currentStep >= 3 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  3
                </div>
                <p
                  className={`text-[13px] mt-4 absolute top-8 whitespace-nowrap tracking-wide transition-all duration-300 
                    ${currentStep >= 3 ? "font-semibold text-[#111111]" : "font-medium text-[#B0B0B0]"}`}
                >
                  Preview
                </p>
              </div>
            </div>

            {/* Save as draft Button */}
            <button 
              type="button" 
              className="h-[44px] px-6 rounded-full border cursor-pointer border-[#152126] text-[#152126] text-[13px] font-semibold bg-white hover:bg-gray-50 transition-all whitespace-nowrap shadow-sm"
            >
              Save as draft
            </button>
          </div>

          {/* Job Description Title */}
          <div className="mb-3">
            <label className="text-[14px] font-bold text-[#111111]">
              Job Description
            </label>
          </div>

          {/* Custom Editor Container */}
          <div className="overflow-hidden rounded-[12px] border border-[#EBEBEB] bg-[#FAFAFA] custom-quill-container">
            <ReactQuill
              theme="snow"
              id="description"
              value={description}
              onChange={setDescription}
              placeholder="Write job description..."
              modules={{
                toolbar: [
                  ["undo", "redo"],
                  [{ 'header': 'Normal text' }], 
                  ["bold", "italic", "underline", "strike"],
                  ["blockquote", "code-block"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
            />
          </div>  

          <a 
            href="#learn-more" 
            className="text-[13px] font-medium text-[#0066cc] hover:underline block mt-3 transition-all pl-2"
          >
            Learn more about our benefits
          </a>

          {/* Skills Input Section */}
          <div className="mt-[28px]">
            <label htmlFor="skills" className="text-[14px] font-bold text-[#111111] mb-2 block">
              Skills
            </label>
            
            <Controller
              control={control}
              name="skills"
              rules={{ required: "Skills are required" }}
              render={({ field: { onChange, value } }) => {
                const currentValues = Array.isArray(value) ? value.map(String) : [];
                return (
                  <Combobox multiple value={currentValues} onValueChange={(val) => onChange(val)}>
                    <div className="relative w-full min-h-[48px] bg-white border border-[#0D0D0D14] rounded-full flex items-center pr-10 pl-2 py-1">
                      <ComboboxChips className="flex flex-wrap gap-1 border-none bg-transparent p-0 shadow-none focus-within:ring-0 w-full">
                        {currentValues.map((v) => {
                          const cert = skills?.data?.find(c => String(c.id) === v);
                          return (
                            <ComboboxChip key={v} value={v} className="flex items-center gap-1 bg-gray-100 text-gray-800 rounded-full px-2.5 py-0.5 text-xs font-medium border border-gray-200">
                              {cert?.title || v}
                            </ComboboxChip>
                          );
                        })}
                        <ComboboxChipsInput placeholder={currentValues.length === 0 ? "Select" : ""} className="text-sm text-gray-700 placeholder-[#A3A3A3] ml-2 flex-1" />
                      </ComboboxChips>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ComboboxTrigger className="border-none bg-transparent p-0 m-0 [&_svg]:text-[#A3A3A3]" />
                      </div>
                    </div>
                    <ComboboxContent className="z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-1 mt-1">
                      <ComboboxList>
                        {skills?.data?.map((certification) => (
                          <ComboboxItem key={certification.id} value={String(certification.id)} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl cursor-pointer outline-none">
                            {certification.title}
                          </ComboboxItem>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                );
              }}
            />
            {errors.skills && <span className="text-red-500 text-xs mt-1 px-1 block">{errors.skills.message}</span>}
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-[40px]">
            <button
              type="button"
              onClick={() => navigate("/postjob")}
              className="w-[180px] h-[50px] rounded-full border cursor-pointer border-[#EAEAEA] bg-white text-[#152126] text-[15px] font-bold hover:bg-gray-50 transition-all shadow-sm"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-[180px] h-[50px] rounded-full cursor-pointer bg-[#1C2427] text-white text-[15px] font-bold hover:bg-[#253034] transition-all shadow-sm"
            >
              Next
            </button>
          </div>

        </div>
      </div>

      <style>
        {`
          .custom-quill-container .ql-toolbar.ql-snow {
            background-color: #FAFAFA !important;
            border: none !important;
            border-bottom: 1px solid #EBEBEB !important;
            padding: 12px 16px !important;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            align-items: center;
          }
          .custom-quill-container .ql-container.ql-snow {
            background-color: #FFFFFF !important;
            border: none !important;
            min-height: 340px;
          }
          .custom-quill-container .ql-editor {
            min-height: 340px;
            font-size: 14px;
            color: #333333;
            line-height: 1.7;
            padding: 24px !important;
          }
          .custom-quill-container .ql-editor.ql-blank::before {
            color: #B8B8B8;
            font-style: normal;
            left: 24px;
            font-size: 14px;
          }
          .ql-snow .ql-stroke {
            stroke: #555555 !important;
            stroke-width: 1.8 !important;
          }
          .ql-snow .ql-fill {
            fill: #555555 !important;
          }
          .ql-snow .ql-picker {
            color: #555555 !important;
            font-weight: 500;
          }
          .ql-snow.ql-toolbar button:hover .ql-stroke,
          .ql-snow .ql-picker-label:hover .ql-stroke {
            stroke: #00694B !important;
          }
          .ql-snow.ql-toolbar button:hover .ql-fill,
          .ql-snow .ql-picker-label:hover .ql-fill {
            fill: #00694B !important;
          }
          .ql-snow.ql-toolbar button.ql-active .ql-stroke,
          .ql-snow.ql-toolbar button.ql-active .ql-fill {
            stroke: #00694B !important;
            fill: #00694B !important;
          }
        `}
      </style>
    </>
  );
}

export default JobDescriptionRequirements;