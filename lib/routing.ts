import { ComplaintCategory } from "@/types";

/**
 * PRODUCTION-GRADE ROUTING ENGINE
 * Maps complaint categories to real-world Telangana departments.
 * Config-driven approach for scalability and future expansion.
 */

interface DepartmentRoute {
  category: ComplaintCategory;
  department: string;
  subDepartments?: string[];
}

const DEPARTMENT_REGISTRY: DepartmentRoute[] = [
  { category: "Women Safety", department: "Telangana Police (Women Protection Cell)" },
  { category: "Narcotics", department: "Anti Narcotics Bureau (TGANB)" },
  { category: "Sanitation", department: "GHMC / Municipal Administration & Urban Development" },
  { category: "Water", department: "Hyderabad Metropolitan Water Supply and Sewerage Board (HMWSSB)" },
  { category: "Roads", department: "Roads & Buildings Department (R&B)" },
  { category: "Street Lights", department: "TSREDCO / Electricity Department" },
  { category: "Schemes", department: "Panchayat Raj & Rural Development" },
  { category: "Locality Issues", department: "District Revenue Administration" },
  { category: "Civic", department: "General Public Grievance Cell (Prajavani)" },
];

/**
 * Resolved the department responsible for a given grievance category.
 * @param category The main category of the complaint
 * @param title Optional title for keyword-based sub-routing (Future enhancement)
 */
export function getDepartment(category: ComplaintCategory, title?: string): string {
  // Simple category lookup
  const route = DEPARTMENT_REGISTRY.find(r => r.category === category);
  
  // Future: Use 'title' for LLM-based intelligent routing to sub-departments
  
  return route ? route.department : "General Public Grievance Cell (Prajavani)";
}

/**
 * Advanced Routing Logic
 * In a real-world scenario, this would check sub-categories and geo-proximity
 * to resolve the exact local administrative body (e.g., GHMC Circle vs Municipality).
 */
export function resolveExactAdministrativeBody(category: ComplaintCategory, location: string): string {
  const baseDept = getDepartment(category);
  // Future implementation: Spatial lookup against administrative boundaries
  return `${baseDept} - ${location} Division`;
}