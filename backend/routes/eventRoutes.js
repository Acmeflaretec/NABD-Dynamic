const express = require('express');
const { addBanner, getBanners, getBannerById, updateBanner, deleteBanner ,updateBannerStatus,Frontendbanners , addService, getServices, updateService, deleteService} = require('../controllers/eventController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/banners', upload.array('bannerImage', 3), addBanner);
router.get('/banners', getBanners);
router.get('/Frontendbanners', Frontendbanners);
router.get('/banners/:id', getBannerById);
router.put('/banners/:id', upload.array('bannerImage', 3), updateBanner);
router.delete('/banners/:id', deleteBanner);
router.put('/banners/:id/status', updateBannerStatus);


router.post('/services', addService);
router.get('/services', getServices);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

module.exports = router;
