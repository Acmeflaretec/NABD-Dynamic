import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Box, Typography, Grid, Card, CardContent, CardActions, Button, IconButton, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, MenuItem, Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Service {
  _id: string;
  heading: string;
  description: string;
  category: string;
}

const categories = ['DAILY CLINICAL CARE', 'CORPORATE COMPANIES', 'HOME HEALTHCARE'];

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchServices = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/services`);
    setServices(data);
    setTotalPages(Math.ceil(data.length / 9));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpen = (service?: Service) => {
    setCurrentService(service || {});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (currentService._id) {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/services/${currentService._id}`, currentService);
    } else {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/services`, currentService);
    }
    fetchServices();
    handleClose();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/services/${id}`);
    fetchServices();
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const displayedServices = services.slice((page - 1) * 9, page * 9);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Services List
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: '16px' }}>
          Add New Service
        </Button>
        <Grid container spacing={4}>
          {displayedServices.map(service => (
            <Grid item key={service._id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" style={{ wordWrap: 'break-word'}}><u>{service.heading}</u></Typography>
                  <Typography variant="body2" color="textSecondary" >{service.category}</Typography>
                  <Typography variant="body1" style={{ wordWrap: 'break-word'}}>{service.description}</Typography>
                </CardContent>
                <CardActions style={{display:'flex',justifyContent:'space-between'}}>
                  <IconButton onClick={() => handleOpen(service)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(service._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination count={totalPages} page={page} onChange={handlePageChange} />
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentService._id ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Service Heading"
            fullWidth
            value={currentService.heading || ''}
            onChange={e => setCurrentService({ ...currentService, heading: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={currentService.description || ''}
            onChange={e => setCurrentService({ ...currentService, description: e.target.value })}
          />
          <TextField
            select
            margin="dense"
            label="Category"
            fullWidth
            value={currentService.category || ''}
            onChange={e => setCurrentService({ ...currentService, category: e.target.value })}
          >
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServiceList;
