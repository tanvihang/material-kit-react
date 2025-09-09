"use client";

import * as React from "react";
import { Box, Button, Stack } from "@mui/material";

import { LabResultAnalysisDataType, ReportData } from "@/types";

import { BloodReport } from "./blood-report";
import { FloppyDisk, PencilSimple } from "@phosphor-icons/react";
import { EditLabItemDialog } from "./edit-lab-item-dialog";
import { AddLabItemDialog, AddCategoryDialog } from "./add-lab-dialogs";
import { BloodReportUpload } from "./blood-report-upload";

export function BloodReportContainer(): React.JSX.Element {
	const [currentData, setCurrentData] = React.useState<ReportData | null>(null);
	const [isEditing, setIsEditing] = React.useState<boolean>(false);
	const [editDialog, setEditDialog] = React.useState<{
		open: boolean;
		categoryIndex: number | null;
		itemIndex: number | null;
		item: LabResultAnalysisDataType | null;
	}>({
		open: false,
		categoryIndex: null,
		itemIndex: null,
		item: null,
	});

	const [addItemDialog, setAddItemDialog] = React.useState<{
		open: boolean;
		categoryIndex: number | null;
	}>({
		open: false,
		categoryIndex: null,
	});

	const [addCategoryDialog, setAddCategoryDialog] = React.useState<boolean>(false);

	const handleEditItem = (categoryIndex: number, itemIndex: number, item: LabResultAnalysisDataType) => {
		setEditDialog({
			open: true,
			categoryIndex,
			itemIndex,
			item,
		});
	};

	const handleSaveItem = (updatedItem: LabResultAnalysisDataType) => {
		if(!currentData) return;

		if (editDialog.categoryIndex !== null && editDialog.itemIndex !== null) {
			const newData = { ...currentData };
			newData.labResultAnalysisSection.data[editDialog.categoryIndex].items[editDialog.itemIndex] = updatedItem;
			setCurrentData(newData);
		}
	};

	const handleCloseDialog = () => {
		setEditDialog({
			open: false,
			categoryIndex: null,
			itemIndex: null,
			item: null,
		});
	};

	const toggleEditMode = () => {
		setIsEditing(!isEditing);
	};

	const handleAddItem = (categoryIndex: number) => {
		setAddItemDialog({
			open: true,
			categoryIndex,
		});
	};

	const handleAddCategory = () => {
		setAddCategoryDialog(true);
	};

	const handleSaveNewItem = (newItem: LabResultAnalysisDataType) => {
		if(!currentData) return;

		if (addItemDialog.categoryIndex !== null) {
			const newData = { ...currentData };
			newData.labResultAnalysisSection.data[addItemDialog.categoryIndex].items.push(newItem);
			setCurrentData(newData);
		}
		setAddItemDialog({ open: false, categoryIndex: null });
	};

	const handleSaveNewCategory = (categoryName: string) => {

		if(!currentData) return;

		const newData = { ...currentData };
		newData.labResultAnalysisSection.data.push({
			category: categoryName,
			items: [],
		});
		setCurrentData(newData);
		setAddCategoryDialog(false);
	};

	const handleCloseAddItemDialog = () => {
		setAddItemDialog({ open: false, categoryIndex: null });
	};

	const handleCloseAddCategoryDialog = () => {
		setAddCategoryDialog(false);
	};

	const handleDeleteItem = (categoryIndex: number, itemIndex: number) => {

		if(!currentData) return;

		const item = currentData.labResultAnalysisSection.data[categoryIndex].items[itemIndex];
		const confirmDelete = globalThis.confirm(
			`Are you sure you want to delete "${item.title}"? This action cannot be undone.`
		);
		
		if (confirmDelete) {
			const newData = { ...currentData };
			newData.labResultAnalysisSection.data[categoryIndex].items.splice(itemIndex, 1);
			setCurrentData(newData);
		}
	};

	const handleReportGenerated = (reportData: ReportData) => {
		setCurrentData(reportData);
	};

	return (
		<Stack spacing={2}>

			{/* Blood Report Upload */}
			<BloodReportUpload onReportGenerated={handleReportGenerated} />


			{/* Blood Report */}
			{
				currentData && (
					<>
						{/* Edit Controls */}
						<Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
							<Button
								variant={isEditing ? "contained" : "outlined"}
								startIcon={isEditing ? <FloppyDisk /> : <PencilSimple />}
								onClick={toggleEditMode}
							>
								{isEditing ? "Done Editing" : "Edit Report"}
							</Button>
						</Box>
						
						<BloodReport 
							data={currentData} 
							onEdit={handleEditItem} 
							onAddItem={handleAddItem}
							onAddCategory={handleAddCategory}
							onDeleteItem={handleDeleteItem}
							isEditing={isEditing} 
						/>

						{/* Edit Dialog */}
						<EditLabItemDialog
							open={editDialog.open}
							onClose={handleCloseDialog}
							onSave={handleSaveItem}
							item={editDialog.item}
						/>

						{/* Add Item Dialog */}
						<AddLabItemDialog
							open={addItemDialog.open}
							onClose={handleCloseAddItemDialog}
							onSave={handleSaveNewItem}
							categories={currentData.labResultAnalysisSection.data.map(cat => cat.category)}
							selectedCategory={addItemDialog.categoryIndex === null ? undefined : currentData.labResultAnalysisSection.data[addItemDialog.categoryIndex].category}
						/>

						{/* Add Category Dialog */}
						<AddCategoryDialog
							open={addCategoryDialog}
							onClose={handleCloseAddCategoryDialog}
							onSave={handleSaveNewCategory}
						/>
					</>
				)
			}

		</Stack>
	);
}
