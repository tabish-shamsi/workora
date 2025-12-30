type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  status: "open" | "filled" | "expired";
  createdAt: string; // ISO date
};

export default Job