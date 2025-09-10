"use client";

import * as React from "react";
import { Stack } from "@mui/material";

import { ClientsType } from "@/types/clients/clients-type";
import { useClients } from "@/hooks/dashboard/clients/use-clients";
import { ClientsTable } from "@/components/dashboard/clients/clients-table";

export default function Page(): React.JSX.Element {
	const page = 0;
	const rowsPerPage = 5;

	const { clientList } = useClients();

	const paginatedClients = applyPagination(clientList, page, rowsPerPage);

	return (
		<Stack spacing={3}>
			<ClientsTable 
                count={paginatedClients.length}
                page={page}
                rows={paginatedClients}
                rowsPerPage={rowsPerPage}
            />
		</Stack>
	);
}

function applyPagination(rows: ClientsType[], page: number, rowsPerPage: number): ClientsType[] {
	return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
