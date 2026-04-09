import { ComplaintCategory } from "@/types";

export function getDepartment(category: ComplaintCategory): string {
  switch (category) {
    case "Women Safety":
      return "Women Protection Cell";
    case "Narcotics":
      return "Anti Narcotics Bureau";
    case "Sanitation":
      return "Municipal Sanitation Department";
    case "Water":
      return "Water Board";
    case "Roads":
      return "Roads & Buildings Department";
    case "Street Lights":
      return "Electricity Maintenance Wing";
    case "Schemes":
      return "Citizen Welfare Desk";
    case "Locality Issues":
      return "Local Civic Maintenance Cell";
    case "Civic":
    default:
      return "General Public Grievance Cell";
  }
}