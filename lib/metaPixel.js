export const pageview = () => {
    window.fbq('track', 'PageView');
};

export const event = (name, options = {}, eventID) => {
    window.fbq('track', name, options, { eventID });
};