const express = require('express');
const router = express.Router();
const {
  OpenAi,
  GeMini,
  YouAi,
  RazzAi,
  Diffusions,
  CanvaD
  
} = require('../controller/dataController');

router.get('/razzdevapi/canvas', CanvaD);
router.get('/razzdevapi/youai', YouAi);
router.get('/razzdevapi/razzai', RazzAi);
router.get('/razzdevapi/openai', OpenAi);
router.get('/razzdevapi/gemini', GeMini);
router.get('/razzdevapi/sd_lite', Diffusions)

module.exports = router;
