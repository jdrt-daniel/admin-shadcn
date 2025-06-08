"use client";

import { MainTable } from "@/components/table/MainTable";
import { useCallback, useEffect, useState } from "react";

import { columns } from "./ui/columns";
import { PaginationState } from "@tanstack/react-table";
import { useSession } from "@/hooks/use-session";

export default function UserPage() {
  const { sesionPeticion } = useSession();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await sesionPeticion({
        url: `http://localhost:4321/api/personas`,
        method: "GET",
        params: {
          pagina: pagination.pageIndex + 1,
          limite: pagination.pageSize,
          ...(searchQuery.length > 0 && { filtro: searchQuery }),
        },
      });

      setData(response.datos.filas);
      setTotalRows(response.datos.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPagination({ ...pagination, pageIndex: 0 });
  };

  const handlePaginationChange = (newPagination: PaginationState) => {
    setPagination(newPagination);
  };

  const handleAddNew = () => {
    // Implementa la lógica para agregar nuevo registro
  };
  return (
    <div className="p-4">
      <MainTable
        columns={columns}
        data={data}
        totalRows={totalRows}
        isLoading={isLoading}
        searchQuery={searchQuery}
        pagination={pagination}
        onSearch={handleSearch}
        onPaginationChange={handlePaginationChange}
        onAddNew={handleAddNew}
      />
    </div>
  );
}
