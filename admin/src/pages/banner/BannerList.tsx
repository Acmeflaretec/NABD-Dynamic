import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Switch  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Banner {
  _id: string;
  banner: string;
  bannerImageUrls: string[];
  is_active: number;
}

const BannerList: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/banners`);
      setBanners(data);
    };
    fetchBanners();
  }, []);

  const handleDelete = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/banners/${id}`);
    setBanners(banners.filter(banner => banner._id !== id));
  };
  const handleToggleStatus = async (id: string, isActive: number) => {
    const newStatus = isActive === 1 ? 0 : 1;
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/banners/${id}/status`, { is_active: newStatus });
    setBanners(banners.map(banner => (banner._id === id ? { ...banner, is_active: newStatus } :  { ...banner, is_active: 0 })));
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Banner List
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/add-banner" style={{ marginBottom: '16px' }}>
          Add New Banner
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl NO</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banners.map((banner, index) => (
                <TableRow key={banner._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {banner.bannerImageUrls.map((url, idx) => (
                      <img key={idx} src={url} alt={`banner ${idx}`} width="100" height="100" style={{ marginRight: '8px' }} />
                    ))}
                  </TableCell>
                  <TableCell>{banner.banner}</TableCell>
                  <TableCell>
                    <Switch
                      checked={banner.is_active === 1 ? true : false}
                      onChange={() => handleToggleStatus(banner._id, banner.is_active)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/edit-banner/${banner._id}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(banner._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default BannerList;
