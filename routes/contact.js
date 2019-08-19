const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const client = require('../db/index');
const { check, validationResult } = require('express-validator');

router.get('/', checkAuth, async (req, res) => {
  const rows = await readContacts();
  res.status(200).json(rows);
});

router.post(
  '/',

  checkAuth,

  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Enter a valid email')
      .isEmail()
      .not()
      .isEmpty(),
    check('phone', 'Phone number is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let result = {};
    try {
      contact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      };
      result = await createContact(contact);
    } catch (e) {
      res.status(500).json(result + e);
    } finally {
      res.status(200).json(result);
    }
  }
);

router.get('/:id', checkAuth, async (req, res) => {
  const rows = await readContact(req.params.id);
  res.status(200).json(rows);
});

router.put(
  '/:id',
  checkAuth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Enter a valid email')
      .isEmail()
      .not()
      .isEmpty(),
    check('phone', 'Phone number is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let result = {};
    updateContact = {
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };
    try {
      result = await editContact(updateContact);
    } catch (e) {
      result.success = false;
    } finally {
      res.setHeader('content-type', 'application/json');
      res.send(JSON.stringify(result));
    }
  }
);

router.delete('/:id', async (req, res) => {
  let result = {};
  try {
    await deleteContact(req.params.id);
    result.success = true;
  } catch (e) {
    result.success = false;
  } finally {
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(result));
  }
});

async function readContacts() {
  try {
    const results = await client.query(
      'select id,name,email,phone from contact'
    );
    return results.rows;
  } catch (e) {
    return [];
  }
}

async function createContact(contact) {
  try {
    console.log(contact);
    const result = await client.query(
      'insert into contact (name,email,phone) values ($1, $2, $3 )',
      [contact.name, contact.email, contact.phone]
    );
    return result;
  } catch (e) {
    return false + e;
  }
}

async function readContact(id) {
  try {
    const result = await client.query('select * from contact where id =$1', [
      id
    ]);
    return result.rows[0];
  } catch (e) {
    return false;
  }
}

async function editContact(updateContact) {
  try {
    const result = await client.query(
      'update contact set name = $1, email = $2, phone=$3 WHERE id = $4',
      [
        updateContact.name,
        updateContact.email,
        updateContact.phone,
        updateContact.id
      ]
    );
    return result;
  } catch (e) {
    return e;
  }
}

async function deleteContact(id) {
  try {
    await client.query('delete from contact where id = $1', [id]);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = router;
