"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";

import { useSession } from "@/hooks/use-session";
import { PaginationState } from "@tanstack/react-table";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import { AlertCustom, Button, ModalCustom, TableCustom } from "@/components";

import { delay } from "@/utils";
import { columns } from "./ui/columns";
import { EditForm } from "./ui/EditForm";

export default function UserPage() {
  const { sesionPeticion } = useSession();

  const [alertOpen, setAlertOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
      await delay(500);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    console.log("Agregando nuevo registro");
  };

  const handleEdit = (id: string) => {
    console.log("Editando registro con id:", id);
    setModalOpen(true);
  };
  const handleDelete = (id: string) => {
    console.log("Eliminando registro con id:", id);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const handleAlertAccept = () => {
    console.log("Eliminando registro con id:");
    setAlertOpen(false);
  };

  const actions: Array<ReactNode> = [
    <Button
      key="refresh"
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={fetchData}
    >
      <IconRefresh />
    </Button>,
    <Button
      key="new"
      variant="outline"
      size="sm"
      className="bg-primary text-white hover:bg-primary/30 hover:text-black"
      onClick={handleAddNew}
    >
      <IconPlus />
      nuevo
    </Button>,
  ];

  const tableColumns = columns({ onEdit: handleEdit, onDelete: handleDelete });

  return (
    <div className="p-4">
      <AlertCustom
        open={alertOpen}
        variant="error"
        title="Eliminar registro"
        message="Esta seguro de continuar con la eliminación del registro?"
        onClose={handleAlertClose}
        onAccept={handleAlertAccept}
      />

      <ModalCustom
        open={modalOpen}
        title="Editar registro"
        description="Informacion del registro"
        onClose={() => setModalOpen(false)}
        size="lg"
      >
        <EditForm
          onSubmit={() => console.log("Guardado")}
          onCancel={() => setModalOpen(false)}
        />
      </ModalCustom>

      <TableCustom
        columns={tableColumns}
        data={data}
        totalRows={totalRows}
        isLoading={isLoading}
        searchQuery={searchQuery}
        pagination={pagination}
        onSearch={handleSearch}
        onPaginationChange={handlePaginationChange}
        actions={actions}
      />
    </div>
  );
}
