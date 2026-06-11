import { useOutletContext } from "react-router-dom";
import { InputField } from "./components/InputField";

export const SettingsViewPage = () => {
  const { user } = useOutletContext();

  return (
    <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
      <div>
        <h2 className="text-xl font-black uppercase tracking-widest mb-2">
          Account Settings
        </h2>
        <p className="text-slate-400 text-sm">
          Update your public profile and contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField label="Display Name" value={user.name} />
        <InputField label="Email Address" value={user.email} />
        <InputField label="Phone Number" value={user.phone} />
        <div className="flex items-end">
          <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};