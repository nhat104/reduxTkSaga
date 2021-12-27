import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';
import 'react-toastify/dist/ReactToastify.min.css';

export default function AddEditPage() {
  const { studentId } = useParams();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const res: Student = await studentApi.getById(studentId);
        setStudent(res);
      } catch (error) {
        console.log('Failed to fetch student details', error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }
    // throw new Error('Error');

    // Toast success
    toast.success('Save student successfully!');

    navigate('/admin/students', { replace: true });
  };

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <Box>
      <Link to="/admin/students">
        <Typography
          variant="caption"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">
        {isEdit ? 'Update student info' : 'Add new student'}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={initialValues}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}
