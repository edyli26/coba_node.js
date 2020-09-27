const express = require ('express');
const uuid = require ('uuid');
const router = express.Router();
const members = require('../../Members');


// get all memberes
router.get('/', (req, res) => res.json(members));

// get single members
router.get('/:id', (req, res) => {
    const found = members.some(members => members.id === parseInt(req.params.id));

    if (found){
        res.json(members.filter(members => members.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({ msg : `Member id ${req.params.id} tidak ditemukan` });
    }
});

// create members
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email){
        return res.status(400).json({ msg: 'tolong isi nama dan email'});
    }
    members.push(newMember);
    res.json(members);
});

// update members
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found){
        const updtMember = req.body;
        members.forEach(member => {
            if(member.id == parseInt(req.params.id)){
                member.name = updtMember.name ? updtMember.name : member.name;
                member.email = updtMember.email ? updtMember.email : member.email;

                res.json({ msg: 'Update member berhasil', member});
            }
        });
    }else{
        res.status(400).json({ msg : `Member id ${req.params.id} tidak ditemukan` });
    }
});

module.exports = router;