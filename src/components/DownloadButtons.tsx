import { saveAs } from "file-saver";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
declare global {
  interface Window {
    gtag: any;
  }
}

const DownloadButtons = ({
  data,
  fileName,
}: {
  data: any;
  fileName: string;
}) => {
  const downloadCSV = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${fileName}.csv`);
  };

  const downloadJSON = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, `${fileName}.json`);
  };

  return (
    <div className="btn-group">
      <button
        className="text-zinc-300! btn  btn-outline border-zinc-100"
        onClick={downloadJSON}
      >
        <ArrowDownTrayIcon className="mr-2 h-5 w-5 stroke-2" />
        Download JSON
      </button>
    </div>
  );
};

const convertToCSV = <T extends Record<string, unknown>>(data: T[]) => {
  const header = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map((item) => Object.values(item).join(",")).join("\n");
  return header + rows;
};

export default DownloadButtons;
