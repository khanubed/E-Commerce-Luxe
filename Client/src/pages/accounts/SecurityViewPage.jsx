import { Lock, Fingerprint, Bell } from "lucide-react";
import { SecurityOption } from "./components/SecurityOption";

export const SecurityViewPage = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-black uppercase tracking-widest">
      Security Settings
    </h2>
    <div className="grid gap-4">
      <SecurityOption
        icon={<Lock size={18} />}
        title="Password"
        desc="Last changed 3 months ago"
        action="Change"
      />
      <SecurityOption
        icon={<Fingerprint size={18} />}
        title="2-Step Verification"
        desc="Currently Enabled"
        action="Manage"
      />
      <SecurityOption
        icon={<Bell size={18} />}
        title="Login Alerts"
        desc="Email notifications for new logins"
        action="Config"
      />
    </div>
  </div>
);
