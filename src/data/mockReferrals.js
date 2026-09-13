// DEMO / MOCK DATA — for prototype purposes only.
// TODO: Replace with real referral records from Supabase's `referrals` table.

export const PACKAGES = [
  { id: "basic", name: "Basic", price: 100000 },
  { id: "standard", name: "Standard", price: 150000 },
  { id: "premium", name: "Premium", price: 200000 },
];

export const REFERRAL_STATUSES = [
  "Pending",
  "Contacted",
  "In Progress",
  "Completed",
  "Cancelled",
];

function packagePrice(packageName) {
  const found = PACKAGES.find((p) => p.name === packageName);
  return found ? found.price : 0;
}

export const SEED_REFERRALS = [
  {
    id: "ref_1",
    referrerId: "usr_ref_1",
    businessName: "Golden Plate Restaurant",
    contactName: "Chidi Okafor",
    package: "Standard",
    projectValue: packagePrice("Standard"),
    status: "Completed",
    createdAt: "2026-07-18T11:00:00.000Z",
  },
  {
    id: "ref_2",
    referrerId: "usr_ref_1",
    businessName: "Bloom Beauty Spa",
    contactName: "Ifeoma Nwosu",
    package: "Basic",
    projectValue: packagePrice("Basic"),
    status: "In Progress",
    createdAt: "2026-08-05T09:20:00.000Z",
  },
  {
    id: "ref_3",
    referrerId: "usr_ref_1",
    businessName: "Precision Auto Repairs",
    contactName: "Emeka Obi",
    package: "Premium",
    projectValue: packagePrice("Premium"),
    status: "Pending",
    createdAt: "2026-09-01T16:40:00.000Z",
  },
  {
    id: "ref_4",
    referrerId: "usr_ref_1",
    businessName: "Sunrise Learning Center",
    contactName: "Blessing Eze",
    package: "Standard",
    projectValue: packagePrice("Standard"),
    status: "Cancelled",
    createdAt: "2026-08-22T13:10:00.000Z",
  },
  {
    id: "ref_5",
    referrerId: "usr_ref_2",
    businessName: "Coastal Fitness Gym",
    contactName: "Daniel Etim",
    package: "Premium",
    projectValue: packagePrice("Premium"),
    status: "Completed",
    createdAt: "2026-07-25T10:00:00.000Z",
  },
  {
    id: "ref_6",
    referrerId: "usr_ref_2",
    businessName: "Heritage Law Chambers",
    contactName: "Aisha Bello",
    package: "Standard",
    projectValue: packagePrice("Standard"),
    status: "Contacted",
    createdAt: "2026-08-30T15:25:00.000Z",
  },
  {
    id: "ref_7",
    referrerId: "usr_ref_2",
    businessName: "Fresh Cuts Barbershop",
    contactName: "Samuel Adeyemi",
    package: "Basic",
    projectValue: packagePrice("Basic"),
    status: "Pending",
    createdAt: "2026-09-05T08:15:00.000Z",
  },
  {
    id: "ref_8",
    referrerId: "usr_ref_3",
    businessName: "Willow Interiors",
    contactName: "Ngozi Umeh",
    package: "Premium",
    projectValue: packagePrice("Premium"),
    status: "In Progress",
    createdAt: "2026-08-10T12:00:00.000Z",
  },
  {
    id: "ref_9",
    referrerId: "usr_ref_3",
    businessName: "Northgate Pharmacy",
    contactName: "Femi Alabi",
    package: "Basic",
    projectValue: packagePrice("Basic"),
    status: "Completed",
    createdAt: "2026-07-30T09:45:00.000Z",
  },
  {
    id: "ref_10",
    referrerId: "usr_ref_3",
    businessName: "Ivy Cleaning Service",
    contactName: "Grace Okoro",
    package: "Standard",
    projectValue: packagePrice("Standard"),
    status: "Contacted",
    createdAt: "2026-09-06T17:30:00.000Z",
  },
];
