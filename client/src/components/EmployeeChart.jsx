import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function EmployeeChart({ employees }) {
  const departmentData = {};

  employees.forEach((emp) => {
    departmentData[emp.department] =
      (departmentData[emp.department] || 0) + 1;
  });

  const data = {
    labels: Object.keys(departmentData),
    datasets: [
      {
        label: "Employees",
        data: Object.values(departmentData),
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#dc3545",
          "#6610f2",
          "#20c997",
          "#fd7e14",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <Pie data={data} />
    </div>
  );
}

export default EmployeeChart;