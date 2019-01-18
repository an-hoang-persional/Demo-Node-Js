module.exports = {
    // Email config
    email: {
        service: 'gmail',
        auth: {
            user: 'an.hoang.server@gmail.com',
            pass: 'Abc12345'
        }
    },
    // Normalize email config
    normalizeEmail: {
        gmail_remove_dots: false,
        gmail_remove_subaddress: false,
        outlookdotcom_remove_subaddress: false,
        yahoo_remove_subaddress: false,
        icloud_remove_subaddress: false
    }
};