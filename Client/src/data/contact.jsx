import {
  CalendarClock,
  ChevronDown,
  Headset,
  MapPin,
  MoveRight,
  Truck,
  Phone,
  Clock
} from "lucide-react";

export const contactData = [
  {
    icon: <MapPin/>,
    title: "Flagship Store",
    detail: (
      <>
        42 Bond Street, Mayfair <br />
        London, W1S 2SB <br />
        United Kingdom
      </>
    ),
  },
  {
    icon: <Phone/> ,
    title: "Connect",
    detail: (
      <>
        +44 (0) 20 7946 0123 <br />
        concierge@luxestore.com
      </>
    ),
  },
  {
    icon: <Clock />,
    title: "Hours",
    detail: (
      <>
        Mon – Sat: 10:00 – 19:00 <br />
        Sun: 12:00 – 18:00
      </>
    ),
  },
];


export const cardData = [
  {
    icon: <Headset />,
    title: "FAQ Center",
    desc: "Find instant answers to common questions regarding orders, shipping, and luxury care.",
  },
  {
    icon: <Truck />,
    title: "Track Order",
    desc: "Want to check the status of your recent purchase? Enter your details for real-time tracking.",
  },
  {
    icon: <CalendarClock />,
    title: "Private Viewing",
    desc: "Schedule a dedicated consultation with our stylists in our London or New York ateliers.",
  },
];