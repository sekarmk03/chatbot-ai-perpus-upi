const axios = require("axios");

const {
    HOST,
    MODEL_PORT,
    MODEL_PATH
} = process.env;

const messageHandler = async (req) => {
    const session = req.session;
    const {input} = req.body;

    let res = '';

    let data = await axios.post(`${HOST}:${MODEL_PORT}${MODEL_PATH}`, {
        "input": input
    }, {headers: {
        "Content-Type": "multipart/form-data"
    }});

    res = data.data.response;

    session.state = 'CHATING';
    if (!res) {
        res = 'Mohon maaf, saya tidak mengerti apa yang kamu tanyakan. Bisakah kamu bertanya hal lain? Terima kasih.';
    }

    return res;
}

module.exports = messageHandler;