import { Box, Button, Paper } from '@mui/material';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { DialogContentText, DialogTitle } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { City, Student } from 'models';
import React, { useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';

export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentTableProps) {
  const [open, setOpen] = useState(false);
  const [selectStudent, setSelectStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveClick = (student: Student) => {
    setSelectStudent(student);
    setOpen(true);
  };
  const handleRemoveConfirm = (student: Student) => {
    onRemove?.(student);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student, idx) => (
              <TableRow key={student.id}>
                <TableCell width={150}>{student.id}</TableCell>
                <TableCell> {student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => onEdit?.(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ ml: 1 }}
                    size="small"
                    color="secondary"
                    onClick={() => handleRemoveClick(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to remove a student named "{selectStudent?.name}".
            <br />
            This action can't be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleRemoveConfirm(selectStudent as Student)}
          >
            Remove
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleClose}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
