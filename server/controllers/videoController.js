const   Video = require("../models/videoModel");

/**
 * Creates a video
 *
 * @param {*} req
 * @param {*} res
 */
const videoPost = (req, res) => {
  let video = new Video();

  video.name = req.body.name;
  video.link  = req.body.link;
  video.user  = req.body.user;

  if (video.name && video.link) {
    video.save()
        .then(savedVideo => {
            res.status(201).json(savedVideo);
        })
        .catch(error => {
            res.status(422).json({ error: 'There was an error saving the video' });
        });
} else {
    res.status(422).json({ error: 'No valid data provided for video' });
}
};

/**
 * Get all videos
 *
 * @param {*} req
 * @param {*} res
 */
const videoGet = (req, res) => {
    if (req.query && req.query.id) {
        Video.findById(req.query.id)
            .then(video => {
                if (!video) {
                    res.status(404).json({ error: "Video doesn't exist" });
                } else {
                    res.json(video);
                }
            })
            .catch(err => {
                console.log('error while querying the video', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        Video.find()
            .then(videos => {
                res.json(videos);
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    }
};


/**
 * Updates a video
 *
 * @param {*} req
 * @param {*} res
 */
const videoPatch = (req, res) => {
    // get video by id
    if (req.query && req.query.id) {
        Video.findByIdAndUpdate(req.query.id, req.body, { new: true })
            .then(video => {
                if (!video) {
                    res.status(404).json({ error: "Video doesn't exist" });
                } else {
                    res.json(video);
                }
            })
            .catch(err => {
                console.log('error while updating the video', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(404).json({ error: "Video doesn't exist" });
    }
};

/**
 * Deletes a video
 *
 * @param {*} req
 * @param {*} res
 */
const videoDelete = (req, res) => {
    // get video by id
    if (req.query && req.query.id) {
        Video.findByIdAndDelete(req.query.id)
            .then(video => {
                if (!video) {
                    res.status(404).json({ error: "Video doesn't exist" });
                } else {
                    res.status(204).json({});
                }
            })
            .catch(err => {
                console.log('error while deleting the video', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(404).json({ error: "Video doesn't exist" });
    }
};

module.exports = {
  videoGet,
  videoPost,
  videoPatch,
  videoDelete
}