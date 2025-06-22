"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set up PDF.js worker from public directory with version matching react-pdf
if (typeof window !== "undefined") {
	pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
}

interface PDFThumbnailProps {
	src: string;
	alt: string;
	className?: string;
}

export default function PDFThumbnail({
	src,
	alt,
	className = "",
}: PDFThumbnailProps) {
	const [numPages, setNumPages] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const onDocumentLoadSuccess = useCallback(
		({ numPages }: { numPages: number }) => {
			setNumPages(numPages);
			setIsLoading(false);
			setError(null);
		},
		[]
	);

	const onDocumentLoadError = useCallback((error: Error) => {
		console.error("PDF loading error:", error);
		setError("Failed to load PDF");
		setIsLoading(false);
	}, []);

	const onPageRenderSuccess = useCallback(() => {
		setIsLoading(false);
	}, []);

	if (error) {
		return (
			<div
				className={`bg-gray-200 rounded-xl flex items-center justify-center p-8 ${className}`}
			>
				<div className='text-center text-gray-600'>
					<p className='text-sm'>Unable to load PDF</p>
					<p className='text-xs mt-1'>Please check the file</p>
				</div>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			className={`bg-white rounded-xl overflow-hidden ${className}`}
		>
			{isLoading && (
				<div className='bg-gray-100 rounded-xl flex items-center justify-center p-8'>
					<div className='text-center text-gray-600'>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2'></div>
						<p className='text-sm'>Loading PDF...</p>
					</div>
				</div>
			)}

			<div
				className={
					isLoading
						? "hidden"
						: "flex justify-center items-center w-full h-full"
				}
			>
				<Document
					file={src}
					onLoadSuccess={onDocumentLoadSuccess}
					onLoadError={onDocumentLoadError}
					loading=''
				>
					<Page
						pageNumber={1}
						renderTextLayer={false}
						renderAnnotationLayer={false}
						onRenderSuccess={onPageRenderSuccess}
						width={280}
						className='react-pdf__Page w-full h-auto'
					/>
				</Document>
			</div>
		</div>
	);
}
