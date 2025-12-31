type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  status: "open" | "filled" | "expired";
  lastDate:  string;
  createdAt: string; // ISO date
  salary: string;
  applications?: number
};

export default Job