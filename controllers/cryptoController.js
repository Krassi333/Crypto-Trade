const { getAllCrypto, createCrypto, getById, getCryptoAuthor, deleteCrypto, editCrypto, buy, searchResults } = require('../services/cryptoServices');
const errorParser = require('../util/errorParser');

const router = require('express').Router();

router.get('/catalog', async (req, res) => {
    const crypto = await getAllCrypto();
    res.render('catalog', {
        title: 'Crypto Catalog',
        crypto
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Add Crypto'
    });
});

router.post('/create', async (req, res) => {
    const data = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description,
        paymentMethod: req.body.paymentMethod,
        owner: req.user._id,
    };
    console.log(data);

    try {
        await createCrypto(data);

        res.redirect('/crypto/catalog');
    } catch (err) {
        const errors = errorParser(err);

        res.render('create', {
            title: 'Add Crypto',
            data,
            errors
        });
    }
});

router.get('/:id/details', async (req, res) => {
    const crypto = await getById(req.params.id);
    const user = req.cookies.token;

    const author = await getCryptoAuthor(crypto.author);

    if (user) {
        crypto.hasUser = true;

        if (req.user._id.toString() == crypto.owner.toString()) {
            crypto.isOwner = true;
        } else {
            if (!crypto.buyers.map(x => x.toString()).includes(req.user._id.toString())) {
                crypto.canBuy = true;
            }
        }
    }

    res.render('details', {
        title: 'Details Page',
        crypto,
        user
    })
});

router.get('/:id/delete', async (req, res) => {
    await deleteCrypto(req.params.id);
    res.redirect('/crypto/catalog');
});

router.get('/:id/edit', async (req, res) => {
    const crypto = await getById(req.params.id);
    console.log(crypto);

    res.render('edit', {
        title: 'Edit Page',
        crypto
    });
});

router.post('/:id/edit', async (req, res) => {

    const newData = req.body;

    try {
        await editCrypto(req.params.id, newData);
        res.redirect(`/crypto/${req.params.id}/details`);
    } catch (err) {
        const errors = errorParser(err);

        res.render('edit', {
            title: 'Edit Page',
            crypto,
            errors
        });
    }
});

router.get('/:id/buy', async (req, res) => {
    console.log('here');
    await buy(req.params.id, req.user._id);
    res.redirect(`/crypto/${req.params.id}/details`);
});

router.get('/search', async (req, res) => {
    const result = await getAllCrypto();

    res.render('search', {
        title: "Search Page",
        result
    })
});

router.post('/search', async (req, res) => {

    const result = await searchResults(req.body.searchName, req.body.searchPaymentMethod);

    res.render('search', {
        title: "Search Page",
        result,
        searchName: req.body.searchName,
        searchPaymentMethod: req.body.paymentMethod

    })
})


module.exports = router;