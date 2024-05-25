const express = require('express');
const multer = require('multer');
const cv = require('opencv4nodejs');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Utility function to read image files
const readImage = (filePath) => cv.imread(filePath);

// Utility function to write image files
const writeImage = (filePath, img) => cv.imwrite(filePath, img);

// Endpoint to upload images
app.post('/upload', upload.fields([{ name: 'known', maxCount: 1 }, { name: 'group', maxCount: 1 }]), async (req, res) => {
  try {
    const knownImagePath = req.files.known[0].path;
    const groupImagePath = req.files.group[0].path;

    const knownImage = readImage(knownImagePath);
    const groupImage = readImage(groupImagePath);

    // Convert images to gray scale
    const knownGray = knownImage.bgrToGray();
    const groupGray = groupImage.bgrToGray();

    // Detect faces in the known image
    const knownFaces = await cv.detectFacesAsync(knownGray);

    if (!knownFaces.length) {
      return res.status(400).json({ error: 'No face detected in the known image' });
    }

    // Use the first detected face in the known image
    const knownFace = knownFaces[0].roi;

    // Detect faces in the group image
    const groupFaces = await cv.detectFacesAsync(groupGray);

    if (!groupFaces.length) {
      return res.status(400).json({ error: 'No faces detected in the group image' });
    }

    // Find the best match in the group image
    let bestMatch;
    for (let i = 0; i < groupFaces.length; i++) {
      const groupFace = groupFaces[i].roi;
      const groupFaceImg = groupImage.getRegion(groupFace);

      // Compare the known face with the group face
      const matched = knownFace.equals(groupFaceImg);
      if (matched) {
        bestMatch = groupFace;
        break;
      }
    }

    if (!bestMatch) {
      return res.status(404).json({ error: 'Person not found in the group image' });
    }

    // Create a mask to highlight the identified face
    const mask = new cv.Mat(groupImage.rows, groupImage.cols, cv.CV_8UC1, 0);
    mask.drawRectangle(bestMatch, new cv.Vec(255, 255, 255), -1);

    // Apply the mask to the group image
    const result = groupImage.copyTo(new cv.Mat(), mask);

    // Save and send the result image
    const resultPath = path.join(__dirname, 'uploads', 'result.jpg');
    writeImage(resultPath, result);

    res.sendFile(resultPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the images' });
  } finally {
    // Clean up uploaded files
    fs.unlinkSync(req.files.known[0].path);
    fs.unlinkSync(req.files.group[0].path);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
