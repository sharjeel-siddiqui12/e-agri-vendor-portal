// src/lib/demoData.js


// Full demo data for order applications (120 rows, 10 names/avatars)
export function createOrderApplicationsDemoData() {
  const names = [
    "Muneeb Ahmed",
    "Ali Raza",
    "Sara Khan",
    "Asad Ali",
    "Ayesha Noor",
    "Imran Tariq",
    "Bilal Saeed",
    "Fatima Zehra",
    "Zain Khan",
    "Hina Sheikh",
  ];
  
  const regions = [
    { main: "Okara", sub: "Dipalpur" },
    { main: "Malir" },
    { main: "Lahore", sub: "Model Town" },
    { main: "Multan" },
    { main: "Faisalabad" },
    { main: "Sialkot" },
    { main: "Karachi", sub: "Saddar" },
    { main: "Hyderabad" },
    { main: "Quetta" },
    { main: "Rawalpindi", sub: "Cantt" },
  ];
  const orderStatuses = [
    "Shipped",
    "Pending",
    "Cancelled",
    "Delivered",
  ];
  const orderTypes = ["Agri - Production order", "Crop order"];
  const cnic = "42101-12345-6";
  const kycStatus = "Approved";
  const date = "07 May, 25";

  let data = [];
  for (let i = 0; i < 120; i++) {
    data.push({
      avatar: null,
      name: names[i % names.length],
      cnic: cnic,
      region: regions[i % regions.length],
      orderStatus: orderStatuses[i % orderStatuses.length],
      kycStatus: kycStatus,
      orderType: orderTypes[i % orderTypes.length],
      date: date,
    });
  }
  return data;
}

// Short demo data for order approvals (12 rows, 3 names/avatars)
export function createOrderApprovalsDemoData() {
  const names = [
    "Muneeb Ahmed",
    "Ali Raza",
    "Sara Khan",
  ];
 
  const regions = [
    { main: "Okara", sub: "Dipalpur" },
    { main: "Malir" },
    { main: "Lahore", sub: "Model Town" },
    { main: "Multan" },
    { main: "Faisalabad" },
    { main: "Sialkot" },
    { main: "Karachi", sub: "Saddar" },
    { main: "Hyderabad" },
    { main: "Quetta" },
    { main: "Rawalpindi", sub: "Cantt" },
  ];
  const orderStatuses = [
    "In-review",
    "Rejected",
    "Cancelled",
    "Recovered",
    "Disbursed",
    "Accepted",
    "Approved",
  ];
  const orderTypes = ["Agri - Production order", "Crop order"];
  const cnic = "42101-12345-6";
  const kycStatus = "Approved";
  const date = "07 May, 25";

  let data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      avatar: null,
      name: names[i % names.length],
      cnic: cnic,
      region: regions[i % regions.length],
      orderStatus: orderStatuses[i % orderStatuses.length],
      kycStatus: kycStatus,
      orderType: orderTypes[i % orderTypes.length],
      date: date,
    });
  }
  return data;
}

export const orderStatusList = [
  "In-review",
  "Rejected",
  "Cancelled",
  "Recovered",
  "Disbursed",
  "Accepted",
  "Approved",
];


export const demoOrders = [
  {
    id: "00-0001",
    user: { name: "Muneeb Ahmed" },
    crop: "Maize",
    orderAmount: 800000,
    repaymentStatus: "Pending",
    repaidAmount: 500000,
    outstandingAmount: 300000,
  },
  {
    id: "00-0002",
    user: { name: "Sharjeel Siddiqui" },
    crop: "Wheat",
    orderAmount: 1000000,
    repaymentStatus: "Full",
    repaidAmount: 500000,
    outstandingAmount: 500000,
  },
  {
    id: "00-0003",
    user: { name: "Asad Ali" },
    crop: "Cotton",
    orderAmount: 600000,
    repaymentStatus: "Partial",
    repaidAmount: 100000,
    outstandingAmount: 500000,
  },
  {
    id: "00-0004",
    user: { name: "Ayesha Noor" },
    crop: "Wheat",
    orderAmount: 200000,
    repaymentStatus: "Full",
    repaidAmount: 100000,
    outstandingAmount: 100000,
  },
  {
    id: "00-0005",
    user: { name: "Bilal Saeed" },
    crop: "Cotton",
    orderAmount: 100000,
    repaymentStatus: "Partial",
    repaidAmount: 0,
    outstandingAmount: 100000,
  },
  {
    id: "00-0006",
    user: { name: "Zain Khan" },
    crop: "Wheat",
    orderAmount: 1000000,
    repaymentStatus: "Full",
    repaidAmount: 300000,
    outstandingAmount: 700000,
  },
  {
    id: "00-0007",
    user: { name: "Sara Khan" },
    crop: "Cotton",
    orderAmount: 500000,
    repaymentStatus: "Partial",
    repaidAmount: 200000,
    outstandingAmount: 300000,
  },
  // {
  //   id: "00-0008",
  //   user: { name: "Atif Aslam" },
  //   crop: "Wheat",
  //   orderAmount: 200000,
  //   repaymentStatus: "Pending",
  //   repaidAmount: 100000,
  //   outstandingAmount: 100000,
  // },
  {
    id: "00-0009",
    user: { name: "Ali Khan" },
    crop: "Wheat",
    orderAmount: 200000,
    repaymentStatus: "Full",
    repaidAmount: 100000,
    outstandingAmount: 100000,
  },
  {
    id: "00-0010",
    user: { name: "Babar Azam" },
    crop: "Wheat",
    orderAmount: 200000,
    repaymentStatus: "Pending",
    repaidAmount: 100000,
    outstandingAmount: 100000,
  },
  {
    id: "00-0011",
    user: { name: "Ronaldo" },
    crop: "Wheat",
    orderAmount: 200000,
    repaymentStatus: "Partial",
    repaidAmount: 100000,
    outstandingAmount: 100000,
  },
  {
    id: "00-0012",
    user: { name: "Ronaldo" },
    crop: "Wheat",
    orderAmount: 200000,
    repaymentStatus: "Pending",
    repaidAmount: 100000,
    outstandingAmount: 100000,
  },

];