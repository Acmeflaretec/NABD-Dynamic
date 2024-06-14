const Banner = require('../models/bannerModel');
const Service = require('../models/serviceModel');

const addBanner = async (req, res) => {
  try {
    const bannerImages = req.files.map(file => file.filename);
    const newBanner = new Banner({
      banner: req.body.banner,
      bannerImage: bannerImages,
    });
    await Banner.findOneAndUpdate({ is_active: 1 }, { $set: { is_active: 0 } })
    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    const bannerList = banners.map(banner => ({
      ...banner._doc,
      bannerImageUrls: banner.bannerImage.map(image => `${process.env.BACKEND_URL}/uploads/${image}`)
    }));
    res.json(bannerList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  
const Frontendbanners = async (req, res) => {
  try {
    const banner = await Banner.findOne({ is_active: 1 });
    if (!banner) {
      return res.status(404).json({ message: 'No active banner found' });
    }
    const bannerWithUrls = {
      ...banner._doc,
      bannerImageUrls: banner.bannerImage.map(image => `${process.env.BACKEND_URL}/uploads/${image}`)
    };
    res.json(bannerWithUrls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    const bannerWithUrls = {
      ...banner._doc,
      bannerImageUrls: banner.bannerImage.map(image => `${process.env.BACKEND_URL}/uploads/${image}`)
    };
    res.json(bannerWithUrls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    banner.banner = req.body.banner || banner.banner;
    if (req.files.length > 0) {
      banner.bannerImage = req.files.map(file => file.filename);
    }
    const updatedBanner = await banner.save();
    res.json(updatedBanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const id = req.params.id;

    await Banner.deleteOne({ _id: id })
    res.json({ message: 'Banner removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBannerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;
    await Banner.findOneAndUpdate({ is_active: 1 }, { $set: { is_active: 0 } })
    const banner = await Banner.findByIdAndUpdate(id, { is_active }, { new: true });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update banner status', error });
  }   
};

const addService = async (req, res) => {     
  try {      
    const newService = new Service({    
      heading: req.body.heading,
      description: req.body.description,
      category: req.body.category
    });   
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getServices = async (req, res) => {
  console.log("12");
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.heading = req.body.heading || service.heading;
    service.description = req.body.description || service.description;
    service.category = req.body.category || service.category;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const id = req.params.id;

    await Service.deleteOne({ _id: id })
    res.json({ message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  updateBannerStatus,
  Frontendbanners,
  addService,
  getServices,
  updateService,
  deleteService,
};
