//frontend/app/(protected)/employees/page.tsx
"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Select,
  SelectItem,
  Button,
  Pagination,
} from "@heroui/react";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useEmployeesQuery } from "./hooks/useEmployeesQuery";
import { EmployeeTable } from "./components/EmployeeTable";

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useEmployeesQuery({
    search,
    department,
    status,
    page: currentPage,
  });

  const employees = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-6">
      {/* --- Titre --- */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Gestion des employés
        </h1>
      </div>

      {/* --- Carte des filtres --- */}
      <Card shadow="sm" className="border border-gray-200">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end flex-1">
              {/* Champ recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Recherche nom, prénom ou email..."
                  className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg h-11 w-full text-gray-700 bg-white 
               focus:outline-none focus:ring-1 focus:ring-[#002B5B]/30 focus:border-[#002B5B]/40 
               shadow-sm hover:shadow transition-all duration-150"
                />
              </div>


              {/* Département */}
              <Select
                placeholder="Département"
                variant="bordered"
                size="sm"
                selectedKeys={department ? [department] : []}
                onSelectionChange={(keys) =>
                  setDepartment(String(Array.from(keys)[0] ?? ""))
                }
                classNames={{
                  trigger: [
                    "relative bg-white border border-gray-300 hover:border-gray-400",
                    "h-11 rounded-lg transition-all",
                    "shadow-sm hover:shadow focus:ring-1 focus:ring-[#002B5B]/30 focus:border-[#002B5B]/40",
                  ].join(" "),
                  value: "text-gray-800 text-sm",
                  selectorIcon:
                    "absolute right-3 text-gray-400 w-4 h-4 pointer-events-none",
                  popoverContent:
                    "z-[50] bg-white border border-gray-200 rounded-lg [&_[data-selected=true]]:bg-[#002B5B]/10 [&_[data-selected=true]]:text-[#002B5B]",
                }}
                popoverProps={{
                  placement: "bottom-start",
                  className: "z-[60]",
                }}
              >
                <SelectItem key="">Tous</SelectItem>
                <SelectItem key="1">Informatique</SelectItem>
                <SelectItem key="2">Ressources Humaines</SelectItem>
                <SelectItem key="3">Finance</SelectItem>
                <SelectItem key="4">Logistique</SelectItem>
                <SelectItem key="5">Commercial</SelectItem>
              </Select>


              {/* Statut */}
              <Select
                placeholder="Statut"
                variant="bordered"
                size="sm"
                selectedKeys={status ? [status] : []}
                onSelectionChange={(keys) =>
                  setStatus(String(Array.from(keys)[0] ?? ""))
                }
                classNames={{
                  trigger: [
                    "relative bg-white border border-gray-300 hover:border-gray-400",
                    "h-11 rounded-lg transition-all",
                    "shadow-sm hover:shadow focus:ring-1 focus:ring-[#002B5B]/30 focus:border-[#002B5B]/40",
                  ].join(" "),
                  value: "text-gray-800 text-sm",
                  selectorIcon:
                    "absolute right-3 text-gray-400 w-4 h-4 pointer-events-none",

                  popoverContent:
                    "z-[50] bg-white border border-gray-200 rounded-lg [&_[data-selected=true]]:bg-[#002B5B]/10 [&_[data-selected=true]]:text-[#002B5B]",
                }}
                popoverProps={{
                  placement: "bottom-start",
                  className: "z-[60]",
                }}
              >
                <SelectItem key="">Tous</SelectItem>
                <SelectItem key="active">Actif</SelectItem>
                <SelectItem key="on_leave">En congé</SelectItem>
                <SelectItem key="inactive">Inactif</SelectItem>
              </Select>


            </div>

            {/* Bouton Ajouter */}
            <Button
              color="primary"
              variant="flat"
              startContent={<Plus className="w-4 h-4" />}
              className="h-11 text-sm bg-[#002B5B]/10 hover:bg-[#002B5B]/20 text-[#002B5B] font-medium shadow-none border border-gray-200 rounded-lg whitespace-nowrap"
            >
              Ajouter un employé
            </Button>
          </div>
        </CardHeader>

        {/* --- Corps --- */}
        <CardBody className="pt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
                <p className="text-sm text-gray-500">Chargement...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-red-500 text-sm italic">
                Une erreur est survenue lors du chargement.
              </p>
            </div>
          ) : (
            <>
              <EmployeeTable rows={employees} />

              {meta && meta.last_page > 1 && (
                <div className="flex justify-center items-center mt-6 gap-4">
                  <div className="text-sm text-gray-600">
                    Page {meta.current_page} sur {meta.last_page} - {meta.total}{" "}
                    employé{meta.total > 1 ? "s" : ""}
                  </div>
                  <Pagination
                    showControls
                    total={meta.last_page}
                    page={currentPage}
                    onChange={setCurrentPage}
                    classNames={{
                      wrapper: "gap-2",
                      item: "w-8 h-8 text-sm",
                      cursor: "bg-[#002B5B] text-white font-medium",
                    }}
                  />
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
