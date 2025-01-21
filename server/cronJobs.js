const cron = require('node-cron');
const { getEventsFromInstagram } = require('./controllers/eventController');

// Schedule task to run every day at 00:00 (midnight)
const scheduleInstagramEventsFetch = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            console.log('Running scheduled Instagram events fetch...');
            // Create a mock request and response object since this is not coming from an HTTP request
            const req = {};
            const res = {
                status: (code) => ({
                    json: (data) => {
                        console.log(`Status ${code}:`, data);
                    }
                })
            };

            await getEventsFromInstagram(req, res);
            console.log('Scheduled Instagram events fetch completed successfully');
        } catch (error) {
            console.error('Error in scheduled Instagram events fetch:', error);
        }
    }, {
        scheduled: true,
        timezone: "Europe/Sarajevo"
    });
    
    console.log('Instagram events fetch scheduled to run daily at midnight');
};

module.exports = {
    scheduleInstagramEventsFetch
};
