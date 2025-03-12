const { default: slugify } = require("slugify");
const BlogCategory = require("../model/BlogCategory");

// Create a Category
exports.createCategory = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.name, { lower: true });
        const category = new BlogCategory(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await BlogCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Single Category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await BlogCategory.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Category
exports.updateCategory = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.name, { lower: true });
        const category = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await BlogCategory.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
