export type Employee = {
  id: number;
  firstname: string;
  lastname: string;
  department: string;
  jobTitle: string;
  status?: string;
  matricule?: number;
};

export function EmployeeInfo({ employee }: { employee: Employee }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div>
        <p className="text-gray-500">Nom</p>
        <p className="font-medium text-gray-800">{employee.firstname} {employee.lastname}</p>
      </div>
      <div>
        <p className="text-gray-500">Département</p>
        <p className="font-medium text-gray-800">{employee.department}</p>
      </div>
      <div>
        <p className="text-gray-500">Poste</p>
        <p className="font-medium text-gray-800">{employee.jobTitle}</p>
      </div>
      <div>
        <p className="text-gray-500">Statut</p>
        <p className="font-medium text-gray-800">{employee.status ?? "Active"}</p>
      </div>
      <div>
        <p className="text-gray-500">matricule </p>
        <p className="font-medium text-gray-800">
          {typeof employee.matricule === "number" ? employee.matricule.toFixed(2) : "—"}
        </p>
      </div>
    </div>
  );
}
