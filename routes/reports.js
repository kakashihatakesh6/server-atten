const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Report = require('../models/Report');

router.post('/addreport', fetchuser, async (req, res) => {

    try {
        const { name, selecDate, selecInTime, selecOutTime} = req.body.data;
        const report = await Report.findOne({ date: selecDate});
        console.log(report)
        if (report) {
            await Report.findOneAndUpdate({date: selecDate}, {out: selecOutTime}, { new: true });
            res.status(200).json({success: true, message: "Report added successfully!"});
        }
        const newReport = new Report({
            name: name,
            date: selecDate,
            in: selecInTime,
            out: selecOutTime,
        });
        console.log("new report =>", newReport);
        await newReport.save();
        res.status(200).json({success: true, message: "Report added successfully!"});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/getallreports', fetchuser, async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json({success: true, reports: reports});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/getreport', fetchuser, async (req, res) => {
    try {
        const {reqDate} = req.body.data;
        console.log(req.body)
        const report = await Report.findOne({date: reqDate});
        if (report) {
            res.status(200).json({success: true, report: report});
        }else{
            res.status(404).json({success: false, message: "Report not found!"})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;