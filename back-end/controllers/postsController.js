// const User = require('../models/User');

const Volunteer = require('../')
const Post = require('../models/Post');


const postsController = {

    // Register user
    getListPost: async (req, res) => {
        try {
            const posts = await Post.find()
                .sort({ createdAt: 'desc' })
                .populate('volunteer', ['username', 'avatar']);

            return res
                .status(200)
                .json({
                    success: true,
                    posts
                });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createPost: async (req, res) => {

        const { title, content, photo } = req.body;

        if (!title || !content) {
            return res
                .status(404)
                .json({ success: false, message: 'Missing title or content' });
        }

        try {
            const volunteer = await Volunteer.findById(req.volunteerId).select('-password');

            // console.log({user});

            const newPost = await new Post({
                title,
                content,
                photo,
                volunteer
            });

            await newPost.save()

            res.status(200).json({ message: "New post has been created successfully!" })
        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        };

    },

    updatePost: async (req, res) => {

        const { content, favoriteCount, title, photo } = req.body;

        if (!content || !title) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Missing title or content'
                });
        }

        try {
            let updatedPost = {
                content,
                favoriteCount,
                title,
                photo
            };

            const updateCondition = { _id: req.params.id, user: req.userId };

            updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost, {
                new: true,
            });

            if (!updatedPost) {
                return res.status(401).json({
                    success: false,
                    message: 'Post not found or user is not authorized',
                });
            }

            res.json({ success: true, message: 'Post is updated!', updatedPost });


        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        };
    },

    deletePost: (req, res) => {

        try {
            const deleteCondition = { _id: req.params.id, user: req.userId };
            const deletedPost = await Post.findOneAndDelete(deleteCondition);

            if (!deletedPost) {
                return res.status(401).json({
                    success: false,
                    message: 'Post not found or user is not authorized',
                });
            }
            return res
                .status(200)
                .json({ success: true, message: 'Post is deleted!', deletedPost });

        } catch (err) {
            return res
                .status(500)
                .json({ message: err.message })
        }

    },

    favoritePost: async (req, res) => {
        const { favoriteCount } = req.body;

        try {
            const favoritePost = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    favoriteCount: favoriteCount,
                },
                { new: true }
            );

            if (!favoritePost) {
                return res.status(401).json({
                    success: false,
                    message: 'Post not found',
                });
            }

            res.json({ success: true, message: 'Post is favorite!', favoritePost });
        } catch (error) {
            console.log('error', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

};

module.exports = postsController;


// const postsController = {};

// postsController.getEvent = async (req, res) => {

//     try {
//         const posts = await Event.find()
//             .sort({ createdAt: ''})
//             .populate('user', ['userId','fullname']);
//         res.json({
//             success: true,
//             events
//         });
//     }
//     catch (error){
//         console.log('error',error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
//    };
// };

// module.exports = experiencesController;