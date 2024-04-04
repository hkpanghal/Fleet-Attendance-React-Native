import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Alert } from 'react-native';





export const generatePDF = async (
  students,
  class_name,
  subject_name,
  date,
  presentStudents,
  absentStudents
) => {
  try {
    // Create HTML content for the PDF
    let htmlContent = `
      <html>
      <head>
        <title>Student Attendance Report</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th,
          td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
          }
          th {
            background-color: #f2f2f2;
          }
          .name {
            text-align: left;
          }
          .dpaInfo {
            display: flex;
            justify-content: space-between;
          }

          .dpaInfo .paInfo {
            display: flex;
            justify-content: space-between;
            gap: 10px;
          }
        </style>
      </head>
      <body>

      <h2 style="text-align: center;">Student Attendance Report</h2>
      <h2 style="text-align: center;">${class_name}</h2>
      <h3 style="text-align: center;">${subject_name}</h3>
      <div class="dpaInfo">
        <h3> ${date} </h3>
        <div class="paInfo">
          <h3>Present => ${presentStudents} </h3>
          <h3>Absent  => ${absentStudents} </h3>
        </div>
      </div>

      <table>
      <thead>
      <tr>
        <th>Sr No.</th>
        <th>Name</th>
        <th>Roll Number</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
    `;

    // Function to generate rows for each student
    const generateStudentRows = (studentChunk, startIndex) => {
      let rows = '';
      studentChunk.forEach((student, index) => {
        rows += `
          <tr>
            <td>${startIndex + index + 1}</td>
            <td class="name">${student.first_name} ${student.last_name}</td>
            <td>${student.roll_number}</td>
            <td style=${
              student.is_present
                ? 'background-color:lightgreen'
                : 'background-color:#FF474C'
            }>${student.is_present ? 'Present' : 'Absent'}</td>
          </tr>
        `;
      });
      return rows;
    };

    // Split students into chunks to fit on each page
    const chunkSize = 25; // Maximum students per page
    for (let i = 0; i < students.length; i += chunkSize) {
      const studentChunk = students.slice(i, i + chunkSize);
      htmlContent += generateStudentRows(studentChunk, i);
    }

    // Close HTML tags
    htmlContent += `
      </tbody>
      </table>
      </body>
      </html>
    `;

    // Generate PDF
    const options = {
      html: htmlContent,
      fileName: 'student_report',
    };

    const pdf = await RNHTMLtoPDF.convert(options);

    // Share PDF
    await Share.open({
      url: 'file://' + pdf.filePath,
    });
  } catch (error) {
    console.log('Error generating and sharing PDF:', error);
    // Handle error
  }
};
