import { Container, Paper, Typography } from "@mui/material";
import WarrantyForm from "./WarrantyForm";

const AddNewWarranty = () => {
  return (
    <Container maxWidth="lg">
      <Paper className="flex flex-col items-start rounded-xl gap-4 p-4 border border-green-600 shadow-2xl shadow-green-600">
        <Typography variant="h6">تعریف گارانتی جدید</Typography>

        <WarrantyForm />
      </Paper>
    </Container>
  );
};

export default AddNewWarranty;
