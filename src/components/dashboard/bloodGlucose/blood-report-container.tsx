"use client";

import * as React from "react";
import { Box, Button, Stack } from "@mui/material";

import { LabResultAnalysisDataType, ReportData } from "@/types";

import { BloodReport } from "./blood-report";
import { FloppyDisk, PencilSimple } from "@phosphor-icons/react";
import { EditLabItemDialog } from "./edit-lab-item-dialog";
import { AddLabItemDialog, AddCategoryDialog } from "./add-lab-dialogs";

// Additional sample datasets
const sampleData: ReportData = {
	title: "Patient Health Dashboard",
	userInformation: {
		name: "Angus",
		age: 24,
		dob: "2001-08-20",
		sex: "Male",
	},
	reportInformation: {
		currentLabReportResultDate: "2024-10-01",
		previousLabReportResultDate: "2024-04-01",
		currentLabReportSampleDate: "2024-09-28",
		previousLabReportSampleDate: "2024-03-28",
		generatedDate: "2024-10-05",
	},
	introductionSection: {
		title: "Introduction",
		description: "",
		data: [
			{
				title: "Comprehensive Blood Biomarker Analysis",
				description:
					"Comprehensive Blood Biomarker Analysis is a systematic approach to understanding overall health through detailed evaluation of blood biomarkers, providing insights into body systems status. It goes beyond traditional blood testing by organizing, analysing, and interpreting these biomarkers to provide an in-depth assessment of the main body systems, including accessory systems, nutrient status, and trends towards or away from clinical dysfunction. A systematic approach to understanding overall health through detailed evaluation of blood biomarkers, providing insights into body systems status.",
			},
			{
				title: "The Importance of Blood Testing",
				description:
					"Blood tests ofer valuable insights into our overall health. Blood chemistry and CBC/hema-tology tests are among the most ordered medical tests worldwide. They are integral to clini-cal medicine and play a crucial role in the diagnostic decision-making process. Regular blood testing is standard for health assessments, helping patients and doctors understand and monitor health conditions. However, traditional blood tests often return “normal” results, even when patients feel unwell. This discrepancy can lead to frustration, as it's common for patien-ts to be told, 'everything on your blood test looks normal, ' even when they're experiencing symptoms.",
			},
			{
				title: "Why 'Normal' Isn't Always Best",
				description:
					"Many patients who feel unwell receive 'normal' results on their blood tests. Clinical experi-ence shows that these individuals are often far from being functionally optimal. They may not have a diagnosable disease but are experiencing what we call 'dysfunctional' conditions. Their physiological systems are no longer functioning properly, leading to feelings of unwellness. The problem lies not in the blood test itself, but in the interpretation of the results. Traditional reference ranges are based on averages within a population, which doesn't necessarily re-fect optimal health or physiological function. These broad 'normal' ranges often fail to detect health issues before they develop into signifcant problems. They are not useful for identifying the early emergence of dysfunction.",
			},
			{
				title: "Summary",
				description:
					"In conclusion, blood testing is more than just a tool for diagnosing diseases or injuries. It plays a vital role in comprehensive functional medicine, helping uncover hidden health trends, pro-mote overall health, and prevent disease. The Functional Blood Chemistry Analysis ofers a more precise, insightful, and proactive approach to health assessment and management.",
			},
		],
	},
	patientHealthOverviewSection: {
		title: "Patient Health Overview",
		description: "",
		data: [
			{
				title: "Detailed Wellness Analysis",
				description:
					"The Functional Health Report provides a unique and comprehensive insight into your health by interpreting complex blood biomarkers. It assesses hidden health trends in your body’s main systems. The report identifes early signs of dysfunction and potential nutrient defciencies, giving you a detailed view of your overall health status.",
			},
			{
				title: "Optimized Lifestyle Recommendations",
				description:
					"Based on the fndings in the Assessment and Analysis sections, the Health Improvement Plan provides targeted recommendations to address identifed health concerns. This plan includes dietary adjustments, exercise routines, and supplements to improve your overall health.",
			},
		],
	},
	labResultAnalysisSection: {
		title: "Lab Result Analysis",
		description:
			"This report outlines patient's Chemistry Screen and CBC, highlighting whether each biomarker is within the functional phys-iological range. It categorizes biomarkers and provides hyperlinks for those deviating from the functional optimal range, ofering insights into potential underlying functional health issues and explanations for variations. This Lab Result Analysis is based on the lab results dated 21 May 2025 and 10 Feb 2025",
		data: [
			{
				category: "Haematology",
				items: [
					{
						id: "Haemoglobin (HGB)",
						title: "Haemoglobin (HGB)",
						description:
							"Hemoglobin functions to carry oxygen from the lungs to body tissues and transport carbon dioxide back to the lungs for exhalation.",
						minValue: 7,
						maxValue: 22.5,
						womanMinValue: 6.5,
						womanMaxValue: 21.75,
						recommendedMin: 14,
						recommendedMax: 15,
						womanRecommendedMin: 13,
						womanRecommendedMax: 14.5,
						latestValue: 14,
						previousValue: null,
						unit: "g/dL",
						explaination: null,
					},
					{
						id: "Red Blood Cells",
						title: "Red Blood Cells",
						description:
							"Red blood cells (RBCs) are responsible for transporting oxygen from the lungs to body tissues and carrying carbon dioxide back to the lungs for exhalation.",
						minValue: 2.1,
						maxValue: 8.7,
						womanMinValue: 1.975,
						womanMaxValue: 6.75,
						recommendedMin: 4.2,
						recommendedMax: 5.8,
						womanRecommendedMin: 3.95,
						womanRecommendedMax: 4.5,
						latestValue: 5,
						previousValue: null,
						unit: "m/cumm",
						explaination: null,
					},
				],
			},
			{
				category: "Iron Status & Inflammation",
				items: [
					{
						id: "Ferritin",
						title: "Ferritin",
						description:
							"Ferritin is the main storage protein for iron, and its blood level reflects the amount of stored iron in the body, making it a sensitive marker for iron deficiency or overload (e.g., hemochromatosis, chronic inflammation).",
						minValue: 15,
						maxValue: 105,
						womanMinValue: null,
						womanMaxValue: null,
						recommendedMin: 30,
						recommendedMax: 70,
						womanRecommendedMin: null,
						womanRecommendedMax: null,
						latestValue: 50,
						previousValue: null,
						unit: "ng/dL",
						explaination: null,
					},
				],
			},
			{
				category: "Electrolytes & Minerals",
				items: [
					{
						id: "Calcium",
						title: "Calcium",
						description:
							"Calcium is a vital mineral for bone strength, nerve signaling, muscle contraction, and blood clotting; abnormal levels can indicate bone disease, parathyroid disorders, or metabolic imbalance.",
						minValue: 1.15,
						maxValue: 3.735,
						womanMinValue: null,
						womanMaxValue: null,
						recommendedMin: 2.3,
						recommendedMax: 2.49,
						womanRecommendedMin: null,
						womanRecommendedMax: null,
						latestValue: 2.1,
						previousValue: null,
						unit: "mmol/L",
						explaination: null,
					},
				],
			},
			{
				category: "Protein & Nutrition",
				items: [
					{
						id: "Globulin",
						title: "Globulin",
						description:
							"Globulins are a diverse group of proteins involved in immune function, inflammation, and transport; changes in levels may point to immune disorders, infections, or liver disease.",
						minValue: 1.2,
						maxValue: 4.2,
						womanMinValue: null,
						womanMaxValue: null,
						recommendedMin: 2.4,
						recommendedMax: 2.8,
						womanRecommendedMin: null,
						womanRecommendedMax: null,
						latestValue: 2.9,
						previousValue: null,
						unit: "g/dL",
						explaination: null,
					},
				],
			},
			{
				category: "Glucose Control & Diabetes Monitoring",
				items: [
					{
						id: "Glucose",
						title: "Glucose",
						description:
							"Glucose is the primary energy source for cells; fasting and random levels help diagnose and monitor diabetes, hypoglycemia, and metabolic function.",
						minValue: 2.08,
						maxValue: 7.155,
						womanMinValue: null,
						womanMaxValue: null,
						recommendedMin: 4.16,
						recommendedMax: 4.77,
						womanRecommendedMin: null,
						womanRecommendedMax: null,
						latestValue: 4.19,
						previousValue: null,
						unit: "mmol/L",
						explaination: null,
					},
				],
			},
			{
				category: "Renal Function",
				items: [
					{
						id: "Cystatin C",
						title: "Cystatin C",
						description:
							"Cystatin C is a protein produced by all nucleated cells and filtered by the kidneys; its blood level is a sensitive marker of kidney function, often more accurate than creatinine in early kidney disease detection.",
						minValue: 0.265,
						maxValue: 1.35,
						womanMinValue: null,
						womanMaxValue: null,
						recommendedMin: 0.53,
						recommendedMax: 0.9,
						womanRecommendedMin: null,
						womanRecommendedMax: null,
						latestValue: 0.8,
						previousValue: null,
						unit: "mg/L",
						explaination: null,
					},
				],
			},
			{
				category: "Liver & Tissue Damage Markers",
				items: [
					{
						id: "Aspartate Aminotransferase (AST)",
						title: "Aspartate Aminotransferase (AST)",
						description:
							"AST is an enzyme found in the liver, heart, and muscles; elevated levels suggest liver injury, heart damage, or muscle breakdown, though it is not liver-specific.",
						minValue: 5,
						maxValue: 39,
						womanMinValue: null,
						womanMaxValue: null,
						recommendedMin: 10,
						recommendedMax: 26,
						womanRecommendedMin: null,
						womanRecommendedMax: null,
						latestValue: 16,
						previousValue: null,
						unit: "IU/L",
						explaination: null,
					},
				],
			},
			{
				category: "Others",
				items: [

				]
			}
		],
	},
	assessmentSection: {
		title: "Assessment",
		description:
			"In this section, we delve into the intricate data obtained from our Functional Health analysis. This comprehensive assess-ment synthesizes the results of advanced blood tests, assessing each physiological system for potential dysfunctions against functional optimal ranges. Our goal is to provide a detailed evaluation that identifes early signs of imbalance or deviations from optimal health, enabling proactive medical intervention. Utilizing a functional approach, we not only spot abnormalities but also understand their implications in the broader context of bodily functions.This assessment facilitates a deeper insight into the patient's health status, empowering practitioners with the necessary information to guide efective treatment strategies tailored to restore and maintain functional well-being.",
		data: {},
	},
	recommendationSection: {
		title: "Recommendation",
		description: "",
		data: {
			diet: {
				title: "Personalized Dietary Recommendations",
				description:
					"The patient is a 56-year-old male with no specifc diet preferences or allergies. Biometrics  indicate overweight BMI (27.3), borderline hypertension (129/89), and test results  show elevated LDL, homocysteine, PSA, mercury, infammatory markers, and defciencies in vitamins B12, D, and folate, with thyroid and hormonal imbalances. ",
				category: [
					{
						categoryName: "Cardiovascular Health Management",
						include: [
							"Soluble fber: oats, barley, legumes, apples, citrus fruits ",
							"Omega-3 rich foods: wild-caught salmon, mackerel, sardines (2-3x/week) ",
						],
						avoid: ["Ultra-processed foods ", "Trans fats and deep-fried foods "],
					},
					{
						categoryName: "Methylation Support (Homocysteine Management)",
						include: ["Folate-rich foods: dark leafy greens, asparagus, Brussels sprouts"],
						avoid: [],
					},
				],
				generalSuggestions: [
					"Increase physical activity to at least 150 minutes of moderate exercise per week.",
					"Maintain a balanced diet rich in fruits, vegetables, whole grains, and lean proteins.",
					"Stay hydrated and limit sugary beverages.",
				],
			},
		},
	},
	metrics: [
		{
			title: "Hemoglobin",
			description:
				"Measures the amount of hemoglobin in the blood, which carries oxygen from the lungs to the rest of the body.",
			minValue: 13,
			maxValue: 18,
			recommendedMin: 13.5,
			recommendedMax: 17.5,
			latestValue: 14.4,
			previousValue: 15.2,
			unit: "g/dL",
		},
		{
			title: "Blood Pressure (Systolic)",
			description: "The pressure in your arteries when your heart beats.",
			minValue: 90,
			maxValue: 180,
			recommendedMin: 90,
			recommendedMax: 120,
			latestValue: 135,
			previousValue: 118,
			unit: "mmHg",
		},
		{
			title: "Cholesterol",
			description: "Total cholesterol level in the blood.",
			minValue: 100,
			maxValue: 300,
			recommendedMin: 100,
			recommendedMax: 200,
			latestValue: 185,
			previousValue: 220,
			unit: "mg/dL",
		},
		{
			title: "Blood Sugar (Fasting)",
			description: "Glucose level in blood after fasting for at least 8 hours.",
			minValue: 70,
			maxValue: 200,
			recommendedMin: 70,
			recommendedMax: 100,
			latestValue: 95,
			previousValue: 105,
			unit: "mg/dL",
		},
		{
			title: "White Blood Cell Count",
			description: "Number of white blood cells per microliter of blood, indicating immune system health.",
			minValue: 3500,
			maxValue: 15_000,
			recommendedMin: 4000,
			recommendedMax: 11_000,
			latestValue: 7500,
			previousValue: 6800,
			unit: "/μL",
		},
		{
			title: "Vitamin D",
			description: "Vitamin D level in the blood, important for bone health and immune function.",
			minValue: 10,
			maxValue: 100,
			recommendedMin: 30,
			recommendedMax: 80,
			latestValue: 25,
			previousValue: 32,
			unit: "ng/mL",
		},
	],
};

export function BloodReportContainer(): React.JSX.Element {
	const [currentData, setCurrentData] = React.useState<ReportData>(sampleData);
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
		if (addItemDialog.categoryIndex !== null) {
			const newData = { ...currentData };
			newData.labResultAnalysisSection.data[addItemDialog.categoryIndex].items.push(newItem);
			setCurrentData(newData);
		}
		setAddItemDialog({ open: false, categoryIndex: null });
	};

	const handleSaveNewCategory = (categoryName: string) => {
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

	return (
		<Stack spacing={2}>
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

			{/* Blood Report */}
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
		</Stack>
	);
}
