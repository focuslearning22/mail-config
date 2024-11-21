const express = require('express');
const bodyParser = require('body-parser');
const Mail = require('./function/mail_config');
const connectDB = require('./config/db')
const Staff = require('./schema/staff')
const Student = require ('./schema/student')
const Department = require('./schema/department')

const app = express();

//connected to mongodb
connectDB();

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded with extended option
app.use(bodyParser.urlencoded({ extended: true }));




app.post('/student_register', async (req, res) => {
  const { name, email,password, department, phone, address, dateOfBirth } = req.body;

  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log("body",req.body);
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");

  try {
      const student_details = new Student({ 
          name, 
          email,
          password, 
          department: department, 
          phone, 
          address, 
          dateOfBirth,  
      });
      await student_details.save();

      const department_details = await Department.findOne({name:department})

      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log("department_details",department_details);
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");

      const hod_id = department_details.hod
     
      const staff_email = await Staff.findOne({_id:hod_id})

      const clean_email = staff_email.email.replace(/^["']+|["']+$/g, '');

      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log("staff_email",clean_email);
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");

      const mail = new Mail();
      const mailOptions = {
          from: 'bharath.mindvision@gmail.com',
          to: clean_email,
          subject: 'New Student Added to Your Department',
          html: `
        <h2>New Student Added to Your Department</h2>
        <p>A new student has been added to your department. Below are the details:</p>
        <table border="1" cellpadding="5" cellspacing="0">
            <tr>
                <th>Name</th>
                <td>${name}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${email}</td>
            </tr>
            <tr>
                <th>Phone Number</th>
                <td>${phone}</td>
            </tr>
            <tr>
                <th>Address</th>
                <td>${address}</td>
            </tr>
        </table>
        <br />
        <p>Thank you,<br />The College Team</p>
    `,
      };

      await mail.send(mailOptions);
      res.status(200).send('Student added and email sent successfully');
  } catch (error) {
      console.error('Error adding student or sending email:', error);
      res.status(500).send('Error adding student or sending email');
  }
});

//staff added

// app.post('/staff_add', async (req, res) => {
//   const { name, email, role, department, phone } = req.body;

//   try {
//       const staff = new Staff({ name, email, role, department:department , phone });
//       await staff.save();

//       res.status(200).send('Staff member added successfully');
//   } catch (error) {
//       console.error('Error adding staff member:', error);
//       res.status(500).send('Error adding staff member');
//   }
// });


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
