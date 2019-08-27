module.exports = {
    dependencies: {
        'react-native-material-ui': {
            platforms: {
                ios: null, // disable Android platform, other platforms will still autolink if provided
                android: null,
            },
        },
        'react-native-code-push': {
            platforms: {
                android: null,
                ios: null,
            },
        },
    },
};
