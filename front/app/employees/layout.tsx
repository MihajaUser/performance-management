export default function EmployeesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Barre interne spécifique à employees */}
      <div className="flex justify-between mb-6 border-b pb-2">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">+ Add Employee</button>
      </div>

      {/* Le contenu de chaque sous-page */}
      {children}
    </div>
  );
}
