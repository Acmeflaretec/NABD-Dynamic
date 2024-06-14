import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Grid, Card, CardMedia, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';

const AddBanner: React.FC = () => {
    const navigate = useNavigate();
    const [banner, setBanner] = useState('');
    const [bannerImages, setBannerImages] = useState<FileList | null>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setBannerImages(e.target.files);
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setPreviewImages(fileArray);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('banner', banner);
        if (bannerImages) {
            for (let i = 0; i < bannerImages.length; i++) {
                formData.append('bannerImage', bannerImages[i]);
            }
        }


        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/banners`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setBanner('');
        setBannerImages(null);
        setPreviewImages([]);
        navigate('/');
    };

    const handleRemoveImage = (index: number) => {
        const newPreviewImages = [...previewImages];
        newPreviewImages.splice(index, 1);
        setPreviewImages(newPreviewImages);

        if (bannerImages) {
            const dataTransfer = new DataTransfer();
            for (let i = 0; i < bannerImages.length; i++) {
                if (i !== index) {
                    dataTransfer.items.add(bannerImages[i]);
                }
            }
            setBannerImages(dataTransfer.files);
        }
    };

    return (
        <Container maxWidth="md">
             <Card style={{padding:20}}>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Banner
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Banner Name"
                                value={banner}
                                onChange={(e) => setBanner(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <span style={{display:'flex',justifyContent:'center'}}>
                    Add Maximum 3 Images
                </span>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                            >
                                Upload Images
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {previewImages.map((image, index) => (
                                    <Grid item xs={4} key={index}>
                                       
                                        <div>
                                        <IconButton
                                                aria-label="close"
                                                onClick={() => handleRemoveImage(index)}
                                                
                                                style={{ position: 'relative', top: 35, right: 0, color: 'black' }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <CardMedia
                                                component="img"
                                                height="140px"
                                                // width="100%"
                                                image={image}
                                                alt={`preview ${index}`}
                                            />
                                            </div>
                                        
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            </Card>
        </Container>
    );
};

export default AddBanner;
