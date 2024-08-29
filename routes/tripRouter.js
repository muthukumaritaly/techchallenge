import express from 'express'
import tripModal from '../schema/tripSchema.js';
const router = express.Router();

/* GET users listing. */
router.post('/save', async (req, res, next) => {
  try {
    const { origin, destination } = req.body

    if (!origin || !destination) {
        throw new Error("Missing required params origin or destination")
    }

    const result = await tripModal.create({ ...req.body }, {new: true})

    res.status(200).send({ success: true, result });
  } catch (err) {
    res.status(400).send({ success: false, err: err.message });
  }
});

router.get('/list', async (req, res, next) => {
  try {
    const result = await tripModal.find();

    res.status(200).send({ success: true, result });
  } catch (err) {
    res.status(400).send({ success: false, err: err.message });
  }
});

router.get('/deleteTrip', async (req, res, next) => {
  try {
    const { _id } = req.query

    if (!_id) {
      throw new Error("Missing required params _id")
  }

    const result = await tripModal.deleteOne({ _id })

    res.status(200).send({ success: true, result });
  } catch (err) {
    res.status(400).send({ success: false, err: err.message });
  }
});

export default router;