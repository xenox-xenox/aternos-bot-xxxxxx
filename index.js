
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const COOKIE = 'ATERNOS_SESSION=yXjIcuc3R7Fa0c7QtAWhdSgSPYhTMgTqE5N6Z54XjsYSrawGkeyieuQLkL0U3NEii2KNkOq9Cvrz9zahNl6wIYndJzAW2CjvhaVb';
const SERVER_DOMAIN = 'voidcraze.aternos.me';

async function startServer() {
    const res = await fetch(`https://aternos.org/ajax/server/start.php?server=${SERVER_DOMAIN}`, {
        headers: {
            'Cookie': COOKIE,
            'Referer': `https://aternos.org/server/${SERVER_DOMAIN}/`
        }
    });

    const text = await res.text();
    console.log('🚀 Server Start Response:', text);
}

async function checkStatus() {
    const res = await fetch(`https://aternos.org/ajax/status.php?server=${SERVER_DOMAIN}`, {
        headers: {
            'Cookie': COOKIE,
            'Referer': `https://aternos.org/server/${SERVER_DOMAIN}/`
        }
    });

    const data = await res.json();
    console.log('🔄 Server Status:', data.status);

    if (data.status === 'offline') {
        console.log('❌ Server is offline. Starting...');
        await startServer();
    } else {
        console.log('✅ Server is online.');
    }
}

async function startBot() {
    setInterval(checkStatus, 5 * 60 * 1000);
}

app.get('/', (req, res) => {
    res.send('✅ Aternos Auto Start Bot is Running!');
});

app.listen(3000, () => {
    console.log('Bot is running on port 3000');
    startBot();
});
