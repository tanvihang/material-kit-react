"use client";

import * as React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Plus } from "@phosphor-icons/react";

import type { LabResultAnalysisDataType, LabResultAnalysisSection } from "@/types/health";

import RangeComponent from "./range-component";

interface LabResultAnalysisProps {
	data: LabResultAnalysisSection;
	onEdit: (categoryIndex: number, itemIndex: number, item: LabResultAnalysisDataType) => void;
	onAddItem: (categoryIndex: number) => void;
	onAddCategory: () => void;
	onDeleteItem: (categoryIndex: number, itemIndex: number) => void;
	isEditing?: boolean;
}

export function LabResultAnalysis({
	data,
	onEdit,
	onAddItem,
	onAddCategory,
	onDeleteItem,
	isEditing = false,
}: LabResultAnalysisProps): React.JSX.Element {
	return (
		<div className="lab-result-analysis-section">
			<h2 className="component-title">{data.title}</h2>

			{/* Explaination */}
			{data.description && <p>{data.description}</p>}

			{/* Legends */}
			<div className="labels-legend-section">
				<h6>
					<b>Legend:</b>
				</h6>

				{/* In range */}
				<div className="legend-item">
					<div className="in-range-marker"></div>
					<h6>In range</h6>
				</div>

				{/* Out of range */}
				<div className="legend-item">
					<div className="out-of-range-marker"></div>
					<h6>Out of range</h6>
				</div>

				{/* Latest value */}
				<div className="legend-item">
					<div className="latest-marker"></div>
					<h6>Latest value</h6>
				</div>

				{/* Previous value */}
				<div className="legend-item">
					<div className="previous-marker"></div>
					<h6>Previous value</h6>
				</div>
			</div>

			{data.data.map((category, categoryIndex) => {

				return (
					<div key={categoryIndex} className="lab-category">
						<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
							<Typography variant="h5" component="h3" sx={{ color: "#6366f1", fontWeight: 600 }}>
								{category.category}
							</Typography>
							{isEditing && onAddItem && (
								<Button
									size="small"
									startIcon={<Plus />}
									onClick={() => onAddItem(categoryIndex)}
									variant="outlined"
									className="no-print"
								>
									Add Item
								</Button>
							)}
						</Stack>

						{category.items.map((item, itemIndex) => {
							return (
								<RangeComponent
									key={item.id}
									index={itemIndex}
									isWomen={false}
									data={item}
									isEditing={isEditing}
									onDelete={() => onDeleteItem(categoryIndex, itemIndex)}
									onEdit={() => onEdit(categoryIndex, itemIndex, item)}
								/>
							);
						})}
					</div>
				);
			})}

			{isEditing && onAddCategory && (
				<Box sx={{ textAlign: "center", mt: 3 }}>
					<Button startIcon={<Plus />} onClick={onAddCategory} variant="outlined" size="large" className="no-print">
						Add New Category
					</Button>
				</Box>
			)}
		</div>
	);
}
