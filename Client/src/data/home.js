import heroImage from "../assets/images/hero2.png";

import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export const heroData = {
  backgroundImage: {
    src: heroImage,
    alt: "A premium high-fashion editorial shot featuring a model in a minimalist architectural space.",
  },
  title: "Elevate Your Style",
  description:
    "Discover a curated collection where minimalist design meets exceptional craftsmanship. Experience the new standard of modern elegance.",
  primaryBtn: {
    text: "Shop Now",
    link: "#",
  },
  secondaryBtn: {
    text: "Explore Lookbook",
    link: "#",
  },
};

export const categorySection = {
  title: "Curated Categories",
  subtitle: "Explore our collections designed for your lifestyle.",
  categories: [
    {
      id: 1,
      to:"/shop?category=mobile-accessories&page=1",
      title: "Electronics",
      count: "342 Products",
      image:
        "https://cdn.trendhunterstatic.com/thumbs/513/q-acoustics-5000-series.jpeg",
      alt: "Close-up of high-end minimalist electronic gadgets.",
    },
    {
      id: 2,
      to: "/shop?category=mens-shirts&page=1",
      title: "Fashion",
      count: "1,200 Products",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDFp5deo7NgqK8lWhZzytNsIUpf5DC4ml4kXpDGfaeo7MePm6ucKsaqpk_2UFfg99kvmRf5UzS3PuGLUxtQxRAnjOrgrRKEAWbDxMa4K5_yxmgbMMgeeUCQ0TkNlecvomzmPnBV8QrcXaW3P2D078VY_sepYv5KsYBAVaoYT1MpZ01Wxr-YP2tgd-5lGrRBb4bqsTtIT7pLLSGal1vENPlj7pcQp_xYSj2lPRVUehUw_c2t7oIoj_oIaO8dB2HFw9CLy37zc18a8qc",
      alt: "Curated capsule wardrobe on a minimalist rack.",
    },
    {
      id: 3,
      to:'http://localhost:5173/shop?category=home-decoration&page=1',
      title: "Home Decor",
      count: "850 Products",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB6E_nPS-IWUR6sFwHv4QyTa-vM2PhYB445jDZssSnMSe4AzZcxjSG580ApAJt0UqcTNko1syK2R6fRniHmRgaop6GOg64631JwbQDbXXOVq1YzT1_Jn0r_57cBChsdZ9b0so8mPdnxccBcaCADPoiTg36r9u9H9qQZo2Z1siV-uuva_RpMPtBnjOXOdhzIAK26FmSiTN8UKu4vuSu5jiGaYy4TIgul3zu-8XtdzrPkzf17YRndrNIC-c4Ze9oY16jtMiEBE-Z076s",
      alt: "Modern living room featuring high-end home decor.",
    },
    {
      id: 4,
      to: 'http://localhost:5173/shop?category=mens-watches&page=1',
      title: "Accessories",
      count: "560 Products",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-Rfb7KHAtn_1TqT-DKXN35vy2wL8sA7MG586rgsQjLeA4IUqiqYXQPpVtGAs5IxjyqFiN5AlM1gYfVAbex2TpExQh9tf05qJpzKcQl8LOmsnjY_JCyC-WSt0_T-B0DEuylliSfhZz2-aKAo2wTfCu2B4ol_AOJX_NjJ4eAZO_DB3b7_O1uublDGCcfCEN3ic-p0K6fzSsfLF8gtolpwaAiE1IAYDtDjXhegaWnBxr3pguDYGIE2mCgJW2Av6bahZatvRcbLqq6Q",
      alt: "Luxury accessories including handbag and sunglasses.",
    },
  ],
};

export const dealsSection = {
  title: "Deals of the Day",
  description: "Limited time offers on our most-loved pieces.",
  targetDate: "2026-12-31T23:59:59",
  products: [
    {
      id: 1,
      category: "Audio",
      name: "Acoustic Pro Headphones",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBztmNhcFKUGRZQKhZ7-PS0hLFDtBmFNxcz-0S7jFlfeRdBQ_2yg9my3eYM6j3i_Ff5YogjJYGuhnVjlLvbkU4rggnd0mX5iiL_651ILUcdqnCSO5lvfLBWnT4DMQdhQKC8lsolvc1qnHc3TOrpi7AS4q2U625a9XwgqqR8WcFy-HyppZh12F92rPl8Q2OtYDFLpaLqzRRJ8bBp9xtTh33Tjrz3QNwcZhnHd2KmDPcoi_5l5El5cB1OGTxx9kVa5U95ib1zCDhdV7w",
      price: 299,
      originalPrice: 375,
      discountBadge: "20% OFF",
    },
    {
      id: 2,
      category: "Footwear",
      name: "Velocity Runner X",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCROp5eEYSwMwfDz9Y54uZwjF8FEVxNlgoqqPVz3U9VqHM7mhxIV_u0Z78WviiKCUvXQEorGI21WCKMcQH_lg-ex672Pc130cwoTQ_f14XsLGjaKxahIJYx2oU-oL_FSYuNoyAVR8F1iQWc0b46zlpIAIFGKZ_X9OUyL9brAVzz6O-yEn0UvSc5XEHwETwjUADNuSYhdA5zLCIKxBKkyajnVmloAdirBKV-N_tmHKUzcTemyXR6Q4TulVRcz9TtpyrBABu4EU8dTmI",
      price: 120,
      originalPrice: 150,
      discountBadge: "20% OFF",
    },
    {
      id: 3,
      category: "Photography",
      name: "InstaCam Retro Edition",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAKhgHLxDNT1oh1_MueVGbc1ZOgKXOw6gIZ2hFydjrXdKrlmUsK4-FTY0GsI6lTB90M5pW7O90loFovdkSQ1u9gejlf3UAaTv1faIyCuVpxLUREoObVf9_RAaIe5x6xxtZwuYRvvoLGNlVOMnVhkSyVmPg_jeFmhgNoYlgnW90NTW1qVn9NoW-wf98pHB9PQhgVJpvKzJv2ltN-jKWpZKejErc8Uw-iy56u9-eA7GY2EmiTe9KmI8vsNBSMU6OgWmWUkz853oI6o3o",
      price: 160,
      originalPrice: 200,
      discountBadge: "20% OFF",
    },
    {
      id: 4,
      category: "Accessories",
      name: "Minimalist Azure Watch",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJjJmrV7wWam-Yo9Iu-XS8uMaALFZUTUUxPPtO6zU8XU2wQf86ciSwH69FB893GhrndYnF_iTT6zs3oOO9OlBzSQl3Uof_0Yr9OEAFtXxsE_CK4lRfH8_R7N0NlSchXbhVf4X1f-iePPSB78oK7Uh8NlMUpTRCIRZeR8VXawrIRtvO9lVSi1pFtZ_r582G_-O_OwCkgk3Iul9n_VPb7oLWn-BI6fWRfP46SmwHPV66NQYXzYSGkFpdC7tw5kYF_6HOHUDlftgXtIQ",
      price: 440,
      originalPrice: 550,
      discountBadge: "20% OFF",
    },
  ],
};

export const offersSection = [
  {
    id: 1,
    tag: "Limited Edition",
    title: "Flash Sale Event",
    description:
      "Unlock an extra 30% off our seasonal favorites. For 24 hours only.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBCKuCnlsk7tDR73e9JutJUUSxWWSOHHuxJr1dHKsKJkCyzF51Ub2SHHMM2HvfdXmJwz7zojQqhDwwzwavMClZOALziJnEuu6BrG-WwwJJjdupliTtvldoyPMMsN0Bo9h0m6UW4FSWY9icGJWWc3ki6PABmYfr3rsinZe0MlYBsyLZLzZ4A4ErQqpfkghjcJPYseVLENAw2PZuK7KPG9ZVEudyE4AnJ0yTE6r8IG6fr505PwJ0QKQ9w7sn-lrqaQK08ivHJAIlTR_Q",
    buttonText: "Claim Offer",
    overlayClass: "bg-slate-900/40",
    buttonClass: "bg-white text-slate-900 hover:bg-slate-100",
    tagClass: "text-secondary-fixed",
  },
  {
    id: 2,
    tag: "Summer Duo",
    title: "Buy 1 Get 1",
    description:
      "Share the luxury. Purchase any selected item and gift the second one for free.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_OoNTeXSgAfe8NyG1C1o11pZTw3R-MUKZ2KZhHV6eNxYxOuHfRG1v2wEgMAswpwUN5Mu7zXtDGjkBLZP89kYnr2GzqcZBSQfXT8ZR8jjjGKKQhnzyT3fDk2qGMYJYz0dVvpQEmZ5-tvPXPDXXzkkwbXMQndglD19EuRP0Pb5y-buL18L-ZNXkMiycc0QNeneKJ5aRYfsg-sHlrQzjGxMrdvoYQt9FjdxViACRptLNf0jse5le6LXL1AuhmtS0v9RHlPk0WET7aqw",
    buttonText: "Shop Bundle",
    overlayClass: "bg-secondary-container/40",
    buttonClass: "bg-slate-900 text-white hover:bg-slate-800",
    tagClass: "text-white",
  },
];

export const statsData = [
  {
    id: 1,
    value: "50k+",
    label: "Happy Customers",
  },
  {
    id: 2,
    value: "100k+",
    label: "Orders Completed",
  },
  {
    id: 3,
    value: "15+",
    label: "Global Awards",
  },
  {
    id: 4,
    value: "99.9%",
    label: "Positive Ratings",
  },
];

export const testimonialsData = {
  title: "Voices of Luxe",
  description:
    "See why thousands of customers choose LuxeStore for their lifestyle essentials.",
  reviews: [
    {
      id: 1,
      name: "Sarah Jenkins",
      status: "Verified Buyer",
      rating: 5,
      text: "The attention to detail and packaging was beyond my expectations. Truly a luxury experience from browsing to unboxing.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCbViPkWOR1PBY4r45BkPTEQnjcWfnSed-_DU5iM8HTrQHMPymVS-1-yoL7-riwqNbc0rXHWUWE75D4i6W6OiismbvnKe9VB-r_f5gAta0DyW9upLOvvyaP97vUJ1V7Xml5N5hroPzagK51s26k4w_-BkoJdLfOj_b0Kmz4Hx9FRKzulrFaWuLos9eNuzrr53hPwDg3DypoeVfAwLwZ3O-05NDbGRS8UxmZJ4ZP8i8wnuTUiC9kcAb9zgHx9KRZMAoE7zws1cmZzqc",
    },
    {
      id: 2,
      name: "David Miller",
      status: "Premium Member",
      rating: 5,
      text: "LuxeStore has become my go-to for quality essentials. The customer service is fast, responsive, and incredibly helpful.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDN2U4sL04-UmNaM_xzd8DawtlIQmQocQhcfPl1b96bFVV3Z4j6h9mHE0ho8A7jnvu8RWHurwJyokDZCNC9flHCUKXXaHRgQfcO8DKs7Sg4HJ6YekVsLcec57zkpa4cJrqVe_N2-l7q7KmxgfySCOtAQYu15y9WEpadSPFWIjxvhfLEsivLWGt_kGmCSi2R5EcGPQIwDG3MF3-L7DOKPy7rf3LrQ3hxfD6mh2M8NCtOz6nNKfRAJJb8tHGoewOfdJw8M2Q6lO56CWI",
      featured: true, // We can use this to add the unique border you had on the 2nd card
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      status: "Verified Buyer",
      rating: 4.5,
      text: "I love the curated selection. It saves me so much time knowing that everything on this site is already vetted for quality.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_-vuhIe3T-rS3dQDA1QoQaE06Expt1IhgWZh64e76VUwQmCatMaRIBbEjsSdDhE574dtWEVAlhdVi9QejeF-CtXHhiTMGr1JpmP2GVvuWQNR7bwX8AYyhvartmdcTooGKyt0nIX-oY1ZKvXWa9tWq5CyfF-P086RSvWYU0kNMlnWNcQrnpYvIDWgUbz5a3aSSUFB3QbiFE0E09mMi8ZG6maNrhoEXJhnj4aj1kvH_87s22IfKVyk8O4TIRzB77lDqnN7N8p4hBas",
    },
  ],
};

export const faqData = [
  {
    id: 1,
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for 1-2 day delivery.",
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day hassle-free return policy on all unworn and unused items. Simply visit our returns portal to start your request.",
  },
  {
    id: 3,
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to over 50 countries worldwide. International shipping times and costs vary depending on the destination.",
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer:
      "Once your order ships, you will receive an email with a tracking number and a link to our tracking page.",
  },
];

// data.js
export const footerData = {
  brand: {
    name: "LuxeStore",
    description: "Curating the finest lifestyle essentials for the modern home. Quality, elegance, and sustainability in every piece.",
    socials: [
      // { id: 1, name: "Facebook", href: "#", icon: faFacebookF },
      { id: 2, name: "Instagram", href: "https://www.instagram.com/ubyd_.pathan/", icon: faInstagram },
      { id: 3, name: "Twitter", href: "https://x.com/home", icon: faXTwitter },
      { id: 4, name: "LinkedIn", href: "https://www.linkedin.com/in/khanubed/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B3kgL%2FdGOSViETofLiG9Mqg%3D%3D", icon: faLinkedinIn },
    ],
  },
  links: [
    {
      title: "Shop",
      items: [
        { name: "New Arrivals", path: "/shop" },
        { name: "Best Sellers", path: "/shop" },
        { name: "Home Decor", path: "/shop" },
        { name: "Lifestyle", path: "/shop" },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "About Us", path: "/about" },
        { name: "Sustainability", path: "/sustainability" },
        { name: "Careers", path: "/career" },
        { name: "Press", path: "/press" },
      ],
    },
    {
      title: "Support",
      items: [
        { name: "Shipping Policy", path: "/shipping-policy" },
        { name: "Returns & Exchanges", path: "/returns-exchanges" },
        { name: "FAQ", path: "/faq" }, 
        { name: "Contact Us", path: "/contact" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} LuxeStore Inc. All rights reserved.`,
};