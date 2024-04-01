import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Alert } from 'react-native';

// Function to generate PDF from array of student objects, share, and download it

export const generatePDF = async (students,class_name,subject_name,date) => {

    let presentStudents = 0
    let absentStudents = 0
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
        th, td {
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
      </style>
    </head>
    <body>
    
    <h2 style="text-align: center;">Student Attendance Report</h2>
    <h2 style="text-align: center;">${class_name}</h2>
    <h3 style="text-align: center;">${subject_name}</h3>
    <p> ${date} </p>
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

  // Add data rows from the array of student objects
  students.forEach((student,index) => {
    student.is_present ? presentStudents++:absentStudents++;
    htmlContent += `
      <tr>
        <td>${index+1}</td>
        <td class="name">${student.first_name} ${student.last_name}</td>
        <td>${student.roll_number}</td>
        <td style=${student.is_present ? 'background-color:lightgreen' : 'background-color:#FF474C'}>${student.is_present ? 'Present' : 'Absent'}</td>
      </tr>
    
    `;
  });

  // Close HTML tags
  htmlContent += `
    </tbody>
    </table>
    <h3>Present => ${presentStudents} </h3>
    <h3>Absent  => ${absentStudents} </h3>
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

    // Optionally, you can copy the PDF to another location for downloading
    // const destPath = RNFS.DocumentDirectoryPath + '/student_report.pdf';
    // await RNFS.copyFile(pdf.filePath, destPath);

    // Display success message
    // Alert.alert(
    //   'PDF Generated',
    //   `PDF shared successfully`,
    //   [{ text: 'OK', onPress: () => console.log('PDF Generated') }],
    //   { cancelable: false }
    // );
  } catch (error) {
    console.log('Error generating and sharing PDF:', error);
    // Handle error
  }
};

// Example usage
// const students = [
//   { first_name: 'John', last_name: 'Doe', roll_number: '001', is_present: true },
//   { first_name: 'Alice', last_name: 'Smith', roll_number: '002', is_present: false },
//   // Add more student objects as needed
// ];

// generatePDF(students);
