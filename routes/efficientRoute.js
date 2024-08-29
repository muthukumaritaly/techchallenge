import express from 'express'
const router = express.Router();

/* GET users listing. */
router.post('/', async (req, res, next) => {
  try {
    const { origin, destination, sort_by = "fastest" } = req.body;

    if (!origin || !destination) {
      throw new Error("Missing required params origin or destination")
    }

    const tripAPIResult = await fetch(`https://z0qw1e7jpd.execute-api.eu-west-1.amazonaws.com/default/trips?origin=${origin}&destination=${destination}`, {
      method: "GET",
      headers: {
        "x-api-key": "fgy6fd9I316DSDD090Shj4eG1DUxuxpI8sZlAOg1"
      }
    }).then((res) => res.json()).catch((err) => err);

    // our expected output is only array for sorting, hence this condition is needed
    if (Array.isArray(tripAPIResult)) tripAPIResult.sort((a, b) => sort_by === 'cheapest' ? a.cost - b.cost : a.duration - b.duration)

    res.status(200).send({ success: true, tripAPIResult });
  } catch (err) {
    res.status(400).send({ success: false, err: err.message });
  }
});

export default router;

