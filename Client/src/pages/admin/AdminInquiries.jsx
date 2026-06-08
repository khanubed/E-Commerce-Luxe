import React, { useState } from "react";
import { useGetInquiriesQuery, useUpdateInquiryMutation } from "../../services/inquiryApi.js";
import { Mail, CheckCircle2, AlertCircle, Clock, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const AdminInquiries = () => {
  const { data: payload, isLoading, error } = useGetInquiriesQuery();
  const [updateInquiry, { isLoading: isUpdating }] = useUpdateInquiryMutation();
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [notes, setNotes] = useState("");

  const inquiries = payload?.inquiries || [];

  const handleSelect = (inquiry) => {
    setSelectedInquiry(inquiry);
    setNotes(inquiry.adminNotes || "");
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateInquiry({ id, status: newStatus, adminNotes: notes }).unwrap();
      toast.success(`Inquiry marked as ${newStatus}`);
      setSelectedInquiry((prev) => (prev?._id === id ? { ...prev, status: newStatus } : prev));
    } catch (err) {
      toast.error("Failed to update status module.");
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    try {
      await updateInquiry({ id: selectedInquiry._id, adminNotes: notes }).unwrap();
      toast.success("Internal concierge log entries saved.");
    } catch (err) {
      toast.error("Failed to commit updates.");
    }
  };

  if (isLoading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-slate-400" />
    </div>
  );

  return (
    <div className="bg-white min-h-screen p-8 font-sans text-slate-900">
      {/* Editorial Section Header */}
      <div className="border-b border-slate-100 pb-8 mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-2 block">
          Control Center
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Communications Matrix</h1>
        <p className="text-sm text-slate-400 mt-2">Manage private guest relations requests and concierge inquiries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Table List View */}
        <div className="lg:col-span-7 border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Sender</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Topic</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">View</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-12 text-center text-sm text-slate-400 uppercase tracking-widest">
                      Inbox completely clear.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inquiry) => (
                    <tr 
                      key={inquiry._id} 
                      className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer ${selectedInquiry?._id === inquiry._id ? "bg-amber-50/30" : ""}`}
                      onClick={() => handleSelect(inquiry)}
                    >
                      <td className="p-4">
                        <p className="text-xs font-bold uppercase tracking-tight text-slate-900">{inquiry.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{inquiry.email}</p>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-bold tracking-tight text-slate-700 bg-slate-100 px-2.5 py-1 uppercase text-[10px]">
                          {inquiry.subject}
                        </span>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={inquiry.status} />
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-slate-400 hover:text-slate-900 p-2 transition-colors">
                          <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Interactive Workspace View Drawer */}
        <div className="lg:col-span-5">
          {selectedInquiry ? (
            <div className="border border-slate-900 p-8 space-y-8 bg-white">
              <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-amber-600 mb-1">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </p>
                  <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">{selectedInquiry.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{selectedInquiry.email}</p>
                </div>
                <StatusBadge status={selectedInquiry.status} />
              </div>

              {/* Message Payload Area */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inquiry Body</h4>
                <div className="bg-slate-50 p-6 border border-slate-100 text-xs font-medium leading-relaxed text-slate-700 whitespace-pre-wrap">
                  "{selectedInquiry.message}"
                </div>
              </div>

              {/* Internal Concierge Actions Module */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Concierge Log Notes</h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-4 border border-slate-200 focus:border-slate-900 text-xs font-medium outline-none min-h-[100px] resize-none"
                  placeholder="Append structural update metrics, resolution details, or tracking codes here..."
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={isUpdating}
                  className="w-full py-3 bg-slate-950 text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  Commit Log Notes
                </button>
              </div>

              {/* Lifecycle Stage Switch Layout */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Advance Workflow Step</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedInquiry.status !== "in-progress" && (
                    <button
                      onClick={() => handleUpdateStatus(selectedInquiry._id, "in-progress")}
                      className="flex items-center justify-center gap-2 border border-amber-600/30 text-amber-700 py-3 text-[10px] font-black uppercase tracking-widest bg-amber-50/20 hover:bg-amber-50 transition-colors"
                    >
                      <Clock size={12} /> Claim Workflow
                    </button>
                  )}
                  {selectedInquiry.status !== "resolved" && (
                    <button
                      onClick={() => handleUpdateStatus(selectedInquiry._id, "resolved")}
                      className="col-span-2 flex items-center justify-center gap-2 bg-emerald-950 text-white py-3 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-900 transition-colors"
                    >
                      <CheckCircle2 size={12} /> Close & Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-slate-200 p-16 text-center text-slate-400 rounded-xl">
              <Mail className="mx-auto mb-4 opacity-30" size={24} />
              <p className="text-xs font-black uppercase tracking-widest">Select an Active Ticket</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-[240px] mx-auto">
                Click on any communications log row to pull up full message details and actions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Internal Context Badge Component
const StatusBadge = ({ status }) => {
  const layoutStyles = {
    "unread": "bg-red-50 text-red-700 border-red-100",
    "in-progress": "bg-amber-50 text-amber-700 border-amber-100",
    "resolved": "bg-emerald-50 text-emerald-700 border-emerald-100"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider border rounded-full ${layoutStyles[status] || layoutStyles.unread}`}>
      <span className="w-1 h-1 rounded-full bg-currentColor shrink-0" />
      {status}
    </span>
  );
};

export default AdminInquiries;