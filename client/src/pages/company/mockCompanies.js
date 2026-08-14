// Mock data for the Company & HR module.
// Later this can be replaced with real API calls to /companies.
const mockCompanies = [
  {
    id: 1,
    name: "Brain Station 23",
    industry: "Software",
    website: "https://brainstation-23.com",
    location: "Dhaka, Bangladesh",
    notes: "Applied through campus career fair.",
    hrContacts: [
      { id: 1, name: "Rafi Ahmed", email: "rafi@bs23.net", linkedin: "" },
    ],
  },
  {
    id: 2,
    name: "Therap BD",
    industry: "Healthcare IT",
    website: "https://therapbd.com",
    location: "Dhaka, Bangladesh",
    notes: "Referred by senior.",
    hrContacts: [
      { id: 2, name: "Nadia Islam", email: "nadia@therapbd.com", linkedin: "" },
    ],
  },
  {
    id: 3,
    name: "Pathao",
    industry: "Logistics / Tech",
    website: "https://pathao.com",
    location: "Dhaka, Bangladesh",
    notes: "",
    hrContacts: [],
  },
];

export default mockCompanies;
