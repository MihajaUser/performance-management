"use client";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const router = useRouter();

  const employees = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">List of Employees</h2>
      <ul className="space-y-2">
        {employees.map((emp) => (
          <li key={emp.id} className="border p-2 rounded flex justify-between items-center">
            <span>{emp.name}</span>
            <button
              onClick={() => router.push(`/employees/${emp.id}`)}
              className="text-white bg-blue-600 px-3 py-1 rounded"
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
