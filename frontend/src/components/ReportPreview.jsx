import React from 'react';
import { X, Download } from 'lucide-react';

// interface ReportPreviewProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   content: string;
//   onDownload: () => void;
// }

const ReportPreview=({
  isOpen,
  onClose,
  title,
  content,
  onDownload
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title} - Preview</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onDownload}
              className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
              {content}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Preview shows the complete report content that will be downloaded
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
            <button
              onClick={onDownload}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;