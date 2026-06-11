import React from "react";
import { contactData } from "../../../data/contact.jsx";

const ContactCard = () => {
  return (
    <div className="space-y-10">
      {contactData.map((item, index) => (
        <div key={index} className="flex items-start space-x-6">
          <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-full shrink-0 border border-slate-100">
            <span className="material-symbols-outlined text-slate-900">
              {item.icon}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {item.title}
            </h3>

            <p className="text-slate-500 leading-relaxed text-sm">
              {item.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactCard;
